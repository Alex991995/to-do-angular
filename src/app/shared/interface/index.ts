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

export interface IMainData {
  country: string;
  email: string;
  name: string;
  phone: string;
}

export interface IAdditionalData {
  country: string;
  city: string;
  street: string;
  date: string;
  sex: string;
  email: string;
  name: string;
}

export interface IBody {
  country: string;
  email: string;
  name: string;
  phone: string;
  city: string;
  street: string;
  date: string;
  sex: string;
  emailAdult: string | null;
  nameAdult: string | null;
}
