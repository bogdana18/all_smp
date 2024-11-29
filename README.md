# University Management System
This TypeScript-based project implements a university management system to manage students, courses, and grades.

## Features
- Enroll Students
  - Add new students to the system.
  - Automatically assigns a unique ID.
-  Register for Courses
  - Allows students to register for courses.
  - Validates the following:
  - Course capacity limits.
  - Faculty matching between the student and the course.
- Assign Grades
  - Assign grades to students for registered courses.
  - Validates that the student is registered in the course before assigning grades.
- Update Student Status
  - Change the status of a student (e.g., to "Academic Leave" or "Graduated").
  - Prevents status changes for students already "Graduated" or "Expelled."
- Retrieve Students by Faculty
  - Fetch all students associated with a specific faculty.
- Get Student Grades
  - Retrieve a list of grades for a specific student.
- Available Courses
  - Get a list of courses available for registration based on:
  - Faculty.
  - Semester.
- Calculate Average Grade
  - Compute the average grade for a student across all their courses.
- Faculty Top Students
  - Retrieve a list of top-performing students (with an average grade of 5) in a specific faculty.
