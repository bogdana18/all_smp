"use strict";
// Enums
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["Active"] = "Active";
    StudentStatus["Academic_Leave"] = "Academic_Leave";
    StudentStatus["Graduated"] = "Graduated";
    StudentStatus["Expelled"] = "Expelled";
})(StudentStatus || (StudentStatus = {}));
var CourseType;
(function (CourseType) {
    CourseType["Mandatory"] = "Mandatory";
    CourseType["Optional"] = "Optional";
    CourseType["Special"] = "Special";
})(CourseType || (CourseType = {}));
var Semester;
(function (Semester) {
    Semester["First"] = "First";
    Semester["Second"] = "Second";
})(Semester || (Semester = {}));
var GradeValue;
(function (GradeValue) {
    GradeValue[GradeValue["Excellent"] = 5] = "Excellent";
    GradeValue[GradeValue["Good"] = 4] = "Good";
    GradeValue[GradeValue["Satisfactory"] = 3] = "Satisfactory";
    GradeValue[GradeValue["Unsatisfactory"] = 2] = "Unsatisfactory";
})(GradeValue || (GradeValue = {}));
var Faculty;
(function (Faculty) {
    Faculty["Computer_Science"] = "Computer_Science";
    Faculty["Economics"] = "Economics";
    Faculty["Law"] = "Law";
    Faculty["Engineering"] = "Engineering";
})(Faculty || (Faculty = {}));
// University Management System
class UniversityManagementSystem {
    constructor() {
        this.students = [];
        this.courses = [];
        this.grades = [];
        this.studentCounter = 1;
        this.courseCounter = 1;
    }
    enrollStudent(student) {
        const newStudent = Object.assign({ id: this.studentCounter++ }, student);
        this.students.push(newStudent);
        return newStudent;
    }
    registerForCourse(studentId, courseId) {
        const student = this.students.find((s) => s.id === studentId);
        const course = this.courses.find((c) => c.id === courseId);
        if (!student)
            throw new Error("Student not found");
        if (!course)
            throw new Error("Course not found");
        if (student.faculty !== course.faculty)
            throw new Error("Faculty mismatch");
        if (course.registeredStudents >= course.maxStudents)
            throw new Error("Course is full");
        course.registeredStudents++;
    }
    setGrade(studentId, courseId, grade) {
        const student = this.students.find((s) => s.id === studentId);
        const course = this.courses.find((c) => c.id === courseId);
        if (!student)
            throw new Error("Student not found");
        if (!course)
            throw new Error("Course not found");
        this.grades.push({
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: course.semester,
        });
    }
    updateStudentStatus(studentId, newStatus) {
        const student = this.students.find((s) => s.id === studentId);
        if (!student)
            throw new Error("Student not found");
        if (student.status === StudentStatus.Graduated ||
            student.status === StudentStatus.Expelled) {
            throw new Error("Cannot update status for graduated or expelled student");
        }
        student.status = newStatus;
    }
    getStudentsByFaculty(faculty) {
        return this.students.filter((s) => s.faculty === faculty);
    }
    getStudentGrades(studentId) {
        return this.grades.filter((g) => g.studentId === studentId);
    }
    getAvailableCourses(faculty, semester) {
        return this.courses.filter((c) => c.faculty === faculty && c.semester === semester && c.registeredStudents < c.maxStudents);
    }
    calculateAverageGrade(studentId) {
        const studentGrades = this.grades.filter((g) => g.studentId === studentId);
        if (studentGrades.length === 0)
            return 0;
        const totalGrades = studentGrades.reduce((sum, g) => sum + g.grade, 0);
        return totalGrades / studentGrades.length;
    }
    getFacultyTopStudents(faculty) {
        const students = this.students.filter((s) => s.faculty === faculty);
        return students.filter((s) => {
            const average = this.calculateAverageGrade(s.id);
            return average === GradeValue.Excellent;
        });
    }
}
// Main logic
const university = new UniversityManagementSystem();
// Enroll students
const student1 = university.enrollStudent({
    fullName: "Did Panas",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "CS-101",
});
const student2 = university.enrollStudent({
    fullName: "Did Petro",
    faculty: Faculty.Computer_Science,
    year: 2,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "CS-201",
});
console.log("Enrolled students:", [student1, student2]);
// Add courses
const course1 = {
    id: 1,
    name: "Algorithms",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 2,
    registeredStudents: 0,
};
university["courses"].push(course1);
// Register students for a course
try {
    university.registerForCourse(student1.id, course1.id);
    university.registerForCourse(student2.id, course1.id);
    console.log("Students registered for course:", course1.name);
}
catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
    }
    else {
        console.error("An unknown error occurred.");
    }
}
// Assign grades
university.setGrade(student1.id, course1.id, GradeValue.Excellent);
university.setGrade(student2.id, course1.id, GradeValue.Good);
console.log("Grades assigned.");
// Calculate average grade
const averageGrade = university.calculateAverageGrade(student1.id);
console.log(`Average grade for ${student1.fullName}:`, averageGrade);
// Get top students
const topStudents = university.getFacultyTopStudents(Faculty.Computer_Science);
console.log("Top students in Computer Science:", topStudents);
