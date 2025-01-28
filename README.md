# Sofia AI

Sofia AI is a modern web application built with React, Tailwind CSS, and Framer Motion. This application provides a seamless user experience with features like authentication, chat interface, and user profile management.

## Table of Contents

- [Dependencies](#dependencies)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Components](#components)
- [Routing](#routing)
- [Scripts](#scripts)

## Dependencies

The project relies on the following dependencies:

```json
"dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11.0.3",
    "react-intersection-observer": "^9.8.0",
    "react-router-dom": "^6.22.0",
    "react-icons": "^5.0.1",
    "react-hot-toast": "^2.4.1"
}
```

For development, the following tools are used:

```json
"devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.17",
    "eslint": "^9.9.1",
    "eslint-plugin-react": "^7.35.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.4.2"
}
```

## Project Structure

The project is organized as follows:

```
/src
    /components
        Header.jsx
        Footer.jsx
        /auth
            Login.jsx
            SignUp.jsx
        /pages
            LandingPage.jsx
            ChatPage.jsx
            Profile.jsx
    App.jsx
    index.jsx
    tailwind.config.js
    package.json
```

## Pages

### LandingPage

The `LandingPage` component serves as the entry point for unauthenticated users. It includes the `Hero` and `AuthSection` components.

### ChatPage

The `ChatPage` component contains the `ChatInterface` where users can interact with the AI assistant.

### Profile

The `Profile` component displays user information and settings.

## Components

### Header

The `Header` component provides navigation and authentication options.

### Footer

The `Footer` component contains footer information.

### Login

The `Login` component handles user login functionality.

### SignUp

The `SignUp` component handles user registration functionality.

### AuthSection

The `AuthSection` component toggles between `Login` and `SignUp` components.

### Hero

The `Hero` component displays the main hero section on the landing page.

### ChatInterface

The `ChatInterface` component manages the chat functionality with the AI assistant.

## Routing

The application uses `react-router-dom` for routing. The routes are defined in `App.jsx`:

- `/`: Redirects to `/chat` if authenticated, otherwise shows `LandingPage`.
- `/chat`: Shows `ChatPage` if authenticated, otherwise redirects to `/`.
- `/profile`: Shows `Profile` if authenticated, otherwise redirects to `/`.

## Scripts

The following scripts are available:

- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `lint`: Runs ESLint to check for code quality.
- `preview`: Previews the production build.

To start the development server, run:

```bash
npm run dev
```

To build the application for production, run:

```bash
npm run build
```

To preview the production build, run:

```bash
npm run preview
```

To lint the code, run:

```bash
npm run lint
```

## Tailwind CSS Configuration

The Tailwind CSS configuration is defined in `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#8957e5",
                secondary: "#a371f7",
                dark: "#0d1117",
                darker: "#010409",
                "gray-dark": "#161b22",
                text: "#e6edf3",
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'gradient': 'gradient 8s linear infinite',
                'slide-up': 'slide-up 0.5s ease-out',
                'slide-down': 'slide-down 0.5s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': {
                        transform: 'translateY(0)',
                    },
                    '50%': {
                        transform: 'translateY(-20px)',
                    },
                },
                'slide-up': {
                    '0%': {
                        transform: 'translateY(100px)',
                        opacity: '0',
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: '1',
                    },
                },
                'slide-down': {
                    '0%': {
                        transform: 'translateY(-100px)',
                        opacity: '0',
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: '1',
                    },
                },
            },
        },
    },
    plugins: [],
    
}
```

This configuration extends the default Tailwind CSS theme with custom colors and animations.
