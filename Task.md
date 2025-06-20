# Building an Interactive Developer Salary Visualization App

This guide will walk you through creating an interactive data visualization application based on the JetBrains Developer Ecosystem Survey 2024. We'll use Next.js for the framework, TypeScript for type safety, and Recharts for creating the visualizations. This approach ensures a robust, scalable, and maintainable application that aligns with modern web development best practices.

## 1. Project Structure

Create a structured and organized folder layout inside the src directory to ensure our codebase is clean and easy to navigate:

- **`/src/app`**: This is where our main page and any additional routes will be located.
- **`/src/components`**: This directory will house all our reusable React components, such as filters and charts.
- **`/src/data`**: We'll store our static data, including the calculatorData.json file, in this folder.
- **`/src/types`**: To maintain type safety, we'll define our TypeScript types and interfaces here.

Create these directories within your src folder. This well-defined structure will make it easier to locate and manage files as the project grows.

## 2. Data Handling and Type Definitions

With our project structure in place, the next step is to handle the data and define the necessary TypeScript types. Start by placing the calculatorData.json file inside the src/data directory.

### TypeScript Interfaces

Define the types that will represent our data structure in the `src/types/index.ts` file. These types will ensure that we are working with our data in a type-safe manner, which helps prevent common errors and improves the overall quality of our code.

The main interfaces needed are:
- **SalaryData**: Represents individual salary data points with metadata
- **LanguageData**: Contains salary data for a specific language
- **CountryData**: Maps languages to their respective data
- **CalculatorData**: The root structure mapping countries to their data

## 3. Creating the UI Components

With our data and types ready, we can now start building the UI components. We will create two main components: Filters for user selections and SalaryChart for displaying the data.

### Filters Component

The Filters component will allow users to select the country and programming language they want to visualize. Create a new file at `src/components/Filters.tsx`.

This component:
- Receives lists of countries and languages as props
- Renders two dropdown menus with proper styling
- Triggers onChange events when users make selections
- Uses Framer Motion for smooth animations
- Implements responsive design with Tailwind CSS

### Salary Chart Component

Next, create the SalaryChart component at `src/components/SalaryChart.tsx`, which will be responsible for rendering the data visualization.

This component:
- Uses the Recharts library to create a horizontal bar chart
- Takes salary data as a prop and maps it to chart-friendly format
- Includes customized tooltips showing salary ranges
- Implements responsive design principles
- Uses Framer Motion for entrance animations

## 4. Main Page Integration

Now that we have our components, integrate them into the main page. Open the `src/app/page.tsx` file and implement the following functionality:

### State Management
- Use useState hook to manage selected country and language
- Initialize with default values (e.g., "United States" and "JavaScript / TypeScript")
- Handle state updates when user makes selections

### Data Flow
- Extract available countries from the calculator data
- Filter available languages based on selected country
- Pass filtered data to the SalaryChart component
- Handle cases where no data is available

### User Interface
- Create a centered layout with maximum width constraints
- Include a clear title and subtitle
- Add responsive padding for different screen sizes
- Implement error handling for missing data

## 5. Running the Application

With all the pieces in place, start the development server using the npm run dev command. This will start the development server, and you can view your application by navigating to http://localhost:3000 in your web browser.

## 6. Application Features

### Interactive Functionality
- **Country Selection**: Choose from available countries in the dataset
- **Language Filtering**: Select programming languages based on chosen country
- **Dynamic Updates**: Chart updates automatically when selections change
- **Responsive Design**: Works seamlessly across different screen sizes

### Data Visualization
- **Horizontal Bar Chart**: Shows salary ranges by experience level
- **Custom Tooltips**: Display detailed salary information on hover
- **Professional Styling**: Dark theme with modern design elements
- **Smooth Animations**: Enhanced user experience with motion effects

### Technical Implementation
- **Type Safety**: Full TypeScript implementation with proper interfaces
- **Component Architecture**: Modular, reusable components
- **Modern React Patterns**: Hooks-based state management
- **Performance Optimization**: Responsive containers and efficient rendering

## 7. Technologies Used

### Core Framework
- **Next.js**: React framework for production-ready applications
- **TypeScript**: Enhanced JavaScript with static type checking
- **React**: Component-based user interface library

### Visualization and Styling
- **Recharts**: Composable charting library for React
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React

### Data Source
- **JetBrains Developer Ecosystem Survey 2024**: Real-world salary data
- **Static JSON**: Efficient data storage and retrieval

## 8. Best Practices Implemented

### Code Organization
- Clear separation of concerns between components
- Consistent file naming and structure
- Proper TypeScript interface definitions
- Modular component design

### User Experience
- Intuitive filtering interface
- Responsive design for all devices
- Loading states and error handling
- Smooth transitions and animations

### Development Standards
- Type-safe development with TypeScript
- Modern React patterns and hooks
- Consistent code formatting and style
- Comprehensive documentation

## 9. Future Enhancements

### Potential Features
- **Additional Chart Types**: Implement pie charts and line graphs
- **Advanced Filtering**: Add experience level and company size filters
- **Data Export**: Allow users to export chart data
- **Comparison Views**: Side-by-side country or language comparisons
- **Historical Data**: Track salary trends over time

### Technical Improvements
- **Unit Testing**: Comprehensive test coverage for components
- **Performance Optimization**: Code splitting and lazy loading
- **Accessibility**: Enhanced ARIA labels and keyboard navigation
- **Internationalization**: Multi-language support
- **Progressive Web App**: Offline functionality and installation

## Conclusion

This comprehensive guide provides you with all the necessary steps to successfully create an interactive developer salary visualization application. The application demonstrates modern web development practices using Next.js, TypeScript, and interactive data visualization with Recharts. The modular architecture ensures maintainability and scalability for future enhancements.
