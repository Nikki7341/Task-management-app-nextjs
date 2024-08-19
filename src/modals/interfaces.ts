export interface TaskData {
    name: string;
    description: string;
    status: "todo" | "done" | "doing";
    id: number;
    date: string;
  }
  
  export interface ModalType {
    type: "To Do" | "Doing" | "Done";
    isActive: boolean;
    action: "Add" | "Update";
  }
  
  export interface TaskState {
    todo: TaskData[];
    doing: TaskData[];
    done: TaskData[];
  }
  