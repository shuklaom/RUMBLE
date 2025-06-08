# RUMBLE - Autonomous Trash Collection Robot Interface

A modern, responsive React.js web application for controlling and monitoring the RUMBLE autonomous trash collection robot system. This interface provides user authentication, real-time robot status monitoring, and interactive controls.

## Project Overview

RUMBLE is an autonomous trash collection robot engineered for parks, campuses, and urban spaces. This web interface allows users to:

- Create and manage user accounts
- Monitor robot status and battery levels
- View live cleaning maps
- Check statistics about trash collection, run time, and more
- Control robot operations remotely

## Tech Stack

- **Frontend**: React.js (v18.2.0)
- **Routing**: React Router (v6.16.0)
- **Styling**: Tailwind CSS (v3.3.3)
- **UI Components**: Custom components with responsive design
- **Authentication**: JWT-based authentication (mock implementation)

## Installation

Follow these steps to set up the development environment:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd rumble-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server using the provided script:
   ```bash
   # From the RUMBLE directory (parent of rumble-react)
   .\start-rumble-app.ps1
   ```

   Alternatively, you can start it directly:
   ```bash
   cd rumble-react
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Testing the Application

There are several ways to test the RUMBLE application:

1. Run the verification script to check component structure and API integration:
   ```bash
   # From the RUMBLE directory
   .\verify-rumble.ps1
   ```

2. Use the comprehensive test script:
   ```bash
   # From the RUMBLE directory
   .\test-rumble.bat
   ```

3. Run individual test scripts:
   ```bash
   # From the rumble-react directory
   node verify-structure.js
   node test-api-integration.js
   ```

4. Build the application to ensure it compiles correctly:
   ```bash
   npm run build
   ```

## Test Credentials

For testing purposes, you can use the following accounts:

| Role  | Email             | Password  |
|-------|-------------------|-----------|
| Admin | admin@rumble.com  | admin123  |
| User  | test@example.com  | test123   |

These accounts are pre-configured in the mock API service and can be used to test different user roles and permissions.

## Security Notes

This project includes eslint-plugin-security to help identify potential security issues. We've also addressed several npm package vulnerabilities:

- Are in development dependencies only
- Don't affect production builds
- Cannot be fixed without breaking changes to react-scripts

If you see vulnerability warnings during `npm install`, you can safely ignore them for development purposes. For production deployment, we recommend:

- Running `npm audit` to understand the nature of the vulnerabilities
- Using `npm run build` to create a production build that excludes development dependencies
- Considering a more modern build tool like Vite for new projects

## Project Structure

```
rumble-react/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/              # Authentication components
│   │   ├── common/            # Shared UI components
│   │   ├── dashboard/         # Dashboard views
│   │   └── landing/           # Landing page components
│   ├── contexts/              # React context providers
│   ├── services/              # API services and mocks
│   ├── __tests__/             # Test files
│   ├── App.js                 # Main App component with routes
│   └── index.js               # Entry point
├── package.json
├── tailwind.config.js
├── .eslintrc.json             # ESLint security configuration
├── .npmrc                     # NPM configuration
├── .env.development           # Development environment variables
└── README.md
```

## Available Pages

- **Landing Page**: Introduction to the RUMBLE system
- **Login**: User authentication
- **Create Account**: New user registration
- **Dashboard**: Real-time robot monitoring and control

## Development Scripts

- `npm start`: Run the development server
- `npm test`: Run tests
- `npm run build`: Create a production build
- `npm run eject`: Eject from Create React App

### Additional Testing Scripts

Several custom test scripts are provided to help verify the application functionality:

- `.\verify-rumble.ps1`: Main verification script that runs all tests
- `.\test-rumble.bat`: Batch file for running all tests in sequence
- `node verify-structure.js`: Verifies that all components and services are properly structured
- `node test-api-integration.js`: Tests the integration between components and the mock API

## Troubleshooting

If you encounter issues running the application, try the following steps:

1. **Package version conflicts**: Ensure you're using the correct package versions:
   - React: v18.2.0
   - React DOM: v18.2.0
   - React Router DOM: v6.16.0
   - Tailwind CSS: v3.3.3

2. **Build errors**: Run `npm run build` to identify and fix compilation errors

3. **ESLint errors**: The security plugin configuration has been updated to prevent circular references

4. **Tailwind CSS issues**: Ensure the postcss.config.js includes 'tailwindcss/nesting'

5. **Authentication errors**: Check the mock credentials in this README and the apiMock.js file

## API Integration

The project currently uses a mock API service that simulates backend functionality:

- `src/services/apiMock.js`: Contains mock implementations for authentication and robot control
- Authentication uses localStorage for token storage
- Robot data is simulated with realistic delays and validation

### Mock API Users

The mock API includes predefined user accounts:

```javascript
// From src/services/apiMock.js
const users = [
  {
    id: '1',
    email: 'admin@rumble.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'test@example.com',
    password: 'test123',
    name: 'Test User',
    role: 'user'
  }
];
```

When ready to connect to a real backend, replace the mock service with actual API calls while maintaining the same interface.

## Styling with Tailwind CSS

This project uses Tailwind CSS for styling. The configuration is in `tailwind.config.js`. Tailwind classes are used directly in the JSX for component styling.

## Authentication Flow

1. Users create an account via the Create Account page
2. Login credentials are validated with form validation
3. Upon successful authentication, a JWT token is stored in localStorage
4. Protected routes use the AuthContext to verify authentication
5. Logout removes the token and user data from storage

## Features Implemented

- **User Authentication**
  - Login with email/password
  - Create new account
  - Form validation
  - Protected routes

- **Dashboard**
  - Robot selection dropdown
  - Real-time robot status display
  - Battery level indicators
  - Robot control buttons (Start, Stop, Charge, Maintenance)
  - Collection statistics

- **UI Components**
  - Animated bubble background
  - Responsive layouts for all screen sizes
  - Loading states and error handling
  - User-friendly forms with validation

## Future Enhancements

- **Backend Integration**
  - Replace mock API with real backend endpoints
  - Implement WebSocket for real-time updates
  - Add proper error handling for API failures

- **Additional Features**
  - Interactive map for robot location visualization
  - User settings and preferences
  - Admin panel for managing multiple robots
  - Scheduled cleaning routes
  - Mobile-optimized interface for field use
  - Push notifications for critical events

- **Security Improvements**
  - Implement refresh tokens
  - Add CSRF protection
  - Add rate limiting for authentication attempts
  - Improve password policy enforcement

## Recent Updates

- Fixed duplicate export statements in auth components
- Updated React and React-related package versions
  - Downgraded React from v19.1.0 to v18.2.0
  - Downgraded React DOM from v19.1.0 to v18.2.0
  - Downgraded React Router DOM from v7.6.2 to v6.16.0
- Fixed Tailwind CSS configuration
  - Downgraded Tailwind CSS from v4.1.8 to v3.3.3
  - Updated postcss.config.js to include 'tailwindcss/nesting'
- Fixed ESLint circular reference issue
- Added test scripts and verification tools
- Added test credentials documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
