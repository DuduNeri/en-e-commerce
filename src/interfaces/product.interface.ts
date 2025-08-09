import { Types } from "mongoose";

export interface IProduct {
  name: string;
  title: string;
  description: string;
  price: number;
  owner: Types.ObjectId; 
  createdAt?: Date;
  updatedAt?: Date;
  user: Types.ObjectId;
}
