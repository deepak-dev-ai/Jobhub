"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Logged in");
        router.push("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  }

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-indigo-50 to-indigo-100">
      <Card className="w-full max-w-md p-8 shadow-xl rounded-2xl bg-white">
        <h1 className="text-center font-extrabold text-3xl text-gray-800">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mt-2 text-sm">
          Please log in to continue
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5 mt-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            className="border text-black border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
            className="border text-black border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 cursor-pointer rounded-lg font-semibold shadow-md transition-all hover:scale-[1.02]"
          >
            Log In
          </button>

          <div className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-indigo-500 hover:underline">
              Register
            </Link>
          </div>
        </form>

        {error && (
          <p className="text-red-600 text-center mt-4 text-sm">{error}</p>
        )}
      </Card>
    </main>
  );
}
