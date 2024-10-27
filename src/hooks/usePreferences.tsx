import { useContext } from "react";

import {
  PreferencesContext,
  PreferencesContextProps,
} from "../contexts/PreferencesContext";

export function usePreferences(): PreferencesContextProps {
  const context = useContext(PreferencesContext);

  return context;
}
