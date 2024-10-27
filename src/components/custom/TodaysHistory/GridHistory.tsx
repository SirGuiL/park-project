import { useState } from "react";

import { useTodaysHistory } from "@/hooks/useTodaysHistory";
import { GridHistoryItem } from ".";
import { ChargeModal } from "../ChargeModal";

export const GridHistory = () => {
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

  const filteredCars = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(search.toLowerCase()) ||
      car.brand.toLowerCase().includes(search.toLowerCase()) ||
      car.licensePlate.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-1 flex-wrap gap-4 p-4">
      {search.length > 0
        ? filteredCars.map((car) => (
            <GridHistoryItem
              key={car.id}
              name={car.name}
              licensePlate={car.licensePlate}
              brand={car.brand}
              created_at={car.created_at}
              onRemove={() => removeCar(car.id)}
              onEdit={() => {}}
              onCharge={() => openChargeModal(car.id)}
            />
          ))
        : cars.map((car) => (
            <GridHistoryItem
              key={car.id}
              name={car.name}
              licensePlate={car.licensePlate}
              brand={car.brand}
              created_at={car.created_at}
              onRemove={() => removeCar(car.id)}
              onEdit={() => {}}
              onCharge={() => openChargeModal(car.id)}
            />
          ))}

      <ChargeModal carId={carId} />
    </div>
  );
};
