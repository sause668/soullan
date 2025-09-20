import { useSelector } from "react-redux";
import "./HomePage.css";
import Landing from "../Landing/Landing";
import AdminDashboard from "../Dashboard/AdminDashboard/AdminDashboard";
import TeacherDashboard from "../Dashboard/TeacherDashboard/TeacherDashboard";
import StudentDashboard from "../Dashboard/StudentDashboard/StudentDashboard";

function HomePage() {
  const user = useSelector((state) => state.session.user);

  return (
    <>
      {(!user) && <Landing/>}
      {(user && user.type === 'admin') && <AdminDashboard/>}
      {(user && user.type === 'teacher') && <TeacherDashboard/>}
      {(user && user.type === 'student') && <StudentDashboard/>}
    </>
  );
}

export default HomePage;
