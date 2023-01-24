import { ListItem, ListItemText, Collapse, List, Link } from "@mui/material";
import { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { SubCategory } from "../../model/categories";

interface ComponentProps {
  category: {
    name: string;
    subCategories: SubCategory[];
  };
  categoryIndex: number;
}

const MenuItem = (props: ComponentProps) => {
  const { category, categoryIndex } = props;

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={`${categoryIndex + 1}. ` + category.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {category.subCategories.map((item, index) => (
            <ListItem
              key={`${item}` + index.toString()}
              button
              sx={{ pl: 4 }}
              component={Link}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default MenuItem;
