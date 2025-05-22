How to run the project?
To run the project locally run the command npm run dev

Pages:
Car Listing Page - Implements server-side rendering for displaying the list of cars with filtering, sorting, and pagination features.
Car Details Page - Implements server-side rendering to display detailed information about a selected car.

Components:
Homepage - Acts as the parent component for other components like CarList, Filter, Sort, and Pagination. It manages and passes data to these components.
CarList - Displays a list of cars. Each car’s information is rendered using data passed from the Homepage.
CarDetails - Displays detailed information about a specific car on the Car Details Page.
Filter - Provides filtering options (e.g., brand, model, year) to narrow down the car list.
Sort - Allows users to sort the car list based on various attributes like price, year, etc.
Pagination - Handles pagination of the car list for better navigation across multiple pages.
Search - Allows searching for cars based on keywords.
Header - The top navigation bar that includes the brand name and a search input.

Utils:
Constants - Stores all constant values used across the application (e.g., count per page, static options).
routes - Contains BASE URL and end points of API.

Slice - Contains Redux slices for state management:

CarListSlice: Stores and manages the data of all available cars.
FilterSlice: Stores and manages the current filters, search terms, sort options, and pagination data.

ProcessCarData - Contains the logic for filtering, sorting, and searching the car data based on current state.