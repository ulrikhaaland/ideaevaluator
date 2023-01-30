import { Box, Typography } from "@mui/material";
import {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Category } from "../../../model/categories";
import { useStore } from "../../../stores";
import ExpandableCard from "../../ExpandableCard";

interface ComponentProps {
  category: Category;
  open: boolean;
  onFocusSubCategory: () => void;
}

const IdeaEvaluation = (props: ComponentProps) => {
  const { category } = props;

  const { ideaStore } = useStore();

  const [open, setOpen] = useState(props.open);

  const { evaluation, isViable } = ideaStore;

  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    if (evaluation) {
      setOpen(true);
    }
  }, [evaluation, isViable, ideaStore, ideaStore.evaluation]);

  const getExpandedContent = (): ReactElement => {
    return (
      <Box>
        <p style={{ color: "black" }}>as</p>
        <Typography variant="h6" style={{ color: "black" }}>
          {evaluation?.viable
            ? "This idea is viable"
            : "This idea is not viable"}
        </Typography>
      </Box>
    );
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
        isExpandable={evaluation === undefined ? false : true}
        open={evaluation ? false : open}
        setOpen={(open) => {
          if (evaluation) return;
          else setOpen(open);
        }}
      >
        {evaluation && getExpandedContent()}
      </ExpandableCard>
    </Box>
  );
};

export default IdeaEvaluation;
