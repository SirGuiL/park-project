import { useState } from "react";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";

import { Plus } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";

import { formatCarPlate, isValidCarPlate } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";

import { useTodaysHistory } from "@/hooks/useTodaysHistory";

type serviceType = "wash" | "parked" | "";

export function RegisterCarDrawer() {
  const [carName, setCarName] = useState("");
  const [carPlate, setCarPlate] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [type, setType] = useState<serviceType>("");

  const { addCar } = useTodaysHistory();

  const handleAddNewCar = () => {
    if (!isValidCarPlate(carPlate)) {
      return;
    }

    if (!type) {
      return;
    }

    addCar({
      id: uuid(),
      brand: carBrand,
      created_at: new Date(),
      licensePlate: carPlate,
      name: carName,
      type: type,
    });

    toast.success("Carro registrado com sucesso", {
      position: "bottom-right",
      duration: 3000,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    closeModal();
  };

  const closeModal = () => {
    const cancelButton = document.querySelector(
      "#cancel-btn"
    ) as HTMLButtonElement;

    cancelButton.click();
  };

  const clearForm = () => {
    setCarName("");
    setCarPlate("");
    setCarBrand("");
  };

  return (
    <Dialog onOpenChange={() => clearForm()}>
      <DialogTrigger asChild>
        <Button className="bg-sky-800 hover:bg-sky-900 text-gray-200 rounded-full flex gap-1 items-center">
          <Plus color="#e5e7eb" size={18} strokeWidth={2} />

          <span>Lançar carro</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-white flex flex-col gap-10 sm:rounded-xl">
        <DialogHeader>
          <DialogTitle>Lançar carro</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="plate">Placa</Label>
            <Input
              id="plate"
              placeholder="Digite a placa do carro aqui"
              onInput={(e) =>
                (e.currentTarget.value = formatCarPlate(e.currentTarget.value))
              }
              value={carPlate}
              onChange={(e) => setCarPlate(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="plate">Nome do carro</Label>
            <Input
              id="car-name"
              placeholder="Digite o nome do carro aqui"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="plate">Marca do carro</Label>

            <Select onValueChange={(e) => setCarBrand(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a marca" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem className="cursor-pointer" value="alfa-romeo">
                    Alfa Romeo
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="audi">
                    Audi
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="bmw">
                    BMW
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="cadillac">
                    Cadillac
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="chevrolet">
                    Chevrolet
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="fiat">
                    Fiat
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="ford">
                    Ford
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="fyber">
                    Fyber
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="honda">
                    Honda
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="hyundai">
                    Hyundai
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="peugeot">
                    Peugeot
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="renault">
                    Renault
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="toyota">
                    Toyota
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="volkswagem">
                    Volkswagem
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="plate">Tipo de lançamento</Label>

            <Select onValueChange={(e) => setType(e as serviceType)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem className="cursor-pointer" value="parked">
                    Estacionado
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="wash">
                    Lavagem
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="text-gray-900 hover:bg-gray-200 rounded-full flex gap-1 items-center"
              type="submit"
              id="cancel-btn"
            >
              Cancelar
            </Button>
          </DialogClose>

          <Button
            className="bg-sky-800 hover:bg-sky-900 text-gray-200 rounded-full flex gap-1 items-center"
            type="submit"
            onClick={() => handleAddNewCar()}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>

      <Toaster />
    </Dialog>
  );
}
