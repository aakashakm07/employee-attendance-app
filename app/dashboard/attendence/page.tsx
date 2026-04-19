"use client";

import dynamic from "next/dynamic";

const Employee = dynamic(
  () => import("@/components/Employee"),
  { ssr: false } // 🔥 main fix
);

export default function Attendence() {
  return <Employee />;
}
