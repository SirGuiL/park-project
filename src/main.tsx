import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'

import './index.css'

import { TagsContextProvider } from './contexts/TagsContext.tsx'
import { UserContextProvider } from './contexts/UserContext.tsx'
import { ServicesContextProvider } from './contexts/ServicesContext.tsx'
import { PreferencesContextProvider } from './contexts/PreferencesContext.tsx'
import { TodaysHistoryContextProvider } from './contexts/TodaysHistoryContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TagsContextProvider>
        <UserContextProvider>
          <ServicesContextProvider>
            <PreferencesContextProvider>
              <TodaysHistoryContextProvider>
                <App />
              </TodaysHistoryContextProvider>
            </PreferencesContextProvider>
          </ServicesContextProvider>
        </UserContextProvider>
      </TagsContextProvider>
    </BrowserRouter>
  </StrictMode>
)
