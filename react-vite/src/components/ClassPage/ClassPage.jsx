import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ClassPage.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { fetchGradebookClass } from "../../redux/class";
import { calcFinalGradeTeacher, calcLetterGrade, sortStudents, sortAssignments } from "../../utils/Grading";
import { typeToString } from "../../utils/TypeConvertion";

function ClassPage() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { classId } = useParams();
  const user = useSelector((state) => state.session.user);
  const class_ = useSelector((state) => state.class.class);
  const [quarter, setQuarter] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  

  useEffect(() => {
    dispatch(fetchGradebookClass({teacherId: user.teacher.id, classId}))
      .then((res) => {
        if (res && res.errors) {
          setErrors(res.errors)
        } else {
          setIsLoaded(true)
        }
      })
  }, [dispatch, classId, user]);

  if (!user || user.type != 'teacher') return <Navigate to="/" replace={true} />;


  return (
    <>
      {(isLoaded) && (
        <div id="classConC">
          <div id="headerConC">
            <div id="titleConC" className="lightBlueBox">
              <h1 id="titleC">{class_.grade}th Grade {class_.name} - Period {class_.period}</h1>
              <h4 className="classInfoC">Room - {class_.room}, {class_.students.length} Students</h4>
            </div>
            <div id="optionsConC" className="lightBlueBox">
              <button onClick={()=>nav(`/gradebook/${class_.id}`)}>Grade Book</button>
              <div className='quarterSelectConC'>
                <label htmlFor='quarter'>
                  <p className=''>
                    Quarter
                  </p>
                </label>
                <select 
                  name="quarter" 
                  id="quarter" 
                  className="quarterSelectC"
                  value={quarter} 
                  onChange={(e) => setQuarter(parseInt(e.target.value))}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          </div>
          <div id="classInfoFormatConC">
          <div id="classInfoConC">
            <div className="gridItemFormatC">
                <div id="assignmentsConC">
                    <div className="subTitleConC">
                        <h2 className="subTitleC">Assignments</h2>
                    </div>
                    {class_.assignments
                        .filter(a => a.quarter == quarter)
                        .sort((a1, a2) => sortAssignments(a1, a2))
                        .map((assignment, index) => (
                            <div className={`assignConC lightBlueBox ${assignment.type}`} key={`assignClass${index}`}>
                                <div className="assignInfoConC">
                                    <h3 className="assignNameC">{assignment.name}</h3>
                                    <h4 className="assignTypeC">{typeToString(assignment.type)}</h4>
                                </div>
                                <h4 className="assignDueDateC">{assignment.due_date.slice(0, 16)}</h4>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="gridItemFormatC">
            <div id="studentsConC">
                <div className="subTitleConC">
                    <h2 className="subTitleC">Students</h2>
                </div>
                {class_.students
                    .sort((s1, s2) => sortStudents(s1, s2))
                    .map((student, index) => {
                        let finalGrade = calcFinalGradeTeacher(class_.assignments.filter(a => a.quarter == quarter), student.id);
                        let finalLetterGrade = calcLetterGrade(finalGrade);
                        return (
                            <div 
                                className={`studentConC lightBlueBox ${finalGrade != 'N/A' ? finalLetterGrade:'noGrade'}`} 
                                key={`studentClass${index}`}
                                onClick={()=>nav(`/students/${student.id}`)}
                            >
                                <h3 className="studentNameC">{student.last_name}, {student.first_name}</h3>
                                <h4 className="studentGradeC">{finalGrade != 'N/A' ? `${finalGrade} (${finalLetterGrade})`:'N/A'}</h4>
                            </div>
                        );
                    })
                }
            </div>
            </div>
            
          </div>
          </div>
        </div>
      )}
      {errors.message && (<h1>{errors.message}</h1>)}
    </>
  );
}

export default ClassPage;
