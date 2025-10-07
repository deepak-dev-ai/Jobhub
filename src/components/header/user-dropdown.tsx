"use client";
import { FaUser } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/app/(group)/layout";
import LogoutButton from "../logout";

export function DropdownMenuDemo() {
  const { user } = useContext(UserContext);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <FaUser
          size={24}
          color={user ? "green" : "red"}
          className="cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user && !user?.company && (
            <DropdownMenuItem>
              <Link href={"/add-company"}>Add Company</Link>
            </DropdownMenuItem>
          )}
          {user?.company && (
            <DropdownMenuItem>
              <Link href={`/company/${user.company.id}`}>View Company</Link>
            </DropdownMenuItem>
          )}
          {user?.company && (
            <DropdownMenuItem>
              <Link href={"/add-job"}>Add Job</Link>
            </DropdownMenuItem>
          )}
          {user && (
            <DropdownMenuItem>
              <Link href={"/applied-job"}>Applied jobs</Link>
            </DropdownMenuItem>
          )}
          {user && (
            <DropdownMenuItem>
              <Link href={"/saved-jobs"}>Saved jobs</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        {!user && (
          <DropdownMenuItem>
            <Link href={"/login"}>Log in</Link>
          </DropdownMenuItem>
        )}
        {user && (
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
