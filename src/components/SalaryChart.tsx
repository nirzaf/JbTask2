"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Modern dot plot component for visualizing salary distribution
 * Displays salary data as colored dots with horizontal range lines
 */
interface SalaryChartProps {
  language?: string;
  country?: string;
}

export default function SalaryChart({ language = "C#", country = "United Kingdom" }: SalaryChartProps) {
  // Sample C# salary data for United Kingdom 2024
  const salaryData = [
    // <1 year experience - Orange dots
    { salary: 25, experience: "<1 year", color: "#ff7300" },
    { salary: 30, experience: "<1 year", color: "#ff7300" },
    { salary: 35, experience: "<1 year", color: "#ff7300" },
    { salary: 40, experience: "<1 year", color: "#ff7300" },
    
    // 1-2 years experience - Orange dots
    { salary: 35, experience: "1-2 years", color: "#ff7300" },
    { salary: 42, experience: "1-2 years", color: "#ff7300" },
    { salary: 48, experience: "1-2 years", color: "#ff7300" },
    { salary: 55, experience: "1-2 years", color: "#ff7300" },
    { salary: 62, experience: "1-2 years", color: "#ff7300" },
    
    // 3-5 years experience - Grey dots
    { salary: 45, experience: "3-5 years", color: "#9ca3af" },
    { salary: 52, experience: "3-5 years", color: "#9ca3af" },
    { salary: 58, experience: "3-5 years", color: "#9ca3af" },
    { salary: 65, experience: "3-5 years", color: "#9ca3af" },
    { salary: 72, experience: "3-5 years", color: "#9ca3af" },
    { salary: 78, experience: "3-5 years", color: "#9ca3af" },
    { salary: 85, experience: "3-5 years", color: "#9ca3af" },
    
    // 6-10 years experience - Blue dots
    { salary: 65, experience: "6-10 years", color: "#3b82f6" },
    { salary: 72, experience: "6-10 years", color: "#3b82f6" },
    { salary: 78, experience: "6-10 years", color: "#3b82f6" },
    { salary: 85, experience: "6-10 years", color: "#3b82f6" },
    { salary: 92, experience: "6-10 years", color: "#3b82f6" },
    { salary: 98, experience: "6-10 years", color: "#3b82f6" },
    { salary: 105, experience: "6-10 years", color: "#3b82f6" },
    { salary: 112, experience: "6-10 years", color: "#3b82f6" },
    { salary: 125, experience: "6-10 years", color: "#3b82f6" },
    
    // 11-16 years experience - Pink dots
    { salary: 85, experience: "11-16 years", color: "#ec4899" },
    { salary: 95, experience: "11-16 years", color: "#ec4899" },
    { salary: 105, experience: "11-16 years", color: "#ec4899" },
    { salary: 115, experience: "11-16 years", color: "#ec4899" },
    { salary: 125, experience: "11-16 years", color: "#ec4899" },
    { salary: 135, experience: "11-16 years", color: "#ec4899" },
    { salary: 145, experience: "11-16 years", color: "#ec4899" },
    { salary: 155, experience: "11-16 years", color: "#ec4899" },
    { salary: 165, experience: "11-16 years", color: "#ec4899" },
    { salary: 175, experience: "11-16 years", color: "#ec4899" },
    
    // 16+ years experience - Purple dots
    { salary: 120, experience: "16+ years", color: "#8b5cf6" },
    { salary: 135, experience: "16+ years", color: "#8b5cf6" },
    { salary: 150, experience: "16+ years", color: "#8b5cf6" },
    { salary: 165, experience: "16+ years", color: "#8b5cf6" },
    { salary: 180, experience: "16+ years", color: "#8b5cf6" },
    { salary: 195, experience: "16+ years", color: "#8b5cf6" },
    { salary: 210, experience: "16+ years", color: "#8b5cf6" },
    { salary: 225, experience: "16+ years", color: "#8b5cf6" },
    { salary: 240, experience: "16+ years", color: "#8b5cf6" },
    { salary: 255, experience: "16+ years", color: "#8b5cf6" },
    { salary: 270, experience: "16+ years", color: "#8b5cf6" },
  ];

  // Experience levels in order from bottom to top
  const experienceLevels = [
    "<1 year",
    "1-2 years", 
    "3-5 years",
    "6-10 years",
    "11-16 years",
    "16+ years"
  ];

  /**
   * Generate X-axis tick marks from $0K to $300K at $25K intervals
   */
  const generateXTicks = () => {
    const ticks = [];
    for (let i = 0; i <= 300; i += 25) {
      ticks.push(i);
    }
    return ticks;
  };

  const xTicks = generateXTicks();
  const chartWidth = 1000;
  const chartHeight = 500;
  const margin = { top: 60, right: 100, bottom: 100, left: 180 };
  const plotWidth = chartWidth - margin.left - margin.right;
  const plotHeight = chartHeight - margin.top - margin.bottom;
  
  // Scale functions
  const xScale = (salary: number) => (salary / 300) * plotWidth;
  // Y-scale for proper dot plot with experience levels from bottom to top
  const yScale = (experienceIndex: number) => {
    const bandHeight = plotHeight / experienceLevels.length;
    // Reverse the order so lowest experience is at bottom
    return plotHeight - (experienceIndex * bandHeight + bandHeight / 2);
  };
  
  // Group data by experience level for better positioning
  const groupedData = experienceLevels.map(level => {
    return salaryData.filter(d => d.experience === level);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full bg-white p-6 rounded-lg shadow-sm"
    >
      {/* Chart Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        {language} Specialist Salary Distribution - {country} 2024
      </h2>
      
      <div className="flex justify-center">
        <svg width={chartWidth} height={chartHeight} className="overflow-visible">
          {/* Background */}
          <rect
            x={margin.left}
            y={margin.top}
            width={plotWidth}
            height={plotHeight}
            fill="#fcfcfc"
            stroke="#d1d5db"
            strokeWidth={1}
          />
          
          {/* Vertical grid lines */}
          {xTicks.map((tick, i) => (
            <line
              key={i}
              x1={margin.left + xScale(tick)}
              y1={margin.top}
              x2={margin.left + xScale(tick)}
              y2={margin.top + plotHeight}
              stroke="#e5e7eb"
              strokeWidth={0.8}
              opacity={0.6}
            />
          ))}
          
          {/* Horizontal grid lines */}
          {experienceLevels.map((_, i) => (
            <line
              key={i}
              x1={margin.left}
              y1={margin.top + yScale(i)}
              x2={margin.left + plotWidth}
              y2={margin.top + yScale(i)}
              stroke="#d1d5db"
              strokeWidth={0.8}
              opacity={0.4}
            />
          ))}
          
          {/* Horizontal range lines for each experience level */}
          {experienceLevels.map((experience, index) => {
            const experienceData = salaryData.filter(d => d.experience === experience);
            if (experienceData.length === 0) return null;
            
            const minSalary = Math.min(...experienceData.map(d => d.salary));
            const maxSalary = Math.max(...experienceData.map(d => d.salary));
            const y = margin.top + yScale(index);
            
            return (
              <line
                key={`range-${experience}`}
                x1={margin.left + xScale(minSalary)}
                y1={y}
                x2={margin.left + xScale(maxSalary)}
                y2={y}
                stroke="#9ca3af"
                strokeWidth={2.5}
                opacity={0.3}
                strokeLinecap="round"
              />
            );
          })}
          
          {/* Data points (dots) with improved positioning */}
          {groupedData.map((group, groupIndex) => {
            const baseY = yScale(groupIndex);
            return group.map((d, pointIndex) => {
              // Add slight vertical jitter for overlapping salaries
              const verticalJitter = ((pointIndex % 3) - 1) * 4;
              const y = baseY + verticalJitter;
              
              return (
                <motion.circle
                  key={`${groupIndex}-${pointIndex}`}
                  cx={margin.left + xScale(d.salary)}
                  cy={margin.top + y}
                  r={6}
                  fill={d.color}
                  stroke="white"
                  strokeWidth={2}
                  style={{
                    filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.15))",
                    cursor: "pointer"
                  }}
                  whileHover={{ 
                    scale: 1.4, 
                    strokeWidth: 3,
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <title>{`${d.experience}: $${d.salary}k`}</title>
                </motion.circle>
              );
            });
          }).flat()}
          
          {/* X-axis */}
          <line
            x1={margin.left}
            y1={margin.top + plotHeight}
            x2={margin.left + plotWidth}
            y2={margin.top + plotHeight}
            stroke="#1f2937"
            strokeWidth={1.5}
          />
          
          {/* Y-axis */}
          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={margin.top + plotHeight}
            stroke="#1f2937"
            strokeWidth={1.5}
          />
          
          {/* X-axis labels */}
          {xTicks.filter(tick => tick % 50 === 0).map(tick => (
            <text
              key={`xlabel-${tick}`}
              x={margin.left + xScale(tick)}
              y={margin.top + plotHeight + 30}
              textAnchor="middle"
              fontSize="13"
              fill="#374151"
              fontWeight="400"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              ${tick}K
            </text>
          ))}
          
          {/* Y-axis labels */}
          {experienceLevels.map((experience, index) => (
            <text
              key={`ylabel-${experience}`}
              x={margin.left - 20}
              y={margin.top + yScale(index) + 5}
              textAnchor="end"
              fontSize="13"
              fill="#374151"
              fontWeight="500"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            >
              {experience}
            </text>
          ))}
          
          {/* X-axis title */}
          <text
            x={margin.left + plotWidth / 2}
            y={margin.top + plotHeight + 70}
            textAnchor="middle"
            fontSize={15}
            fill="#1f2937"
            fontWeight={600}
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          >
            Salary in USD (including bonuses)
          </text>
          
          {/* Y-axis title */}
          <text
            x={30}
            y={margin.top + plotHeight / 2}
            textAnchor="middle"
            fontSize={15}
            fill="#1f2937"
            fontWeight={600}
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            transform={`rotate(-90, 30, ${margin.top + plotHeight / 2})`}
          >
            Experience Level
          </text>
        </svg>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {[
          { label: "<1 year", color: "#ff7300" },
          { label: "1-2 years", color: "#ff7300" },
          { label: "3-5 years", color: "#9ca3af" },
          { label: "6-10 years", color: "#3b82f6" },
          { label: "11-16 years", color: "#ec4899" },
          { label: "16+ years", color: "#8b5cf6" }
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full border border-white"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}