# YexPlanner

This a personnal project to use as a planner with my wife to have an overview of our activities by type and cost

The goal was to create a useful project and practice Angular last features (signals, computed, etc) and discover Firebase for both Auth and Firestore storage services.

You're free to have a look and give me feedbacks if you want to :)
Have great day!

## 🔑 Configure Firebase for Firestore and Auth

Before to lauch the project you need:

- Head to [Firebase console](https://console.firebase.google.com/)
- Create a project and add:
  - a Firestore database
  - Authentication with Google Auth Provider
- Go to your project configuration
- create a `.env` file at the root of your project (you have a `.env.example` file in the project) with the information from your project configuration

Then you're free to go, you can run `npm start`

Side note:
There is a whitelist of users that are allowed to access the app, make sure to configure it properly otherwise you won't be able to access the app :)

It's currently hosted on Vercel on my side, you can easily add ENV variable corresponding to your .env file and you're good to go ✨

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.4.
