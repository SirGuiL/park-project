import { ReactNode, createContext, useState } from "react";

export type taxProps = {
  debitRate: number;
  creditRate: number;
  moneyRate: number;
  pixRate: number;
};

type taxKey = "debitRate" | "creditRate" | "moneyRate" | "pixRate";

export type PreferencesContextProps = {
  numberOfVacancies: number;
  setNumberOfVacancies: (numberOfVacancies: number) => void;
  hourPrice: number;
  setHourPrice: (hourPrice: number) => void;
  tax: taxProps;
  setTaxByMethod: (method: taxKey, newTax: number) => void;
};

type PreferencesContextProviderProps = {
  children: ReactNode;
};

export const PreferencesContext = createContext<PreferencesContextProps>(
  {} as PreferencesContextProps
);

export function PreferencesContextProvider({
  children,
}: PreferencesContextProviderProps) {
  const [numberOfVacancies, setNumberOfVacancies] = useState(50);
  const [hourPrice, setHourPrice] = useState(10);
  const [tax, setTax] = useState<taxProps>({
    debitRate: 0.01,
    creditRate: 0.02,
    moneyRate: 0,
    pixRate: 0,
  });

  function setTaxByMethod(method: taxKey, newTax: number) {
    const taxToAdd = {
      ...tax,
    };

    taxToAdd[method] = newTax;

    setTax(taxToAdd);
  }

  return (
    <PreferencesContext.Provider
      value={{
        numberOfVacancies,
        setNumberOfVacancies,
        hourPrice,
        setHourPrice,
        tax,
        setTaxByMethod,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
