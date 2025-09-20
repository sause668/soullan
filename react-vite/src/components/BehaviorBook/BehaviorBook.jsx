import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./BehaviorBook.css";
import { Navigate, useParams } from "react-router-dom";
import { fetchGradebookClass } from "../../redux/class";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AddStudentModal from "./AddStudentModal";
import OpenModalCell from "../OpenModalTableCell/OpenModalTableCell";
import StudentInfoModal from "./StudentInfoModal";
import { calcLetterGrade, sortStudents } from "../../utils/Grading";
import AssignmentInfo from "./AssignmentInfo";

function BehaviorBook() {
  const dispatch = useDispatch();
  const { classId } = useParams();
  const user = useSelector((state) => state.session.user);
  const class_ = useSelector((state) => state.class.class);
  const [quarter, setQuarter] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  
  // State to track behavior grades for each student
  const [behaviorGrades, setBehaviorGrades] = useState({});

  // Define the three behavior assignments
  const behaviorAssignments = [
    { id: 'attention', name: 'Attention', type: 'behavior', quarter: 1 },
    { id: 'learning_speed', name: 'Learning Speed', type: 'behavior', quarter: 1 },
    { id: 'cooperation', name: 'Cooperation', type: 'behavior', quarter: 1 }
  ];

  // Handle behavior grade change
  const handleBehaviorGradeChange = (studentId, assignmentId, grade) => {
    setBehaviorGrades(prev => ({
      ...prev,
      [`${studentId}_${assignmentId}`]: grade
    }));
  };

  // Get behavior grade for a student and assignment
  const getBehaviorGrade = (studentId, assignmentId) => {
    return behaviorGrades[`${studentId}_${assignmentId}`] || '';
  };

  // Calculate behavior final grade (average of the three behavior scores)
  const calcBehaviorFinalGrade = (studentId) => {
    // const grades = behaviorAssignments.map(assignment => {
    //   const grade = getBehaviorGrade(studentId, assignment.id);
    //   return grade ? parseInt(grade) : null;
    // }).filter(grade => grade !== null);
    // 
    // if (grades.length === 0) return 'N/A';
    // 
    // const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    // return Math.round(average * 20); // Convert 1-5 scale to 0-100 scale
    return 'N/A';
  };

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
        <div id="gradeBookCon">
          <div id="headerConGB">
            <div id="titleConGB" className="lightBlueBox">
              <h1 id="titleGB">{class_.grade}th Grade {class_.name} - Period {class_.period}</h1>
            </div>
            <div id="optionsConGB" className="lightBlueBox">
              <OpenModalButton
                buttonText={'Add Student'}
                modalComponent={<AddStudentModal 
                  classId={classId} 
                  currentStudentIds={class_.students.map(student => student.id)} 
                />}
                cssClasses={'gradeBookButtonGB addStudentGB'}
              />
              <div className='quarterSelectConGB'>
                <label htmlFor='quarter'>
                  <p className=''>
                    Quarter
                  </p>
                </label>
                <select 
                  name="quarter" 
                  id="quarter" 
                  className="quarterSelectGB"
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
          <div id="tableConGB" className="lightBlueBox">
          
            <div id="tableFormatConGB">
              <div id="tableStudentsConGB">
              <table id="tableGBS">
                  <tbody id="tableBodyGB">
                    {class_.students.sort((s1, s2) => sortStudents(s1, s2)).map((student, iStudent) => (
                      <tr className="tableBodyRowBG" key={`studentName${iStudent}`}>
                        <OpenModalCell
                          cellText={`${student.last_name}, ${student.first_name}`}
                          modalComponent={<StudentInfoModal
                            classId={class_.id}
                            student={student}
                          />}
                          cssClasses={'tableCellGB tableBodyCellBG studentBodyCellGB'}
                        />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div id="tableGradesConGB">
                <table id="tableGB">
                  <thead id="tableHeadGB">
                    <tr id="tableHeadRowGB">
                      {behaviorAssignments.map((assignment, index) => (
                        <OpenModalCell
                          cellText={assignment.name}
                          modalComponent={<AssignmentInfo assignment={assignment}/>}
                          cssClasses={`tableCellGB tableHeadCellGB assignHeadCellGB ${assignment.type}`}
                          key={`assignHead${index}`}
                        />
                      ))}
                      <td className="tableCellGB tableHeadCellGB finalHeadCellBG">Final</td>
                    </tr>
                  </thead>
                  <tbody id="tableBodyGB">
                    {class_.students.map((student, iStudent) => {
                      // Calculate final grade using behavior assignments
                      let finalGrade = calcBehaviorFinalGrade(student.id);
                      let finalLetterGrade = finalGrade !== 'N/A' ? calcLetterGrade(finalGrade) : 'N/A';
                      return (
                      <tr className="tableBodyRowBG" key={`studentName${iStudent}`}>
                        {behaviorAssignments.map((assignment, iAssignment) => {
                          const currentGrade = getBehaviorGrade(student.id, assignment.id);
                          return (
                            <td key={`grade${iStudent}${iAssignment}`} className="tableCellGB tableBodyCellGB gradeBodyCellBG">
                              <select
                                value={currentGrade}
                                onChange={(e) => handleBehaviorGradeChange(student.id, assignment.id, e.target.value)}
                                className="behaviorGradeSelect"
                              >
                                <option value="">-</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </td>
                          );
                        })}
                        {finalGrade != 'N/A' ? 
                          <td className={`tableCellGB tableBodyCellGB finalBodyCellGB ${finalLetterGrade}`}>{finalGrade} ({finalLetterGrade})</td>
                        :
                          <td className={`tableCellGB tableBodyCellGB finalBodyCellGB noGrade`}>N/A</td>
                        }
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {errors.message && (<h1>{errors.message}</h1>)}
    </>
  );
}

export default BehaviorBook;
