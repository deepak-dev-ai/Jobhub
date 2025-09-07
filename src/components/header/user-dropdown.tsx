"use client";
import { CircleUserRound } from "lucide-react";
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
        <CircleUserRound size={35} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuGroup>
          {user && !user?.company && (
            <DropdownMenuItem>
              <Link href={"/add-company"}>Add Your Company</Link>
            </DropdownMenuItem>
          )}
          {user?.company && (
            <DropdownMenuItem>
              <Link href={`/company/${user.company.id}`}>
                View Your Company
              </Link>
            </DropdownMenuItem>
          )}
          {user?.company && (
            <DropdownMenuItem>
              <Link href={"/add-job"}>Add New Job</Link>
            </DropdownMenuItem>
          )}
          {user && (
            <DropdownMenuItem>
              <Link href={"/applied-job"}>Your Job Applications</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
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
