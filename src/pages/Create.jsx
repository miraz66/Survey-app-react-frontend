import Modal from "../components/Modal.jsx";
import { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import axiosClient from "../axios.js";

export default function Create({ close, isOpen }) {
  const [data, setData] = useState({
    title: "",
    slug: "",
    status: false,
    description: "",
    image: null,
    image_url: null,
    expires_date: "",
    questions: [],
  });

  // set image url
  const handleImage = (e) => {
    const file = e.target.files[0];
    const render = new FileReader();

    render.onload = () => {
      setData({
        ...data,
        image: URL.createObjectURL(e.target.files[0]),
        image_url: render.result,
      });
    };

    render.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const pyload = { ...data };
    // if (pyload.image_url) {
    //   pyload.image = pyload.image_url;
    // }
    // delete pyload.image_url;

    axiosClient.post("/survey", data).then(({ res }) => {
      console.log(res);
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        close={close}
        className="max-w-2xl"
        title="Create Survey"
      >
        <form onSubmit={handleSubmit} method="POST">
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {!data.image ? (
                    <UserCircleIcon
                      aria-hidden="true"
                      className="h-12 w-12 text-gray-300"
                    />
                  ) : (
                    <img
                      src={data.image}
                      className="h-12 w-12 rounded-full object-cover"
                      alt="photo"
                    />
                  )}
                  <input
                    onChange={(e) => handleImage(e)}
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    value={data.title}
                    onChange={(e) => {
                      setData({ ...data, title: e.target.value });
                    }}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={data.description}
                    onChange={(e) => {
                      setData({ ...data, description: e.target.value });
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Write a few sentences description for your survey.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="expires_date"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  ExpireDate
                </label>
                <div className="mt-2">
                  <input
                    id="expires_date"
                    name="expires_date"
                    type="date"
                    value={data.expires_date}
                    onChange={(e) => {
                      setData({ ...data, expires_date: e.target.value });
                    }}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="relative col-span-full flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="comments"
                    name="comments"
                    type="checkbox"
                    checked={data.status}
                    onChange={(e) => {
                      setData({ ...data, status: e.target.checked });
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm/6">
                  <label
                    htmlFor="comments"
                    className="font-medium text-gray-900"
                  >
                    Active
                  </label>
                  <p className="text-gray-500">
                    Whether to make survey publicly available.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm/6 font-semibold text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
