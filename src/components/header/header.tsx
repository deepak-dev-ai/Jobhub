import { Briefcase, Building, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ModeToggle } from "../ui/mode-toggle";
import SearchInput from "./search-input";
import { DropdownMenuDemo } from "./user-dropdown";
import { Button } from "../ui/button";
import { GradientText } from "../animate-ui/text/gradient";

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
            <GradientText text="JobHub" />
          </h1>
        </div>
      </Link>
      <Link href={"/job"} className="hidden md:block">
        <Button variant={"ghost"} className="cursor-pointer px-4">
          <Briefcase className="mr-2" />
          Jobs
        </Button>
      </Link>
      <Link href={"/company"} className="hidden md:block">
        <Button variant={"ghost"} className="cursor-pointer px-4">
          <Building className="mr-2" />
          Companies
        </Button>
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
        <div className="md:hidden flex justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu size={30} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href={"/company"}>Companies</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/job"}>Jobs</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
