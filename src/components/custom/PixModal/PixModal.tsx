import QRCode from "react-qr-code";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const PixModal = () => {
  const handleFinishedPayment = () => {
    document.getElementById("pix-cancel-btn")?.click();

    // finish payment and change status of daily history
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hidden" id="pix-button"></Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-white flex flex-col gap-10 sm:rounded-xl">
        <DialogHeader>
          <DialogTitle>Cobrar Pix</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center p-2">
          <QRCode value="hey" />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="text-gray-900 hover:bg-gray-200 rounded-full flex gap-1 items-center"
              type="submit"
              id="pix-cancel-btn"
            >
              Cancelar
            </Button>
          </DialogClose>

          <Button
            className="bg-sky-700 hover:bg-sky-800 text-gray-200 rounded-full flex gap-1 items-center"
            type="submit"
            onClick={handleFinishedPayment}
          >
            Finalizar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
