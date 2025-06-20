# IT Salary Calculator

An interactive web application for exploring developer salary data from the JetBrains Developer Ecosystem Survey 2024.

## Features

- **Interactive Filtering**: Select programming language and country to view relevant salary data
- **Visual Salary Distribution**: Horizontal bar charts showing salary ranges across experience levels
- **Comprehensive Data**: Covers 12+ programming languages across 20+ countries
- **Experience-Based Analysis**: Salary breakdowns by years of professional experience
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Language**: TypeScript
- **Data**: Static JSON file with salary survey data

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd salary-calculator
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Data Structure

The application uses salary data organized by:

- **Countries**: United States, Germany, France, Brazil, United Kingdom, and more
- **Programming Languages**: JavaScript/TypeScript, Java/Kotlin, Python, C#, Go, Rust, etc.
- **Experience Levels**: <1 year, 1-2 years, 3-5 years, 6-10 years, 11-16 years, 16+ years

Each data point includes:
- Salary value (in thousands USD/year)
- Experience category
- Complete metadata (country, language, experience, formatted salary)

## Usage

1. **Select Programming Language**: Choose from the dropdown list of available languages
2. **Select Country**: Pick a country from the available options
3. **View Results**: The chart automatically updates to show salary distribution
4. **Interpret Data**: 
   - Each horizontal bar represents an experience level (L1-L6)
   - Dots show salary data points (min, Q1, median, Q3, max)
   - X-axis shows salary ranges in thousands of dollars

## Features Explained

### Salary Visualization
- **Range Bars**: Show the full salary range for each experience level
- **Statistical Markers**: Display quartiles and median values
- **Dynamic Scaling**: Chart scales automatically based on data range

### Experience Levels
- **L1**: Less than 1 year
- **L2**: 1-2 years  
- **L3**: 3-5 years
- **L4**: 6-10 years
- **L5**: 11-16 years
- **L6**: 16+ years

### Data Processing
- Real-time statistical calculations (min, max, median, quartiles)
- Automatic filtering based on selected criteria
- Responsive chart scaling

## Deployment

The application can be deployed to any platform that supports Next.js:

### Vercel (Recommended)
\`\`\`bash
npm run build
vercel deploy
\`\`\`

### Other Platforms
\`\`\`bash
npm run build
npm start
\`\`\`

## Data Source

Data is sourced from the JetBrains Developer Ecosystem Survey 2024, which surveyed over 30,000 developers across 180+ countries. The survey provides comprehensive insights into developer salaries, technologies, and industry trends.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- JetBrains for providing the Developer Ecosystem Survey data
- The developer community for participating in the survey
- shadcn/ui for the excellent component library
