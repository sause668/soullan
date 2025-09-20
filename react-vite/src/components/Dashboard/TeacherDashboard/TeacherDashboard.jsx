import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
import { MdEdit } from "react-icons/md";


import "../Dashboard.css";
import { fetchTeacherClasses } from "../../../redux/class";
import EditClassModal from "../EditClassModal";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import CreateClassModal from "../CreateClassModal";
// import DeleteClassModal from "../DeleteClassModal";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const classes = useSelector((state) => state.class.classes);
  const [isLoaded, setIsLoaded] = useState(false);

  // const handleGradeBook = (e, classId) => {
  //   e.stopPropagation()
  //   navigate(`/gradebook/${classId}`)
  // }

  useEffect(() => {
    dispatch(fetchTeacherClasses({teacherId: user.teacher.id})).then(() => setIsLoaded(true));
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
                  <h4 className="profileInfoDB">Teacher</h4>
                  <h4 className="profileInfoDB">Primary Grade: {user.teacher.primary_grade}</h4>
                  <h4 className="profileInfoDB">Primary Subject: {user.teacher.primary_subject}</h4>
                  <OpenModalButton
                    buttonText={'New Class'}
                    modalComponent={<CreateClassModal />}
                    cssClasses={'newClassButtonDB'}
                  />
                </div>
              </div>
            </div>
          </div>
          <div id="classesSideDB">
            {classes.map((class_, index) => (
              <div className="classGridConDB" key={`classConT${index}`}>
                <div className="classConDB lightBlueBox" onClick={()=>navigate(`/classes/${class_.id}`)}>
                  <div>
                    <h3 className="classInfoDB">{class_.grade}th Grade {class_.name} - Period {class_.period}</h3>
                    <h4 className="classInfoDB">Room - {class_.room}, {class_.num_students} Students</h4>
                  </div>
                  
                  <div className="classButtonsConDB">
                    {/* <button 
                      onClick={(e) => handleGradeBook(e, class_.id)} 
                      className="classButtonDB gradeBookDB"
                    >Grade Book</button> */}
                    <OpenModalButton
                      buttonText={<MdEdit />}
                      modalComponent={<EditClassModal classEdit={class_} />}
                      cssClasses={'classButtonDB editDB'}
                    />
                    {/* <OpenModalButton
                      buttonText={'Delete'}
                      modalComponent={<DeleteClassModal classDelete={class_} />}
                      cssClasses={'classButtonDB deleteDB'}
                    /> */}
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

export default TeacherDashboard;
