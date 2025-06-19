"use client";

import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { CalculatorData } from '@/types';
import calculatorData from '@/data/calculatorData.json';
import SalaryChartComponent from '@/components/SalaryChart';

// Cast the imported data to the correct type
const data: CalculatorData = calculatorData as CalculatorData;

// Extract countries and languages from the data
const countries: Record<string, string> = {};
Object.keys(data).forEach(country => {
  countries[country] = country;
});

// Extract unique languages from all countries
const languages: Record<string, string> = {};
Object.keys(data).forEach(country => {
  Object.keys(data[country]).forEach(language => {
    languages[language] = language;
  });
});


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
            <h3 className="font-semibold text-black">Enter your programming language,</h3>
            <p className="text-black">and country.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Programming language</label>
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
            <label className="block text-sm font-semibold text-black mb-2">Country</label>
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
            <p className="text-white">based on your parameters.</p>
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

// Removed custom SalaryChart component - now using the imported SalaryChartComponent

/**
 * Filters interface for type safety
 */
interface Filters {
  language: string;
  country: string;
}

/**
 * Results display component - now shows the modern C# dot plot
 */
const ResultsDisplay = ({ filters, showResults }: { filters: Filters, showResults: boolean }) => {
  const { language, country } = filters;

  if (!showResults) {
    return (
      <div className="bg-white text-gray-800 rounded-2xl p-6">
        <div className="text-center py-12">
          <div className="text-6xl opacity-30 mb-4">📊</div>
          <p className="text-lg font-medium text-gray-700">
            Select a programming language and country to see salary estimates
          </p>
        </div>
      </div>
    );
  }

  // Show the modern dot plot for any selection
  return (
    <div className="bg-white text-gray-800 rounded-2xl p-6">
      {/* Use the new modern dot plot component */}
      <SalaryChartComponent language={language} country={country} />

      <div className="mt-8">
        <div className="mb-6">
          <p className="text-lg text-gray-700">
            {language} developers in <span className="text-purple-600 font-semibold">{country}</span> show a wide salary range
            based on their professional coding experience. The visualization above displays individual salary data points
            with horizontal range lines for each experience level.
          </p>
        </div>

        <div className="text-sm font-medium text-gray-800 mb-4 mt-8">
          <p>The dot plot shows salary distribution among {language} specialists in {country},
            based on 2024 industry data with salaries including bonuses.</p>
        </div>

        <div className="flex items-start space-x-2 text-sm font-medium text-gray-800">
          <Info size={16} className="mt-0.5 flex-shrink-0" />
          <p>
            <strong>Note:</strong> Each dot represents an individual&apos;s reported salary. Experience levels refer to total years of professional coding experience.
          </p>
        </div>
      </div>
    </div>
  );
};

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
          <p className="text-lg text-white max-w-lg leading-relaxed">
            Each year, our extensive surveys reach out to over 30,000
            developers across over 180 countries, representing a diverse
            range of specialties. With data collected over multiple years,
            we are able to present a comprehensive analysis of tech trends
            using the methodology described <span className="underline cursor-pointer">here</span>.
          </p>
        </div>

        <div className="mb-8">
          <p className="text-xl text-white max-w-xl">
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
