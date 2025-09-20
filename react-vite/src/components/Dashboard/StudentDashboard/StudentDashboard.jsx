import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";

import "../Dashboard.css";
import { fetchStudentClasses } from "../../../redux/class";
import { useNavigate } from "react-router-dom";
import { calcFinalGradeStudent } from "../../../utils/Grading";

function StudentDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const classes = useSelector((state) => state.class.classes);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleGrades = (classId) => {
    navigate(`/grades/${classId}`)
  }

  useEffect(() => {
    dispatch(fetchStudentClasses({studentId: user.student.id})).then(() => setIsLoaded(true));
  }, [dispatch, user]);

  


  return (
    <>
      {isLoaded && (
        <div className="dashboardCon">
          <div id='profileSideDB'>
            <div>
              <div id="profileConDB"className="lightBlueBox">
                <div id="profilePicConDB">
                  <FiUser id='profilePicDB'/>
                </div>
                <div id="profileInfoConDB">
                  <h2 className="profileInfoDB">{user.first_name} {user.last_name}</h2>
                  <h4 className="profileInfoDB">Student</h4>
                  <h4 className="profileInfoDB">Grade: {user.student.grade}th</h4>
                </div>
              </div>
            </div>
          </div>
          <div id="classesSideDB">
            {classes.map((class_, index) => (
              <div className="classGridConDB" key={`classConS${index}`}>
                <div className="classConDB lightBlueBox">
                  <h3 className="classInfoDB">{class_.grade}th Grade {class_.name} - Period {class_.period}</h3>
                  <h4 className="classInfoDB">{class_.teacher.last_name}, {class_.teacher.first_name}</h4>
                  <h4 className="classInfoDB">Room - {class_.room}</h4>
                  <div className="classGradeConDB">
                    <h4 className="currentGradeDB">Current Grade: {calcFinalGradeStudent(class_.assignments)}</h4>
                    <button 
                      onClick={() => handleGrades(class_.id)} 
                      className="classButtonDB gradesDB"
                    >Grades</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default StudentDashboard;
