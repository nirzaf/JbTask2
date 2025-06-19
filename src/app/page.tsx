"use client";

import React, { useState } from 'react';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Scatter, Line } from 'recharts';
import { Info } from 'lucide-react';
import { CalculatorData } from '@/types';
import calculatorData from '@/data/calculatorData.json';

// Cast the imported data to the correct type
const data: CalculatorData = calculatorData as CalculatorData;

// Experience levels mapping
const experienceLevels = [
    { value: '<1 year', label: 'Less than 1 year' },
    { value: '1–2 years', label: '1-2 years' },
    { value: '3–5 years', label: '3-5 years' },
    { value: '6+ years', label: '6+ years' },
];

// --- Components ---

/**
 * Header component displaying the main title and description
 */
const Header = () => (
  <div className="relative z-10">
    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
      IT Salary<br />Calculator
    </h1>
    <p className="mt-6 text-lg text-gray-300 max-w-xl">
      Each year, our extensive surveys reach out to over 30,000 developers across over 180 countries, representing a diverse range of specialities. With data collected over many years, we are able to present a comprehensive analysis of tech trends using the methodology described <a href="#" className="underline hover:text-white">here</a>.
    </p>
    <p className="mt-6 text-lg text-gray-300 max-w-xl">
      Use our calculator to estimate your income potential based on software developer skills, programming language, location, and experience.
    </p>
  </div>
);

/**
 * Input form component for selecting filters
 */
const InputForm = ({ setFilters, filters }: { setFilters: any, filters: any }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev: any) => ({ ...prev, [name]: value }));
  };

  // Get available countries and languages from the data
  const countries = Object.keys(data);
  const languages = filters.country ? Object.keys(data[filters.country] || {}) : [];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 h-fit">
      <div className="flex items-start gap-4">
        <div className="text-4xl font-bold text-purple-400">1</div>
        <div>
          <h2 className="text-xl font-semibold text-white">Enter your parameters</h2>
          <p className="text-gray-400 mt-1">Select your programming language, country, and experience level.</p>
        </div>
      </div>

      <div className="space-y-6 mt-8">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">
            Country
          </label>
          <select
            name="country"
            id="country"
            value={filters.country}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select a country</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-2">
            Programming language
          </label>
          <select
            name="language"
            id="language"
            value={filters.language}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={!filters.country}
          >
            <option value="">Select a language</option>
            {languages.map(language => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>
        <div>
           <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
            Professional Experience
          </label>
          <select 
            name="experience" 
            id="experience" 
            value={filters.experience}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {experienceLevels.map(exp => (
                <option key={exp.value} value={exp.value}>{exp.label}</option>
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
const SalaryChart = ({ languageData }: { languageData: any }) => {
  if (!languageData) return null;

  // Process the real data structure
  const chartData = languageData.yGroups.map((group: string, index: number) => ({
    level: group,
    range: languageData.xRangeGroups[index],
    mid: (languageData.xRangeGroups[index][0] + languageData.xRangeGroups[index][1]) / 2,
  }));
  
  const formatAsCurrency = (value: number) => `$${(value / 1000).toFixed(0)}k`;

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="vertical"
          data={chartData}
          margin={{ top: 20, right: 40, left: 0, bottom: 20 }}
        >
          <XAxis 
            type="number" 
            domain={[0, 'dataMax + 10000']} 
            tickFormatter={formatAsCurrency}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            dx={10}
          />
          <YAxis 
            dataKey="level" 
            type="category" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 14 }}
            width={40}
          />
          <Tooltip 
             contentStyle={{ 
                backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                borderColor: '#4C1D95',
                borderRadius: '0.5rem'
             }}
            formatter={(value: any, name: any) => {
                if (name === 'range') {
                    return [`$${value[0].toLocaleString()} - $${value[1].toLocaleString()}`, 'Salary Range']
                }
                if(name === 'mid') {
                    return [`$${value.toLocaleString()}`, 'Median']
                }
                return [value, name];
            }}
          />
          <Line dataKey="range" stroke="#4C1D95" strokeWidth={2} dot={false} activeDot={false} legendType="none" />
          <Scatter dataKey="mid" fill="#A78BFA" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Results display component
 */
const ResultsDisplay = ({ filters }: { filters: any }) => {
    const { language, country, experience } = filters;
    const languageData = data[country]?.[language];

    const renderContent = () => {
        if (!language || !country) {
            return <p className="text-gray-400">Enter a programming language and country to see results.</p>
        }
        if (!languageData) {
             return <p className="text-yellow-400">No data available for {language} in {country}. Try selecting different options.</p>
        }
        return (
            <div className="bg-white rounded-2xl p-8 text-gray-800">
                <p className="text-lg leading-relaxed">
                    Most <span className="font-bold text-purple-700">{language}</span> developers with <span className="font-bold text-purple-700">{experience}</span> of professional experience in <span className="font-bold text-purple-700">{country}</span> can expect the following net salary distribution (excluding any bonuses):
                </p>
                <div className="mt-6">
                    <SalaryChart languageData={languageData} />
                </div>
                <div className="mt-4 text-xs text-gray-500 space-y-2">
                     <p>
                        The graph shows salary distribution among users of the selected technology in the specified region, based on responses from <a href="#" className="underline">Developer Ecosystem Survey 2024</a>.
                    </p>
                    <div className="flex items-start gap-2 pt-2">
                        <Info size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                        <p>
                            Note: Experience levels refer to total years of professional coding, not years using the selected technology.
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-start gap-4">
                <div className="text-4xl font-bold text-purple-400">2</div>
                <div>
                    <h2 className="text-xl font-semibold text-white">Calculate the salary range</h2>
                    <p className="text-gray-400 mt-1">Salary is based on your parameters.</p>
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
    experience: '<1 year',
  });

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 -mt-40 -mr-96 w-[1000px] h-[600px] bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-400 rounded-full blur-[150px] opacity-30 rotate-45" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-12">
            <Header />
            <InputForm setFilters={setFilters} filters={filters} />
          </div>
          <div className="mt-0 lg:mt-24">
            <ResultsDisplay filters={filters} />
          </div>
        </main>
      </div>
    </div>
  );
}
