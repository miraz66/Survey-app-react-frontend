import { UseStateContext } from "../context/ContextProvider.jsx";
import SurveyListItem from "../components/SurveyListItem.jsx";
import TButton from "../components/core/TButton.jsx";
import { PlusCircleIcon } from "@heroicons/react/24/solid/index.js";
import { useState } from "react";
import Create from "./Create.jsx";

export default function Surveys() {
  const { surveys } = UseStateContext();
  let [isOpen, setIsOpen] = useState(false);

  const onDeleteClick = () => {
    console.log("clicked");
  };

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="mt-20 py-4">
        <div className="fixed bottom-10 right-0 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end">
            <TButton
              className="h-12 px-4 text-base font-semibold"
              color="green"
              onClick={!isOpen ? open : close}
            >
              <PlusCircleIcon className="mr-2 h-6 w-6" />
              New Survey
            </TButton>
          </div>
        </div>
      </div>

      <div className="grid min-h-screen grid-cols-1 gap-5 px-4 sm:grid-cols-2 md:grid-cols-3">
        {surveys.map((survey) => (
          <SurveyListItem
            key={survey.id}
            survey={survey}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>

      <Create isOpen={isOpen} close={close} __demoMode />
    </>
  );
}
