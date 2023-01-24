import { Box } from "@mui/system";
import { Category } from "../../model/categories";
import TextInput from "../TextInput";

interface ComponentProps {
  category?: Category;
}

const IdeaForm = (props: ComponentProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
      }}
    >
      <TextInput value={undefined} label="Describe the problem"></TextInput>
      <TextInput value={undefined} label="Describe the solution"></TextInput>
    </Box>
  );
};

export default IdeaForm;
