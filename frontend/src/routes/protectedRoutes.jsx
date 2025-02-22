import { Navigate, useLocation } from 'react-router-dom';
import { useAccount } from '../AccountContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const { accounts, isLoading, isInitialized } = useAccount();
  const location = useLocation();

  if (isLoading || !isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Connecting to wallet...</p>
        </div>
      </div>
    );
  }

  if (!accounts || accounts.length === 0) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;