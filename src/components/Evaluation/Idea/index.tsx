import { Box } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import { Category } from "../../../model/categories";
import { IdeaStoreContext } from "../../../model/idea.store";
import ExpandableCard from "../../ExpandableCard";

interface ComponentProps {
  category: Category;
  open: boolean;
  onFocusSubCategory: () => void;
}

const IdeaEvaluation = (props: ComponentProps) => {
  const { category } = props;

  const ideaStore = useContext(IdeaStoreContext);

  const [open, setOpen] = useState(props.open);

  const [eval, setEval] = useState(ideaStore.evaluation);

  useEffect(() => {
    setEval(ideaStore.evaluation);
  }, [ideaStore.evaluation]);

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
        expandedContent={getExpandedContent()}
        open={ideaStore.evaluation === undefined ? false : open}
        setOpen={(open) => {
          if (ideaStore.evaluation === undefined) return;
          setOpen(open);
        }}
      ></ExpandableCard>
    </Box>
  );
};

export default IdeaEvaluation;
