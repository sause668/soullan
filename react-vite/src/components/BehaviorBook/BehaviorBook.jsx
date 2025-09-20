import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./BehaviorBook.css";
import { Navigate, useParams } from "react-router-dom";
import { fetchGradebookClass } from "../../redux/class";
import { fetchClassBehaviorGrades, updateBehaviorGrades, createBehaviorGrades } from "../../redux/behaviorGrades";
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
  const behaviorGrades = useSelector((state) => state.behaviorGrades.behaviorGrades);
  const [quarter, setQuarter] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  // Define the three behavior assignments
  const behaviorAssignments = [
    { id: 'attention', name: 'Attention', type: 'behavior', quarter: 1 },
    { id: 'learning_speed', name: 'Learning Speed', type: 'behavior', quarter: 1 },
    { id: 'cooperation', name: 'Cooperation', type: 'behavior', quarter: 1 }
  ];

  // Get behavior grade for a student
  const getStudentBehaviorGrade = (studentId) => {
    return behaviorGrades.find(bg => bg.student.id === studentId) || null;
  };

  // Handle behavior grade change
  const handleBehaviorGradeChange = async (studentId, assignmentId, grade) => {
    const studentGrade = getStudentBehaviorGrade(studentId);
    
    if (studentGrade) {
      // Update existing behavior grades
      const updatedGrades = {
        ...studentGrade,
        [assignmentId]: grade
      };
      
      const result = await dispatch(updateBehaviorGrades({
        studentId,
        classId,
        quarter,
        attention: updatedGrades.attention,
        learning_speed: updatedGrades.learning_speed,
        cooperation: updatedGrades.cooperation
      }));
      
      if (result.errors) {
        setErrors(result.errors);
      }
    } else {
      // Create new behavior grades
      const newGrades = {
        attention: assignmentId === 'attention' ? grade : null,
        learning_speed: assignmentId === 'learning_speed' ? grade : null,
        cooperation: assignmentId === 'cooperation' ? grade : null
      };
      
      const result = await dispatch(createBehaviorGrades({
        studentId,
        classId,
        quarter,
        attention: newGrades.attention || 1,
        learning_speed: newGrades.learning_speed || 1,
        cooperation: newGrades.cooperation || 1
      }));
      
      if (result.errors) {
        setErrors(result.errors);
      }
    }
  };

  // Get behavior grade for a student and assignment
  const getBehaviorGrade = (studentId, assignmentId) => {
    const studentGrade = getStudentBehaviorGrade(studentId);
    return studentGrade ? studentGrade[assignmentId] : '';
  };

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

  // Fetch behavior grades when quarter changes
  useEffect(() => {
    if (isLoaded && classId && quarter) {
      dispatch(fetchClassBehaviorGrades({ classId, quarter }));
    }
  }, [dispatch, classId, quarter, isLoaded]);

  if (!user || user.type != 'teacher') return <Navigate to="/" replace={true} />;

  return (
    <>
      {(isLoaded) && (
        <div id="behaviorBookCon">
          <div id="headerConBB">
            <div id="titleConBB" className="lightBlueBox">
              <h1 id="titleBB">{class_.grade}th Grade {class_.name} - Period {class_.period}</h1>
            </div>
            <div id="optionsConBB" className="lightBlueBox">
              <OpenModalButton
                buttonText={'Add Student'}
                modalComponent={<AddStudentModal 
                  classId={classId} 
                  currentStudentIds={class_.students.map(student => student.id)} 
                />}
                cssClasses={'behaviorBookButtonBB addStudentBB'}
              />
              <div className='quarterSelectConBB'>
                <label htmlFor='quarter'>
                  <p className=''>
                    Quarter
                  </p>
                </label>
                <select 
                  name="quarter" 
                  id="quarter" 
                  className="quarterSelectBB"
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
                      <td className="tableCellBB tableHeadCellBB finalHeadCellBB">Final</td>
                    </tr>
                  </thead>
                  <tbody id="tableBodyBB">
                    {class_.students.map((student, iStudent) => {
                      // Calculate final grade using behavior assignments
                      let finalGrade = calcBehaviorFinalGrade(student.id);
                      let finalLetterGrade = finalGrade !== 'N/A' ? calcLetterGrade(finalGrade) : 'N/A';
                      return (
                      <tr className="tableBodyRowBB" key={`studentName${iStudent}`}>
                        {behaviorAssignments.map((assignment, iAssignment) => {
                          const currentGrade = getBehaviorGrade(student.id, assignment.id);
                          
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
