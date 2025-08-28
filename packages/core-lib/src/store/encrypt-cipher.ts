import CryptoJS from 'crypto-js'

/** 라벨 (감사용) */
export const CIPHER_LABEL = 'aes-cbc+hmac-sha256/psk'
export const CIPHER_VERSION = 1

/** 고정 시크릿(PSK) 읽기: 운영에서는 환경변수 필수 */
const RAW_SECRET = process.env.NEXT_PUBLIC_ZUSTAND_SECRET ?? '__dev-only-psk-change-me-32-bytes-minimum__'

/** enc/mac 키 파생(빠르고 동기) */
function deriveFixedKeys(secret: string) {
  const key = CryptoJS.enc.Utf8.parse(secret)
  // 간단한 KDF: 서로 다른 라벨로 HMAC -> 256bit 두 개
  const encKey = CryptoJS.HmacSHA256('enc', key)
  const macKey = CryptoJS.HmacSHA256('mac', key)
  return { encKey, macKey }
}

/** 합치기/분해 헬퍼 */
function waToB64(wa: CryptoJS.lib.WordArray) {
  return CryptoJS.enc.Base64.stringify(wa)
}
function b64ToWa(b64: string) {
  return CryptoJS.enc.Base64.parse(b64)
}
function concatWA(a: CryptoJS.lib.WordArray, b: CryptoJS.lib.WordArray) {
  return a.clone().concat(b)
}

/** Encrypt JSON string -> envelope string */
export function encryptStringFast(plain: string) {
  const { encKey, macKey } = deriveFixedKeys(RAW_SECRET)
  const iv = CryptoJS.lib.WordArray.random(16)

  // AES-CBC (PKCS7)
  const cipherParams = CryptoJS.AES.encrypt(plain, encKey, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })

  // HMAC(iv|ciphertext) 무결성 보호
  const data = concatWA(iv, cipherParams.ciphertext)
  const tag = CryptoJS.HmacSHA256(data, macKey)

  const env = {
    v: CIPHER_VERSION,
    a: CIPHER_LABEL,
    i: waToB64(iv),
    c: waToB64(cipherParams.ciphertext),
    t: waToB64(tag),
  }
  return JSON.stringify(env)
}

/** Decrypt envelope string -> JSON string (or null on failure) */
export function decryptStringFast(envelopeStr: string): string | null {
  try {
    const env = JSON.parse(envelopeStr)
    if (!env || env.v !== CIPHER_VERSION || env.a !== CIPHER_LABEL) return null

    const iv = b64ToWa(env.i)
    const ciphertext = b64ToWa(env.c)
    const tagB64 = env.t as string

    const { encKey, macKey } = deriveFixedKeys(RAW_SECRET)

    // MAC 검증
    const data = concatWA(iv, ciphertext)
    const macB64 = waToB64(CryptoJS.HmacSHA256(data, macKey))
    if (macB64.length !== tagB64.length) return null // 빠른 reject
    let diff = 0
    for (let i = 0; i < macB64.length; i++) diff |= macB64.charCodeAt(i) ^ tagB64.charCodeAt(i)
    if (diff !== 0) return null

    // 복호화
    const plainWA = CryptoJS.AES.decrypt({ ciphertext } as CryptoJS.lib.CipherParams, encKey, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    const plain = CryptoJS.enc.Utf8.stringify(plainWA)
    return plain || null
  } catch {
    return null
  }
}

/** 포맷 빠른 식별 */
export function looksEncryptedFast(str: string) {
  if (!str || str[0] !== '{') return false
  try {
    const o = JSON.parse(str)
    return o?.v === CIPHER_VERSION && o?.a === CIPHER_LABEL
  } catch {
    return false
  }
}
