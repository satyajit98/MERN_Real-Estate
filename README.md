# [Real_Estate Web Application](https://satya-mern-estate.onrender.com)

This project is a **Real Estate** platform built using the **MERN** stack (MongoDB, Express, React, Node.js). The application allows users to browse, list, and manage real estate properties.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contact](#contact)

## Features

- **User Authentication**: Sign up, log in, and manage user profiles.
- **Property Listings**: Browse, search, and filter real estate listings.
- **Profile Dashboard**: Manage property listings and users.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Property Details**: View detailed information about each property.

## Demo

A live demo of the project can be found [here](https://satya-mern-estate.onrender.com).

## Installation

1. Clone the repository:

```bash
git clone https://github.com/satyajit98/MERN_Real-Estate.git
```

2. Install server dependencies:

```bash
cd MERN_Real-Estate
npm install
```

3. Install client dependencies:

```bash
cd ../frontend
npm install
```

4. Create a **`.env`** file in the **`MERN_Real-Estate`** directory with the following variables:

```plaintext
MONGO=your_mongo_uri
SECRET=your_jwt_secret
```

5. Create a **`.env`** file in the **`frontend`** directory with the following variables:

```plaintext
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

6. Start the development server:

- Backend:

```bash
npm run dev
```

- Frontend:

```bash
cd frontend
npm run dev
```

7. Open your browser and visit **`http://localhost:5173/`**

## Technologies Used

- Frontend

  - React.js
  - Redux
  - Tailwind css

- Backend

  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT Authentication
  - Google Authentication

- Others

  - Firebase (for image uploads)
  - Postman (for api testing)

## Project Structure

```plaintext
MERN-RealEstate/
│
├── backend/               # Node.js + Express backend
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── controllers/       # Route handlers
│   └── utils/             # Authentication middleware and Utility error
│
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store and actions
│
└── README.md              # Project documentation
```

## Contact

- **SATYAJIT BHUNIA** - mesatya2000@gmail.com
- **Project Link:** https://github.com/satyajit98/MERN_Real-Estate
