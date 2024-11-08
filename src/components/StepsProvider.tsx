/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
interface StepsContextProps<Step extends object = object> {
  activeStep: number;
  maxSteps: number;
  nextStep: () => void;
  previousStep: () => void;
  resetSteps: () => void;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  getNStepAround: (n?: number) => Step[];
  step: Step;
}
export const StepsContext = React.createContext<StepsContextProps>({
  activeStep: 0,
  maxSteps: 0,
  nextStep: () => {},
  previousStep: () => {},
  resetSteps: () => {},
  setActiveStep: () => {},
  getNStepAround: () => [],
  step: {},
});
interface StepsProviderProps<Step extends object = object> {
  steps: Array<Step>;
}
export default function StepsProvider({
  children,
  steps,
}: React.PropsWithChildren<StepsProviderProps>) {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length - 1;
  const numberedSteps = steps.map((step, i) => ({ step: i, ...step }));
  const getNStepAround = (n = 2) =>
    numberedSteps.filter((_, i) => {
      if (activeStep >= n && activeStep < maxSteps - n)
        return Math.abs(activeStep - i) <= n;
      else if (activeStep < n) return i < 2 * n + 1;
      else return i >= maxSteps - 2 * n;
    });

  const nextStep = () => {
    setActiveStep((prevActiveStep) =>
      maxSteps && prevActiveStep === maxSteps ? maxSteps : prevActiveStep + 1
    );
  };

  const previousStep = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep > 0 ? prevActiveStep - 1 : 0
    );
  };

  const resetSteps = () => {
    setActiveStep(0);
  };
  return (
    <StepsContext.Provider
      value={{
        activeStep,
        maxSteps,
        nextStep,
        previousStep,
        resetSteps,
        setActiveStep,
        getNStepAround,
        step: numberedSteps[activeStep],
      }}
    >
      {children}
    </StepsContext.Provider>
  );
}

export const useStepsContext = () => React.useContext(StepsContext);
