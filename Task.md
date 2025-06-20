# Building an Interactive Developer Salary Visualization App

This guide will walk you through creating an interactive data visualization application based on the JetBrains Developer Ecosystem Survey 2024. We'll use Next.js for the framework, TypeScript for type safety, and Recharts for creating the visualizations. This approach ensures a robust, scalable, and maintainable application that aligns with modern web development best practices.

### Project Structure

Now, let's create a structured and organized folder layout inside the src directory to ensure our codebase is clean and easy to navigate:

- **`/src/app`**: This is where our main page and any additional routes will be located.
- **`/src/components`**: This directory will house all our reusable React components, such as filters and charts.
- **`/src/data`**: We'll store our static data, including the calculatorData.json file, in this folder.
- **`/src/types`**: To maintain type safety, we'll define our TypeScript types and interfaces here.

Create these directories within your src folder. This well-defined structure will make it easier to locate and manage files as the project grows.

## 2. Data Handling and Type Definitions

With our project structure in place, the next step is to handle the data and define the necessary TypeScript types. Start by placing the calculatorData.json file inside the src/data directory.

### TypeScript Interfaces

Now, let's define the types that will represent our data structure in the `src/types/index.ts` file.

These types will ensure that we are working with our data in a type-safe manner, which helps prevent common errors and improves the overall quality of our code.

## 3. Creating the UI Components

With our data and types ready, we can now start building the UI components. We will create two main components: Filters for user selections and SalaryChart for displaying the data.

### Filters Component

The Filters component will allow users to select the country and programming language they want to visualize. Create a new file at `src/components/Filters.tsx`.

This component receives lists of countries and languages as props and renders two dropdown menus. When a user makes a selection, it triggers the onChange event, which will be handled in our main page component.

### Salary Chart Component

Next, let's create the SalaryChart component, which will be responsible for rendering the data visualization. Create a new file at `src/components/SalaryChart.tsx`.

This component uses the Recharts library to create a horizontal bar chart. It takes the salary data as a prop and maps it to a format that Recharts can understand. The Tooltip is customized to display the salary range when a user hovers over a bar.

## 4. Bringing It All Together

Now that we have our components, let's integrate them into our main page. Open the `src/app/page.tsx` file and implement the main component logic.

In this main component, we use the useState hook to manage the state of the selected country and language. The useEffect hook ensures that when a new country is selected, the list of available languages is updated accordingly. The selected data is then passed to the SalaryChart component for rendering.

## 5. Running the Application

With all the pieces in place, it's time to run the application. In your terminal, make sure you are in the project's root directory and run the development command.

This will start the development server, and you can view your application by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.

## README.md

To complete the project, create a README.md file in the root of your project that includes information about the project features, setup instructions, and technologies used.

## Conclusion

This comprehensive guide provides you with all the necessary steps and code to successfully complete the task. The application demonstrates modern web development practices using Next.js, TypeScript, and interactive data visualization with Recharts. Feel free to customize the styling and add more features as you see fit!

### Next Steps

- Add more chart types (pie charts, line charts)
- Implement data filtering by experience level
- Add export functionality for charts
- Enhance the UI with more interactive elements
- Add unit tests for components
