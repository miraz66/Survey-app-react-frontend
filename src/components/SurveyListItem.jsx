import {
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import TButton from "./core/TButton.jsx";
import { PropTypes } from "prop-types";
import Edit from "../pages/Edit.jsx";
import { useState } from "react";
// import core from "./core/core";

export default function SurveyListItem({
  survey,
  onDeleteClick,
  close,
  isOpen,
  setIsOpen,
}) {
  // let [isOpen, setIsOpen] = useState(false);
  //
  // function open() {
  //   setIsOpen(true);
  // }
  //
  // function close() {
  //   setIsOpen(false);
  // }

  return (
    <div className="flex h-[470px] flex-col bg-white px-6 py-4 shadow-md hover:bg-gray-50">
      <img
        src={survey.image_url}
        alt={survey.title}
        className="h-48 w-full object-cover"
      />
      <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
      <div
        dangerouslySetInnerHTML={{ __html: survey.description }}
        className="flex-1 overflow-hidden"
      ></div>

      <div className="mt-3 flex items-center justify-between">
        <TButton onClick={() => setIsOpen(true)}>
          <PencilIcon className="mr-2 h-5 w-5" />
          Edit
        </TButton>
        <div className="flex items-center">
          <TButton href={`/view/survey/${survey.slug}`} circle link>
            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
          </TButton>

          {/*{survey.id && (*/}
          {/*  <core*/}
          {/*    onClick={(ev) => onDeleteClick(survey.id)}*/}
          {/*    circle*/}
          {/*    link*/}
          {/*    color="red"*/}
          {/*  >*/}
          {/*    <TrashIcon className="h-5 w-5" />*/}
          {/*  </core>*/}
          {/*)}*/}

          {survey.id && (
            <TButton onClick={onDeleteClick} circle color="red">
              <TrashIcon className="h-5 w-5" />
            </TButton>
          )}
        </div>
      </div>

      <Edit isOpen={isOpen} close={close} />
    </div>
  );
}

SurveyListItem.propTypes = {
  survey: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
