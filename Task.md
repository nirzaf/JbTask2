# Building an Interactive Developer Salary Visualization App

This guide will walk you through creating an interactive data visualization application based on the JetBrains Developer Ecosystem Survey 2024. We'll use Next.js for the framework, TypeScript for type safety, and Recharts for creating the visualizations. This approach ensures a robust, scalable, and maintainable application that aligns with modern web development best practices.

### Project Structure

Now, let's create a structured and organized folder layout inside the src directory to ensure our codebase is clean and easy to navigate:

- **`/src/app`**: This is where our main page and any additional routes will be located.
- **`/src/components`**: This directory will house all our reusable React components, such as filters and charts.
- **`/src/data`**: We'll store our static data, including the calculatorData.json file, in this folder.
- **`/src/types`**: To maintain type safety, we'll define our TypeScript types and interfaces here.

Create these directories within your src folder. Your project structure should look something like this:

```
/
├── src/
│   ├── app/
│   │   └── page.tsx
│   ├── components/
│   │   ├── Filters.tsx
│   │   └── SalaryChart.tsx
│   ├── data/
│   │   └── calculatorData.json
│   └── types/
│       └── index.ts
├── package.json
└── tsconfig.json
```

This well-defined structure will make it easier to locate and manage files as the project grows.

## 2. Data Handling and Type Definitions

With our project structure in place, the next step is to handle the data and define the necessary TypeScript types. Start by placing the calculatorData.json file inside the src/data directory.

### TypeScript Interfaces

Now, let's define the types that will represent our data structure. In the `src/types/index.ts` file, add the following code:

```typescript
export interface SalaryData {
  value: number;
  category: string;
  metadata: {
    Country: string;
    Language: string;
    Experience: string;
    Salary: string;
  };
}

export interface LanguageData {
  entries: SalaryData[];
  yGroups: string[];
  xRangeGroups: [number, number][];
  xRange: string[];
}

export interface CountryData {
  [language: string]: LanguageData;
}

export interface CalculatorData {
  [country: string]: CountryData;
}
```

These types will ensure that we are working with our data in a type-safe manner, which helps prevent common errors and improves the overall quality of our code.

## 3. Creating the UI Components

With our data and types ready, we can now start building the UI components. We will create two main components: Filters for user selections and SalaryChart for displaying the data.

### Filters Component

The Filters component will allow users to select the country and programming language they want to visualize. Create a new file at `src/components/Filters.tsx` and add the following code:

```tsx
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
```

This component receives lists of countries and languages as props and renders two dropdown menus. When a user makes a selection, it triggers the onChange event, which will be handled in our main page component.

### Salary Chart Component

Next, let's create the SalaryChart component, which will be responsible for rendering the data visualization. Create a new file at `src/components/SalaryChart.tsx` and add the following code:

```tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { LanguageData } from "@/types";

interface SalaryChartProps {
  data: LanguageData;
}

export default function SalaryChart({ data }: SalaryChartProps) {
  const chartData = data.yGroups.map((group, index) => ({
    name: group,
    range: data.xRangeGroups[index],
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-96 bg-gray-900 p-4 rounded-lg shadow-lg"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={chartData} margin={{ top: 20, right: 30, left: 50, bottom: 5 }}>
          <XAxis type="number" stroke="#888888" />
          <YAxis type="category" dataKey="name" stroke="#888888" width={100} />
          <Tooltip
            contentStyle={{ backgroundColor: "#333", border: "1px solid #555" }}
            labelStyle={{ color: "#fff" }}
            formatter={(value: any, name: any, props: any) => {
                const [min, max] = props.payload.range;
                return `$${min}K - $${max}K`;
            }}
          />
          <Bar dataKey="range" fill="#8884d8" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
```

This component uses the Recharts library to create a horizontal bar chart. It takes the salary data as a prop and maps it to a format that Recharts can understand. The Tooltip is customized to display the salary range when a user hovers over a bar.

## 4. Bringing It All Together

Now that we have our components, let's integrate them into our main page. Open the `src/app/page.tsx` file and replace its content with the following:

```tsx
"use client";

import { useState, useEffect } from "react";
import Filters from "@/components/Filters";
import SalaryChart from "@/components/SalaryChart";
import { CalculatorData, CountryData, LanguageData } from "@/types";
import calculatorData from "@/data/calculatorData.json";

export default function Home() {
  const [data, setData] = useState<CalculatorData>(calculatorData);
  const [selectedCountry, setSelectedCountry] = useState<string>("United States");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("JavaScript / TypeScript");

  const countries = Object.keys(data);
  const languages = Object.keys(data[selectedCountry] || {});

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    const firstLanguage = Object.keys(data[country])[0];
    setSelectedLanguage(firstLanguage);
  };

  const chartData = data[selectedCountry]?.[selectedLanguage];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 bg-gray-950 text-white">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-center">Developer Salary Visualization</h1>
        <p className="text-lg text-gray-400 mb-8 text-center">
          Based on the JetBrains Developer Ecosystem Survey 2024
        </p>
        <Filters
          countries={countries}
          languages={languages}
          selectedCountry={selectedCountry}
          selectedLanguage={selectedLanguage}
          onCountryChange={handleCountryChange}
          onLanguageChange={setSelectedLanguage}
        />
        {chartData ? (
          <SalaryChart data={chartData} />
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <p>No data available for the selected criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}
```

In this main component, we use the useState hook to manage the state of the selected country and language. The useEffect hook ensures that when a new country is selected, the list of available languages is updated accordingly. The selected data is then passed to the SalaryChart component for rendering.

## 5. Running the Application

With all the pieces in place, it's time to run the application. In your terminal, make sure you are in the project's root directory and run the following command:

```bash
npm run dev
```

This will start the development server, and you can view your application by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.

## README.md

To complete the project, here is a README.md file that you can include in the root of your project:

```markdown
# Developer Salary Visualization

This is an interactive data visualization application that displays developer salary data from the JetBrains Developer Ecosystem Survey 2024. It is built with Next.js, TypeScript, and Recharts.

## Features

- **Interactive Filters**: Filter salary data by country and programming language.
- **Data Visualization**: View salary ranges based on years of experience.
- **Responsive Design**: The application is designed to work on various screen sizes.

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/salary-visualization.git
   cd salary-visualization
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered and static web applications.
- **TypeScript**: A typed superset of JavaScript that enhances code quality and maintainability.
- **Recharts**: A composable charting library built on React components.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Framer Motion**: A library for creating production-ready animations.

## Data Source

The data used in this application is from the [JetBrains Developer Ecosystem Survey 2024](https://www.jetbrains.com/lp/devecosystem-2024/). The `calculatorData.json` file is a static representation of this data.

```

## Conclusion

This comprehensive guide provides you with all the necessary steps and code to successfully complete the task. The application demonstrates modern web development practices using Next.js, TypeScript, and interactive data visualization with Recharts. Feel free to customize the styling and add more features as you see fit!

### Next Steps

- Add more chart types (pie charts, line charts)
- Implement data filtering by experience level
- Add export functionality for charts
- Enhance the UI with more interactive elements
- Add unit tests for components
