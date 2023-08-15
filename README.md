# Business Day Checker

This test project includes tests for an API that handles calculations and operations related to business dates. It includes tests for the routes and functions implemented in the project.

### Project Structure
The project consists of the following files:
* business_dates.js: The main file that defines the routes for the business dates API.
* business_dates.test.js: The test file that includes test cases for the API routes.
* dates.js: A library file that handles calculations and operations related to business dates.
* dates.test.js: The test file for the library functions in lib/dates.js.


### Setup
To set up the project and run the tests, follow these steps:
1. Clone the repository to your local machine.
2. Install the dependencies by running `npm install` in the project directory.
3. Run the tests by executing the command `npm test`.


### Testing
The test cases cover various scenarios for the business dates API. They are organized into different sections based on the API routes and functionality being tested.

GET /isBusinessDay: Tests for determining if a given date is a business day.
* If a date parameter is provided:
  * Should return true when the provided date is a business day.
  * Should return false when the provided date is not a business day.
* If the date parameter is missing:
  * Should return an error message indicating that a valid date is required.

GET /settlementDate: Tests for calculating the settlement date based on an initial date and a delay.
* If correct parameters are provided:
  * Should calculate the correct settlement date in the specified country.
  * If no holidays/weekends exist in the given range:
    * Should return the settlement date with zero holiday and weekend days.
  * If holidays/weekends exist in the given range:
    * Should return the settlement date with non-zero holiday and weekend days.
* If parameters are missing:
  * If the initial date is missing and the delay is provided:
    * Should return only the business date as null.
* If the initial date is provided and the delay is missing:
  * Should return an error message.
* If both the initial date and delay are missing:
  * Should return the business date as null and the total days as null.

### Dependencies
The project relies on the following dependencies:
* express: A web framework for Node.js used to define and handle API routes.
* supertest: A library for testing Node.js HTTP servers.
* date-holidays: A library for working with holidays in different countries.
* luxon: A library for working with dates and times in JavaScript.
* jest: A testing framework for JavaScript.

These dependencies are automatically installed when running npm install.

### Conclusion
This test project demonstrates the usage of automated tests for the business dates API. The test cases cover various scenarios and help ensure the correctness of the API routes and library functions.
