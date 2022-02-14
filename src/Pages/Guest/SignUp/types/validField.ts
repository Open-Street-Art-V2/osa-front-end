/**
 * To handle errors in form.
 * - NOTFILLED is when the field never has been filled yet
 * - OK is when the field is OK
 * - ERROR is when the field has been filled but with error
 */
enum ValidField {
  OK,
  ERROR,
  NOTFILLED,
}

export default ValidField;
