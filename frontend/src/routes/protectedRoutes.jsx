import { Navigate, useLocation } from 'react-router-dom';
import { useAccount } from '../AccountContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const { accounts } = useAccount();
  const location = useLocation();

  if (!accounts || accounts.length === 0) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
