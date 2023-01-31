import { Typography, Divider } from "@mui/material";
import { ReactElement } from "react";

interface ComponentProps {
  title: string;
  content: string | ReactElement;
  first?: boolean;
  last?: boolean;
}

const EvaluationItem = (props: ComponentProps) => {
  const { title, content, first, last } = props;

  return (
    <div>
      <Typography
        variant="h6"
        style={{ color: "black", marginTop: first ? "" : "12px" }}
      >
        {title}
      </Typography>
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
