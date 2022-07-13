import React, { useState } from 'react';

export const CoursesContext = React.createContext();

export const Provider = (props) => {

  // state for courses array
  const [ courses, setCourses ] = useState([]);

  // state for single course
  const [ course, setCourse ] = useState(null);

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

    // if (requiresAuth) {
    //   const encodedCredentials = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64'); 
    //   options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    // }

    return fetch(url, options);
  };

  /* =================================== */
  /* ------------- API CALLS ----------- */
  /* =================================== */

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

  // return the provider with the states and functions allowing app's children to be placed inside
  return(
    <CoursesContext.Provider value={{
      courses,
      course, 
      actions: {
        fetchCourses: handleFetchCourses,
        fetchSingleCourse: handleFetchSingleCourse
      }
    }}>
      {props.children}
    </CoursesContext.Provider>
  );
};
