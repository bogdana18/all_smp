import { Student, Course, Grade } from "../interface/interfaces";
import { Faculty, StudentStatus, GradeValue, Semester } from "../enum/enums";

export class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: Grade[] = [];
    private studentCounter = 1;
    private courseCounter = 1;

    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = { id: this.studentCounter++, ...student };
        this.students.push(newStudent);
        return newStudent;
    }

    registerForCourse(studentId: number, courseId: number): void {
        const student = this.students.find((s) => s.id === studentId);
        const course = this.courses.find((c) => c.id === courseId);

        if (!student) throw new Error("Student not found");
        if (!course) throw new Error("Course not found");
        if (student.faculty !== course.faculty) throw new Error("Faculty mismatch");
        if (course.registeredStudents >= course.maxStudents) throw new Error("Course is full");

        course.registeredStudents++;
    }

    setGrade(studentId: number, courseId: number, grade: GradeValue): void {
        const student = this.students.find((s) => s.id === studentId);
        const course = this.courses.find((c) => c.id === courseId);

        if (!student) throw new Error("Student not found");
        if (!course) throw new Error("Course not found");

        this.grades.push({
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: course.semester,
        });
    }

    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find((s) => s.id === studentId);
        if (!student) throw new Error("Student not found");

        if (
            student.status === StudentStatus.Graduated ||
            student.status === StudentStatus.Expelled
        ) {
            throw new Error("Cannot update status for graduated or expelled student");
        }

        student.status = newStatus;
    }

    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter((s) => s.faculty === faculty);
    }

    getStudentGrades(studentId: number): Grade[] {
        return this.grades.filter((g) => g.studentId === studentId);
    }

    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(
            (c) => c.faculty === faculty && c.semester === semester && c.registeredStudents < c.maxStudents
        );
    }

    calculateAverageGrade(studentId: number): number {
        const studentGrades = this.grades.filter((g) => g.studentId === studentId);
        if (studentGrades.length === 0) return 0;

        const totalGrades = studentGrades.reduce((sum, g) => sum + g.grade, 0);
        return totalGrades / studentGrades.length;
    }

    getFacultyTopStudents(faculty: Faculty): Student[] {
        const students = this.students.filter((s) => s.faculty === faculty);
        return students.filter((s) => {
            const average = this.calculateAverageGrade(s.id);
            return average === GradeValue.Excellent;
        });
    }
}
