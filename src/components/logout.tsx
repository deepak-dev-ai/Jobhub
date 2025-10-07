"use client";
import { useRouter } from "next/navigation";
export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "DELETE" });
    router.push("/");
  };

  return (
    <button onClick={handleLogout} className="text-red-500">
      Logout
    </button>
  );
}
