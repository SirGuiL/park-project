import { Toaster } from "react-hot-toast";

import { Sidebar } from "./components/custom/Sidebar/Sidebar";
import { Home } from "./pages/Home";

import { SidebarContextProvider } from "./contexts/SidebarContext";
import { TodaysHistoryContextProvider } from "./contexts/TodaysHistoryContext";
import { PreferencesContextProvider } from "./contexts/PreferencesContext";

function App() {
  return (
    <PreferencesContextProvider>
      <TodaysHistoryContextProvider>
        <SidebarContextProvider>
          <div className="w-screen h-screen overflow-hidden flex">
            <Sidebar />
            <Home />
          </div>

          <Toaster position="top-center" reverseOrder={false} />
        </SidebarContextProvider>
      </TodaysHistoryContextProvider>
    </PreferencesContextProvider>
  );
}

export default App;
