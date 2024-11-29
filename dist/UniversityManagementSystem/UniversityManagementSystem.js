"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversityManagementSystem = void 0;
const enums_1 = require("../enum/enums");
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
        if (student.status === enums_1.StudentStatus.Graduated ||
            student.status === enums_1.StudentStatus.Expelled) {
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
            return average === enums_1.GradeValue.Excellent;
        });
    }
}
exports.UniversityManagementSystem = UniversityManagementSystem;
