import { useSidebar } from "@/hooks/useSidebar";
import {
  Calendar,
  ChartColumnDecreasing,
  History,
  House,
  Settings,
} from "lucide-react";
import { Link } from ".";

export const Sidebar = () => {
  const { isOpened } = useSidebar();

  return (
    <aside
      className={`transition-all ease-in-out duration-300 bg-gray-950  overflow-hidden flex flex-col items-start gap-4 ${
        isOpened ? "w-48 py-8 px-6" : "w-0 p-0"
      }`}
    >
      <Link icon={<House size={20} color="#d1d5db" />} text={"Início"} />

      <Link
        icon={<Calendar size={20} color="#d1d5db" />}
        text={"Mensalistas"}
      />

      <Link
        icon={<ChartColumnDecreasing size={20} color="#d1d5db" />}
        text={"Métricas"}
      />

      <Link icon={<History size={20} color="#d1d5db" />} text={"Histórico"} />

      <Link
        icon={<Settings size={20} color="#d1d5db" />}
        text={"Configurações"}
      />
    </aside>
  );
};
