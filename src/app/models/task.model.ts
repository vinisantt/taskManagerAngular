export class Task {
  id: number;
  name: string;
  date: string;
  isFinished: boolean;

  constructor(id: number, name: string, date: string, isFinished: boolean) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.isFinished = isFinished;
  }
}
