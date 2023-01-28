import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { IdeaStoreContext } from "../../model/idea.store";
import TextInput from "../TextInput";
import FormProblem from "./FormProblem";

const IdeaForm = () => {
  const ideaStore = useContext(IdeaStoreContext);

  const [loadingEval, setLoadingEval] = useState<boolean>(false);

  const [idea, setIdea] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIdea(ideaStore.genIdea);
  }, [ideaStore.genIdea]);

  const onEvaluation = async () => {
    ideaStore.setIdea(idea!);

    setLoadingEval(true);

    await ideaStore.evaluateIdea();

    const evaluation = ideaStore.evaluation;

    console.log(evaluation?.viable);

    console.log(evaluation?.viabilityWhy);

    console.log(evaluation?.realization);

    console.log(evaluation?.improvements);

    console.log(evaluation?.problem);

    setLoadingEval(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0px",
      }}
    >
      {/* Dont Have an idea? Try the generator for free. */}
      {/* <FormProblem></FormProblem> */}
      <Typography variant="h5">Product Idea</Typography>
      <Box
        sx={{
          height: "12px",
        }}
      />
      <Box
        sx={{
          border: "1px solid #323941",
          borderRadius: "20px",
          padding: "24px",
        }}
      >
        <Typography variant="subtitle1">
          An idea is a plan for how to bridge the gap between what is and what
          should be.
        </Typography>
        <Box
          sx={{
            height: "12px",
          }}
        />
        <TextInput
          value={undefined}
          label="Describe your idea"
          minRows={3}
          placeholder="We should build a restaurant"
          onChange={(e) => setIdea(e.target.value)}
        ></TextInput>
        <Button
          onClick={() => onEvaluation()}
          disabled={
            idea === undefined ||
            loadingEval ||
            ideaStore.evaluation !== undefined
          }
          variant={"contained"}
          color={"primary"}
          autoFocus={false}
          fullWidth={false}
          startIcon={
            loadingEval ? (
              <CircularProgress size={15} color={"inherit"} />
            ) : null
          }
          sx={{
            width: "150px",
            height: "40px",
            marginTop: "24px",
          }}
        >
          {loadingEval ? "Evaluating" : "Evaluate"}
        </Button>
      </Box>

      <Box
        sx={{
          height: "12px",
        }}
      />
    </Box>
  );
};

export default IdeaForm;
