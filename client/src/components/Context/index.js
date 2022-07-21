import React, { useState } from 'react';
import { Buffer } from 'buffer';

export const CoursesContext = React.createContext();

export const Provider = (props) => {

  // state for courses array
  const [ courses, setCourses ] = useState([]);

  // state for single course
  const [ course, setCourse ] = useState(null);

  // state for signed in user
  const [ user, setUser ] = useState(null);

  // state for username
  const [ authedUsername, setAuthedUsername ] = useState('');

  // state for password
  const [ authedUserPass, setAuthedUserPass ] = useState('');

  // method to control all api requests
  function api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = 'http://localhost:5000/api' + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encryptedCredentials = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64'); 
      options.headers['Authorization'] = `Basic ${encryptedCredentials}`;
    }

    const results = fetch(url, options); 

    return (results);
  };

  /* ========================================== */
  /* ------------- COURSE API CALLS ----------- */
  /* ========================================== */

  // function to fetch courses from api db
  async function handleFetchCourses() {
    const response = await api('/courses');

    // if successful...
    if(response.status === 200) {
      response.json() /* parse response to json */
        .then(data => setCourses(data)); /* set the courses state to the json response */
      return (courses); /* return the courses state array of objects */
    }  
    // if unauthorized...
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }

  };

  // function to fetch single course from api db
  async function handleFetchSingleCourse(id) {
    const response = await api(`/courses/${id}`);

    if (response.status === 200) {
      response.json()
        .then(data => setCourse(data));
      return (course);
    } else if (response.status === 404) {
      return null;
    } else {
      throw new Error();
    }
  };

  // function to create (POST) a new course
  async function handleCreateNewCourse(courseBody) {
    const response = await api('/courses', 'POST', courseBody, true, {username: authedUsername, password: authedUserPass});

    // if created successfully...
    if (response.status === 201) {
      return true; /* return true to CreateCourse.js call */
    } else if (response.status === 400) {
      const valErrors = await response.json();
      return valErrors;
    } else {
      throw new Error();
    }
  }

  async function handleUpdateCourse(id, courseBody) {
    const response = await api(`/courses/${id}`, 'PUT', courseBody, true, {username: authedUsername, password: authedUserPass});
    
    if (response.status === 204) {
      return true;
    }
  }

  async function handleDeleteCourse(id) {
    const response = await api(`/courses/${id}`, 'DELETE', null, true, {username: authedUsername, password: authedUserPass});

    if (response.status === 204) {
      return true;
    }
  }

  /* ========================================== */
  /* -------------- USER API CALLS ------------ */
  /* ========================================== */

  // function to get user info & sign in
  async function handleSignIn(username, password) {
    const response = await api('/users', 'GET', null, true, {username, password});
    
    if (response.status === 200) {
      setAuthedUsername(username);
      setAuthedUserPass(password);
      return response.json()
        .then(data => setUser(data)); /* set user state to response */
    } else if (response.status === 401) {
      return null
    } else {
      throw new Error();
    }
  }

  // function to create new user
  async function handleSignUp(userBody) {
    const response = await api('/users', 'POST', userBody);

    if (response.status === 201) {
      return true; /* return true to UserSignUp.js call */
    } else if (response.status === 400) {
      return response.json()
      .then(data => {return data.validationErrors;})
    } else {
      throw new Error();
    };
  };

  function handleSignOut() {
    setUser(null);
    setAuthedUsername('');
    setAuthedUserPass('');
  };

  // return the provider with the states and functions allowing app's children to be placed inside
  return(
    <CoursesContext.Provider value={{
      courses,
      course,
      user,
      actions: {
        fetchCourses: handleFetchCourses,
        fetchSingleCourse: handleFetchSingleCourse,
        createCourse: handleCreateNewCourse,
        updateCourse: handleUpdateCourse,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
        deleteCourse: handleDeleteCourse
      }
    }}>
      {props.children}
    </CoursesContext.Provider>
  );
};
