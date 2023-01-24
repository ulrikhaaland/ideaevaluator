import {
  Button,
  Divider,
  Drawer,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Category, categoryData, SubCategory } from "../../model/categories";
import MenuItem from "../MenuItem";

interface ComponentProps {
  categories: Category[];
  selectedCategory: Category;
  selectedSubCategory: SubCategory;
}

const SideBar = (props: ComponentProps) => {
  const { categories } = props;

  return (
    <>
      <Drawer
        variant="permanent"
        hideBackdrop
        disableEnforceFocus
        disableScrollLock
        anchor={"left"}
        open={true}
        elevation={10}
        PaperProps={{
          sx: {
            backgroundColor: (theme) => theme.palette.background.default,
            boxShadow: "none",
            borderRight: "1px solid",
            borderColor: (theme) => theme.palette.divider,
            minWidth: "250px",
            maxWidth: "250px",
          },
        }}
        sx={{
          minWidth: "250px",
        }}
      >
        <Box
          sx={{
            minHeight: "64px",
            display: "flex",
            flexDirection: "column",
            color: (theme) => theme.palette.text.primary,
            textOverflow: "wrap",
            overflowWrap: "break-word",
            padding: "24px 24px 0px 24px",
          }}
        >
          <Typography
            sx={{
              overflowWrap: "break-word",
            }}
            variant="h1"
          >
            Eval
          </Typography>
          <Box
            sx={{
              height: "12px",
            }}
          ></Box>
          <Divider />
          <Box
            sx={{
              height: "12px",
            }}
          ></Box>
          <List component="nav" sx={{ m: (theme) => theme.spacing(0, 1) }}>
            {categories.map((category) => (
              <MenuItem
                key={`${category.name}`}
                category={category}
                categoryIndex={categories.indexOf(category)}
              />
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default SideBar;
