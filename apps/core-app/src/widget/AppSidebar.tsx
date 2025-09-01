import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@ci-repo/core-ui'
import Link from 'next/link'

export function AppSidebar() {
  const data = {
    navMain: [
      {
        title: 'Project Overview',
        url: '#',
        items: [
          {
            title: 'Overview',
            url: '/',
          },
        ],
      },
      {
        title: '@ci-app',
        url: '#',
        items: [
          {
            title: 'apps/core-app',
            url: '/app',
          },
        ],
      },
      {
        title: '@ci-repo',
        url: '#',
        items: [
          {
            title: 'packages/config',
            url: '/conf',
          },
          {
            title: 'packages/core-lib',
            url: '/lib',
          },
          {
            title: 'packages/core-ui',
            url: '/ui',
          },
        ],
      },
      {
        title: 'examples',
        url: '#',
        items: [
          {
            title: 'api',
            url: '/example/api',
          },
          {
            title: 'store',
            url: '/example/store',
          },
        ],
      },
    ],
  }

  return (
    <Sidebar>
      <SidebarHeader>frontend-monorepo</SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
