import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { useStore } from "../../stores";
import { IdeaEval } from "../../stores/idea.store";
import TextInput from "../TextInput";
import FormProblem from "./FormProblem";

const IdeaForm = () => {
  const { ideaStore, demandStore } = useStore();

  const [loadingEval, setLoadingEval] = useState<boolean>(false);

  const [idea, setIdea] = useState<string | undefined>(undefined);

  const [evaluation, setEvaluation] = useState<IdeaEval | undefined>(undefined);

  useEffect(() => {
    setIdea(ideaStore.genIdea);
  }, [ideaStore.genIdea]);

  const onEvaluation = async () => {
    ideaStore.setIdea(idea!);
    demandStore.setIdea(idea!);

    setLoadingEval(true);

    await ideaStore.evaluateIdea();

    await demandStore.evaluateDemand();

    setEvaluation(ideaStore.evaluation);

    setLoadingEval(false);
  };

  const onIdeaChange = (value: string) => {
    setIdea(value);

    if (ideaStore.evaluation) {
      ideaStore.setEvaluation(undefined);
    }
  };

  useEffect(() => {
    setEvaluation(ideaStore.evaluation);
  }, [ideaStore.evaluation]);

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
          onChange={(e) => onIdeaChange(e.target.value)}
          disabled={loadingEval}
        ></TextInput>
        <Button
          onClick={() => onEvaluation()}
          disabled={
            idea === undefined || loadingEval || evaluation !== undefined
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

export default observer(IdeaForm);
