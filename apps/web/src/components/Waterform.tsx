"use client";

import ReactMarkdown from "react-markdown";
import { useState } from "react";
import Chart from "./chart";

export default function Waterform() {
  const [householdSize, setHouseholdSize] = useState("");
  const [dailyUsage, setDailyUsage] = useState("");
  const [source, setSource] = useState("Municipal Supply");
  const [area, setArea] = useState("Urban");

  const [aiText, setAiText] = useState("");
  const [loading, setLoading] = useState(false);

  const recommended = Number(householdSize) * 135;

async function callGroq() {
  setLoading(true);

  try {
    const res = await fetch("/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        householdSize,
        actual: Number(dailyUsage),
        recommended,
        source,
        area,
      }),
    });

    if (!res.ok) {
      throw new Error("Something went wrong.");
    }

    const data = await res.json();
    setAiText(data.text);
  } catch (err) {
    setAiText("Something went wrong. Please try again.");
    console.error(err);
  } finally {
    setLoading(false);
  }
}

  return (
    <section className="bg-white rounded-xl p-6 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold">
        Enter Your Household Water Usage
      </h2>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Household Size */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Household Size</label>
          <input
            type="number"
            min={1}
            step={1}
            value={householdSize}
            onChange={(e) => setHouseholdSize(e.target.value)}
            placeholder="e.g. 4"
            className="border rounded-md px-3 py-2"
          />
        </div>

        {/* Daily Usage */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            Daily Water Usage (Liters)
          </label>
          <input
            type="number"
            min={1}
            step={1}
            value={dailyUsage}
            onChange={(e) => setDailyUsage(e.target.value)}
            placeholder="e.g. 600"
            className="border rounded-md px-3 py-2"
          />
        </div>

        {/* Water Source */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Main Water Source</label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option>Municipal Supply</option>
            <option>Borewell / Groundwater</option>
            <option>Water Tanker</option>
          </select>
        </div>

        {/* Area Type */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Area Type</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option>Urban</option>
            <option>Semi-Urban</option>
            <option>Rural</option>
          </select>
        </div>
      </form>
<div className="text-sm text-slate-600">
  <span className="font-medium text-slate-800">Context:</span>{" "}
  {source} water · {area} area
</div>
    {/* Chart */}
    {householdSize && dailyUsage && (
    <Chart
        data={{
        actual: Number(dailyUsage),
        recommended,
        }}
    />
    )}
      {/* Button */}
      <button
        onClick={callGroq}
        disabled={!householdSize || !dailyUsage}
        className="bg-blue-600 text-white px-6 py-2 rounded-md disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Explain with AI"}
      </button>

      {/* AI Output */}
      {aiText && (
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="font-medium mb-2">AI Explanation</h3>
    <div className="bg-gray-50 p-4 rounded-md">

  <ReactMarkdown>
    {aiText}
  </ReactMarkdown>
</div>
        </div>
      )}
    </section>
  );
}
