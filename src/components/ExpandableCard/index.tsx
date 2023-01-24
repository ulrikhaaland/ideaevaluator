import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import "./index.css";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Category } from "../../model/categories";
import TextInput from "../TextInput";

interface ComponentProps {
  category: Category;
  collapsedContent?: any;
  expandedContent: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ExpandableCard = (props: ComponentProps) => {
  const { category, collapsedContent, expandedContent } = props;

  const [open, setOpen] = useState(props.open);

  function expand() {
    setOpen(!open);
    props.setOpen(!open);
  }

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
          cursor: "pointer",
        }}
        onClick={expand}
      >
        <Box
          sx={{
            justifyContent: "space-between",
            width: "100%",
            color: (theme) => theme.palette.text.primary,
            display: "flex",
            alignItems: "center",
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
          {open ? <ExpandLess /> : <ExpandMore />}
        </Box>
      </Box>
      <Box className="lower">
        <Divider />
        <Box
          sx={{
            height: "24px",
          }}
        />
        {expandedContent}
      </Box>
    </div>
  );
};

export default ExpandableCard;
