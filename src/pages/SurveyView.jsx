import Modal from "../components/Modal.jsx";
import { Button } from "@headlessui/react";
import InputLabel from "../components/InputLavel.jsx";
import TextInput from "../components/TextInput.jsx";

export default function SurveyView({ close, isOpen }) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        close={close}
        className="max-w-3xl"
        title="Payment successful"
      >
        <from action="" method="POST" className="space-y-6">
          <div className="mt-2">
            <InputLabel htmlFor="name" value="Name" className= "" />
            <TextInput id="name" type="text" className="mt-1 block w-full" />
          </div>
        </from>
      </Modal>
    </>
  );
}
