import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-cyan-50   
 dark:bg-slate-950 py-8 flex flex-col justify-center items-center"
    >
      <Link href="/">
        <Image
          src="/logoblog.png"
          alt="Logo"
          width={90}
          height={90}
          className="dark:invert"
        />
      </Link>
      <p className="mt-4 text-xs lg:text-sm leading-none text-gray-900 dark:text-gray-50">
        &copy; {new Date().getFullYear()} My Blog. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
