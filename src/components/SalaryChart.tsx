"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { LanguageData } from "@/types";

interface SalaryChartProps {
  data: LanguageData;
}

export default function SalaryChart({ data }: SalaryChartProps) {
  const chartData = data.yGroups.map((group, index) => ({
    name: group,
    range: data.xRangeGroups[index],
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-96 bg-gray-900 p-4 rounded-lg shadow-lg"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={chartData} margin={{ top: 20, right: 30, left: 50, bottom: 5 }}>
          <XAxis type="number" stroke="#888888" />
          <YAxis type="category" dataKey="name" stroke="#888888" width={100} />
          <Tooltip
            contentStyle={{ backgroundColor: "#333", border: "1px solid #555" }}
            labelStyle={{ color: "#fff" }}
            formatter={(value, name, props) => {
                const payload = (props as unknown as { payload: { range: number[] } }).payload;
                const [min, max] = payload.range;
                return `$${min}K - $${max}K`;
            }}
          />
          <Bar dataKey="range" fill="#8884d8" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}