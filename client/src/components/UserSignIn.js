import { Link } from 'react-router-dom';

const UserSignIn = () => {
  return(
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <form>
          <label for="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" value="" />
          <label for="password">Password</label>
          <input id="password" name="password" type="password" value="" />
          <button className="button" type="submit">Sign In</button>
          <Link to='/'>
            <button class="button button-secondary">Cancel</button>
          </Link>
        </form>
      </div>
    </main>
  );
};

export default UserSignIn;