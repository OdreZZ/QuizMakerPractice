# QuizMaker Web Application

This project is a simple project built for a job application task. It uses React, Redux for store management, MSW for API mocking, Material UI for style and React Router.

The app revolves around a quiz making and solving app that mocks the API and allows for a seamless integration with a backend service.

## How to run?

In the project directory, you can run:

### `npm install`

To install all needed dependencies so that the app can be ran.

### `npm start`

Run the application.

Might need to run `npx msw init public/ --save` to generate service worker logic for mocking backend API.

### Connecting with backend

Need to change the `API_BASE_URL` constant in `api.js` to the appropriate backend URL to make it work without mocked data.

Need to disable mocking in `.env` and set `REACT_APP_MOCKED_SERVICE_WORKER` to `false`.
