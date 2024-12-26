import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CircleDollarSign } from "lucide-react";

const Navbar = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-10 shadow-md">
      <nav className="m-auto flex items-center justify-between px-10 py-6">
        <Button
          asChild
          type="button"
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
        >
          <Link href="/">Bot</Link>
        </Button>

        <Button asChild className="group h-9 font-bold">
          <Link href="/">
            <span>Token: </span>
            <CircleDollarSign className="h-6 w-6 text-yellow-500" />
          </Link>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
