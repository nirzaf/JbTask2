"use client";

import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Info } from 'lucide-react';
import { CalculatorData, LanguageData } from '@/types';
import calculatorData from '@/data/calculatorData.json';

// Cast the imported data to the correct type
const data: CalculatorData = calculatorData as CalculatorData;

// --- Components ---
/**
 * Input form component props interface
 */
interface InputFormProps {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filters: Filters;
}

/**
 * Input form component
 */
const InputForm = ({ setFilters, filters }: InputFormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev: Filters) => ({ ...prev, [name]: value }));
  };

  // Get available countries and languages from the data
  const countries = Object.keys(data);
  const languages = filters.country ? Object.keys(data[filters.country] || {}) : [];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Enter your programming language, and country.</h2>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
            Programming language
          </label>
          <select
            name="language"
            id="language"
            value={filters.language}
            onChange={handleInputChange}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            disabled={!filters.country}
          >
            <option value="">C#</option>
            {languages.map(language => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            name="country"
            id="country"
            value={filters.country}
            onChange={handleInputChange}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Brazil</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

/**
 * Salary chart component using real data
 */
const SalaryChart = ({ languageData }: { languageData: LanguageData | undefined }) => {
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

  const formatAsCurrency = (value: number) => `$${(value / 1000).toFixed(0)}K`;

  return (
    <div className="w-full h-80 bg-gray-50 p-4 rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
        >
          <XAxis
            type="number"
            domain={[0, 'dataMax + 20000']}
            tickFormatter={formatAsCurrency}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <YAxis
            dataKey="level"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#374151', fontSize: 12 }}
            width={70}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number | number[], name: string, props: any) => {
              const payload = props.payload;
              return [`${formatAsCurrency(payload.min)} - ${formatAsCurrency(payload.max)}`, 'Salary Range'];
            }}
          />
          <Bar
            dataKey="range"
            fill="#8B5CF6"
            radius={[0, 4, 4, 0]}
            stackId="salary"
          />
        </BarChart>
      </ResponsiveContainer>
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
const ResultsDisplay = ({ filters }: { filters: Filters }) => {
  const { language, country } = filters;
  const languageData = data[country]?.[language];

  const renderContent = () => {
    if (!language || !country) {
      return (
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <p className="text-gray-500">Enter a programming language and country to see results.</p>
        </div>
      );
    }
    if (!languageData) {
      return (
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <p className="text-yellow-600">No data available for {language} in {country}. Try selecting different options.</p>
        </div>
      );
    }
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <p className="text-lg leading-relaxed text-gray-800 mb-6">
          Coding specialists from <span className="font-bold text-blue-600">{country}</span> who use <span className="font-bold text-blue-600">{language}</span> reported to have the following gross annual salaries (in USD including bonuses) in 2024:
        </p>
        <div className="mb-6">
          <SalaryChart languageData={languageData} />
        </div>
        <div className="text-sm text-gray-500 space-y-2">
          <p>
            The graph shows salary distribution among users of the selected technology in the specified region, based on responses from <a href="#" className="text-blue-600 underline">Developer Ecosystem Survey 2024</a>.
          </p>
          <div className="flex items-start gap-2 pt-2 bg-gray-50 p-3 rounded-lg">
            <Info size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Note:</strong> Experience levels refer to total years of professional coding, not years using the selected technology.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Calculate the salary range based on your parameters.</h2>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

// --- Main App Component ---

/**
 * Main application component
 */
export default function Home() {
  const [filters, setFilters] = useState({
    language: '',
    country: '',
  });

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <main className="max-w-4xl mx-auto space-y-8">
          <InputForm setFilters={setFilters} filters={filters} />
          <ResultsDisplay filters={filters} />
        </main>
      </div>
    </div>
  );
}
