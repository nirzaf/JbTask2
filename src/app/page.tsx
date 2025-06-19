"use client";

import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { CalculatorData, LanguageData } from '@/types';
import calculatorData from '@/data/calculatorData.json';

// Cast the imported data to the correct type
const data: CalculatorData = calculatorData as CalculatorData;

// Sample data for languages and countries
const languages = {
  "Kotlin": "Kotlin",
  "JavaScript": "JavaScript",
  "Python": "Python",
  "Java": "Java",
  "TypeScript": "TypeScript",
  "C++": "C++",
  "Go": "Go",
  "Rust": "Rust"
};

const countries = {
  "Australia": "Australia",
  "USA": "United States",
  "Canada": "Canada",
  "UK": "United Kingdom",
  "Germany": "Germany",
  "Netherlands": "Netherlands",
  "Sweden": "Sweden",
  "Switzerland": "Switzerland"
};

// --- Components ---
/**
 * Input form component props interface
 */
interface InputFormProps {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filters: Filters;
  onCalculate: () => void;
}

/**
 * Input form component
 */
const InputForm = ({ setFilters, filters, onCalculate }: InputFormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev: Filters) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Step 1 */}
      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">1</div>
          <div>
            <h3 className="font-semibold">Enter your programming language,</h3>
            <p className="opacity-80">and country.</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Programming language</label>
            <select 
              name="language"
              value={filters.language}
              onChange={handleInputChange}
              className="w-full bg-black bg-opacity-30 border border-white border-opacity-20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select language</option>
              {Object.keys(languages).map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Country</label>
            <select 
              name="country"
              value={filters.country}
              onChange={handleInputChange}
              className="w-full bg-black bg-opacity-30 border border-white border-opacity-20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select country</option>
              {Object.keys(countries).map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">2</div>
          <div>
            <h3 className="font-semibold">Calculate the salary range</h3>
            <p className="opacity-80">based on your parameters.</p>
          </div>
        </div>
        
        <button
          onClick={onCalculate}
          disabled={!filters.language || !filters.country}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Calculate Salary Range
        </button>
      </div>
    </div>
  );
};

/**
 * Salary chart component using real data
 */
const SalaryChart = ({ languageData, selectedLanguage, selectedCountry }: { languageData: LanguageData | undefined, selectedLanguage: string, selectedCountry: string }) => {
  if (!languageData) return null;

  // Process the real data structure for horizontal bar chart
  const chartData = languageData.yGroups.map((group: string, index: number) => {
    const [min, max] = languageData.xRangeGroups[index];
    return {
      level: group,
      min: min,
      max: max,
      range: max - min,
      start: min
    };
  });

  // Colors for the chart
  const colors = ['#8B5CF6', '#EC4899', '#3B82F6', '#6B7280', '#F97316', '#10B981'];

  return (
    <div>
      <div className="mb-6">
        <p className="text-lg text-gray-700">
          Most <span className="text-purple-600 font-semibold">{selectedLanguage}</span> developers with <span className="text-purple-600 font-semibold">less than 1 year</span> of 
          professional experience in <span className="text-purple-600 font-semibold">{selectedCountry}</span> can expect the 
          following net salary distribution (excluding any bonuses):
        </p>
      </div>

      <div className="flex">
        {/* Chart area */}
        <div className="flex-1 mr-8">
          {/* Dot Plot Chart */}
          <div className="relative mb-8">
            <div className="space-y-6">
              {chartData.map((item, index) => {
                const color = colors[index % colors.length];
                const maxSalary = 300000; // Set max range for scaling
                const position = (item.max / maxSalary) * 100;
                
                return (
                  <div key={item.level} className="flex items-center h-4">
                    <div className="flex items-center space-x-1 flex-1">
                      {/* Connecting line */}
                      <div className="relative flex-1 h-0.5" style={{ backgroundColor: color + '20' }}>
                        {/* Min dot */}
                        <div
                          className="absolute w-2 h-2 rounded-full -translate-y-0.5"
                          style={{ 
                            backgroundColor: color,
                            left: `${Math.min((item.min / maxSalary) * 100, 95)}%`
                          }}
                        />
                        {/* Max dot */}
                        <div
                          className="absolute w-2 h-2 rounded-full -translate-y-0.5"
                          style={{ 
                            backgroundColor: color,
                            left: `${Math.min(position, 95)}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* X-axis labels */}
            <div className="flex justify-between text-xs text-gray-400 mt-4">
              <span>$0k</span>
              <span>$50k</span>
              <span>$100k</span>
              <span>$150k</span>
              <span>$200k</span>
              <span>$250k</span>
              <span>$300k</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col justify-center space-y-3">
          {chartData.map((item, index) => {
            const color = colors[index % colors.length];
            
            return (
              <div key={item.level} className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-sm text-gray-600">{item.level}</span>
              </div>
            );
          })}
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
          selected technology.
        </p>
      </div>
    </div>
  );
};

/**
 * Filters interface for type safety
 */
interface Filters {
  language: string;
  country: string;
}

/**
 * Results display component
 */
const ResultsDisplay = ({ filters, showResults }: { filters: Filters, showResults: boolean }) => {
  const { language, country } = filters;
  const languageData = data[country]?.[language];

  if (!showResults) {
    return (
      <div className="bg-white text-gray-800 rounded-2xl p-6">
        <div className="text-center py-12">
          <div className="text-6xl opacity-30 mb-4">📊</div>
          <p className="text-lg text-gray-600">
            Select a programming language and country to see salary estimates
          </p>
        </div>
      </div>
    );
  }

  if (!language || !country) {
    return (
      <div className="bg-white text-gray-800 rounded-2xl p-6">
        <div className="text-center py-12">
          <div className="text-6xl opacity-30 mb-4">📊</div>
          <p className="text-lg text-gray-600">
            Select a programming language and country to see salary estimates
          </p>
        </div>
      </div>
    );
  }

  if (!languageData) {
    return (
      <div className="bg-white text-gray-800 rounded-2xl p-6">
        <p className="text-yellow-600">No data available for {language} in {country}. Try selecting different options.</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 rounded-2xl p-6">
      <SalaryChart 
        languageData={languageData} 
        selectedLanguage={language} 
        selectedCountry={country} 
      />
    </div>
  );
};

// --- Main App Component ---

/**
 * Main application component
 */
export default function Home() {
  const [filters, setFilters] = useState<Filters>({
    language: '',
    country: '',
  });
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    if (filters.language && filters.country) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Decorative circle */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-black rounded-full opacity-30 -translate-y-32 translate-x-32"></div>
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-6">IT Salary<br />Calculator</h1>
          <p className="text-lg opacity-90 max-w-lg leading-relaxed">
            Each year, our extensive surveys reach out to over 30,000 
            developers across over 180 countries, representing a diverse 
            range of specialties. With data collected over multiple years, 
            we are able to present a comprehensive analysis of tech trends 
            using the methodology described <span className="underline cursor-pointer">here</span>.
          </p>
        </div>

        <div className="mb-8">
          <p className="text-xl opacity-90 max-w-xl">
            Use our calculator to estimate your income 
            potential based on software developer 
            skills, programming language, location, 
            and experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Input Form */}
          <div>
            <InputForm 
              setFilters={setFilters} 
              filters={filters} 
              onCalculate={handleCalculate} 
            />
          </div>

          {/* Right Panel - Results */}
          <ResultsDisplay 
            filters={filters} 
            showResults={showResults} 
          />
        </div>
      </div>
    </div>
  );
}
