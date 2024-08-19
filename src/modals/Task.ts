class Task {
  id: number | undefined;
  name: string;
  description: string;
  status: string;
  date: string | undefined;

  constructor(name: string, description: string, status: string) {
    this.id = Date.now();
    this.name = name;
    this.description = description;
    this.status = status;
    this.date = new Date().toLocaleDateString();
  }

  toPlainObject() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      status: this.status,
      date: this.date,
    };
  }

  static fromPlainObject(obj: {
    id: number;
    name: string;
    description: string;
    status: string;
    date: string;
  }) {
    const task = new Task(obj.name, obj.description, obj.status);
    task.id = obj.id;
    task.date = obj.date;
    return task;
  }
}

export default Task;
