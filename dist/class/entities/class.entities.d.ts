import { State } from "../enum/class.enum";
export declare class Class {
    id: string;
    name: string;
    course: string;
    basis: string;
    operate: string;
    state: State;
    start: Date;
    countTime: number;
    mostLesson: number;
    students: string[];
    teachers: string;
    createdAt: Date;
    updatedAt: Date;
}
