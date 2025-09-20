import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";

import "../Dashboard.css";
import { fetchClasses } from "../../../redux/class";
import EditClassModal from "../EditClassModal";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import CreateClassModal from "../CreateClassModal";
import DeleteClassModal from "../DeleteClassModal";
import { useNavigate } from "react-router-dom";
import { calcFinalGradeStudent } from "../../../utils/Grading";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const classes = useSelector((state) => state.class.classes);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleGradeBook = (classId) => {
    navigate(`/gradebook/${classId}`)
  }

  const handleGrades = (classId) => {
    navigate(`/grades/${classId}`)
  }

  useEffect(() => {
    dispatch(fetchClasses()).then(() => setIsLoaded(true));
  }, [dispatch]);

  


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
                  {(user.type == 'teacher') ? (<>
                  <h4 className="profileInfoDB">Teacher</h4>
                  <h4 className="profileInfoDB">Primary Grade: {user.teacher.primary_grade}</h4>
                  <h4 className="profileInfoDB">Primary Subject: {user.teacher.primary_subject}</h4>
                  <OpenModalButton
                    buttonText={'New Class'}
                    modalComponent={<CreateClassModal />}
                    cssClasses={'newClassButtonDB'}
                  />
                  </>):(<>
                    <h4 className="profileInfoDB">Student</h4>
                    <h4 className="profileInfoDB">Grade: {user.student.grade}th</h4>
                  </>)}
                </div>
              </div>
            </div>
          </div>
          <div id="classesSideDB">
            {(user.type == 'teacher') ? (<>
                {classes.map((class_, index) => (
                  <div className="classGridConDB" key={`classConT${index}`}>
                    <div className="classConDB lightBlueBox" >
                      <h3 className="classInfoDB">{class_.grade}th Grade {class_.name} - Period {class_.period}</h3>
                      <h4 className="classInfoDB">Room - {class_.room}, {class_.num_students} Students</h4>
                      <div className="classButtonsConDB">
                        <button 
                          onClick={() => handleGradeBook(class_.id)} 
                          className="classButtonDB gradeBookDB"
                        >Grade Book</button>
                        <OpenModalButton
                          buttonText={'Edit'}
                          modalComponent={<EditClassModal classEdit={class_} />}
                          cssClasses={'classButtonDB editDB'}
                        />
                        <OpenModalButton
                          buttonText={'Delete'}
                          modalComponent={<DeleteClassModal classDelete={class_} />}
                          cssClasses={'classButtonDB deleteDB'}
                        />
                      </div>
                    </div>
                  </div>
                  
                ))}
              </>):(<>
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
              </>)}
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;
