import { Task } from "./../models/task.model";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-task-manager",
  templateUrl: "./task-manager.component.html",
  styleUrls: ["./task-manager.styles.css"]
})
export class TaskManagerComponent implements OnInit {
  task: Task;
  listOfTasks: Array<Task>;
  inputText: string;

  constructor() {}

  ngOnInit(): void {
    this.getTasks();
  }

  createTask(inputText: string) {
    let id = this.getMaxKey(this.getKeys()) + 1;
    let inputTextList: Array<string> = inputText.split("em");
    this.task = new Task(
      id,
      inputTextList[0],
      inputTextList[1].slice(1),
      false
    );
    this.saveInLocalStorage(this.task);
    this.getTasks();
  }

  getKeys() {
    const storedObjects = Object.keys(localStorage);
    let keys = [];
    for (let key in storedObjects) {
      if (Number.isNaN(parseInt(storedObjects[key]))) {
      } else {
        keys.push(parseInt(storedObjects[key]));
      }
    }
    return keys.sort((a, b) => (a > b ? 1 : -1));
  }

  getTasks() {
    let keys: any = this.getKeys();
    let savedTasks: Array<Task> = [];
    for (let i in keys) {
      savedTasks.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    this.listOfTasks = savedTasks;
  }

  getMaxKey(keys: Array<number>) {
    const maxKey: number =
      Math.max(...keys) != -Infinity ? Math.max(...keys) : 0;

    return maxKey;
  }

  saveInLocalStorage(task: Task) {
    let maxKey: number = this.getMaxKey(this.getKeys());
    localStorage.setItem(String(maxKey + 1), JSON.stringify(task));
  }

  finishTask(taskID) {
    let task = JSON.parse(localStorage.getItem(taskID));
    task.isFinished = true;
    localStorage.setItem(taskID, JSON.stringify(task));
    this.getTasks();
  }

  removeTask(taskID) {
    localStorage.removeItem(taskID);
    this.getTasks();
  }

  removeAllTasks() {
    let keys = this.getKeys();

    for (let key in keys) {
      localStorage.removeItem(keys[key]);
    }
    this.getTasks();
  }
}
