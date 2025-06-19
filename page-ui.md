import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';

const ITSalaryCalculator = () => {
  const [language, setLanguage] = useState('');
  const [country, setCountry] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Sample salary data with different experience levels for line chart
  const salaryData = {
    'kotlin': {
      'australia': {
        '<1 year': [50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000, 150000],
        '1-2 years': [45000, 55000, 65000, 75000, 85000, 95000, 105000, 115000, 125000, 135000, 145000],
        '3-5 years': [60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000, 155000, 170000],
        '6-10 years': [70000, 85000, 100000, 115000, 130000, 145000, 160000, 175000, 190000, 205000, 220000],
        '11-16 years': [80000, 100000, 120000, 140000, 160000, 180000, 200000, 220000, 240000, 260000, 280000],
        '16+ years': [90000, 115000, 140000, 165000, 190000, 215000, 240000, 265000, 290000, 315000, 340000]
      },
      'usa': {
        '<1 year': [70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000, 150000, 160000, 170000],
        '1-2 years': [65000, 75000, 85000, 95000, 105000, 115000, 125000, 135000, 145000, 155000, 165000],
        '3-5 years': [80000, 90000, 100000, 110000, 120000, 130000, 140000, 150000, 160000, 175000, 190000],
        '6-10 years': [90000, 105000, 120000, 135000, 150000, 165000, 180000, 195000, 210000, 225000, 240000],
        '11-16 years': [100000, 120000, 140000, 160000, 180000, 200000, 220000, 240000, 260000, 280000, 300000],
        '16+ years': [110000, 135000, 160000, 185000, 210000, 235000, 260000, 285000, 310000, 335000, 360000]
      }
    },
    'javascript': {
      'australia': {
        '<1 year': [45000, 55000, 65000, 75000, 85000, 95000, 105000, 115000, 125000, 135000, 145000],
        '1-2 years': [40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000],
        '3-5 years': [55000, 65000, 75000, 85000, 95000, 105000, 115000, 125000, 135000, 150000, 165000],
        '6-10 years': [65000, 80000, 95000, 110000, 125000, 140000, 155000, 170000, 185000, 200000, 215000],
        '11-16 years': [75000, 95000, 115000, 135000, 155000, 175000, 195000, 215000, 235000, 255000, 275000],
        '16+ years': [85000, 110000, 135000, 160000, 185000, 210000, 235000, 260000, 285000, 310000, 335000]
      },
      'usa': {
        '<1 year': [65000, 75000, 85000, 95000, 105000, 115000, 125000, 135000, 145000, 155000, 165000],
        '1-2 years': [60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000, 150000, 160000],
        '3-5 years': [75000, 85000, 95000, 105000, 115000, 125000, 135000, 145000, 155000, 170000, 185000],
        '6-10 years': [85000, 100000, 115000, 130000, 145000, 160000, 175000, 190000, 205000, 220000, 235000],
        '11-16 years': [95000, 115000, 135000, 155000, 175000, 195000, 215000, 235000, 255000, 275000, 295000],
        '16+ years': [105000, 130000, 155000, 180000, 205000, 230000, 255000, 280000, 305000, 330000, 355000]
      }
    },
    'python': {
      'australia': {
        '<1 year': [47000, 57000, 67000, 77000, 87000, 97000, 107000, 117000, 127000, 137000, 147000],
        '1-2 years': [42000, 52000, 62000, 72000, 82000, 92000, 102000, 112000, 122000, 132000, 142000],
        '3-5 years': [57000, 67000, 77000, 87000, 97000, 107000, 117000, 127000, 137000, 152000, 167000],
        '6-10 years': [67000, 82000, 97000, 112000, 127000, 142000, 157000, 172000, 187000, 202000, 217000],
        '11-16 years': [77000, 97000, 117000, 137000, 157000, 177000, 197000, 217000, 237000, 257000, 277000],
        '16+ years': [87000, 112000, 137000, 162000, 187000, 212000, 237000, 262000, 287000, 312000, 337000]
      },
      'usa': {
        '<1 year': [67000, 77000, 87000, 97000, 107000, 117000, 127000, 137000, 147000, 157000, 167000],
        '1-2 years': [62000, 72000, 82000, 92000, 102000, 112000, 122000, 132000, 142000, 152000, 162000],
        '3-5 years': [77000, 87000, 97000, 107000, 117000, 127000, 137000, 147000, 157000, 172000, 187000],
        '6-10 years': [87000, 102000, 117000, 132000, 147000, 162000, 177000, 192000, 207000, 222000, 237000],
        '11-16 years': [97000, 117000, 137000, 157000, 177000, 197000, 217000, 237000, 257000, 277000, 297000],
        '16+ years': [107000, 132000, 157000, 182000, 207000, 232000, 257000, 282000, 307000, 332000, 357000]
      }
    }
  };

  const getCurrentSalaryData = () => {
    const langKey = language.toLowerCase();
    const countryKey = country.toLowerCase();
    
    if (salaryData[langKey] && salaryData[langKey][countryKey]) {
      return salaryData[langKey][countryKey];
    }
    return salaryData['kotlin']['australia'];
  };

  const handleCalculate = () => {
    if (language && country) {
      setShowResults(true);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const currentSalaries = getCurrentSalaryData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-orange-500 text-white p-6">
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
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-black bg-opacity-30 border border-white border-opacity-20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select language</option>
                    <option value="Kotlin">Kotlin</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="C++">C++</option>
                    <option value="Go">Go</option>
                    <option value="Rust">Rust</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <select 
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-black bg-opacity-30 border border-white border-opacity-20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select country</option>
                    <option value="Australia">Australia</option>
                    <option value="USA">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
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
                onClick={handleCalculate}
                disabled={!language || !country}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Calculate Salary Range
              </button>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="bg-white text-gray-800 rounded-2xl p-6">
            {showResults && language && country ? (
              <div>
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
                      <div className="space-y-6">
                        {Object.entries(getCurrentSalaryData()).reverse().map(([exp, salaries], index) => {
                          const colors = ['#8B5CF6', '#EC4899', '#3B82F6', '#6B7280', '#F97316', '#10B981'];
                          const color = colors[5 - index]; // Reverse to match the original order
                          const maxSalary = 300000; // Set max range for scaling
                          
                          // Filter and limit salary data points for visualization
                          const displaySalaries = salaries.filter((_, i) => i % 2 === 0).slice(0, 15);
                          
                          return (
                            <div key={exp} className="flex items-center h-4">
                              <div className="flex items-center space-x-1 flex-1">
                                {/* Connecting line */}
                                <div className="relative flex-1 h-0.5" style={{ backgroundColor: color + '20' }}>
                                  {displaySalaries.map((salary, dotIndex) => {
                                    const position = (salary / maxSalary) * 100;
                                    
                                    return (
                                      <div
                                        key={dotIndex}
                                        className="absolute w-2 h-2 rounded-full -translate-y-0.5"
                                        style={{ 
                                          backgroundColor: color,
                                          left: `${Math.min(position, 95)}%`
                                        }}
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
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
                  <div className="flex flex-col justify-center space-y-3">
                    {Object.keys(getCurrentSalaryData()).reverse().map((exp, index) => {
                      const colors = ['#8B5CF6', '#EC4899', '#3B82F6', '#6B7280', '#F97316', '#10B981'];
                      const color = colors[5 - index];
                      
                      return (
                        <div key={exp} className="flex items-center space-x-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: color }}
                          ></div>
                          <span className="text-sm text-gray-600">{exp}</span>
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
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl opacity-30 mb-4">📊</div>
                <p className="text-lg text-gray-600">
                  Select a programming language and country to see salary estimates
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ITSalaryCalculator;
