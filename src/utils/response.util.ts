export enum EVALUATION_INTERPRETATION {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
  NEUTRAL = "NEUTRAL",
}

export type EvaluationResponse = {
  response: string;
  interpretation: EVALUATION_INTERPRETATION;
};

export const handleEvaluationResponse = (
  response: string
): EvaluationResponse => {
  const split = splitOnNextToLastDot(response);

  let interpretation: EVALUATION_INTERPRETATION;

  if (split[1].toLowerCase().includes("positive")) {
    interpretation = EVALUATION_INTERPRETATION.POSITIVE;
  } else if (split[1].toLowerCase().includes("negative")) {
    interpretation = EVALUATION_INTERPRETATION.NEGATIVE;
  } else if (split[1].toLowerCase().includes("neutral")) {
    interpretation = EVALUATION_INTERPRETATION.NEUTRAL;
  } else {
    throw new Error("Invalid interpretation");
  }

  return {
    response: split[0] + ".",
    interpretation: interpretation,
  };
};

function splitOnNextToLastDot(str: string): string[] {
  let splitIndex = str.lastIndexOf(".", str.lastIndexOf(".") - 1);
  return [str.slice(0, splitIndex), str.slice(splitIndex + 1)];
}

// https://colorpalettes.net/color-palette-2367/
export const getInterpretationColor = (
  interpretation: EVALUATION_INTERPRETATION
) => {
  switch (interpretation) {
    case EVALUATION_INTERPRETATION.POSITIVE:
      return "rgb(128, 226, 126)";
    case EVALUATION_INTERPRETATION.NEGATIVE:
      return "rgb(255, 121, 97)";
    case EVALUATION_INTERPRETATION.NEUTRAL:
      return "rgb(255, 204, 0)";
  }
};
