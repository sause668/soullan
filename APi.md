## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Unauthorized"
    }
    ```

### Get the Current User (Teacher)

Returns the information about the current teacher user that is logged in.

* Require Authentication: false
* Request
  * Method: GET
  * Route path: /api/auth
  * Body: none

* Successful Response when there is a logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "Severus",
      "lastName": "Snape",
      "email": "ssname@soulachademey.com",
      "username": "ssnape",
      "type": "teacher",
      "teacher": {
        "id": 1,
        "user_id": 1,
        "primary_grade": 8,
        "primary_subject": "Math"
      }
    }
    ```
    
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Unauthorized"
    }
    ```

### Get the Current User (Student)

Returns the information about the current student user that is logged in.

* Require Authentication: false
* Request
  * Method: GET
  * Route path: /api/auth
  * Body: none

* Successful Response when there is a logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 5,
      "firstName": "Harry",
      "lastName": "Potter",
      "email": "hpotter@soulachademy.com",
      "username": "hpotter",
      "type": "student",
      "student": {
        "id": 1,
        "grade": 8
      }
    }
    ```

* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Unauthorized"
    }
    ```

### Log In a User (Teacher)

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * Route path: /api/auth/login
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "ssnape@soulacademy.com",
      "password": "password",
      "type": "teacher",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "Severus",
      "lastName": "Snape",
      "email": "ssname@soulachademey.com",
      "username": "ssnape",
      "type": "teacher",
      "teacher": {
          "id": 1,
          "user_id": 1,
          "primary_grade": 8,
          "primary_subject": "Math"
      }
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "Email provided not found.",
      "password": "Password was incorrect.",
    }
    ```

### Log In a User (Student)

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * Route path: /api/auth/login
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "email": "hpotter@soulacademy.com",
        "password": "secret password",
        "type": "student",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 5,
      "firstName": "Harry",
      "lastName": "Potter",
      "email": "hpotter@soulachademy.com",
      "username": "hpotter",
      "type": "student",
      "student": {
        "id": 1,
        "grade": 8
      }
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "Email provided not found.",
      "password": "Password was incorrect.",
    }
    ```

### Sign Up a User (Teacher)

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * Route path: /api/auth/signup
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "firstName": "Severus",
        "lastName": "Snape",
        "email": "ssname@soulachademey.com",
        "username": "ssnape",
        "password": "password",
        "type": "teacher",
        "primary_grade": 8,
        "primary_subject": "Math"
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "Severus",
      "lastName": "Snape",
      "email": "ssname@soulachademey.com",
      "username": "ssnape",
      "type": "teacher",
      "teacher": {
          "id": 1,
          "user_id": 1,
          "primary_grade": 8,
          "primary_subject": "Math"
      }
    }
    ```

* Error response: Validation errors
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "Email address is already in use.",
      "username": "Username is already in use.",
      "password": "Password required",
      "first_name": "Maximum 20 characters",
      "last_name": "Maximum 20 characters",
      "type": "Type Required",
      "primary_grade": "Must be between 6 and 8",
      "primary_subject": "Subject Required"
    }
    ```

### Sign Up a User (Student)

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * Route path: /api/auth/signup
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "firstName": "Harry",
        "lastName": "Potter",
        "email": "hpotter@soulachademy.com",
        "username": "hpotter",
        "password": "password",
        "type": "student",
        "grade": 8
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 5,
      "firstName": "Harry",
      "lastName": "Potter",
      "email": "hpotter@soulachademy.com",
      "username": "hpotter",
      "type": "student",
      "student": {
        "id": 1,
        "grade": 8
      }
    }
    ```

* Error response: Validation errors
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "Email address is already in use.",
      "username": "Username is already in use.",
      "password": "Password required",
      "first_name": "Maximum 20 characters",
      "last_name": "Maximum 20 characters",
      "type": "Type Required",
      "grade": "Must be between 6 and 8"
    }
    ```

## CLASSES

### Get all User Classes (Teacher) - Dashboard Page

Returns all teacher classes.

* Require Authentication: true
* Request
  * Method: GET
  * Route path: /api/classes
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    [
      {
        "id": 1,
        "teacher_id": 1,
        "name": "Algebra",
        "subject": "Math",
        "grade": 8,
        "period": 1,
        "room": 315,
        "numStudents": 1
      },
    ]
    ```

### Get all User Classes (Student) - Dashboard Page

Returns all student classes.

* Require Authentication: true
* Request
  * Method: GET
  * Route path: /api/classes
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    [
      {
        "id": 1,
        "teacher_id": 1,
        "teacher": {
          "id": 1,
          "user_id": 1,
          "primary_grade": 8,
          "primary_subject": "Math",
          "first_name": "Severus",
          "last_name": "Snape"
        },
        "name": "Algebra",
        "subject": "Math",
        "grade": 8,
        "period": 1,
        "room": 315,
        "assignments": [
          {
            "id": 1,
            "class_id": 1,
            "name": "Exponents Classwork",
            "type": "CW",
            "quarter": 1,
            "due_date": "Mon, 19 Aug 2024",
            "grade": 82
          }
        ]
      }
    ]
    ```

### Get Class by ID (Teacher) - Grade Book Page

Returns teacher's class by ID with all the information needed for the grade book page.

* Require Authentication: true (teacher only)
* Request
  * Method: GET
  * Route path: /api/classes/:classId
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        },
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            },
          ]
        },
      ]
    }
    ```

### Get Class by ID (Student) - Grade Page

Returns student's class by ID with all information for the grade page.

* Require Authentication: true 
* Request
  * Method: GET
  * Route path: /api/classes/:classId
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "teacher": {
        "id": 1,
        "user_id": 1,
        "primary_grade": 8,
        "primary_subject": "Math",
        "first_name": "Severus",
        "last_name": "Snape"
      },
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grade": 82
        },
      ]
    }
    ```

### Create Class

Creates new class.

* Require Authentication: true (teacher only)
* Request
  * Method: POST
  * Route path: /api/classes
  * Body: 

    ```json
    {
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 2,
      "room": 315
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    [
      {
        "id": 1,
        "teacher_id": 1,
        "name": "Algebra",
        "subject": "Math",
        "grade": 8,
        "period": 1,
        "room": 315,
        "numStudents": 1
      },
      {
        "id": 2,
        "teacher_id": 1,
        "name": "Algebra",
        "subject": "Math",
        "grade": 8,
        "period": 2,
        "room": 315,
        "numStudents": 0
      },
    ]
    ```

* Error Response: Validation errors
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Name address is required",
      "subject": "Subject is required",
      "grade": "Must be between 6 and 8",
      "period": "Must be between 1 and 4",
      "room": "Must be between 100 and 350"
    }
    ```

### Edit Class

Edits class by ID.

* Require Authentication: true (teacher only)
* Request
  * Method: GET
  * Route path: /api/classes/:classId
  * Body: 

    ```json
    {
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 3,
      "room": 315
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    [
      {
        "id": 1,
        "teacher_id": 1,
        "name": "Algebra",
        "subject": "Math",
        "grade": 8,
        "period": 1,
        "room": 315,
        "numStudents": 1
      },
      {
        "id": 2,
        "teacher_id": 1,
        "name": "Algebra",
        "subject": "Math",
        "grade": 8,
        "period": 3,
        "room": 315,
        "numStudents": 0
      },
    ]
    ```

* Error Response: Validation errors
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Name address is required",
      "subject": "Subject is required",
      "grade": "Must be between 6 and 8",
      "period": "Must be between 1 and 4",
      "room": "Must be between 100 and 350"
    }
    ```

* Error response: Couldn't find a Spot with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Class not found"
    }
    ```

### Delete Class

Deletes class by ID.

* Require Authentication: true (teacher only)
* Request
  * Method: GET
  * Route path: /api/classes/:classId
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    [
      {
        "id": 1,
        "teacher_id": 1,
        "name": "Algebra",
        "subject": "Math",
        "grade": 8,
        "period": 1,
        "room": 315,
        "numStudents": 1
      },
    ]
    ```

* Error response: Couldn't find a Spot with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Class couldn't be found"
    }
    ```

## ASSIGNMENTS

### Create Assignment

Creates class assignment.

* Require Authentication: true (teacher only)
* Request
  * Method: POST
  * Route path: /api/classes/:classId/assignments
  * Body: 

    ```json
    {
        "name": "Exponents Homework",
        "type": "HW",
        "quarter": 1,
        "due_date": "22-8-24",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        },
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            },
          ]
        },
        {
          "id": 2,
          "class_id": 1,
          "name": "Exponents Homework",
          "type": "HW",
          "quarter": 1,
          "due_date": "Thu, 22 Aug 2024",
          "grades": []
        },
      ]
    }
    ```

* Error response: Couldn't find a class with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Class not found"
    }
    ```

* Error Response: Validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Name is required",
      "type": "Type is required",
      "quarter": "Must be between 1 and 4",
      "due_date": "Improper date",
    }
    ```

### Edit Assignment

Edits class assignment by ID.

* Require Authentication: true (teacher only)
* Request
  * Method: PUT
  * Route path: /api/assignments/:assignmentId
  * Body: 

    ```json
    {
      "name": "Exponents Homework",
      "type": "HW",
      "quarter": 1,
      "due_date": "23-8-24",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        },
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            },
          ]
        },
        {
          "id": 2,
          "class_id": 1,
          "name": "Exponents Homework",
          "type": "HW",
          "quarter": 1,
          "due_date": "Fri, 23 Aug 2024",
          "grades": []
        },
      ]
    }
    ```

* Error response: Couldn't find a assignment with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Assignment not found"
    }
    ```

* Error Response: Validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Name is required",
      "type": "Type is required",
      "quarter": "Must be between 1 and 4",
      "due_date": "Improper date",
    }
    ```

### Delete Assignment

Deletes class assignment by ID.

* Require Authentication: true (teacher only)
* Request
  * Method: DELETE
  * Route path: /api/assignments/:assignmentId
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        },
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Wed, 21 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            },
          ]
        },
      ]
    }
    ```

* Error response: Couldn't find a assignment with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Assignment not found"
    }
    ```

## STUDENTS

### Add Student

Adds a Student to a classroom.

* Require Authentication: true (teacher only)
* Request
  * Method: POST
  * Route path: /api/classes/:classId/students/:studentId
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        },
        {
          "id": 6,
          "firstName": "Ronald",
          "lastName": "Weasley"
        },
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            },
          ]
        }
      ]
    }
    ```

* Error response: Couldn't find a class with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Class not found"
    }
    ```

* Error response: Couldn't find a student with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Student not found"
    }
    ```

* Error Response: Validation error
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Student Already Exists"
    }
    ```

### Remove Student

Remove a Student to a classroom.

* Require Authentication: true (teacher only)
* Request
  * Method: DELETE
  * Route path: /api/classes/:classId/students/:studentId
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        }
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            },
          ]
        }
      ]
    }
    ```

* Error response: Couldn't find a class with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Class not found"
    }
    ```

* Error response: Couldn't find a student with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Student not found"
    }
    ```

* Error Response: Couldn't find a student with the specified id in class with specified id
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Student is not in this class"
    }
    ```


## GRADES

### Create Grade

Creates new grade.

* Require Authentication: true (teacher only)
* Request
  * Method: POST
  * Route path: /api/assignments/:assignmentId/grades/:studentId
  * Body: 

    ```json
    {
      "grade": 90
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        },
        {
          "id": 6,
          "firstName": "Ronald",
          "lastName": "Weasley"
        },
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            },
            {
              "assignment_id": 1,
              "student_id": 6,
              "grade": 90
            }
          ]
        }
      ]
    }
    ```

* Error response: Couldn't find a assignment with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Assignment couldn't be found"
    }
    ```

* Error response: Couldn't find a student with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Student couldn't be found"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "grade": "Must be between 0 and 100"
    }
    ```

### Edit Grade

Edits grade by ID.

* Require Authentication: true (teacher only)
* Request
  * Method: PUT
  * Route path: /api/assignments/:assignmentId/grades/:studentId
  * Body: 

    ```json
    {
        "grade": 85
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        },
        {
          "id": 6,
          "firstName": "Ronald",
          "lastName": "Weasley"
        },
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            },
            {
              "assignment_id": 1,
              "student_id": 6,
              "grade": 85
            }
          ]
        }
      ]
    }
    ```

* Error response: Couldn't find a grade with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Grade couldn't be found"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "grade": "Grade is required"
    }
    ```

### Delete Grade

Deletes grade by ID.

* Require Authentication: true (teacher only)
* Request
  * Method: DELETE
  * Route path: /api/assignments/:assignmentId/grades/:studentId
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        },
        {
          "id": 6,
          "firstName": "Ronald",
          "lastName": "Weasley"
        },
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            }
          ]
        }
      ]
    }
    ```

* Error response: Couldn't find a grade with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Grade couldn't be found"
    }
    ```