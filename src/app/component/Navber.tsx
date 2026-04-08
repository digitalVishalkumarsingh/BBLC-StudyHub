"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  InformationCircleIcon,
  WrenchScrewdriverIcon,
  PhoneIcon,
  CreditCardIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  DocumentTextIcon,
  CurrencyRupeeIcon,
  ChevronDownIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "About", href: "/about", icon: InformationCircleIcon },
  { name: "Service", href: "/service", icon: WrenchScrewdriverIcon },
  { name: "Contact", href: "/contact", icon: PhoneIcon },
  { name: "Fees", href: "/unified-payment", icon: CreditCardIcon },
  { name: "Attendance", href: "/attendance", icon: CalendarDaysIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const [userImage, setUserImage] = useState("/avter.png");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const img = localStorage.getItem("Image");
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");

    setUserImage(
      img && (img.startsWith("http") || img.startsWith("/")) ? img : "/avter.png"
    );
    setUserName(name || "");
    setUserEmail(email || "");
    setHasMounted(true);

    // Handle scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    if (!localStorage.getItem("token")) {
      alert("User is not logged in");
    } else {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  if (!hasMounted) return null;

  return (
    <Disclosure 
      as="nav" 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg" 
          : "bg-white dark:bg-gray-900 shadow-sm"
      }`}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton 
                  className="inline-flex items-center justify-center rounded-xl p-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                  aria-label="Toggle menu"
                >
                  {open ? (
                    <XMarkIcon className="h-7 w-7" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-7 w-7" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Logo Section */}
              <div className="flex items-center w-full">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                    <Image
                      src="/heroimg/Untitled_design-removebg-preview (1).png"
                      alt="BBLC Library Logo"
                      width={scrolled ? 48 : 52}
                      height={scrolled ? 48 : 52}
                      className="relative object-contain transition-all duration-300"
                      priority
                    />
                  </div>
                  <div className="leading-tight">
                    <div className="flex items-center gap-1">
                      <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-lg sm:text-xl">
                        BBLC
                      </p>
                      <SparklesIcon className="h-4 w-4 text-yellow-500" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                      Baba Bamokhar Library Centre
                    </p>
                  </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden sm:flex justify-center flex-1 px-8">
                  <div className="flex items-center space-x-1 bg-gray-50 dark:bg-gray-800/50 rounded-full p-1">
                    {navigation.map((item) => {
                      const isActive =
                        item.href === "/"
                          ? pathname === "/"
                          : pathname === item.href || pathname.startsWith(item.href + "/");
                      const Icon = item.icon;
                      
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            isActive
                              ? "bg-white dark:bg-gray-700 shadow-md text-indigo-600 dark:text-indigo-400"
                              : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/50 dark:hover:bg-gray-700/50",
                            "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 group"
                          )}
                        >
                          <Icon className={classNames(
                            "h-4 w-4 transition-transform duration-200",
                            isActive ? "scale-110" : "group-hover:scale-110"
                          )} />
                          <span>{item.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* User Menu */}
                <div className="flex items-center ml-auto">
                  <Menu as="div" className="relative">
                    <MenuButton 
                      className="group flex items-center gap-3 rounded-2xl p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                      aria-label="User menu"
                      title={userName || "Guest"}
                    >
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-md">
                          <Image
                            src={userImage}
                            alt="User profile"
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {userName || "Welcome"}
                        </p>
                        <div className="flex items-center gap-1">
                          <div className={`h-1 w-1 rounded-full ${
                            userName ? "bg-green-500" : "bg-gray-400"
                          }`}></div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {userName ? "Student" : "Guest"}
                          </p>
                        </div>
                      </div>
                      <ChevronDownIcon className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    </MenuButton>

                    <MenuItems 
                      className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-2xl bg-white dark:bg-gray-800 p-2 shadow-xl ring-1 ring-black/5 focus:outline-none"
                    >
                      <div className="px-3 py-3 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {userName || "Welcome Guest"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {userEmail ? `${userEmail.split('@')[0]}@...` : "Sign in to access features"}
                        </p>
                      </div>

                      {!userName ? (
                        <div className="py-1">
                          <MenuItem>
                            {({ focus }) => (
                              <a
                                href="/register"
                                className={classNames(
                                  focus ? "bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400" : "text-gray-700 dark:text-gray-200",
                                  "group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                                )}
                              >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                                  <UserCircleIcon className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <p>Create Account</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Join BBLC community</p>
                                </div>
                              </a>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <a
                                href="/login"
                                className={classNames(
                                  focus ? "bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400" : "text-gray-700 dark:text-gray-200",
                                  "group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                                )}
                              >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                                  <ArrowRightOnRectangleIcon className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <p>Sign In</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Access your account</p>
                                </div>
                              </a>
                            )}
                          </MenuItem>
                        </div>
                      ) : (
                        <div className="py-1">
                          <MenuItem>
                            {({ focus }) => (
                              <a
                                href="/profile"
                                className={classNames(
                                  focus ? "bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400" : "text-gray-700 dark:text-gray-200",
                                  "group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                                )}
                              >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                                  <UserCircleIcon className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <p>Your Profile</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">View & edit profile</p>
                                </div>
                              </a>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <a
                                href="/history"
                                className={classNames(
                                  focus ? "bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400" : "text-gray-700 dark:text-gray-200",
                                  "group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                                )}
                              >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                                  <DocumentTextIcon className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <p>Registration History</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">View all registrations</p>
                                </div>
                              </a>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <a
                                href="/monthly-history"
                                className={classNames(
                                  focus ? "bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400" : "text-gray-700 dark:text-gray-200",
                                  "group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                                )}
                              >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                                  <CurrencyRupeeIcon className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <p>Fee History</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Payment records</p>
                                </div>
                              </a>
                            )}
                          </MenuItem>
                          <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                          <MenuItem>
                            {({ focus }) => (
                              <button
                                onClick={handleSignOut}
                                className={classNames(
                                  focus ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-200",
                                  "group flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                                )}
                              >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                                  <ArrowRightOnRectangleIcon className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <p>Sign Out</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Logout from account</p>
                                </div>
                              </button>
                            )}
                          </MenuItem>
                        </div>
                      )}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <DisclosurePanel className="sm:hidden overflow-hidden">
            <div className="space-y-1 px-2 pb-4 pt-2 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              {navigation.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(item.href + "/");
                const Icon = item.icon;
                
                return (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      isActive
                        ? "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 border-l-4 border-indigo-500"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400",
                      "flex items-center gap-3 rounded-r-lg px-4 py-3 text-base font-medium transition-all duration-200"
                    )}
                  >
                    <Icon className={classNames(
                      "h-5 w-5",
                      isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400"
                    )} />
                    <span>{item.name}</span>
                    {isActive && (
                      <div className="ml-auto h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
                    )}
                  </DisclosureButton>
                );
              })}
              
              {/* Mobile User Actions */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                {!userName ? (
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="/register"
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center px-4 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
                    >
                      Sign Up
                    </a>
                    <a
                      href="/login"
                      className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white text-center px-4 py-3 rounded-xl font-medium hover:from-gray-900 hover:to-black transition-all duration-200 transform hover:scale-105"
                    >
                      Sign In
                    </a>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400 px-3">Logged in as <span className="font-semibold text-indigo-600 dark:text-indigo-400">{userName}</span></p>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-3 rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}