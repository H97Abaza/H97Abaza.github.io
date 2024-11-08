import "./App.css";
// App.tsx
import { styled } from "@mui/material";
import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import INFO, { Info } from "./components/INFO";
import Section, { SectionProps } from "./components/Section";
import StepsProvider from "./components/StepsProvider";
import WelcomeSection from "./components/WelcomeSection";

const App: React.FC = () => {
  return (
    <AppContainer>
      <Header />
      <WelcomeSection />
      {...INFO.sections.map((props) => (
        <StepsProvider
          steps={
            INFO?.[
              props.content.dataPath as Exclude<
                keyof Info,
                "steps" | "sections"
              >
            ]
          }
        >
          <Section {...(props as SectionProps)} />
        </StepsProvider>
      ))}
      <Footer />
    </AppContainer>
  );
};

export default App;

const AppContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  "& > section": {
    "--background-from": theme.palette.analogous1.main,
    "--background-to": theme.palette.analogous2.main,
    background: theme.mixins.gradientBackground.bgGradient.background,
    "--background-angle": "45deg",
    "&:nth-of-type(even)": {
      "--background-angle": "135deg",
    },
  },
}));
