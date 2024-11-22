import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  Calendar,
  ChartColumnDecreasing,
  History,
  Home,
  Settings,
} from 'lucide-react'

export function Main() {
  const items = [
    {
      title: 'Início',
      url: '/',
      icon: Home,
    },
    {
      title: 'Serviços',
      url: '/servicos',
      icon: Calendar,
    },
    {
      title: 'Métricas',
      url: '/metricas',
      icon: ChartColumnDecreasing,
    },
    {
      title: 'Histórico',
      url: '/historico',
      icon: History,
    },
    {
      title: 'Configurações',
      url: '/configuracoes',
      icon: Settings,
    },
  ]

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent className="py-4 px-2 bg-gray-950">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a
                  href={item.url}
                  className="text-white hover:text-white sm:hover:bg-gray-900"
                >
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
