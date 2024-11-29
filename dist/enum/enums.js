"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = exports.GradeValue = exports.Semester = exports.CourseType = exports.StudentStatus = void 0;
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["Active"] = "Active";
    StudentStatus["Academic_Leave"] = "Academic_Leave";
    StudentStatus["Graduated"] = "Graduated";
    StudentStatus["Expelled"] = "Expelled";
})(StudentStatus || (exports.StudentStatus = StudentStatus = {}));
var CourseType;
(function (CourseType) {
    CourseType["Mandatory"] = "Mandatory";
    CourseType["Optional"] = "Optional";
    CourseType["Special"] = "Special";
})(CourseType || (exports.CourseType = CourseType = {}));
var Semester;
(function (Semester) {
    Semester["First"] = "First";
    Semester["Second"] = "Second";
})(Semester || (exports.Semester = Semester = {}));
var GradeValue;
(function (GradeValue) {
    GradeValue[GradeValue["Excellent"] = 5] = "Excellent";
    GradeValue[GradeValue["Good"] = 4] = "Good";
    GradeValue[GradeValue["Satisfactory"] = 3] = "Satisfactory";
    GradeValue[GradeValue["Unsatisfactory"] = 2] = "Unsatisfactory";
})(GradeValue || (exports.GradeValue = GradeValue = {}));
var Faculty;
(function (Faculty) {
    Faculty["Computer_Science"] = "Computer_Science";
    Faculty["Economics"] = "Economics";
    Faculty["Law"] = "Law";
    Faculty["Engineering"] = "Engineering";
})(Faculty || (exports.Faculty = Faculty = {}));
