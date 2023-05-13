# User Management App

This is a simple Next.js application for creating and viewing users. The application is built with Typescript, and uses tRPC for server communication and React Hook Form for form handling.

## Features

- User creation: The app allows you to create new users by submitting a form. The form includes fields for the user's first name, last name, country, password, and age.
- User display: The app displays a list of all users that have been created. This list updates in real-time as new users are added.

## How to Run

To run this application, you first need to install the necessary dependencies. You can do this by running `npm install` or `yarn install` in the root directory of the project.

After the dependencies have been installed, you can start the application by running `npm run dev` or `yarn dev`. This will start the application in development mode, and you can access it by navigating to `http://localhost:3000` in your browser.

## Code Overview

The main logic of the application is contained in the `Home` component. This component fetches the current list of users using a tRPC hook, and provides a form for creating new users. When the form is submitted, the new user data is sent to the server using another tRPC hook, and the list of users is invalidated to ensure that it updates with the newly added user.

The `FormWrapper` component is a reusable component for creating form fields. It takes the register function from React Hook Form, a label name, and a field name as props, and renders a labeled input field.

The application uses Tailwind CSS for styling, and applies various utility classes to style the form and user list.

## Future Improvements

Possible future improvements for this application could include:

- Form validation: The form currently does not have any validation. Implementing validation would improve the user experience and ensure that the data sent to the server is in the correct format.
- Error handling: The application does not currently handle errors that might occur when communicating with the server. Implementing error handling would make the application more robust.
- Authentication: The application currently does not have any form of authentication. Adding authentication would make the application more secure, and would allow for user-specific features.
