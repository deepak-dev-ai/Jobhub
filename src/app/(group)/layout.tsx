"use client";
import HeaderPage from "@/components/header/header";
import { createContext, useEffect, useState } from "react";
import { company, user } from "../../../generated/prisma";
type UWC = user & { company: company };

export const UserContext = createContext<{
  user?: UWC | null;
  setUser?: (value: UWC) => void;
}>({});
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<UWC | null>(null);

  useEffect(() => {
    async function getUser() {
      const res = await fetch("/api/current-user");
      const data = await res.json();
      if (data.success) {
        setUser(data?.data);
      }
    }
    getUser();
  }, []);

  return (
    <div>
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <HeaderPage />
        {children}
      </UserContext.Provider>
    </div>
  );
}
