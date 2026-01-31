"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ data }: any) {
if (!data) return null;
  const chartData = [
    {
      name: "Recommended",
      value: data.recommended,
      fill: "#9ca3af", // gray
    },
    {
      name: "Your Usage",
      value: data.actual,
      fill: data.actual > data.recommended ? "#dc2626" : "#16a34a",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
      <h2 className="text-xl font-semibold">
        Your Water Usage at a Glance
      </h2>

      <p className="text-sm text-gray-600">
        Comparison between recommended and actual daily water usage (liters).
      </p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar 
                dataKey="value" 
                radius={[6, 6, 0, 0]}
                fill="#2563eb"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    <p className="text-sm text-gray-700">
  {data.actual > data.recommended ? (
    <>
      You are using{" "}
      <strong className="text-red-600">
        {Math.round(
          ((data.actual - data.recommended) / data.recommended) * 100
        )}%
      </strong>{" "}
      more water than recommended.
    </>
  ) : (
    <>
      Your water usage is{" "}
      <strong className="text-green-600">within the recommended range</strong>.
    </>
  )}
</p>
    </div>
  );
}
