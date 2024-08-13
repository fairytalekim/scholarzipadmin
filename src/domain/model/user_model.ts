import { Area } from "./objects/area";

export interface User {
    id: string;
    name: string;
    phoneNum: string;
    hasPaid: boolean;
    status: Status;
    createdAt: Date;
    lastPaymentDate: Date;
    serviceEndAt: Date;
    sex: "남성" | "여성";
    currentScholarship: boolean;
    currentAllScholarship: boolean;
    livingScholarship: boolean;
    studentLoan: boolean;
    incomeBracket: IncomeBracket;
    school: Schools;
    division: Division;
    major: string;
    semester: string;
    schoolGPA: "4.5" | "4.3";
    totalGPA: number;
    lastGPA: number;
    myRegionMain: String;
    myRegionSub: String;
    parentRegionMain: String;
    parentRegionSub: String;
    religion: Religion;
    career: Careers;
    additions: Additions[];
    extraDetails: string;
}

export default class UserModel implements User {
    id: string;
    name: string;
    phoneNum: string;
    hasPaid: boolean;
    status: Status;
    createdAt: Date;
    lastPaymentDate: Date;
    serviceEndAt: Date;
    sex: "남성" | "여성";
    currentScholarship: boolean;
    currentAllScholarship: boolean;
    livingScholarship: boolean;
    studentLoan: boolean;
    incomeBracket: IncomeBracket;
    school: Schools;
    division: Division;
    major: string;
    semester: string;
    schoolGPA: "4.5" | "4.3";
    totalGPA: number;
    lastGPA: number;
    myRegionMain: String;
    myRegionSub: String;
    parentRegionMain: String;
    parentRegionSub: String;
    religion: Religion;
    career: Careers;
    additions: Additions[];
    extraDetails: string;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.phoneNum = user.phoneNum;
        this.hasPaid = user.hasPaid;
        this.status = user.status;
        this.createdAt = user.createdAt;
        this.lastPaymentDate = user.lastPaymentDate;
        this.serviceEndAt = user.serviceEndAt;
        this.sex = user.sex;
        this.currentScholarship = user.currentScholarship;
        this.currentAllScholarship = user.currentAllScholarship;
        this.livingScholarship = user.livingScholarship;
        this.studentLoan = user.studentLoan;
        this.incomeBracket = user.incomeBracket;
        this.school = user.school;
        this.division = user.division;
        this.major = user.major;
        this.semester = user.semester;
        this.schoolGPA = user.schoolGPA;
        this.totalGPA = user.totalGPA;
        this.lastGPA = user.lastGPA;
        this.myRegionMain = user.myRegionMain;
        this.myRegionSub = user.myRegionSub;
        this.parentRegionMain = user.parentRegionMain;
        this.parentRegionSub = user.parentRegionSub;
        this.religion = user.religion;
        this.career = user.career;
        this.additions = user.additions;
        this.extraDetails = user.extraDetails;
    }

    toObject(): User {
        return {
            id: this.id,
            name: this.name,
            phoneNum: this.phoneNum,
            hasPaid: this.hasPaid,
            status: this.status,
            createdAt: this.createdAt,
            lastPaymentDate: this.lastPaymentDate,
            serviceEndAt: this.serviceEndAt,
            sex: this.sex,
            currentScholarship: this.currentScholarship,
            currentAllScholarship: this.currentAllScholarship,
            livingScholarship: this.livingScholarship,
            studentLoan: this.studentLoan,
            incomeBracket: this.incomeBracket,
            school: this.school,
            division: this.division,
            major: this.major,
            semester: this.semester,
            schoolGPA: this.schoolGPA,
            totalGPA: this.totalGPA,
            lastGPA: this.lastGPA,
            myRegionMain: this.myRegionMain,
            myRegionSub: this.myRegionSub,
            parentRegionMain: this.parentRegionMain,
            parentRegionSub: this.parentRegionSub,
            religion: this.religion,
            career: this.career,
            additions: this.additions,
            extraDetails: this.extraDetails
        };
    }
}