import { Schema, model } from "mongoose";
export interface IPerson {
  Name: string;
  email: string;
  phoneNumber: string;
  age: number;
  deletedAt: number;
  createdAt: Date;
  updatedAt: Date;
}

const PersonSchema = new Schema<IPerson>({
  Name: { type: String, required: true, minlength: 2, trim: true },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
    required: true,
  },
  deletedAt: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Person = model("Person", PersonSchema);
