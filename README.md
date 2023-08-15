# EverAfter❤️: A Wedding Management Web App

## 1. Introduction

- **Purpose of the Project:** A web application designed to streamline the planning and management of weddings for wedding planners, brides, and grooms.
- **Target Audience:** Wedding planners, brides, and grooms.
- **Technologies Used:** React with TypeScript, NestJS, MUI.
- **Overview of the Main Features:** User login/registration, adding/managing events. Businesses can manage multiple events while private users manage only one event.

## 2. Installation and Setup

- **Frontend Installation:** Developed in React with TypeScript. You can clone the repository from [here](https://github.com/OriGuyUniqueDev/everAfterFrontMui.git).
- **Backend Installation:** The backend is developed with NestJS. You can clone the repository from [here](https://github.com/OriGuyUniqueDev/everAfterServer.git).
- **Live Site:** Access the live site [here](everafter.up.railway.app).

## 3. Usage Guide

- **Demo Private User:** Username: test@gmail.com, Password: 12345678.
- **Demo Business User:** Username: testbus@gmail.com, Password: 12345678

## 4. Development Environment

- **Frontend Development:**

  - **Language:** TypeScript
  - **Framework:** React with Vite
  - **UI Library:** MUI
  - **Development Tools:** axios, formik, moment, React Router Dom, react-toastify, yup, eslint and Vite

- **Backend Development:**

  - **Language:** TypeScript
  - **Framework:** NestJS
  - **Database:** MongoDB and for the live site MongoDB Atlas
  - **API Design:**

  ### User Endpoints

- **Login:**
- `POST /login` - Authenticates a user.

- **User Management:**
  - `POST /registerMe` - Registers a new user.
  - `GET /` - Retrieves all users (Admin and Business roles).
  - `GET /:email` - Retrieves a specific user by email.
  - `PATCH /:email` - Updates a specific user.
  - `DELETE /:email` - Removes a specific user (Admin role only).

### Event Endpoints

- **Event Management:**
  - `GET /:id` - Retrieves a specific event by ID.
  - `GET /allBusinessEvent/:id` - Retrieves all events for a business user.
  - `PATCH /:id` - Updates a specific event.
  - `PATCH /updateExpanse/:id` - Updates an event's expenses.
  - `PATCH /updateGuest/:id` - Updates an event's guest list.
  - `PATCH /updateTask/:id` - Updates an event's tasks.
  - `PATCH /deleteExpanse/:eventId/:expanseId` - Deletes an expense from an event.
  - `PATCH /deleteGuest/:eventId/:guestId` - Deletes a guest from an event.
  - `PATCH /deleteTask/:eventId/:taskId` - Deletes a task from an event.
  - `DELETE /:id` - Removes a specific event.

Note: Several endpoints require specific roles and authorization, as defined in the code.

- ## Authentication and Authorization
  - **Role-Based Authorization:** Different roles (Admin, Business, Private) have access to different endpoints, providing a level of control and segmentation in the application.
  - **Authentication:** Utilizes Passport for authentication, specifically using email as the primary identifier, ensuring secure login and access management.
  - **User Authorization:** User roles are defined and managed to provide access control, ensuring that users only have access to the features and data relevant to their role.

## Contribution Guidelines

### Usage and Licensing

This project is available for personal use and study purposes only. Commercial usage or modification for personal projects without approval is not permitted. If you would like to request permission for other uses, please contact me for approval and attribution requirements.

### Contributing

We welcome contributions to this project. If you're interested in contributing, you can:

- **Clone the Project:** Feel free to clone the project repositories and explore the code. Make any changes or enhancements and submit a pull request for approval.
  - [Frontend Repository](https://github.com/OriGuyUniqueDev/everAfterFrontMui.git)
  - [Backend Repository](https://github.com/OriGuyUniqueDev/everAfterServer.git)
- **Contact via Email:** If you have any questions, suggestions, or would like to discuss collaboration, you can reach out to me directly at [origuydev@gmail.com](mailto:origuydev@gmail.com).

Please ensure that your contributions align with the usage and licensing terms outlined above. Your input and participation are valued, and I look forward to collaborating with you on this project!

## 7. Contact Information

- **Email:** origuydev@gmail.com
- Open for work and collaboration.
