import { useState } from "react";
import axiosClient from "../axios.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function SignUp() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const { setCurrentUser, setUserToken } = useStateContext();

  const [errors, setErrors] = useState({}); // To store validation errors
  const [successMessage, setSuccessMessage] = useState(""); // To show success feedback

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors before submission
    setSuccessMessage(""); // Reset success message

    axiosClient
      .post("/signup", data)
      .then(({ data }) => {
        // Save the token to localStorage
        if (data.token) {
          localStorage.setItem("auth_token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("user");
        }

        // Display a success message
        setSuccessMessage("Account created successfully! Token saved.");
        console.log("Token:", data.token);
        console.log("User:", data.user);
        setCurrentUser(data.user);
        setUserToken(data.token);

        // Optionally redirect the user
        // window.location.href = '/dashboard'; // Example
      })
      .catch(({ response }) => {
        if (response && response.data && response.data.errors) {
          setErrors(response.data.errors); // Capture validation errors
        } else {
          console.error("Signup Error:", response);
        }
      });
  };

  // set time for error message
  setTimeout(() => {
    setSuccessMessage("");
  }, 10000);

  return (
    <>
      <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center py-12 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold">Create an Account</h2>

        {successMessage && (
          <div className="mb-4 rounded bg-green-100 p-3 text-green-700">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={data.name}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name[0]}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email[0]}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password[0]}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              value={data.password_confirmation}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.password_confirmation && (
              <p className="text-sm text-red-500">
                {errors.password_confirmation[0]}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
