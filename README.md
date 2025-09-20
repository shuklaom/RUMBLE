# RUMBLE

A modern React-based web application for managing and monitoring autonomous trash collection robots.

## Features

- **User Authentication** - Secure login and account creation
- **Interactive Dashboard** - Real-time robot monitoring and control
- **Robot Management** - View robot status, battery levels, and collection data
- **Shared Robots** - Access and monitor robots shared by other users
- **Interactive Maps** - Live robot location tracking with Google Maps integration
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend:** React 18.2.0
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **Maps:** Google Maps JavaScript API
- **Build Tool:** Create React App
- **Testing:** React Testing Library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Maps API key (for map functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shuklaom/RUMBLE.git
   cd RUMBLE/rumble-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `rumble-react` directory:
   ```bash
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
rumble-react/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.js
│   │   │   └── CreateAccount.js
│   │   ├── common/
│   │   │   ├── BubbleBackground.js
│   │   │   └── PrivateRoute.js
│   │   ├── dashboard/
│   │   │   └── Dashboard.js
│   │   ├── landing/
│   │   │   └── LandingPage.js
│   │   └── maps/
│   │       └── RobotMap.js
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── services/
│   │   └── apiMock.js
│   ├── App.js
│   ├── index.js
│   └── styles.css
├── package.json
└── README.md
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Usage

### Login Credentials (Demo)
- **Admin User:** admin@rumble.com / admin123
- **Test User:** test@example.com / test123

### Dashboard Features
- **Robot List:** View all your robots in the sidebar
- **Robot Details:** Click on robots to see detailed information
- **Live Map:** Track robot locations in real-time
- **Shared Robots:** View robots shared by other users
- **Status Monitoring:** Monitor battery levels and collection progress

## Maps Integration

The application uses Google Maps to display robot locations. To enable map functionality:

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Maps JavaScript API
3. Add your API key to the `.env` file
4. Restart the development server

## Recent Updates

- Complete codebase refactoring and optimization
- Removed 62 unused dependencies
- Consolidated CSS files for better maintainability
- Fixed all ESLint warnings and errors
- Improved performance and load times
- Enhanced Google Maps integration

## Testing

Run the test suite with:
```bash
npm test
```

The project includes component tests for all major features.

## Deployment

To create a production build:
```bash
npm run build
```

The build folder will contain the optimized production files ready for deployment.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the CPRE 4910 course at Iowa State University.

## Authors

- **Om Shukla** - [@shuklaom](https://github.com/shuklaom)

## Acknowledgments

- Iowa State University CPRE 4910 Course
- React team for the amazing framework
- Google Maps Platform for mapping services
- Tailwind CSS for the styling framework

---

**RUMBLE** - Making autonomous waste collection smarter and more efficient!