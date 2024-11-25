import { useState } from "react";
import axiosClient from "../axios.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { setCurrentUser, setUserToken } = useStateContext();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    axiosClient
      .post("/login", data)
      .then(({ data }) => {
        // Save the token to localStorage
        if (data.token) {
          localStorage.setItem("auth_token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("user");
        }

        setCurrentUser(data.user);
        setUserToken(data.token);

        // Display a success message
        console.log("Token:", data.token);
        console.log("User:", data.user);
      })
      .catch(({ response }) => {
        if (response && response.data && response.data.errors) {
          console.log(response.data.errors);
        }
      });
  };

  return (
    <>
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
        <form
          onSubmit={handleSubmit}
          action="#"
          method="POST"
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="float-left block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={handleChange}
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Have a no account?
          <a
            href="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {" "}
            Sign up
          </a>
        </p>
      </div>
    </>
  );
}
