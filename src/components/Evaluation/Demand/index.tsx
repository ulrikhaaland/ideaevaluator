import { Box } from "@mui/material";
import { ReactElement, useState } from "react";
import { Category } from "../../../model/categories";
import ExpandableCard from "../../ExpandableCard";

interface ComponentProps {
  category: Category;
  open: boolean;
  onFocusSubCategory: () => void;
}

const DemandEvaluation = (props: ComponentProps) => {
  const { category } = props;

  const [open, setOpen] = useState(props.open);

  const getCollapsedContent = (): ReactElement => {
    return <Box></Box>;
  };

  const getExpandedContent = (): ReactElement => {
    return <Box></Box>;
  };

  return (
    <Box
      key={"form" + category.name}
      sx={{
        width: "100%",
      }}
    >
      <ExpandableCard
        category={category}
        open={open}
        setOpen={setOpen}
      ></ExpandableCard>
    </Box>
  );
};

export default DemandEvaluation;
