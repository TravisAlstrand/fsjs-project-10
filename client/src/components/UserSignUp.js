import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CoursesContext } from './Context';

const UserSignUp = () => {

  const { actions } = useContext(CoursesContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    // object to send to signUp call
    const userBody = {
      firstName,
      lastName,
      emailAddress,
      password
    }

    // call the handleSignUp function sending body object above
    actions.signUp(userBody)
      .then(response => {
        // if successful...
        if (response === true) {
          // call sign in function 
          actions.signIn(emailAddress, password)
          .then (response => {
            if (response !== null) {
              console.log('sign in worked!');
            } else {
              console.log('sign in failed!');
            };
          });
        } 
        // if unsuccessful, set errors state with returned errors
        else {
          setErrors(response);
        }
      });
  }

  return(
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" onChange={e => setLastName(e.target.value)} />
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" onChange={e => setEmailAddress(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" onChange={e => setPassword(e.target.value)} />
          <button className="button" type="submit">Sign Up</button>
          <Link to='/'>
            <button className="button button-secondary">Cancel</button>
          </Link>
        </form>
      </div>
    </main>
  );
};

export default UserSignUp;