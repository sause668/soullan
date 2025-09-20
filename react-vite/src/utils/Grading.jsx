const rubric = {
    'HW': 1,
    'CW': 1,
    'Q': 2,
    'T': 3,
    'P': 3
  }

  const calcType = (grades, type) => {
    const typeGrades = grades.filter(g => g.type == type).map(g => g.grade)
    
    if (typeGrades.length <= 0) return null;
    
    const totalGrade = typeGrades.reduce((sum, grade) => sum + grade, 0) / typeGrades.length
    const weight = rubric[type]
    return {
        weight,
        grade: totalGrade * weight
    }
  }

  const calcFinalGrade = (grades) => {
    const classwork = calcType(grades, 'CW')
    const homework = calcType(grades, 'HW')
    const quiz = calcType(grades, 'Q')
    const test = calcType(grades, 'T')
    const project = calcType(grades, 'P')

    const gradeArr = [classwork, homework, quiz, test, project]

    const totalGrade = gradeArr.reduce((sum, grade) => {
        return (grade) ? sum + grade.grade: sum + 0
    }, 0)
    const totalWeight = gradeArr.reduce((sum, grade) => {
        return (grade) ? sum + grade.weight: sum + 0
    }, 0)

    if (totalWeight == 0) return 'N/A'

    return Math.round(totalGrade / totalWeight)  
  }

  export const calcFinalGradeStudent = (assignments) => {
    const grades = assignments.map(assignment => {
      return {
        grade: assignment.grade, 
        type: assignment.type
      }
    })
    
    return calcFinalGrade(grades)
  }

  export const calcFinalGradeTeacher = (assignments, studentId) => {
    const grades = [];
    assignments.forEach(assignment => {
        const grade = assignment.grades.find((grade) => {
            return grade.student_id == studentId
          })
        
        if (grade) grades.push({
            grade: grade.grade, 
            type: assignment.type
        })
    })
    
    return calcFinalGrade(grades)
  }

export const calcLetterGrade = (grade) => {
    if (grade >= 92) return 'A';
    if (grade >= 83) return 'B';
    if (grade >= 72) return 'C';
    if (grade >= 65) return 'D';
    return 'F';
}


export const sortStudents = (student1, student2) => {
    if (student1.last_name > student2.last_name) return 1;
    if (student1.last_name < student2.last_name) return -1;
    if (student1.first_name > student2.first_name) return 1;
    if (student1.first_name < student2.first_name) return -1;
}

export const sortAssignments = (assign1, assign2) => {
    const date1 = new Date(assign1.due_date).toISOString().slice(0, 10);
    const date2 = new Date(assign2.due_date).toISOString().slice(0, 10);
    return date1 > date2 ? 1:-1;
}

export const calcBehaviorGrade = (att, learn, coop) => {
  const total = att + learn * 1.5 + coop / 2
  return Math.round(total / 3)
}

export const convertBehaviorGrade = (grade) => {
  switch (grade) {
    case 1:
      return 'Poor';
    case 2:
      return 'Lacking';
    case 3:
      return 'Average';
    case 4:
      return 'Good';
    case 5:
      return 'Excellent';
    default:
      return 'N/A';
  }
}

export const convertBehaviorPriorityGrade = (grade) => {
  switch (grade) {
    case 1:
      return 'At Risk';
    case 2:
      return 'Struggling';
    case 3:
      return 'On Par';
    case 4:
      return 'Doing Well';
    case 5:
      return 'Accelerate';
    default:
      return 'N/A';
  }
}