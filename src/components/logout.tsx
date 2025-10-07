"use client";
import { useRouter } from "next/navigation";
export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "DELETE" });
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-600 hover:text-red-800 cursor-pointer"
    >
      Logout
    </button>
  );
}
