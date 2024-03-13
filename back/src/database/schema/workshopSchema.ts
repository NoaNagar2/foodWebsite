import { Schema } from "mongoose";

const workshopSchema = new Schema<IWorkshop>({
  title: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 100,
  },
  subtitle: {
    required: false,
    type: String,
    minlength: 2,
    maxlength: 200,
  },
  url: {
    required: false,
    type: String,
    minlength: 2,
    maxlength: 1000,
  },
  alt: {
    required: false,
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  date: {
    required: true,
    type: String,
    minlength: 8,
    maxlength: 100,
  },
  time: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 5,
  },
  address: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 200,
  },
  participant: [{ type: Object }],
});

export { workshopSchema };
