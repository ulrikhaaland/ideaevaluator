import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./index.css";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Category } from "../../model/categories";

interface ComponentProps {
  category: Category;
  open: boolean;
  setOpen: (open: boolean) => void;
  isExpandable?: boolean;
  children?: any;
  viable?: boolean;
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
        <Box
          sx={{
            top: "0",
            left: "0",
            position: "absolute",
            height: "50px",
            width: "100%",
            background:
              viable !== undefined
                ? viable
                  ? "rgb(126, 195, 132, 0.5)"
                  : "rgb(255,0,0, 0.5)"
                : "",
          }}
        ></Box>
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
