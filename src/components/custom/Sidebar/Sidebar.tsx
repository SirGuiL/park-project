import { Link as RouterLink } from 'react-router-dom'

import { useSidebar } from '@/hooks/useSidebar'
import {
    Calendar,
    ChartColumnDecreasing,
    History,
    House,
    Settings,
} from 'lucide-react'
import { Link } from '.'

export const Sidebar = () => {
    const { isOpened } = useSidebar()

    return (
        <aside
            className={`transition-all ease-in-out duration-300 bg-gray-950  overflow-hidden flex flex-col items-start gap-4 ${
                isOpened ? 'w-48 py-8 px-6' : 'w-0 px-0 py-8'
            }`}
        >
            <RouterLink to="/">
                <Link
                    icon={<House size={20} color="#d1d5db" />}
                    text={'Início'}
                />
            </RouterLink>

            <RouterLink to="/servicos">
                <Link
                    icon={<Calendar size={20} color="#d1d5db" />}
                    text={'Serviços'}
                />
            </RouterLink>

            <RouterLink to="/metricas">
                <Link
                    icon={<ChartColumnDecreasing size={20} color="#d1d5db" />}
                    text={'Métricas'}
                />
            </RouterLink>

            <RouterLink to="/historico">
                <Link
                    icon={<History size={20} color="#d1d5db" />}
                    text={'Histórico'}
                />
            </RouterLink>

            <RouterLink to="/configuracoes">
                <Link
                    icon={<Settings size={20} color="#d1d5db" />}
                    text={'Configurações'}
                />
            </RouterLink>
        </aside>
    )
}
