import { Box, Divider, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import "./index.css";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Category } from "../../model/categories";
import {
  EVALUATION_INTERPRETATION,
  getInterpretationColor,
} from "../../utils/response.util";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";

interface ComponentProps {
  category: Category;
  open: boolean;
  setOpen: (open: boolean) => void;
  isExpandable?: boolean;
  children?: any;
  viable?: boolean;
  interpretations?: EVALUATION_INTERPRETATION[];
}

const ExpandableCard = (props: ComponentProps) => {
  const { category, isExpandable, viable } = props;

  const [open, setOpen] = useState(props.open);

  function expand() {
    if (!isExpandable) return;

    setOpen(!open);
    props.setOpen(!open);
  }

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const getInterpretations = (): ReactElement => {
    const children: ReactElement[] = [];

    const positiveLength =
      props.interpretations?.filter(
        (i) => i === EVALUATION_INTERPRETATION.POSITIVE
      ).length ?? 0;
    const negativeLength =
      props.interpretations?.filter(
        (i) => i === EVALUATION_INTERPRETATION.NEGATIVE
      ).length ?? 0;
    const neutralLength =
      props.interpretations?.filter(
        (i) => i === EVALUATION_INTERPRETATION.NEUTRAL
      ).length ?? 0;

    const totalLength = positiveLength + negativeLength + neutralLength;

    const width = 100 / totalLength;

    for (let i = 0; i < positiveLength; i++) {
      const container = (
        <div
          style={{
            height: "50px",
            width: width + "%",
            background: getInterpretationColor(
              EVALUATION_INTERPRETATION.POSITIVE
            ),
          }}
        />
      );

      children.push(container);
    }

    for (let i = 0; i < neutralLength; i++) {
      const container = (
        <div
          style={{
            height: "50px",
            width: width + "%",
            background: getInterpretationColor(
              EVALUATION_INTERPRETATION.NEUTRAL
            ),
          }}
        />
      );

      children.push(container);
    }

    for (let i = 0; i < negativeLength; i++) {
      const container = (
        <div
          style={{
            height: "50px",
            width: width + "%",
            background: getInterpretationColor(
              EVALUATION_INTERPRETATION.NEGATIVE
            ),
          }}
        />
      );

      children.push(container);
    }

    return (
      <Box
        sx={{
          top: "0",
          left: "0",
          position: "absolute",
          height: "50px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {children}
      </Box>
    );
  };

  return (
    <div
      key={"expandable-card" + category.name}
      className={"container " + (open ? "expand" : "")}
      // onClick={expand}
    >
      <Box
        sx={{
          height: "50px",
          width: "100%",
          padding: "12px",
          // background: "rgb(230, 230, 230)",
          display: "flex",
          alignItems: "center",
          cursor: isExpandable ? "pointer" : "default",
        }}
        onClick={expand}
      >
        {getInterpretations()}
        <Box
          sx={{
            justifyContent: "space-between",
            width: "100%",
            color: (theme) => theme.palette.text.primary,
            display: "flex",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography variant="h5">{category.name}</Typography>

            {category.description && (
              <Typography
                variant="body1"
                sx={{
                  marginLeft: "8px",
                }}
              >
                {" — " + category.description}
              </Typography>
            )}
          </Box>
          {isExpandable === true && (
            <>{open ? <ExpandLess /> : <ExpandMore />}</>
          )}
        </Box>
      </Box>
      <Box className="lower">
        {/* <Divider /> */}
        <Box
          sx={{
            height: "24px",
          }}
        />
        {props.children}
      </Box>
    </div>
  );
};

export default ExpandableCard;
