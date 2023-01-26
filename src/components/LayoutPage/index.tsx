import { Box, Container, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { Category, categoryData, SubCategory } from "../../model/categories";
import CompetitionForm from "../Evaluation/Competition";
import SideBar from "../SideBar";
import CompetitionEvaluation from "../Evaluation/Competition";
import DemandEvaluation from "../Evaluation/Demand";
import IdeaEvaluation from "../Evaluation/Idea";
import IdeaForm from "../Form";
import EvaluationContainer from "../EvaluationContainer";

const categories = categoryData;

const LayoutPage = () => {
  return (
    <>
      {/* MENU */}
      <SideBar categories={categories} />
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
        <IdeaForm></IdeaForm>
        <Divider />
        <EvaluationContainer categories={categories}></EvaluationContainer>
      </Container>
    </>
  );
};

export default LayoutPage;
