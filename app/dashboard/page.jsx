"use client";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div>
      Hi there, welcome to dashboard!
      <button className="bg-amber-50 text-amber-300" 
        onClick={() => signOut({ callbackUrl: '/' })}>
        Signout
      </button>
      <div>
        
      </div>
    </div>
  );
}