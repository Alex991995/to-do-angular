export interface ITaskCreate {
  todo: string;
  completed: boolean;
}

export interface ITask {
  id: string;
  todo: string;
  completed: boolean;
}

export interface ICountry {
  [key: string]: string | undefined;
}

export interface Country {
  name: string;
  code: string;
  iso: string;
  flag: string;
  mask: string;
}
