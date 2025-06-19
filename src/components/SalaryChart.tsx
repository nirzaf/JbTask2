'use client';

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Info } from 'lucide-react';
import { LanguageData } from '@/types';

interface SalaryChartProps {
  data: LanguageData;
  language?: string;
  country?: string;
}

/**
 * SalaryChart component that displays salary distribution as horizontal bars
 * Uses actual data from the application instead of hardcoded values
 */
export default function SalaryChart({ data, language = 'Selected Language', country = 'Selected Country' }: SalaryChartProps) {
  const [showResults] = useState(true);

  /**
   * Process the actual data to group salaries by experience level
   */
  const getCurrentSalaryData = () => {
    const groupedData: { [key: string]: number[] } = {};
    
    // Check if data and entries exist
    if (!data || !data.entries) {
      console.log('No data or entries found:', data);
      return groupedData;
    }
    
    // Group data by experience level
    data.entries.forEach(entry => {
      const experience = entry.metadata.Experience;
      if (!groupedData[experience]) {
        groupedData[experience] = [];
      }
      groupedData[experience].push(entry.value);
    });
    
    console.log('Grouped salary data:', groupedData);
    return groupedData;
  };

  /**
   * Calculate average salary for each experience level
   */
  const calculateAverageSalary = (salaries: number[]) => {
    return salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length;
  };

  const currentSalaries = getCurrentSalaryData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white text-gray-800 rounded-2xl p-6"
    >
      {showResults && language && country ? (
        <div>
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {language} Specialist Salary Distribution - {country} 2024
          </h2>

          <div className="mb-6">
            <p className="text-lg text-gray-700">
              Coding specialists from <span className="text-purple-600 font-semibold">{country}</span> who use{' '}
              <span className="text-purple-600 font-semibold">{language}</span> reported to have the following gross annual salaries (in USD including bonuses) in 2024:
            </p>
          </div>

          <div className="flex">
            {/* Chart area */}
            <div className="flex-1 mr-8">
              {/* Dot Plot Chart */}
              <div className="relative mb-8">
                <div className="space-y-3">
                  {Object.entries(currentSalaries).length > 0 ? Object.entries(currentSalaries).reverse().map(([exp, salaries], index) => {
                    // Define color mapping for each experience level
                    const colorMap: { [key: string]: string } = {
                      '16+ years': '#10B981',    // Green
                      '11–16 years': '#F97316',  // Orange  
                      '6–10 years': '#6B7280',   // Grey
                      '3–5 years': '#3B82F6',    // Blue
                      '1–2 years': '#EC4899',    // Pink
                      '<1 year': '#8B5CF6'       // Violet
                    };
                    const color = colorMap[exp] || '#6B7280'; // Default to grey if not found
                    const maxSalary = 300; // Set max range for scaling (values are in thousands)
                    
                    // Filter and limit salary data points for visualization
                    const displaySalaries = salaries.filter((_, i) => i % 2 === 0).slice(0, 15);
                    
                    console.log(`Experience: ${exp}, Salaries:`, displaySalaries, `Max: ${maxSalary}`);
                    
                    return (
                      <motion.div 
                        key={exp} 
                        className="flex items-center h-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="flex items-center space-x-1 flex-1">
                          {/* Connecting line */}
                          <div className="relative flex-1 h-0.5" style={{ backgroundColor: color + '20' }}>
                            {displaySalaries.map((salary, dotIndex) => {
                              const position = (salary / maxSalary) * 100;
                              console.log(`Dot ${dotIndex}: salary=${salary}, position=${position}%`);
                              
                              return (
                                <motion.div
                                  key={dotIndex}
                                  className="absolute w-3 h-3 rounded-full -translate-y-1"
                                  style={{ 
                                    backgroundColor: color,
                                    left: `${Math.min(position, 95)}%`,
                                    border: '1px solid rgba(255,255,255,0.8)',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                                  }}
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.3, delay: index * 0.1 + dotIndex * 0.05 }}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    );
                  }) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No salary data available for the selected combination.</p>
                    </div>
                  )}
                </div>
                
                {/* X-axis labels */}
                <div className="flex justify-between text-xs text-gray-400 mt-4">
                  <span>$0k</span>
                  <span>$25k</span>
                  <span>$50k</span>
                  <span>$75k</span>
                  <span>$100k</span>
                  <span>$125k</span>
                  <span>$150k</span>
                  <span>$175k</span>
                  <span>$200k</span>
                  <span>$225k</span>
                  <span>$250k</span>
                  <span>$275k</span>
                  <span>$300k</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-col justify-start space-y-3 mt-4">
              {Object.keys(currentSalaries).length > 0 ? Object.keys(currentSalaries).reverse().map((exp, index) => {
                // Use the same color mapping as in the chart
                const colorMap: { [key: string]: string } = {
                  '16+ years': '#10B981',    // Green
                  '11–16 years': '#F97316',  // Orange  
                  '6–10 years': '#6B7280',   // Grey
                  '3–5 years': '#3B82F6',    // Blue
                  '1–2 years': '#EC4899',    // Pink
                  '<1 year': '#8B5CF6'       // Violet
                };
                const color = colorMap[exp] || '#6B7280'; // Default to grey if not found
                
                return (
                  <motion.div 
                    key={exp} 
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div 
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-sm text-gray-600">{exp}</span>
                  </motion.div>
                );
              }) : null}
            </div>
          </div>

          <div className="text-sm text-gray-600 mb-4 mt-8">
            <p>The graph shows salary distribution among users of the selected technology in the specified region,
            based on responses from <span className="underline">Developer Ecosystem Survey 2024</span>.</p>
          </div>

          <div className="flex items-start space-x-2 text-sm text-gray-600">
            <Info size={16} className="mt-0.5 flex-shrink-0" />
            <p>
              <strong>Note:</strong> Experience levels refer to total years of professional coding, not years using the
              selected technology. Dots show individual salary data points with range indicators.
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl opacity-30 mb-4">📊</div>
          <p className="text-lg text-gray-600">
            Select a programming language and country to see salary estimates
          </p>
        </div>
      )}
    </motion.div>
  );
}