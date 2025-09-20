import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./GradeBook.css";
import { Navigate, useParams } from "react-router-dom";
import { fetchGradebookClass } from "../../redux/class";
import { calcBehaviorGrade, convertBehaviorGrade, convertBehaviorPriorityGrade } from "../../utils/Grading";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AddStudentModal from "./AddStudentModal";
import NewAssignmentModal from "./NewAssignmentModal";
import OpenModalCell from "../OpenModalTableCell/OpenModalTableCell";
import CreateGradeModal from "./CreateGradeModal";
import EditGradeModal from "./EditGradeModal";
import StudentInfoModal from "./StudentInfoModal";
import { calcFinalGradeTeacher, calcLetterGrade, sortStudents, sortAssignments } from "../../utils/Grading";
import AssignmentInfo from "./AssignmentInfo";

function GradeBook() {
  const dispatch = useDispatch();
  const { classId } = useParams();
  const user = useSelector((state) => state.session.user);
  const class_ = useSelector((state) => state.class.class);
  const [quarter, setQuarter] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  // Define the three behavior assignments
  const behaviorAssignments = [
    { id: 'attention', name: 'Attention', type: 'behavior', quarter: 1 },
    { id: 'learnability', name: 'Learning Speed', type: 'behavior', quarter: 1 },
    { id: 'cooperation', name: 'Cooperation', type: 'behavior', quarter: 1 }
  ];

  // Get behavior grade for a student
  // const getStudentBehaviorGrade = (studentId) => {
  //   return behaviorGrades.find(bg => bg.student.id === studentId) || null;
  // };

  // Get behavior grade for a student and assignment
  // const getBehaviorGrade = (studentId, assignmentId) => {
  //   const studentGrade = getStudentBehaviorGrade(studentId);
  //   return studentGrade ? studentGrade[assignmentId] : '';
  // };

   // Calculate behavior final grade (average of the three behavior scores)
   const calcBehaviorFinalGrade = (studentId) => {
    /*const studentGrade = getStudentBehaviorGrade(studentId);
    return studentGrade ? studentGrade.final_grade : 'N/A';*/
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
              <OpenModalButton
                buttonText={'New Assignment'}
                modalComponent={<NewAssignmentModal 
                  classId={classId} 
                  quarter={quarter} 
                />}
                cssClasses={'gradeBookButtonGB newAssignmentGB'}
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
          {/* Grade Book */}
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
                      {class_.assignments
                        .filter(a => a.quarter == quarter)
                        .sort((a1, a2) => sortAssignments(a1, a2))
                        .map((assignment, index) => (
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
                      let finalGrade = calcFinalGradeTeacher(class_.assignments.filter(a => a.quarter == quarter), student.id);
                      let finalLetterGrade = calcLetterGrade(finalGrade);
                      return (
                      <tr className="tableBodyRowBG" key={`studentName${iStudent}`}>
                        {class_.assignments
                          .filter(a => a.quarter === quarter)
                          .sort((a1, a2) => sortAssignments(a1, a2))
                          .map((assignment, iAssignment) => {
                          let grade = assignment.grades.find((grade) => {
                            return grade.student_id == student.id
                          })
                          if (grade) {
                            let letterGrade = calcLetterGrade(grade.grade)
                            return <OpenModalCell
                              cellText={`${grade.grade} (${letterGrade})`}
                              key={`grade${iStudent}${iAssignment}`}
                              cssClasses={`tableCellGB tableBodyCellGB gradeBodyCellBG ${letterGrade}`}
                              modalComponent={<EditGradeModal grade={grade}/>}
                            />
                          }
                          return <OpenModalCell
                            cellText={''}
                            key={`grade${iStudent}${iAssignment}`}
                            cssClasses={'tableCellGB tableBodyCellGB gradeBodyCellBG noGrade'}
                            modalComponent={<CreateGradeModal
                              assignmentId={assignment.id}
                              studentId={student.id}
                            />}
                          />
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
          {/* Behavior Book */}
          <div id="tableConBB" className="lightBlueBox">
            <div id="tableFormatConBB">
              <div id="tableStudentsConBB">
                <table id="tableBBS">
                    <tbody id="tableBodyBB">
                      {class_.students.sort((s1, s2) => sortStudents(s1, s2)).map((student, iStudent) => (
                        <tr className="tableBodyRowBB" key={`studentName${iStudent}`}>
                          <OpenModalCell
                            cellText={`${student.last_name}, ${student.first_name}`}
                            modalComponent={<StudentInfoModal
                              classId={class_.id}
                              student={student}
                            />}
                            cssClasses={'tableCellBB tableBodyCellBB studentBodyCellBB'}
                          />
                        </tr>
                      ))}
                    </tbody>
                </table>
              </div>
              <div id="tableGradesConBB">
                <table id="tableBB">
                  <thead id="tableHeadBB">
                    <tr id="tableHeadRowBB">
                      {behaviorAssignments.map((assignment, index) => (
                        <OpenModalCell
                          cellText={assignment.name}
                          modalComponent={<AssignmentInfo assignment={assignment}/>}
                          cssClasses={`tableCellBB tableHeadCellBB assignHeadCellBB ${assignment.type}`}
                          key={`assignHead${index}`}
                        />
                      ))}
                      <td className="tableCellBB tableHeadCellBB finalHeadCellBB">Priority Level</td>
                    </tr>
                  </thead>
                  <tbody id="tableBodyBB">
                    {class_.students.map((student, iStudent) => {
                      // Calculate final grade using behavior assignments
                      const studentBehavior = class_.behaviors.find((behavior) => behavior.student_id === student.id);
                      let behaviorGrade = calcBehaviorGrade(studentBehavior.attention, studentBehavior.learnability, studentBehavior.cooperation);
                      
                      return (
                      <tr className="tableBodyRowBB" key={`studentName${iStudent}`}>
                        <td className="tableCellBB tableBodyCellBB gradeBodyCellBB">
                          {convertBehaviorGrade(studentBehavior.attention)}
                        </td>
                        <td className="tableCellBB tableBodyCellBB gradeBodyCellBB">
                          {convertBehaviorGrade(studentBehavior.learnability)}
                        </td>
                        <td className="tableCellBB tableBodyCellBB gradeBodyCellBB">
                          {convertBehaviorGrade(studentBehavior.cooperation)}
                        </td>
                        {behaviorGrade != 'N/A' ? 
                          <td className={`tableCellBB tableBodyCellBB finalBodyCellBB ${'finalLetterGrade'}`}>{convertBehaviorPriorityGrade(behaviorGrade)}</td>
                        :
                          <td className={`tableCellBB tableBodyCellBB finalBodyCellBB noGrade`}>N/A</td>
                        }
                        {/* {class_.behaviors.map((behavior, iBehavior) => {
                          return (
                            <td key={`behavior${iStudent}${iBehavior}`} className="tableCellBB tableBodyCellBB gradeBodyCellBB">
                              {behavior.grade}
                            </td>
                          );
                        })} */}
                        {/* {behaviorAssignments.map((assignment, iAssignment) => {
                          // const currentGrade = getBehaviorGrade(student.id, assignment.id);
                          const currentGrade = 4;

                          
                          return (
                            <td key={`grade${iStudent}${iAssignment}`} className="tableCellBB tableBodyCellBB gradeBodyCellBB">
                              <div className="behaviorGradeStatic">
                                {currentGrade || '-'}
                              </div>
                            </td>
                          );
                        })}
                        {finalGrade != 'N/A' ? 
                          <td className={`tableCellBB tableBodyCellBB finalBodyCellBB ${finalLetterGrade}`}>{finalGrade} ({finalLetterGrade})</td>
                        :
                          <td className={`tableCellBB tableBodyCellBB finalBodyCellBB noGrade`}>N/A</td>
                        } */}
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

export default GradeBook;
