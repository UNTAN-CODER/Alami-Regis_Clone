import React, { useState } from "react";
import StepIndicator from "expo-step-indicator";
import { useAtom } from "jotai";

const indicatorStyles = {
  stepStrokeCurrentColor: "#e7f4fd",
  stepStrokeFinishedColor: "#e7f4fd",
  stepStrokeUnFinishedColor: "#e7f4fd",
  separatorFinishedColor: "#e7f4fd",
  separatorUnFinishedColor: "#e7f4fd",
  stepIndicatorFinishedColor: "#0f3a58",
  stepIndicatorUnFinishedColor: "#e7f4fd",
  stepIndicatorCurrentColor: "#0f3a58",
  stepIndicatorLabelCurrentColor: "#ffffff",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#ffffff",
};

import { formStep } from "../jotai";

const FormStepIndicator = () => {
  const [formStepVal] = useAtom(formStep);

  return (
    <StepIndicator
      customStyles={indicatorStyles}
      stepCount={3}
      currentPosition={formStepVal}
    />
  );
};

export default FormStepIndicator;
