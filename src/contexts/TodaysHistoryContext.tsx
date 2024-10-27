import { car } from "@/DTOs/car";
import { ReactNode, createContext, useState } from "react";

export type TodaysHistoryContextProps = {
  cars: car[];
  totalParked: number;
  totalWash: number;
  search: string;
  setSearch: (search: string) => void;
  addCar: (car: car) => void;
  removeCar: (id: string) => void;
  getCarById: (id: string) => car | undefined;
};

type TodaysHistoryContextProviderProps = {
  children: ReactNode;
};

export const TodaysHistoryContext = createContext<TodaysHistoryContextProps>(
  {} as TodaysHistoryContextProps
);

export function TodaysHistoryContextProvider({
  children,
}: TodaysHistoryContextProviderProps) {
  const [cars, setCars] = useState<car[]>([]);
  const [search, setSearch] = useState("");

  const totalParked = cars.filter((car) => car.type === "parked").length;
  const totalWash = cars.filter((car) => car.type === "wash").length;

  const addCar = (car: car) => {
    setCars([...cars, car]);
  };

  const removeCar = (id: string) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  const getCarById = (id: string) => {
    return cars.find((car) => car.id === id);
  };

  return (
    <TodaysHistoryContext.Provider
      value={{
        cars,
        addCar,
        removeCar,
        getCarById,
        totalParked,
        totalWash,
        search,
        setSearch,
      }}
    >
      {children}
    </TodaysHistoryContext.Provider>
  );
}
