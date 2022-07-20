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
    const response = await api('/courses', 'POST', courseBody);

    // if created successfully...
    if (response.status === 201) {
      return true; /* return true to CreateCourse.js call */
    } else if (response.status === 400) {
      return response.json()
        .then(data => {return data.validationErrors;})
    } else {
      throw new Error();
    }
  }

  /* ========================================== */
  /* -------------- USER API CALLS ------------ */
  /* ========================================== */

  // function to get user info & sign in
  async function handleSignIn(username, password) {
    const response = await api('/users', 'GET', null, true, {username, password});
    
    if (response.status === 200) {
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
    return (user)
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
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut
      }
    }}>
      {props.children}
    </CoursesContext.Provider>
  );
};
