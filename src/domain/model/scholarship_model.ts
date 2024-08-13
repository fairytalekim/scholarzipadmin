import { Area } from "@/area";

export interface Scholarship {
    organization: string;
    name: string;
    type: "등록금" | "중복 가능 생활비" | "중복 불가능 생활비" | "이자지원";
    details: string;
    startsAt: Date | "정보없음";
    endsAt: Date;
    conditions: string;
    totalNum: number;
    link: string;
    createdAt: Date;
    semester: any[] | "제한없음";
    school: Schools[] | "제한없음";
    inSchoolSupport: "교내" | "직접";
    extra: string;
    total45: number | "제한없음";
    last45: number | "제한없음";
    total43: number | "제한없음";
    last43: number | "제한없음";
    incomeBracket: IncomeBracket;
    additions: Additions[] | "제한없음";
    regionMain: string;
    regionSub: string;
    division: Division[] | "제한없음";
    major: string;
    religion: Religion | "제한없음";
    career: Careers | "제한없음";
    sex: "남성" | "여성" | "제한없음";
    id?: string;
}

export default class ScholarshipModel implements Scholarship {
    organization: string;
    name: string;
    type: "등록금" | "중복 가능 생활비" | "중복 불가능 생활비" | "이자지원";
    details: string;
    startsAt: Date | "정보없음";
    endsAt: Date;
    conditions: string;
    totalNum: number;
    link: string;
    createdAt: Date;
    semester: any[] | "제한없음";
    school: Schools[] | "제한없음";
    inSchoolSupport: "교내" | "직접";
    extra: string;
    total45: number | "제한없음";
    last45: number | "제한없음";
    total43: number | "제한없음";
    last43: number | "제한없음";
    incomeBracket: IncomeBracket;
    additions: Additions[] | "제한없음";
    regionMain: string;
    regionSub: string;
    division: Division[] | "제한없음";
    major: string;
    religion: Religion | "제한없음";
    career: Careers | "제한없음";
    sex: "남성" | "여성" | "제한없음";
    id?: string;

    constructor(scholarship: Scholarship) {
        this.organization = scholarship.organization;
        this.name = scholarship.name;
        this.type = scholarship.type;
        this.details = scholarship.details;
        this.startsAt = scholarship.startsAt;
        this.endsAt = scholarship.endsAt;
        this.conditions = scholarship.conditions;
        this.totalNum = scholarship.totalNum;
        this.link = scholarship.link;
        this.createdAt = scholarship.createdAt;
        this.semester = scholarship.semester;
        this.school = scholarship.school;
        this.inSchoolSupport = scholarship.inSchoolSupport;
        this.extra = scholarship.extra;
        this.total45 = scholarship.total45;
        this.last45 = scholarship.last45;
        this.total43 = scholarship.total43;
        this.last43 = scholarship.last43;
        this.incomeBracket = scholarship.incomeBracket;
        this.additions = scholarship.additions;
        this.regionMain = scholarship.regionMain;
        this.regionSub = scholarship.regionSub;
        this.division = scholarship.division;
        this.major = scholarship.major;
        this.religion = scholarship.religion;
        this.career = scholarship.career;
        this.sex = scholarship.sex;
        this.id = scholarship.id;
    }

    toObject(): Scholarship {
        return {
            organization: this.organization,
            name: this.name,
            type: this.type,
            details: this.details,
            startsAt: this.startsAt,
            endsAt: this.endsAt,
            conditions: this.conditions,
            totalNum: this.totalNum,
            link: this.link,
            createdAt: this.createdAt,
            semester: this.semester,
            school: this.school,
            inSchoolSupport: this.inSchoolSupport,
            extra: this.extra,
            total45: this.total45,
            last45: this.last45,
            total43: this.total43,
            last43: this.last43,
            incomeBracket: this.incomeBracket,
            additions: this.additions,
            regionMain: this.regionMain,
            regionSub: this.regionSub,
            division: this.division,
            major: this.major,
            religion: this.religion,
            career: this.career,
            sex: this.sex,
            id: this.id,
        }
    }
}