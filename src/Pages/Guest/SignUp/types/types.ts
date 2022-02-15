import ValidField from "./validField";

export type StateOne = {
  firstname: string;
  name: string;
  email: string;
  birthDate: Date;
  isValidFirstname: ValidField;
  isValidName: ValidField;
  isValidEmail: ValidField;
  isValidBirthDate: ValidField;
  isValidForm: boolean;
};

export type ActionOne =
  | { type: "FIRSTNAME_CHANGED"; value: string }
  | { type: "NAME_CHANGED"; value: string }
  | { type: "EMAIL_CHANGED"; value: string }
  | { type: "BIRTHDATE_CHANGED"; value: Date };

export type StateTwo = {
  favoriteCity: string;
  password: string;
  verifiedPassword: string;
  isValidFavoriteCity: ValidField;
  isValidPassword: ValidField;
  isValidVerifiedPassword: ValidField;
  isValidForm: boolean;
};

export type ActionTwo =
  | { type: "FAVORITE_CITY_CHANGED"; value: string }
  | { type: "PASSWORD_CHANGED"; value: string }
  | { type: "VERIFIED_PASSWORD_CHANGED"; value: string };

export const maxDate = new Date(
  new Date().setFullYear(new Date().getFullYear() - 10)
);
