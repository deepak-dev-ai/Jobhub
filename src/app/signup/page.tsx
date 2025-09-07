"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Signup successfully");
        router.push("/");
      } else {
        setError("Signup failed — this account already exists");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  }

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className="w-full max-w-md p-8 shadow-xl rounded-2xl bg-white">
        <h1 className="text-center font-extrabold text-3xl text-gray-800">
          Create an Account
        </h1>
        <p className="text-center text-gray-500 mt-2 text-sm">
          Join us today and start your journey
        </p>

        <form onSubmit={handleSignup} className="flex flex-col gap-5 mt-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            className="border text-black border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
            className="border text-black border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer py-3 rounded-lg font-semibold shadow-md transition-all hover:scale-[1.02]"
          >
            Sign Up
          </button>
          <div className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href={"/login"} className="text-blue-500 hover:underline">
              Login
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
