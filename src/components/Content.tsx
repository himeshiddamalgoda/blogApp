import React, { ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <main className="flex-grow flex items-center justify-center mt-16 dark:bg-slate-950 bg-cyan-50">
      {children}
    </main>
  );
};

export default Content;
