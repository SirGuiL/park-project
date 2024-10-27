import { useContext } from "react";

import {
  TodaysHistoryContext,
  TodaysHistoryContextProps,
} from "../contexts/TodaysHistoryContext";

export function useTodaysHistory(): TodaysHistoryContextProps {
  const context = useContext(TodaysHistoryContext);

  return context;
}
