import { useState } from "react";
import { useTodaysHistory } from "@/hooks/useTodaysHistory";

import { ListHistoryItem } from ".";
import { ChargeModal } from "../ChargeModal";
import { unifiedCar } from "@/DTOs/car";

export const ListHistory = () => {
  const [carId, setCarId] = useState("");

  const { cars, removeCar, search } = useTodaysHistory();

  const openChargeModal = (id: string) => {
    const chargeButton = document.querySelector(
      "#charge-button"
    ) as HTMLButtonElement;

    if (chargeButton) {
      setCarId(id);
      chargeButton.click();
    }
  };

  const unifiedCars: unifiedCar[] = [];

  cars.map((car) => {
    const hasCarInArray = unifiedCars.find(
      (c) => c.licensePlate === car.licensePlate
    );

    if (!hasCarInArray) {
      unifiedCars.push({
        services: [
          {
            service: car.type,
            created_at: car.created_at,
          },
        ],
        ...car,
      });

      const index = unifiedCars.findIndex((c) => c.id === car.id);
      unifiedCars[index].services.sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });
      return;
    }

    hasCarInArray.services.push({
      service: car.type,
      created_at: car.created_at,
    });

    hasCarInArray.services.sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  });

  const filteredCars = unifiedCars.filter(
    (car) =>
      car.name.toLowerCase().includes(search.toLowerCase()) ||
      car.brand.toLowerCase().includes(search.toLowerCase()) ||
      car.licensePlate
        .replace(/-/g, "")
        .toLowerCase()
        .includes(search.toLowerCase().replace(/-/g, ""))
  );

  return (
    <div className="flex flex-col flex-1 gap-4 p-4 overflow-auto">
      {search.length > 0
        ? filteredCars.map((car) => (
            <ListHistoryItem
              key={car.id}
              name={car.name}
              licensePlate={car.licensePlate}
              brand={car.brand}
              created_at={car.created_at}
              type={car.type}
              services={car.services}
              onRemove={() => removeCar(car.id)}
              onEdit={() => {}}
              onCharge={() => openChargeModal(car.id)}
            />
          ))
        : unifiedCars.map((car) => (
            <ListHistoryItem
              key={car.id}
              name={car.name}
              licensePlate={car.licensePlate}
              brand={car.brand}
              created_at={car.created_at}
              type={car.type}
              services={car.services}
              onRemove={() => removeCar(car.id)}
              onEdit={() => {}}
              onCharge={() => openChargeModal(car.id)}
            />
          ))}

      <ChargeModal carId={carId} />
    </div>
  );
};
