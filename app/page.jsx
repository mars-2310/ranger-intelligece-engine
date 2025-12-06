"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div>
      Hi there, welcome!
      <button className="bg-amber-50 text-amber-300" 
        onClick={() => signIn(undefined, { callbackUrl: '/dashboard' })}>
        Signin
      </button>
    </div>
  );
}
