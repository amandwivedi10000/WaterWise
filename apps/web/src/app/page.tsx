"use client";

import Header from "@/components/header";
import Ps from "@/components/ps";
import Waterform from "@/components/Waterform";
import Chart from "@/components/chart";
import CallToAction from "@/components/call-to-action";

export default function HomePage() {

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">

        <Header />
        <Ps />
        <Waterform />
        <Chart />
        <CallToAction />

      </div>
    </main>
  );
}
