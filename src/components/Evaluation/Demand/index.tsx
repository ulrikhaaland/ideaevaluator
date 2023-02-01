import { Box, Divider, Typography } from "@mui/material";
import { observer } from "mobx-react";
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
import EvaluationItem from "../EvaluationItem";

interface ComponentProps {
  category: Category;
  open: boolean;
  onFocusSubCategory: () => void;
}

const DemandEvaluation = (props: ComponentProps) => {
  const { category } = props;

  const { ideaStore, demandStore } = useStore();

  const [open, setOpen] = useState(props.open);

  const { evaluation } = demandStore;

  useEffect(() => {
    if (evaluation) {
      setOpen(true);
    }
  }, [evaluation]);

  const getExpandedContent = (): ReactElement => {
    return (
      <Box>
        <Typography variant="h6" style={{ color: "black" }}>
          {evaluation?.demanded ? getViableContent() : getNotViableContent()}
        </Typography>
      </Box>
    );
  };

  const getNotViableContent = (): ReactElement => {
    return (
      <Box>
        <Typography variant="h6" style={{ color: "black" }}>
          This product idea has no demand:
        </Typography>
        <Typography variant="body1" style={{ color: "black" }}>
          {evaluation?.demandWhy}
        </Typography>
      </Box>
    );
  };

  const getViableContent = (): ReactElement => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {evaluation?.demanded && (
          <EvaluationItem
            title="Demand"
            content={evaluation?.demandWhy}
            first={true}
          />
        )}

        {evaluation?.marketSize && evaluation?.marketSize !== "" && (
          <EvaluationItem
            title="Market Size"
            content={evaluation?.marketSize}
          />
        )}
        {evaluation?.trend && (
          <EvaluationItem
            title="Trend"
            content={evaluation?.trend}
            last={true}
          />
        )}
        {evaluation?.problem && (
          <EvaluationItem
            title="Biggest Problem"
            content={evaluation?.problem}
          />
        )}
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
        open={!evaluation ? false : open}
        viable={evaluation?.demanded}
        setOpen={(open) => {
          if (!evaluation) return;
          else setOpen(open);
        }}
      >
        {evaluation && getExpandedContent()}
      </ExpandableCard>
    </Box>
  );
};

export default observer(DemandEvaluation);
