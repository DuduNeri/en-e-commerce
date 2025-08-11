
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserResponse = Omit<IUser, "password">;
