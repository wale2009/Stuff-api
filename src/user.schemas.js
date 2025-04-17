import * as yup from "yup";

const MIN_LENGTH = {
  name: 2,
  city: 1,
  country: 2,
};

const MAX_LENGTH = {
  name: 20,
  city: 30,
  country: 30,
  email: 30,
};

export const getUsers = {
  schema: {
    params: {
      yupSchema: yup.object().shape({
        id: yup.number().required(),
      }),
    },
  },
};

export const addUser = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        // name: yup.string().min(MIN_LENGTH.name).max(MAX_LENGTH.name).required(),
        name: yup
          .string()
          .min(MIN_LENGTH.name, "Name too short")
          .max(MAX_LENGTH.name, "Name too long")
          .required("Name is required"),
        email: yup.string().email().max(MAX_LENGTH.email).required(),
        city: yup.string().min(MIN_LENGTH.city).max(MAX_LENGTH.city).required(),
        country: yup
          .string()
          .min(MIN_LENGTH.country)
          .max(MAX_LENGTH.country)
          .required(),
      }),
    },
  },
};

export const updateUser = {
  schema: {
    params: {
      yupSchema: yup.object().shape({
        id: yup.number().required(),
      }),
    },
    body: {
      yupSchema: yup.object().shape({
        // name: yup.string().min(MIN_LENGTH.name).max(MAX_LENGTH.name).required(),
        name: yup
          .string()
          .min(MIN_LENGTH.name, "Name too short")
          .max(MAX_LENGTH.name, "Name too long")
          .required("Name is required"),
        email: yup.string().email().max(MAX_LENGTH.email).required(),
        city: yup.string().min(MIN_LENGTH.city).max(MAX_LENGTH.city).required(),
        country: yup
          .string()
          .min(MIN_LENGTH.country)
          .max(MAX_LENGTH.country)
          .required(),
      }),
    },
  },
};
export const deleteUsers = {
  schema: {
    params: {
      yupSchema: yup.object().shape({
        id: yup.number().required(),
      }),
    },
  },
};
