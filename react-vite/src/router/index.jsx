import { Navigate, createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import GradeBook from '../components/GradeBook/GradeBook';
import Grades from '../components/Grades/Grades';
import Layout from './Layout';
import StudentsPage from '../components/StudentsPage/StudentsPage';
import StudentPage from '../components/StudentPage/StudentPage';
import StudentGrades from '../components/StudentGrades/StudentGrades';
import ClassPage from '../components/ClassPage/ClassPage';
import BehaviorBook from '../components/BehaviorBook/BehaviorBook';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: 'gradebook/',
        children: [
          {
            path: "",
            element: <Navigate to="/" replace={true} />,
          },
          {
            path: ":classId",
            element: <GradeBook/>,
          },
        ]
      },
      {
        path: 'grades/',
        children: [
          {
            path: "",
            element: <Navigate to="/" replace={true} />,
          },
          {
            path: ":classId",
            element: <Grades/>,
          },
        ]
      },
      {
        path: 'students/',
        children: [
          {
            path: '',
            element: <StudentsPage/>
          },
          {
            path: ':studentId/',
            children : [
              {
                path: '',
                element: <StudentPage/>
              },
              {
                path: 'classes/:classId',
                element: <StudentGrades/>
              }
            ]
            
          }
        ]
      },
      {
        path: 'classes/',
        children: [
          {
            path: '',
            element: ''
          },
          {
            path: ':classId/',
            element: <ClassPage/>
          }
        ]
      },
      {
        path: 'behaviorbook/',
        children: [
          {
            path: "",
            element: <Navigate to="/" replace={true} />,
          },
          {
            path: ":classId",
            element: <BehaviorBook/>,
          },
        ]
      }
    ],
  },
]);