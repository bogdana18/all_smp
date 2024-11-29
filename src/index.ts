import { UniversityManagementSystem } from "./UniversityManagementSystem/UniversityManagementSystem";
import { Faculty, Semester, StudentStatus, GradeValue, CourseType } from "./enum/enums";

const university = new UniversityManagementSystem();

// Реєстрація студентів
const student1 = university.enrollStudent({
    fullName: "Did Petro",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "CS-101",
});

const student2 = university.enrollStudent({
    fullName: "Did Panas",
    faculty: Faculty.Computer_Science,
    year: 2,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "CS-201",
});

const student3 = university.enrollStudent({
    fullName: "Did Stepan",
    faculty: Faculty.Economics,
    year: 3,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "ECON-301",
});

console.log("Students enrolled:", [student1, student2, student3]);

// Додавання курсів
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

const course2 = {
    id: 2,
    name: "Microeconomics",
    type: CourseType.Mandatory,
    credits: 3,
    semester: Semester.Second,
    faculty: Faculty.Economics,
    maxStudents: 30,
    registeredStudents: 0,
};

university["courses"].push(course1, course2);

console.log("Courses added:", [course1, course2]);

try {
    university.registerForCourse(student1.id, course1.id); // Успішна реєстрація
    university.registerForCourse(student2.id, course1.id); // Успішна реєстрація
    console.log("Students registered for course:", course1.name);
} catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
    } else {
        console.error("An unknown error occurred.");
    }
}

try {
    university.registerForCourse(student3.id, course1.id); // Курс повний
} catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
    } else {
        console.error("An unknown error occurred.");
    }
}

university.setGrade(student1.id, course1.id, GradeValue.Excellent);
university.setGrade(student2.id, course1.id, GradeValue.Good);

console.log("Grades assigned.");

try {
    university.updateStudentStatus(student1.id, StudentStatus.Academic_Leave);
    console.log("Student status updated:", student1.fullName);
} catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
    } else {
        console.error("An unknown error occurred.");
    }
}

const csStudents = university.getStudentsByFaculty(Faculty.Computer_Science);
console.log("Computer Science students:", csStudents);

const student1Grades = university.getStudentGrades(student1.id);
console.log("Grades for student:", student1.fullName, student1Grades);

const availableCourses = university.getAvailableCourses(Faculty.Computer_Science, Semester.First);
console.log("Available courses for Computer Science (First Semester):", availableCourses);

const student1AvgGrade = university.calculateAverageGrade(student1.id);
console.log("Average grade for student:", student1.fullName, student1AvgGrade);

const topCSStudents = university.getFacultyTopStudents(Faculty.Computer_Science);
console.log("Top students in Computer Science:", topCSStudents);
