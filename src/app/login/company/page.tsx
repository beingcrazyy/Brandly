"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBrandStore } from "@/lib/store";
import { BrandlyMark } from "@/components/BrandlyMark";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { ArrowLeft } from "lucide-react";

export default function CompanyLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const login = useBrandStore((s) => s.login);
  const authUser = useBrandStore((s) => s.authUser);
  const router = useRouter();

  useEffect(() => {
    if (authUser) {
      router.replace(authUser.role === "agency" ? "/dashboard" : "/portal");
    }
  }, [authUser, router]);

  if (authUser) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = login(email, password);
    if (ok) {
      const role = useBrandStore.getState().authUser?.role;
      router.replace(role === "agency" ? "/dashboard" : "/portal");
    } else {
      setError(true);
      setPassword("");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F5F0] px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex items-center gap-2">
          <BrandlyMark size={26} />
          <span className="font-serif text-[18px] font-medium tracking-tight text-[#14140F]">
            brandly.
          </span>
        </div>

        <Link
          href="/login"
          className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-neutral-400 hover:text-neutral-700"
        >
          <ArrowLeft size={13} /> Back
        </Link>

        <h1 className="font-serif text-[28px] font-medium leading-tight text-[#14140F]">
          Agency sign in
        </h1>
        <p className="mt-1.5 text-[14px] text-neutral-500">
          Access the studio workspace and all brand systems.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(false); }}
            placeholder="studio@brandly.io"
            autoComplete="email"
            autoFocus
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-[13px] text-red-700">
              Incorrect email or password — please try again.
            </div>
          )}

          <Button type="submit" size="lg" className="mt-1 w-full" disabled={!email || !password}>
            Sign in
          </Button>

          <div className="relative flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E4DFD3]" />
            <span className="text-[12px] text-neutral-400">or</span>
            <div className="h-px flex-1 bg-[#E4DFD3]" />
          </div>

          <button
            type="button"
            className="focus-ring flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-[#DDD6C6] bg-white text-[14px] font-medium text-[#14140F] transition-colors hover:bg-black/[0.02]"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </form>

        <p className="mt-8 text-center text-[12px] text-neutral-400">
          Demo: studio@brandly.io / brandly
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  );
}
