export interface ITaskCreate {
  title: string;
  completed: boolean
}

export interface ITask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}