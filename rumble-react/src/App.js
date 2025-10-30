/**
 * Refactored App Component
 * Clean, focused component using new architecture patterns
 */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components
import LandingPage from './components/landing/LandingPage';
import Login from './components/auth/Login';
import CreateAccount from './components/auth/CreateAccount';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import ErrorBoundary from './components/common/ErrorBoundary';

// Import context
import { AuthProvider } from './contexts/AuthContext';

// Import constants
import { ROUTES } from './constants';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path={ROUTES.HOME} element={<LandingPage />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<CreateAccount />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
            
            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              {/* Add more protected routes here */}
            </Route>
            
            <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;