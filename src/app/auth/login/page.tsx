"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  // 🔒 Redirect logged-in users away from login page
  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user.role === "MERCHANT") {
        router.replace("/dashboard/merchant");
      } else {
        router.replace("/dashboard/user");
      }
    }
  }, [status, session, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Welcome back!");
      // Redirect based on role
      if (session?.user.role === "MERCHANT") {
        router.push("/dashboard/merchant");
      } else {
        router.push("/dashboard/user");
      }
    }
  };

  if (status === "loading") {
    return <p className="flex h-screen items-center justify-center">Loading...</p>;
  }

  if (status === "authenticated") return null; // avoid showing form

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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
            <Button type="submit" className="w-full cursor-pointer">
              Login
            </Button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="/auth/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
