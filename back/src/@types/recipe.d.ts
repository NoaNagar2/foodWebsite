import { ObjectId } from "mongoose";

type IRecipe = {
  name: string;
  description: string;
  url: string;
  alt: string;
  level: string;
  Ingredients: string[];
  steps: string[];
  category: string;
  likes: string[];
  _id?: string;
};
