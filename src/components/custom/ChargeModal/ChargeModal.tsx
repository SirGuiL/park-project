import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useTodaysHistory } from "@/hooks/useTodaysHistory";
import { Banknote, CreditCard } from "lucide-react";
import Pix from "../icons/pix.svg";
import { usePreferences } from "@/hooks/usePreferences";
import {
  calculateTotalPrice,
  formatPriceToBRL,
  getAdditionByMethod,
} from "@/lib/utils";
import { car } from "@/DTOs/car";
import { useState } from "react";
import { PixModal } from "../PixModal";

interface Props {
  carId: string;
}

export const ChargeModal = ({ carId }: Props) => {
  const [method, setMethod] = useState("pix");
  const [, setRefresh] = useState(0);

  const { getCarById } = useTodaysHistory();
  const { hourPrice, tax } = usePreferences();
  const { creditRate, debitRate, moneyRate, pixRate } = tax;

  const car = getCarById(carId) as car;

  const addition = getAdditionByMethod(method, {
    creditRate,
    debitRate,
    moneyRate,
    pixRate,
  });

  const totalPrice = calculateTotalPrice({
    addition,
    created_at: car ? car.created_at : new Date(),
    price: hourPrice,
  });

  const forceUpdate = () => {
    setMethod("pix");
    setRefresh((prev) => prev + 1);
  };

  const handleCharge = () => {
    if (method == "pix") {
      handleOpenPixModal();
    }

    if (method == "credit") {
      // send to card machine
    }

    if (method == "debit") {
      // send to card machine
    }

    // money method
  };

  const handleOpenPixModal = () => {
    const button = document.getElementById("pix-button");

    if (button) {
      button.click();
    }
  };

  return (
    <Dialog onOpenChange={() => forceUpdate()}>
      <DialogTrigger asChild>
        <Button className="hidden" id="charge-button"></Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-white flex flex-col gap-10 sm:rounded-xl">
        <DialogHeader>
          <DialogTitle>{`Cobrar ${car ? car.name : ""}`}</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="plate">Método de pagamento</Label>

            <Select value={method} onValueChange={(e) => setMethod(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o método de pagamento" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem className="cursor-pointer" value="credit">
                    <div className="flex items-center gap-2">
                      <div className="w-5">
                        <CreditCard size={20} />
                      </div>
                      Cartão de crédito
                    </div>
                  </SelectItem>

                  <SelectItem className="cursor-pointer" value="debit">
                    <div className="flex items-center gap-2">
                      <div className="w-5">
                        <CreditCard size={20} />
                      </div>
                      Cartão de débito
                    </div>
                  </SelectItem>

                  <SelectItem className="cursor-pointer" value="money">
                    <div className="flex items-center gap-2">
                      <div className="w-5">
                        <Banknote size={20} />
                      </div>
                      Dinheiro
                    </div>
                  </SelectItem>

                  <SelectItem className="cursor-pointer" value="pix">
                    <div className="flex items-center gap-2">
                      <div className="w-5">
                        <img src={Pix} alt="Pix" className="w-4 h-4" />
                      </div>
                      Pix
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label>Total</Label>
            <Input disabled value={formatPriceToBRL(totalPrice.total)} />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label>Acréscimo</Label>
            <Input disabled value={formatPriceToBRL(totalPrice.addition)} />
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
            className="bg-green-600 hover:bg-green-700 text-gray-200 rounded-full flex gap-1 items-center"
            type="submit"
            onClick={handleCharge}
          >
            Cobrar
          </Button>
        </DialogFooter>
      </DialogContent>

      <PixModal />
    </Dialog>
  );
};
