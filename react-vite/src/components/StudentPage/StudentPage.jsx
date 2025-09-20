import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";

import "./StudentPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { calcFinalGradeStudent } from "../../utils/Grading";
import { fetchStudent } from "../../redux/student";
import { fetchStudentClasses } from "../../redux/class";

export default function StudentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentId } = useParams();
  const student = useSelector((state) => state.student.student);
  const classes = useSelector((state) => state.class.classes);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleNavStudent = (studentId) => {
    navigate(`/students/${studentId}`);
    navigate(0);
  }

  const handleGrades = (classId) => {
    navigate(`/students/${studentId}/classes/${classId}`)
  }

  useEffect(() => {
    dispatch(fetchStudent({studentId}))
    .then(() => dispatch(fetchStudentClasses({studentId})))
    .then(() => setIsLoaded(true));
  }, [dispatch, studentId]);

  


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
                    <h2 className="profileInfoDB">{student.first_name} {student.last_name}</h2>
                    <h4 className="profileInfoDB">Student</h4>
                    <h4 className="profileInfoDB">Grade: {student.grade}th</h4>
                    {student.siblings.length > 0 && (<>
                        <h3>Siblings:</h3>
                        {student.siblings.map((sibling, index) => (
                            <button onClick={()=>handleNavStudent(sibling.student.id)} key={`sibling${index}`}>{sibling.first_name} {sibling.last_name}</button>
                        ))}
                    </>)}
                    
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


