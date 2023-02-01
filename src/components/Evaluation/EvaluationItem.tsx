import { Typography, Divider, Box } from "@mui/material";
import { ReactElement } from "react";
import { EVALUATION_INTERPRETATION } from "../../utils/response.util";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";

interface ComponentProps {
  title: string;
  content: string | ReactElement;
  interpretation?: EVALUATION_INTERPRETATION;
  first?: boolean;
  last?: boolean;
}

const EvaluationItem = (props: ComponentProps) => {
  const { title, content, first, last } = props;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography
          variant="h6"
          style={{ color: "black", marginTop: first ? "" : "12px" }}
        >
          {title}
        </Typography>
        {props.interpretation === EVALUATION_INTERPRETATION.NEGATIVE && (
          <SentimentDissatisfiedIcon
            style={{
              color: "red",
              marginLeft: "12px",
              marginTop: first ? "" : "12px",
            }}
          />
        )}
        {props.interpretation === EVALUATION_INTERPRETATION.NEUTRAL && (
          <SentimentNeutralIcon
            style={{
              color: "orange",
              marginLeft: "12px",
              marginTop: first ? "" : "12px",
            }}
          />
        )}
        {props.interpretation === EVALUATION_INTERPRETATION.POSITIVE && (
          <SentimentSatisfiedIcon
            style={{
              color: "green",
              marginLeft: "12px",
              marginTop: first ? "" : "12px",
            }}
          />
        )}
      </Box>

      {typeof content === "string" ? (
        <Typography variant="body1" style={{ color: "black", margin: "12px" }}>
          {content}
        </Typography>
      ) : (
        content
      )}

      {!last && <Divider style={{ margin: "12px" }} />}
    </div>
  );
};

export default EvaluationItem;
