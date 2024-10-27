import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Tooltip } from "react-tooltip";
import { Button } from "@/components/ui/button";
import { ChevronDown, DollarSign, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { serviceType } from "@/DTOs/car";

interface Props {
  name: string;
  created_at: Date;
  licensePlate: string;
  brand: string;
  type: "parked" | "wash";
  services: serviceType[];
  onRemove: () => void;
  onEdit: () => void;
  onCharge: () => void;
}

export const ListHistoryItem = ({
  name,
  brand,
  created_at,
  licensePlate,
  type,
  services,
  onRemove,
  onEdit,
  onCharge,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatedType = (service?: string) => {
    if (service) {
      switch (service) {
        case "parked":
          return "Estacionado";
        case "wash":
          return "Lavagem";
      }
      return;
    }

    switch (type) {
      case "parked":
        return "Estacionado";
      case "wash":
        return "Lavagem";
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 p-2 items-center shadow-md rounded-md justify-between">
        <div className="flex flex-col flex-1">
          <span>
            {(
              name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
            ).replace("gti", "GTI")}
          </span>
          <span>
            {brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase()}
          </span>
        </div>

        <span>
          {services.length > 1 ? `${services.length} serviços` : formatedType()}
        </span>

        <span>
          {format(new Date(created_at), "HH:mm", {
            locale: ptBR,
          })}
        </span>

        <span>{licensePlate}</span>

        <div className="flex items-center gap-1">
          {type == "parked" ? (
            <Button
              className="flex items-center justify-center hover:bg-gray-100 p-0 w-8 h-8 rounded-lg shadow-none"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Cobrar"
              onClick={onCharge}
            >
              <DollarSign color="#16a34a" size={18} strokeWidth={2} />
            </Button>
          ) : (
            <Button className="flex items-center justify-center hover:bg-gray-100 p-0 w-8 h-8 rounded-lg shadow-none opacity-0 cursor-default">
              <DollarSign color="#16a34a" size={18} strokeWidth={2} />
            </Button>
          )}

          <Button
            className="flex items-center justify-center hover:bg-gray-100 p-0 w-8 h-8 rounded-lg shadow-none"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Editar lançamento"
            onClick={onEdit}
          >
            <Pencil color="#111827" size={18} strokeWidth={2} />
          </Button>

          <Button
            className="flex items-center justify-center hover:bg-gray-100 p-0 w-8 h-8 rounded-lg shadow-none"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Remover lançamento"
            onClick={onRemove}
          >
            <Trash2 color="#f87171" size={18} strokeWidth={2} />
          </Button>
        </div>

        {services.length > 1 && (
          <Button
            className="flex items-center justify-center hover:bg-gray-100 p-0 w-8 h-8 rounded-lg shadow-none"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Expandir serviços"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <ChevronDown
              color="#111827"
              size={18}
              strokeWidth={2}
              className={`transition-all duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </Button>
        )}

        <Tooltip id="my-tooltip" />
      </div>

      {isExpanded && (
        <div>
          {services.map((service, index) => (
            <div
              key={index}
              className="flex gap-4 p-2 items-center shadow-md rounded-md justify-between ml-4"
            >
              <span>{formatedType(service.service)}</span>

              <span>
                {format(service.created_at, "HH:mm", { locale: ptBR })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
