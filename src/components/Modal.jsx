import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import clsx from "clsx";

export default function Modal({ close, isOpen, children, title, className }) {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative bg-gray-500 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className={clsx(
                "data-[closed]:transform-[scale(95%)] w-full rounded-xl bg-gray-200 p-6 backdrop-blur-md backdrop-filter duration-300 ease-out data-[closed]:opacity-0",
                className ? className : "max-w-md",
              )}
              __demoMode
            >
              <DialogTitle
                as="h3"
                className="text-center text-2xl font-medium text-gray-900"
              >
                {title}
              </DialogTitle>
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
