import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="border-b">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter sm:text-2xl"
        >
          Snap2Code
        </Link>
        <Button asChild className="group h-8 font-bold">
          <Link href="/dashboard">
            <span>Get Started</span>
            <ArrowRight
              className="ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
              size={18}
            />
          </Link>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
