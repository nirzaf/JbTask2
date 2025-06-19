"use client";

import { motion } from "framer-motion";
import { LanguageData } from "@/types";

interface SalaryChartProps {
  data: LanguageData;
}

// Define formatCurrency function
const formatCurrency = (value: number) => {
  return `$${value}K`;
};

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
        value: max // Value could be average, min, or max depending on design
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

  // Determine the overall maximum value for scaling bars
  const overallMax = Math.max(...chartData.map(d => d.max), 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full bg-gray-900 p-4 rounded-lg shadow-lg text-white"
    >
      <div className="space-y-4">
        {chartData.map((item, index) => (
          <div key={index} className="grid grid-cols-12 items-center gap-2">
            {/* Category Name */}
            <div className="col-span-3 text-sm text-gray-400 truncate pr-2">{item.name}</div>

            {/* Bar and Value */}
            <div className="col-span-9 flex items-center">
              <div
                className="bg-blue-500 h-6 rounded-sm shadow-md"
                style={{
                  width: overallMax > 0 ? `${(item.value / overallMax) * 100}%` : '0%',
                  transition: 'width 0.5s ease-in-out'
                }}
              />
              <div className="ml-2 text-sm font-semibold text-gray-200">
                {formatCurrency(item.min)} - {formatCurrency(item.max)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {chartData.length === 0 && (
        <div className="text-center text-gray-500 py-8">No data available to display.</div>
      )}
    </motion.div>
  );
}