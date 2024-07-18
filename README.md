# Fake User Data Generator App

This project consists of a React frontend and a backend API for generating and displaying fake user data based on selected criteria, including region and error simulation per record.

## Features

- Select region for user data
- Specify the number of errors per record
- Generate random user data
- Infinite scrolling table to display user data
- Backend API for data generation and retrieval

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

### Frontend

1. Clone the repository:
    ```bash
    git clone https://github.com/enayet329/Fake-user-data-generator
    cd Fake-user-generator
    ```

2. Install dependencies:
    ```bash
    npm install
    ```
### Backend

1. Navigate to the backend directory:
    ```bash
    cd ./server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Running the App

### Frontend

1. Start the development server:
    ```bash
    npm install
    ```
    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`

### Backend

1. Start the backend server:
    ```bash
    node index.js
    ```

The backend will run on `http://localhost:5000`

## Project Structure

- `frontend/`
  - `src/`
    - `App.js` - Main component that includes `Controls` and `RecordsTable`
- `component/`
    - `userTable.js` - Component to display the user data table with infinite scrolling
    - `ControlsPanales.js` - Component for user input to select region, errors, and seed
- `hook/`
    - `useUserData.js` - Hook for faching user data from server
    - `errorHandler.css` - Handdle user introduces
- `server/`
  - `index.js` - Entry point for the backend server

## API Endpoints

- `GET /api/generate` - Generate new fake user data
  - Body: `{ region, errors, seed, count }`
- `GET /api/records` - Retrieve generated records
  - Query parameters: `page`, `limit`

## Usage

1. Start both the frontend and backend servers.
2. In the frontend app, use the control panel to:
   - Select a region for user data generation
   - Specify the number of errors per record
   - Optionally set a seed for consistent random data generation
3. Click the "Generate" button to create random user data based on your settings.
4. The frontend will send a request to the backend API to generate the data.
5. The generated data will appear in the table below.
6. Scroll through the table to view all generated records. The table supports infinite scrolling, fetching more data from the backend as needed.

## Authors
- **Md Enayet Hossain**
  - Email: md.enayet.hossain329@gmail.com

## Contact
For inquiries or support, visit [Md Enayet Hossain's Portfolio](https://portfolio-enayet-hossain.vercel.app/home).


