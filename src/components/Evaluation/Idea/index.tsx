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

const IdeaEvaluation = (props: ComponentProps) => {
  const { category } = props;

  const { ideaStore } = useStore();

  const [open, setOpen] = useState(props.open);

  const { evaluation } = ideaStore;

  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    if (evaluation) {
      setOpen(true);
    }
  }, [evaluation]);

  const getExpandedContent = (): ReactElement => {
    return (
      <Box>
        <Typography variant="h6" style={{ color: "black" }}>
          {evaluation?.viable ? getViableContent() : getNotViableContent()}
        </Typography>
      </Box>
    );
  };

  const getNotViableContent = (): ReactElement => {
    return (
      <EvaluationItem
        title="This idea is not viable"
        content={evaluation?.viabilityWhy.response!}
        first={true}
        last={true}
        interpretation={evaluation?.viabilityWhy.interpretation}
      />
    );
  };

  const getImprovements = (improvements: string): ReactElement => {
    const strings = improvements.split(".");

    const elements: ReactElement[] = [];

    for (let i = 0; i < strings.length; i++) {
      if (i === strings.length - 1) break;

      const element = (
        <p
          style={{
            marginTop: "0px",
            fontFamily: "'Open Sans', 'Raleway', 'Arial'",
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: "1.813rem",
            letterSpacing: "0.009rem",
            color: "#000000",
          }}
        >
          {(elements.length + 1).toString() + ". " + strings[i + 1]}
        </p>
      );
      elements.push(element);
      i++;
    }

    return (
      <Box sx={{ margin: "12px" }}>{elements.map((element) => element)}</Box>
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
        {evaluation?.viabilityWhy && (
          <EvaluationItem
            title="Viability"
            content={evaluation?.viabilityWhy.response!}
            interpretation={evaluation?.viabilityWhy.interpretation}
            first={true}
          />
        )}

        {evaluation?.improvements &&
          evaluation?.improvements.response !== "" && (
            <EvaluationItem
              title="Improvements"
              content={getImprovements(evaluation?.improvements.response)}
              interpretation={evaluation?.improvements.interpretation}
            />
          )}
        {evaluation?.realization && (
          <EvaluationItem
            title="Realization"
            content={evaluation?.realization.response}
            interpretation={evaluation?.realization.interpretation}
          />
        )}
        {evaluation?.problem && (
          <EvaluationItem
            title="Problem"
            content={evaluation?.problem.response}
            interpretation={evaluation?.problem.interpretation}
            last={true}
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
        viable={evaluation?.viable}
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

export default observer(IdeaEvaluation);
