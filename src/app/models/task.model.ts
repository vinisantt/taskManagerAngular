export class Task {
    name: string;
    date: string;
    isFinished: boolean;

    constructor(name: string, date: string, isFinished: boolean ){
        this.name = name;
        this.date = date;
        this.isFinished = isFinished;

    }
}