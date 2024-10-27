import { useContext } from "react";

import {
  SidebarContext,
  SidebarContextProps,
} from "../contexts/SidebarContext";

export function useSidebar(): SidebarContextProps {
  const context = useContext(SidebarContext);

  return context;
}
