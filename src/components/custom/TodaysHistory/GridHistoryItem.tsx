import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DollarSign, Pencil, Trash2 } from "lucide-react";

interface Props {
  name: string;
  created_at: Date;
  licensePlate: string;
  brand: string;
  onRemove: () => void;
  onEdit: () => void;
  onCharge: () => void;
}

export const GridHistoryItem = ({
  name,
  brand,
  created_at,
  licensePlate,
  onRemove,
  onEdit,
  onCharge,
}: Props) => {
  return (
    <div className="flex flex-col gap-4 py-4 px-10 items-center shadow-md rounded-md justify-between">
      <div className="flex">
        <span>
          {brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase()}{" "}
          {(name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()).replace(
            "gti",
            "GTI"
          )}
        </span>
      </div>

      <span>
        {format(new Date(created_at), "d' de' MMMM 'às' HH:mm", {
          locale: ptBR,
        })}
      </span>

      <span>{licensePlate}</span>

      <div className="flex items-center gap-1">
        <Button
          className="flex items-center justify-center hover:bg-gray-100 p-0 w-8 h-8 rounded-md shadow-none"
          onClick={onEdit}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Editar lançamento"
        >
          <Pencil color="#111827" size={18} strokeWidth={2} />
        </Button>

        <Button
          className="flex items-center justify-center hover:bg-gray-100 p-0 w-8 h-8 rounded-md shadow-none"
          onClick={onRemove}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Remover lançamento"
        >
          <Trash2 color="#f87171" size={18} strokeWidth={2} />
        </Button>

        <Button
          className="flex items-center justify-center hover:bg-gray-100 p-0 w-8 h-8 rounded-lg shadow-none"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Cobrar"
          onClick={onCharge}
        >
          <DollarSign color="#16a34a" size={18} strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
};
