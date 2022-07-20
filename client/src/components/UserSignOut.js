import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoursesContext } from './Context';

const UserSignOut = () => {

  const { actions } = useContext(CoursesContext);

  const navigate = useNavigate();

  useEffect(() => {
    actions.signOut();
    (navigate('/'));
  });

  return (
    <>
      <h1>Signing Out...</h1>
    </>
  )
}

export default UserSignOut;