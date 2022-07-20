import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CoursesContext } from './Context';

const UserSignIn = () => {

  const { actions } = useContext(CoursesContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // function to handle sign in submit
  function handleSubmit(e) {
    e.preventDefault();

    // call sign in function 
    actions.signIn(emailAddress, password)
      .then (response => {
        if (response !== null) {
          console.log('sign in worked!');
          navigate('/');
        } else {
          console.log('sign in failed!');
        };
      });
  };

  return(
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" onChange={e => setEmailAddress(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" onChange={e => setPassword(e.target.value)} />
          <button className="button" type="submit">Sign In</button>
          <Link to='/'>
            <button className="button button-secondary">Cancel</button>
          </Link>
        </form>
      </div>
    </main>
  );
};

export default UserSignIn;