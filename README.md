# User Management Application

This is a CRUD (Create, Read, Update, Delete) User Management Application built using **React**, **Vite**, and **Tailwind CSS**. The application interacts with the **JSONPlaceholder API** to manage user data and also includes **Toaster Notifications** and a **Loader** for better user experience.

## Live link : https://user-management-webdev.netlify.app/

## Features

- **Fetch Users**: Retrieve user data from JSONPlaceholder API.
- **Create User**: Add new users.
- **Update User**: Edit and update existing user information.
- **Delete User**: Remove users from the list.
- **Toaster Notifications**: Feedback for successful/failed actions.
- **Loader**: Display a loader during data fetching and other operations.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **API**: JSONPlaceholder API
- **Notifications**: Toaster for success/error messages
- **Loader**: Spinner component to indicate loading state

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/user-management-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd user-management-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser:

   ```bash
   http://localhost:5173
   ```

## API Integration

The app uses the **JSONPlaceholder API** for managing users. You can modify API calls to a real backend once it's available.

- **GET** users: Fetches a list of users.
- **POST** user: Creates a new user.
- **PUT** user: Updates an existing user.
- **DELETE** user: Removes a user.

## Toaster & Loader

- **Toaster** is used to notify users about the success or failure of operations like adding, updating, or deleting users.
- **Loader** is displayed when fetching data from the API or during form submissions.



## Dependencies

- **React**
- **Vite**
- **Tailwind CSS**
- **React Toaster** (or any other library for notifications)
- **Axios** (for API calls)

## License

This project is licensed under the MIT License.

