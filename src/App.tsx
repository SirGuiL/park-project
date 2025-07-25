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
import { useAccount } from './hooks/useAccount'
import { CreatePassword } from './pages/CreatePassword'

function App() {
  const { isOpened } = useSidebar()
  const location = useLocation()
  const { saveStoredUser } = useUser()
  const { saveStoredAccount, saveStoredAccountUsers, saveStoredMaxPages } =
    useAccount()

  const withoutSidebar = ['/cadastro', '/entrar']

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await UserService.get()

        saveStoredUser(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    const getAccount = async () => {
      try {
        const response = await AccountService.get()

        saveStoredAccount(response.data)
        getAccountUsers()
      } catch (error) {
        console.error(error)
      }
    }

    const getAccountUsers = async () => {
      const limit = 10

      try {
        const response = await AccountService.getUsers({
          limit,
          page: 1,
          query: '',
        })

        saveStoredAccountUsers(response.data.users)
        saveStoredMaxPages(Math.ceil(response.data.metadata.count / limit))
      } catch (error) {
        console.error(error)
      }
    }

    setTimeout(() => {
      getUser()
      getAccount()
    }, 100)
  }, [
    saveStoredUser,
    saveStoredAccount,
    saveStoredAccountUsers,
    saveStoredMaxPages,
  ])

  return (
    <SidebarProvider open={isOpened}>
      <SidebarContextProvider>
        <div className="w-screen h-screen overflow-hidden flex">
          {!withoutSidebar.includes(location.pathname) &&
            !location.pathname.includes('/nova-senha') && <Sidebar />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/cadastro" element={<SignUp />} />
            <Route path="/entrar" element={<SignIn />} />
            <Route path="/configuracoes" element={<Settings />} />
            <Route path="/alterar-senha" element={<Settings />} />
            <Route path="/nova-senha/:id" element={<CreatePassword />} />
          </Routes>
        </div>

        <Toaster position="top-center" reverseOrder={false} />
      </SidebarContextProvider>
    </SidebarProvider>
  )
}

export default App
