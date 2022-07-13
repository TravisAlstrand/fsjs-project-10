import { Routes, Route, Navigate } from 'react-router-dom';

/* COMPONENTS */
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import Error from './components/Error';

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route exact path='/' element={ <Courses /> } />
        <Route path='/courses/create' element={ <CreateCourse /> } />
        <Route path='/signin' element={ <UserSignIn /> } />
        <Route path='/signup' element={ <UserSignUp /> } />
        <Route path='/signout' element={ <Navigate to='/' /> } />
        <Route path='/forbidden' element={ <Forbidden /> } />
        <Route path='/not-found' element={ <NotFound /> } />
        <Route path='/error' element={ <Error /> } />
        <Route path='/courses/:id/update' element={ <UpdateCourse /> } />
        <Route path='/courses/:id' element={ <CourseDetail /> } />
      </Routes>
    </>
  );
};

export default App;
