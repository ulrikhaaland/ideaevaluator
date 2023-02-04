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
import { EVALUATION_INTERPRETATION } from "../../../utils/response.util";
import ExpandableCard from "../../ExpandableCard";
import EvaluationItem from "../EvaluationItem";

interface ComponentProps {
  category: Category;
  open: boolean;
  onFocusSubCategory: () => void;
}

const DemandEvaluation = (props: ComponentProps) => {
  const { category } = props;

  const { demandStore } = useStore();

  const [open, setOpen] = useState(props.open);

  const { evaluation } = demandStore;

  const [interpretations, setInterpretations] = useState<
    EVALUATION_INTERPRETATION[]
  >([]);

  const handleInterpretations = () => {
    const interpretations: EVALUATION_INTERPRETATION[] = [];

    if (evaluation?.demandWhy?.interpretation) {
      interpretations.push(evaluation?.demandWhy?.interpretation);
    }

    if (evaluation?.marketSize?.interpretation) {
      interpretations.push(evaluation?.marketSize?.interpretation);
    }

    if (evaluation?.trend?.interpretation) {
      interpretations.push(evaluation?.trend?.interpretation);
    }

    if (evaluation?.problem?.interpretation) {
      interpretations.push(evaluation?.problem?.interpretation);
    }

    setInterpretations(interpretations);
  };

  useEffect(() => {
    if (evaluation) {
      setOpen(true);
      handleInterpretations();
    } else {
      setOpen(false);
      setInterpretations([]);
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
      <EvaluationItem
        title="Not in demand"
        content={evaluation?.demandWhy!.response!}
        first={true}
        last={true}
        interpretation={evaluation?.demandWhy!.interpretation}
      />
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
            content={evaluation?.demandWhy?.response!}
            interpretation={evaluation?.demandWhy?.interpretation}
            first={true}
          />
        )}

        {evaluation?.marketSize && evaluation?.marketSize.response !== "" && (
          <EvaluationItem
            title="Market Size"
            content={evaluation?.marketSize.response!}
            interpretation={evaluation?.marketSize.interpretation}
          />
        )}
        {evaluation?.trend && (
          <EvaluationItem
            title="Trend"
            content={evaluation?.trend.response}
            interpretation={evaluation?.trend.interpretation}
            last={true}
          />
        )}
        {evaluation?.problem && (
          <EvaluationItem
            title="Biggest Problem"
            content={evaluation?.problem.response}
            interpretation={evaluation?.problem.interpretation}
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
        interpretations={interpretations}
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
