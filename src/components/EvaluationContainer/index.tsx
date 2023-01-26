import { Box } from "@mui/material";
import { useState } from "react";
import { Category, SubCategory } from "../../model/categories";
import CompetitionEvaluation from "../Evaluation/Competition";
import DemandEvaluation from "../Evaluation/Demand";
import IdeaEvaluation from "../Evaluation/Idea";

interface ComponentProps {
  categories: Category[];
}

const EvaluationContainer = (props: ComponentProps) => {
  const { categories } = props;

  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>();
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <IdeaEvaluation
        category={categories[0]}
        open={selectedCategory === categories[0]}
        onFocusSubCategory={() => null}
      />
      <DemandEvaluation
        category={categories[1]}
        open={selectedCategory === categories[1]}
        onFocusSubCategory={() => null}
      />
      <CompetitionEvaluation
        category={categories[2]}
        open={selectedCategory === categories[2]}
        onFocusSubCategory={() => null}
      />
    </Box>
  );
};

export default EvaluationContainer;
