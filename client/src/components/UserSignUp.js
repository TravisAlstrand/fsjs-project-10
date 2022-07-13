import { Link } from 'react-router-dom';

const UserSignUp = () => {
  return(
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        <form>
          <label for="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" value="" />
          <label for="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" value="" />
          <label for="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" value="" />
          <label for="password">Password</label>
          <input id="password" name="password" type="password" value="" />
          <button class="button" type="submit">Sign Up</button>
          <Link to='/'>
            <button class="button button-secondary">Cancel</button>
          </Link>
        </form>
      </div>
    </main>
  );
};

export default UserSignUp;