import React from "react";
import Navbar from "@/components/navbar";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
};

export default PageLayout;
