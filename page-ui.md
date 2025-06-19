import React, { useState } from 'react';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Scatter, Line } from 'recharts';
import { Search, ChevronRight, Info } from 'lucide-react';

// --- Mock Data ---
// In a real application, this would come from an API call.
const salaryData = {
  Kotlin: {
    Australia: [
      { level: 'L1', min: 8000, mid: 15000, max: 22000 },
      { level: 'L2', min: 20000, mid: 28000, max: 35000 },
      { level: 'L3', min: 38000, mid: 45000, max: 55000 },
      { level: 'L4', min: 50000, mid: 60000, max: 70000 },
      { level: 'L5', min: 65000, mid: 75000, max: 85000 },
      { level: 'L6', min: 78000, mid: 88000, max: 98000 },
      { level: 'L7', min: 90000, mid: 100000, max: 110000 },
    ],
  },
  // You could add more languages and countries here
  JavaScript: {
    USA: [
        { level: 'L1', min: 50000, mid: 60000, max: 70000 },
        { level: 'L2', min: 65000, mid: 78000, max: 90000 },
        { level: 'L3', min: 85000, mid: 100000, max: 120000 },
        { level: 'L4', min: 110000, mid: 130000, max: 150000 },
    ]
  }
};

const experienceLevels = [
    { value: 'less than 1 year', label: 'Less than 1 year' },
    { value: '1-2 years', label: '1-2 years' },
    { value: '3-5 years', label: '3-5 years' },
    { value: '6+ years', label: '6+ years' },
];


// --- Components ---

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

const InputForm = ({ setFilters, filters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

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
          <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-2">
            Programming language
          </label>
          <input
            type="text"
            name="language"
            id="language"
            value={filters.language}
            onChange={handleInputChange}
            placeholder="e.g., Kotlin"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">
            Country
          </label>
          <input
            type="text"
            name="country"
            id="country"
            value={filters.country}
            onChange={handleInputChange}
            placeholder="e.g., Australia"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
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

const SalaryChart = ({ data }) => {
  if (!data) return null;

  const chartData = data.map(d => ({
    level: d.level,
    range: [d.min, d.max],
    mid: d.mid,
  }));
  
  const formatAsCurrency = (value) => `$${(value / 1000).toFixed(0)}k`;

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
            formatter={(value, name) => {
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
          <Scatter dataKey="mid" fill="#A78BFA" shape={<circle r={5} />} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

const ResultsDisplay = ({ filters }) => {
    const { language, country, experience } = filters;
    const data = salaryData[language]?.[country];

    const renderContent = () => {
        if (!language || !country) {
            return <p className="text-gray-400">Enter a programming language and country to see results.</p>
        }
        if (!data) {
             return <p className="text-yellow-400">No data available for {language} in {country}. Try "Kotlin" in "Australia" or "JavaScript" in "USA".</p>
        }
        return (
            <div className="bg-white rounded-2xl p-8 text-gray-800">
                <p className="text-lg leading-relaxed">
                    Most <span className="font-bold text-purple-700">{language}</span> developers with <span className="font-bold text-purple-700">{experience}</span> of professional experience in <span className="font-bold text-purple-700">{country}</span> can expect the following net salary distribution (excluding any bonuses):
                </p>
                <div className="mt-6">
                    <SalaryChart data={data} />
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

export default function App() {
  const [filters, setFilters] = useState({
    language: 'Kotlin',
    country: 'Australia',
    experience: 'less than 1 year',
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
