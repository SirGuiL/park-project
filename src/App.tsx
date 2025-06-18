import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'

import { Sidebar } from './components/custom/Sidebar/Sidebar'
import { SidebarProvider } from './components/ui/sidebar'

import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

import { SidebarContextProvider } from './contexts/SidebarContext'
import { TodaysHistoryContextProvider } from './contexts/TodaysHistoryContext'
import { PreferencesContextProvider } from './contexts/PreferencesContext'
import { ServicesContextProvider } from './contexts/ServicesContext'
import { TagsContextProvider } from './contexts/TagsContext'

import { useSidebar } from './hooks/useSidebar'

function App() {
  const { isOpened } = useSidebar()

  const withoutSidebar = ['/cadastro', '/entrar']

  return (
    <TagsContextProvider>
      <ServicesContextProvider>
        <SidebarProvider open={isOpened}>
          <PreferencesContextProvider>
            <TodaysHistoryContextProvider>
              <SidebarContextProvider>
                <div className="w-screen h-screen overflow-hidden flex">
                  {!withoutSidebar.includes(window.location.pathname) && (
                    <Sidebar />
                  )}

                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/servicos" element={<Services />} />
                    <Route path="/cadastro" element={<SignUp />} />
                    <Route path="/entrar" element={<SignIn />} />
                  </Routes>
                </div>

                <Toaster position="top-center" reverseOrder={false} />
              </SidebarContextProvider>
            </TodaysHistoryContextProvider>
          </PreferencesContextProvider>
        </SidebarProvider>
      </ServicesContextProvider>
    </TagsContextProvider>
  )
}

export default App
