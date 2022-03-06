import Validator from "password-validator";

const requirements = new Validator();

// Add properties to it
requirements
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(25) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 2 digits
  .has()
  .not()
  .spaces();

export default requirements;
