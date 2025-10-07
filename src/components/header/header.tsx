import { Briefcase, Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import SearchInput from "./search-input";
import { DropdownMenuDemo } from "./user-dropdown";

export default function HeaderPage() {
  return (
    <header className="flex justify-between h-20 w-screen px-4 items-center">
      <Link href={"/"}>
        <div className="flex gap-1 justify-center items-center">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={40}
            height={0}
            className="rounded-[50%]"
          />
          <h1 className="text-4xl font-bold font-sans hidden md:block ">
            JobHub
          </h1>
        </div>
      </Link>
      <div className="flex justify-center items-center gap-2">
        <div>
          <SearchInput />
        </div>
        <div>
          <ModeToggle />
        </div>
        <div>
          <DropdownMenuDemo />
        </div>
      </div>
    </header>
  );
}
