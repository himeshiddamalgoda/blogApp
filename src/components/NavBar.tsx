import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav
      className={`bg-cyan-50 dark:bg-gray-950 py-4 px-6 w-full flex justify-between items-center fixed top-0 z-40 shadow-sm`}
    >
      <Link href="/">
        <Image
          src="/logoblog.png"
          alt="Logo"
          width={50}
          height={50}
          className="dark:invert"
        />
      </Link>
      <Link
        href="/"
        className="text-gray-800 dark:text-white text-xl font-bold"
      >
        My Blog
      </Link>
      <div className="flex items-center">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full shadow-inner dark:bg-gray-700"></div>
          <div
            className={`absolute w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${
              darkMode ? "translate-x-5" : "translate-x-0"
            }`}
          ></div>
        </label>
        <span className="ml-3 text-gray-800 dark:text-white">
          {darkMode ? <FaMoon /> : <FaSun />}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
