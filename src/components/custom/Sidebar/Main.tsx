import { Tooltip } from 'react-tooltip'
import { Link } from 'react-router-dom'

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
  LogOut,
} from 'lucide-react'

import { useSidebar } from '@/hooks/useSidebar'
import { AuthStorage } from '@/storage/authStorage'
import { AuthService } from '@/services/AuthService'

export function Main() {
  const { isOpened } = useSidebar()

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
    {
      title: 'Sair',
      url: '/entrar',
      icon: LogOut,
    },
  ]

  const handleLogout = () => {
    AuthStorage.removeAccessToken()

    try {
      AuthService.logout()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent className="py-4 px-2 bg-gray-950">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link
                  to={item.url}
                  className="text-white hover:text-white sm:hover:bg-gray-900"
                  data-tooltip-id={isOpened ? 'sidebar-tooltip' : ''}
                  data-tooltip-content={item.title}
                  data-tooltip-place="right"
                  onClick={item.url === '/entrar' ? handleLogout : undefined}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <Tooltip id="sidebar-tooltip" />
    </Sidebar>
  )
}
