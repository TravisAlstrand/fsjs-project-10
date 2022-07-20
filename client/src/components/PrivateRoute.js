import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { CoursesContext } from './Context';


const PrivateRoute = () => {

  const { user } = useContext(CoursesContext);

  return (
    user ? 
      <Outlet /> :
      <Navigate to={'/signin'} />
  );
};

export default PrivateRoute;