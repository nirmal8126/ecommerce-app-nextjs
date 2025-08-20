"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const router = useRouter();

  const { data: session, status } = useSession();

  // 🔒 Redirect logged-in users away from signup page
  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user.role === "MERCHANT") {
        router.replace("/dashboard/merchant");
      } else {
        router.replace("/dashboard/user");
      }
    }
  }, [status, session, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (res.ok) {
      toast.success("Account created successfully! Please login.");
      router.push("/auth/login");
    } else {
      const data = await res.json();
      toast.error(data.error || "Signup failed");
    }
  };

  if (status === "loading") {
    return <p className="flex h-screen items-center justify-center">Loading...</p>;
  }

  if (status === "authenticated") return null; // prevent form flash

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-md border p-2"
              >
                <option value="USER">User</option>
                <option value="MERCHANT">Merchant</option>
              </select>
            </div>
            <Button type="submit" className="w-full cursor-pointer">
              Sign Up
            </Button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
