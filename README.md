# Developer Salary Visualization

This is an interactive data visualization application that displays developer salary data from the JetBrains Developer Ecosystem Survey 2024. It is built with Next.js, TypeScript, and Recharts.

## Features

- **Interactive Filters**: Filter salary data by country and programming language.
- **Data Visualization**: View salary ranges based on years of experience.
- **Responsive Design**: The application is designed to work on various screen sizes.
- **Real Data Integration**: Uses actual survey data from JetBrains Developer Ecosystem Survey 2024.

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
- **Lucide React**: Beautiful & consistent icon toolkit.

## Project Structure

```
/
├── src/
│   ├── app/
│   │   ├── layout.tsx
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

## Data Source

The data used in this application is from the [JetBrains Developer Ecosystem Survey 2024](https://www.jetbrains.com/lp/devecosystem-2024/). The `calculatorData.json` file contains comprehensive salary data across different countries, programming languages, and experience levels.

## Features Overview

### Interactive Salary Calculator
- Select from multiple countries and programming languages
- Filter by professional experience levels
- Real-time visualization updates

### Data Visualization
- Horizontal bar charts showing salary ranges
- Scatter plots indicating median salaries
- Responsive design that works on all devices

### User Experience
- Modern, dark-themed UI with gradient backgrounds
- Smooth animations and transitions
- Clear data presentation with helpful tooltips

## Development

### Adding New Features
- Components are modular and reusable
- TypeScript ensures type safety throughout the application
- Follow the existing code patterns for consistency

### Data Updates
- Update `src/data/calculatorData.json` with new survey data
- Ensure data structure matches the TypeScript interfaces in `src/types/index.ts`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
