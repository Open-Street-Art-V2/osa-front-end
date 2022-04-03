import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const RoundedTextField = styled(TextField)<TextFieldProps>(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
}));

export default RoundedTextField;
