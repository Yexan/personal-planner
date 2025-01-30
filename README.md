# YexPlanner

This a personnal project to use as a planner with my wife to have an overview of our activities by type and cost

The goal was to create a useful project and practice Angular last features (signals, computed, etc) and discover Firebase for both Auth and Firestore storage services.

You're free to have a look and give me feedbacks if you want to :)
Have great day!

## 🔑 Configure Firebase for Firestore and Auth

Before to lauch the project you need:

1️⃣ **`src/app/config/environment.ts`** (Copy `environment.example.ts` Fill with your Firebase infos)
2️⃣ **`src/app/auth/auth.whitelist.ts`** (Copy `auth.whitelist.example.ts` Add you allowed email addresses)

```sh
cp src/app/config/environment.example.ts src/app/config/environment.ts
cp src/app/auth/auth.whitelist.example.ts src/app/auth/auth.whitelist.ts
```

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.
