import { GridHistory, ListHistory } from ".";

interface Props {
  mode: "grid" | "list";
}

export const TodaysHistory = ({ mode }: Props) => {
  if (mode == "grid") {
    return <GridHistory />;
  }

  return <ListHistory />;
};
