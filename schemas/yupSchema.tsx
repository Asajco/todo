import * as yup from "yup";

export const validationSchema = yup.object({
  title: yup.string().required("Title is required"), // Add the required validation
  description: yup.string(),
  date: yup.date(),
});
