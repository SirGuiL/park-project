import { useSidebar } from '@/components/ui/sidebar'
import { ReactNode, createContext, useState } from 'react'

export type SidebarContextProps = {
  isOpened: boolean
  handleOpenSidebar: () => void
}

type SidebarContextProviderProps = {
  children: ReactNode
}

export const SidebarContext = createContext<SidebarContextProps>(
  {} as SidebarContextProps
)

export function SidebarContextProvider({
  children,
}: SidebarContextProviderProps) {
  const [isOpened, setIsOpened] = useState(false)
  const { toggleSidebar } = useSidebar()

  const handleOpenSidebar = () => {
    setIsOpened(!isOpened)
    toggleSidebar()
  }

  return (
    <SidebarContext.Provider
      value={{
        isOpened,
        handleOpenSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
