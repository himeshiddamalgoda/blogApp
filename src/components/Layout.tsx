import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Content from "./Content";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
};

export default Layout;
