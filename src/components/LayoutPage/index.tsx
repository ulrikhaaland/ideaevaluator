import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import { Category, categoryData, SubCategory } from "../../model/categories";
import CompetitionForm from "../Evaluation/Competition";
import SideBar from "../SideBar";
import CompetitionEvaluation from "../Evaluation/Competition";
import DemandEvaluation from "../Evaluation/Demand";
import IdeaEvaluation from "../Evaluation/Idea";
import IdeaForm from "../Form";

const categories = categoryData;

const LayoutPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );

  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>(
    categories[0].subCategories[0]
  );

  return (
    <>
      {/* MENU */}
      <SideBar
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
      />
      {/* Page Container */}
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          //   justifyContent: "center",
          height: "100vh",
          marginLeft: "250px",
          width: "calc(100% - 250px)",
        }}
      >
        <Box
          sx={{
            height: "24px",
          }}
        ></Box>
        {/* TITLE */}
        <Typography variant="h2">
          That which is necessary in order to evaluate the viability of an
          idea... And some more.
        </Typography>
        {/* FORM */}
        <IdeaForm category={undefined}></IdeaForm>
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
      </Container>
    </>
  );
};

export default LayoutPage;
