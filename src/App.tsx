import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, useLocation } from 'react-router-dom'

import { Sidebar } from './components/custom/Sidebar/Sidebar'
import { SidebarProvider } from './components/ui/sidebar'

import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Settings } from './pages/Settings'

import { SidebarContextProvider } from './contexts/SidebarContext'

import { useUser } from './hooks/useUser'
import { useSidebar } from './hooks/useSidebar'

import { UserService } from './services/UserService'
import { AccountService } from './services/AccountService'

function App() {
  const { isOpened } = useSidebar()
  const location = useLocation()
  const { saveStoredUser } = useUser()

  const withoutSidebar = ['/cadastro', '/entrar']

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await UserService.get()

        saveStoredUser(response.data)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    const getAccount = async () => {
      try {
        const response = await AccountService.get()

        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    setTimeout(() => {
      getUser()
      getAccount()
    }, 100)
  }, [saveStoredUser])

  return (
    <SidebarProvider open={isOpened}>
      <SidebarContextProvider>
        <div className="w-screen h-screen overflow-hidden flex">
          {!withoutSidebar.includes(location.pathname) && <Sidebar />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/cadastro" element={<SignUp />} />
            <Route path="/entrar" element={<SignIn />} />
            <Route path="/configuracoes" element={<Settings />} />
          </Routes>
        </div>

        <Toaster position="top-center" reverseOrder={false} />
      </SidebarContextProvider>
    </SidebarProvider>
  )
}

export default App
