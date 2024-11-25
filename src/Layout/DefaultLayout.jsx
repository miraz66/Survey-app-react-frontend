import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Surveys", href: "/surveys" },
  { name: "Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
];

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
];

export default function DefaultLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const { currentUser, userToken, surveys } = useStateContext();

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="bg-white">
      <header className="fixed inset-x-0 top-0 z-50 mx-auto mt-2 max-w-7xl rounded-full bg-white shadow">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-2.5 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  isActive
                    ? "text-sm/6 font-semibold text-indigo-600" // Active link style
                    : "text-sm/6 font-semibold text-gray-900"
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          {login ? (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <NavLink to="#" className="text-sm/6 font-semibold text-gray-900">
                Log in <span aria-hidden="true">&rarr;</span>
              </NavLink>
            </div>
          ) : (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon
                      className="h-8 w-8 text-gray-900"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {userNavigation.map(({ name, href }) => (
                    <MenuItem key={name}>
                      <Link
                        to={href}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        {name}
                      </Link>
                    </MenuItem>
                  ))}
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          )}
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        isActive
                          ? "-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-indigo-600 hover:bg-gray-50"
                          : "-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                {login ? (
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="border-t border-gray-700 pb-3 pt-4">
                      <div className="mt-3 space-y-1">
                        {userNavigation.map(({ name, href }) => (
                          <NavLink
                            key={name}
                            to={href}
                            className={({ isActive }) =>
                              isActive
                                ? "-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-indigo-600 hover:bg-gray-50"
                                : "-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                            }
                          >
                            {name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <Outlet />
    </div>
  );
}
