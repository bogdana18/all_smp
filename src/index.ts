// Enums
enum StudentStatus {
    Active = "Active",
    Academic_Leave = "Academic_Leave",
    Graduated = "Graduated",
    Expelled = "Expelled",
}

enum CourseType {
    Mandatory = "Mandatory",
    Optional = "Optional",
    Special = "Special",
}

enum Semester {
    First = "First",
    Second = "Second",
}

enum GradeValue {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2,
}

enum Faculty {
    Computer_Science = "Computer_Science",
    Economics = "Economics",
    Law = "Law",
    Engineering = "Engineering",
}

// Interfaces
interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
    registeredStudents: number;
}

interface Grade {
    studentId: number;
    courseId: number;
    grade: GradeValue;
    date: Date;
    semester: Semester;
}

// University Management System
class UniversityManagementSystem {
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
} catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
    } else {
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
