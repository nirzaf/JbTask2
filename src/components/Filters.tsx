"use client";

import { motion } from "framer-motion";

interface FiltersProps {
  countries: string[];
  languages: string[];
  selectedCountry: string;
  selectedLanguage: string;
  onCountryChange: (country: string) => void;
  onLanguageChange: (language: string) => void;
}

export default function Filters({
  countries,
  languages,
  selectedCountry,
  selectedLanguage,
  onCountryChange,
  onLanguageChange,
}: FiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row gap-4 mb-8"
    >
      <div className="flex-1">
        <label htmlFor="country-select" className="block text-sm font-medium text-gray-400 mb-2">
          Country
        </label>
        <select
          id="country-select"
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition"
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label htmlFor="language-select" className="block text-sm font-medium text-gray-400 mb-2">
          Language
        </label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 transition"
        >
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
}