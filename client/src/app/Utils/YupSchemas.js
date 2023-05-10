import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string().min(2).max(50).required("Please enter your Name"),
  email: Yup.string().email().max(50).required("Please enter your Email"),
  password: Yup.string().min(7).required("Please enter your Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Please Confirm Password"),
  aadharNumber: Yup.string()
    .min(12)
    .required("Please enter your Aadhar Card Number"),
  mobile: Yup.string().min(10).required("Please enter your Mobile Number"),
  age: Yup.number().min(18).max(45).integer().required("Please enter your Age"),
  weight: Yup.number().min(45).integer().required("Please enter your Weight"),
  address: Yup.string().min(2).max(100).required("Please enter your Address"),
  city: Yup.string().min(2).max(100).required("Please enter your City"),
  country: Yup.string().min(2).max(100).required("Please enter your Country"),
  dateOfBirth: Yup.date().required("Please enter your Date of Birth"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().max(50).required("Please enter your Email"),
  password: Yup.string().min(7).required("Please enter your Password"),
});
