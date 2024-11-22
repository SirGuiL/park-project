import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'

import { Sidebar } from './components/custom/Sidebar/Sidebar'
import { SidebarProvider } from './components/ui/sidebar'

import { Home } from './pages/Home'
import { Services } from './pages/Services'

import { SidebarContextProvider } from './contexts/SidebarContext'
import { TodaysHistoryContextProvider } from './contexts/TodaysHistoryContext'
import { PreferencesContextProvider } from './contexts/PreferencesContext'

import { useSidebar } from './hooks/useSidebar'

function App() {
    const { isOpened } = useSidebar()

    return (
        <SidebarProvider open={isOpened}>
            <PreferencesContextProvider>
                <TodaysHistoryContextProvider>
                    <SidebarContextProvider>
                        <div className="w-screen h-screen overflow-hidden flex">
                            <Sidebar />

                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/servicos"
                                    element={<Services />}
                                />
                            </Routes>
                        </div>

                        <Toaster position="top-center" reverseOrder={false} />
                    </SidebarContextProvider>
                </TodaysHistoryContextProvider>
            </PreferencesContextProvider>
        </SidebarProvider>
    )
}

export default App
