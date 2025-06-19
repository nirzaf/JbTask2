"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { LanguageData } from "@/types";

interface SalaryChartProps {
  data: LanguageData;
}

export default function SalaryChart({ data }: SalaryChartProps) {
  console.log('SalaryChart component received data:', data);
  
  // Ensure data has the expected structure
  if (!data || !data.yGroups || !data.xRangeGroups || !Array.isArray(data.yGroups) || !Array.isArray(data.xRangeGroups)) {
    console.error('Invalid data structure received in SalaryChart component:', data);
    return null;
  }
  
  // Transform the data for the chart
  const chartData = data.yGroups.map((group, index) => {
    if (Array.isArray(data.xRangeGroups[index]) && data.xRangeGroups[index].length >= 2) {
      const [min, max] = data.xRangeGroups[index];
      return {
        name: group,
        min: min,
        max: max,
        // For the bar chart, we need a single value
        value: max - min
      };
    }
    return {
      name: group,
      min: 0,
      max: 0,
      value: 0
    };
  });
  
  console.log('Processed chart data:', chartData);

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
                const payload = props.payload;
                return `$${payload.min}K - $${payload.max}K`;
            }}
          />
          <Bar dataKey="value" fill="#8884d8" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}