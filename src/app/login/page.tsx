"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBrandStore } from "@/lib/store";
import { BrandlyMark } from "@/components/BrandlyMark";
import { Building2, UserCircle2 } from "lucide-react";

export default function LoginLanding() {
  const authUser = useBrandStore((s) => s.authUser);
  const router = useRouter();

  useEffect(() => {
    if (authUser) {
      router.replace(authUser.role === "agency" ? "/dashboard" : "/portal");
    }
  }, [authUser, router]);

  if (authUser) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F5F0] px-6">
      <div className="w-full max-w-md">
        <div className="mb-10 flex items-center justify-center gap-2">
          <BrandlyMark size={28} />
          <span className="font-serif text-[20px] font-medium tracking-tight text-[#14140F]">
            brandly.
          </span>
        </div>

        <h1 className="text-center font-serif text-[30px] font-medium leading-tight text-[#14140F]">
          Welcome back
        </h1>
        <p className="mt-2 text-center text-[14px] text-neutral-500">
          How are you accessing Brandly today?
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <Link href="/login/company" className="group">
            <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-[#E4DFD3] bg-white p-7 text-center transition-all hover:border-[#14140F] hover:shadow-[0_4px_20px_rgba(20,20,15,0.08)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#14140F] text-white transition-transform group-hover:scale-105">
                <Building2 size={22} strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-serif text-[16px] font-medium text-[#14140F]">Agency</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-neutral-500">
                  Studio & team access to all brand systems
                </p>
              </div>
            </div>
          </Link>

          <Link href="/login/client" className="group">
            <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-[#E4DFD3] bg-white p-7 text-center transition-all hover:border-[#14140F] hover:shadow-[0_4px_20px_rgba(20,20,15,0.08)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4F0E8] transition-transform group-hover:scale-105">
                <UserCircle2 size={22} strokeWidth={1.5} className="text-[#14140F]" />
              </div>
              <div>
                <p className="font-serif text-[16px] font-medium text-[#14140F]">Client</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-neutral-500">
                  View brand portals shared with you
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
