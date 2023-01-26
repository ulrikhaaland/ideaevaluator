import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import TextInput from "../TextInput";

const IdeaForm = () => {
  const [is, setIs] = useState<string | undefined>();

  const [should, setShould] = useState<string | undefined>();

  const [loadingGap, setLoadingGap] = useState<boolean>(false);

  const [loadingEval, setLoadingEval] = useState<boolean>(false);

  const onEstimate = () => {
    console.log("Estimate");
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
      <Typography variant="h5">The Problem:</Typography>
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
          A Problem is the gap between what is and what should be.
        </Typography>
        <Box
          sx={{
            height: "12px",
          }}
        />
        <TextInput
          value={is}
          label="Describe what is"
          minRows={2}
          placeholder="Poeople are hungry"
          onChange={(val) => setIs(val.target.value)}
        ></TextInput>
        <Box
          sx={{
            height: "12px",
          }}
        />
        <Typography variant="subtitle1"></Typography>
        <Box
          sx={{
            height: "12px",
          }}
        />
        <TextInput
          value={should}
          label="Describe what should be"
          minRows={2}
          placeholder="Poeople should not be hungry"
          onChange={(val) => setShould(val.target.value)}
        ></TextInput>
        <Button
          onClick={() => onEstimate()}
          disabled={is === undefined || should === undefined || loadingGap}
          variant={"contained"}
          color={"primary"}
          autoFocus={false}
          fullWidth={false}
          startIcon={
            loadingGap ? <CircularProgress size={15} color={"inherit"} /> : null
          }
          sx={{
            width: "150px",
            height: "40px",
            marginTop: "24px",
          }}
        >
          {loadingGap ? "Bridging" : "Bridge the gap"}
        </Button>
      </Box>
      <Box
        sx={{
          height: "12px",
        }}
      />

      <Box
        sx={{
          height: "12px",
        }}
      />
      <Typography variant="h5">The Idea:</Typography>
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
        ></TextInput>
        <Button
          onClick={() => onEstimate()}
          disabled={is === undefined || should === undefined || loadingEval}
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
