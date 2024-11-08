// Section.tsx
import {
  Box,
  Button,
  ClickAwayListener,
  Collapse,
  Grid2,
  MobileStepper,
  Stack,
  styled,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { CSSProperties, ReactNode, useRef, useState } from "react";
import {
  Transition,
  TransitionGroup,
  TransitionStatus,
} from "react-transition-group";
import { useStepsContext } from "./StepsProvider";
import Tile, { renderIcon } from "./Tile";

import {
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
} from "@mui/icons-material";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import theme from "../theme";
import { Info } from "./INFO";

export type SectionProps = {
  id: string;
  title: string;
  src: string;
  alt: string;
  classNamePrefix: string;
  content: { dataPath: keyof Info; template: string };
};

const Section: React.FC<SectionProps> = ({ id, src, alt, title, content }) => {
  const [show, setShow] = React.useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  const isXSmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const {
    nextStep,
    previousStep,
    activeStep,
    setActiveStep,
    // resetSteps,
    getNStepAround,
    maxSteps,
    step,
  } = useStepsContext();
  const nStepScroller = 2;
  const handleScroll = () => {
    if (isScrolling == false) {
      setScrolling(true);
      const t = setTimeout(() => {
        setScrolling(false);
        clearTimeout(t);
      }, 100);
    }
  };
  const [isScrolling, setScrolling] = useState(false);
  const handleUP = () => {
    if (direction != "up") setDirection("up");
    handleScroll();
    if (activeStep > 0) previousStep();
  };
  const handleDown = () => {
    if (direction != "down") setDirection("down");
    handleScroll();
    if (activeStep < maxSteps) nextStep();
  };

  const handleControlClick = (_: unknown, v: number | null) => {
    if (v != null && activeStep != v) {
      console.log({ v, activeStep });
      setActiveStep(v);
    }
  };
  console.log("  STEP: ", activeStep);
  const handleHide = () => {
    const n = setTimeout(() => {
      if (show) setShow(false);
      clearTimeout(n);
    }, 400);
  };
  const handleShow = () => {
    const n = setTimeout(() => {
      if (!show) setShow(true);
      clearTimeout(n);
    }, 300);
  };

  const nextButton = (icon?: ReactNode) => (
    <Button
      disabled={(isScrolling && direction == "down") || activeStep == maxSteps}
      size="small"
      sx={{
        color: "triadic1.light",
        background: (theme) =>
          isScrolling && direction == "down"
            ? theme.palette.action.hover
            : undefined,
        "&:hover": {
          background: (theme) => theme.palette.action.hover,
        },
      }}
      onClick={nextStep}
    >
      {icon ?? <KeyboardArrowDown />}
    </Button>
  );
  const previousButton = (icon?: ReactNode) => (
    <Button
      disabled={(isScrolling && direction == "up") || activeStep == 0}
      size="small"
      sx={{
        color: "triadic1.light",
        background: (theme) =>
          isScrolling && direction == "up"
            ? theme.palette.action.hover
            : undefined,
        "&:hover": {
          background: (theme) => theme.palette.action.hover,
        },
      }}
      onClick={previousStep}
    >
      {icon ?? <KeyboardArrowUp />}
    </Button>
  );
  return (
    <Transition nodeRef={sectionRef} in={show} timeout={300}>
      {(transitionState) => (
        <ClickAwayListener onClickAway={handleHide}>
          <SectionContainer
            // onClick={handleShow}
            // onMouseLeave={handleHide}
            id={id}
            ref={sectionRef}
            transitionState={transitionState}
          >
            <Grid2 id={id + "-title"} gridArea={"title"}>
              <Transition nodeRef={titleRef} in={show} timeout={300}>
                {(transitionState) => (
                  <Typography
                    variant="h4"
                    ref={titleRef}
                    sx={{
                      transition: theme.transitions.create("all", {
                        duration: 300,
                      }),

                      ...(["entered", "entering"].includes(transitionState)
                        ? {
                            width: "2rem",
                            height: "100%",
                            wordBreak: "break-all",
                            textAnchor: "start",

                            color: (theme) => theme.palette.primary.main,
                          }
                        : {
                            textAlign: "center",
                            width: "100%",
                            height: "2rem",
                          }),

                      fontSize: "2em",
                      "--background-from": (theme) =>
                        theme.palette.triadic1.dark,
                      "--background-to": (theme) => theme.palette.triadic2.dark,
                      "--background-angle": "135deg",
                      background:
                        "linear-gradient(var(--background-angle),var(--background-from),var(--background-to))",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontFamily: '"Snap ITC", sans-serif',
                      textAlign: "center",
                      verticalAlign: "middle",
                      textTransform: "uppercase",
                    }}
                  >
                    {title}
                  </Typography>
                )}
              </Transition>
            </Grid2>
            <Transition nodeRef={imgRef} in={!show} timeout={300}>
              {(transitionState) => {
                console.log({ transitionState });
                return (
                  <SectionImg
                    ref={imgRef}
                    id={id + "-img"}
                    transitionState={transitionState}
                  >
                    <Box
                      onClick={handleShow}
                      component="img"
                      src={src}
                      alt={alt}
                      sx={{
                        cursor: "pointer",
                        height: "60vh",
                        aspectRatio: "1",
                        objectFit: "contain",
                        minHeight: "300px",
                        minWidth: "300px",
                        margin: "5rem auto",
                        transition: (theme) =>
                          theme.transitions.create("transform", {
                            duration: 300,
                          }),
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    ></Box>
                  </SectionImg>
                );
              }}
            </Transition>

            <Transition nodeRef={contentRef} in={show} timeout={300}>
              {(transitionState) => (
                <SectionContent
                  id={id + "-content"}
                  transitionState={transitionState}
                  ref={contentRef}
                >
                  {!(isSmall || isXSmall) &&
                    previousButton(<KeyboardArrowLeft />)}
                  <Box
                    display="flex"
                    flexWrap={"wrap"}
                    flexDirection={"row"}
                    sx={{ gap: "1rem" }}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {isXSmall ? (
                      <Tile
                        {...step}
                        img={content.template == "img" ? true : false}
                      />
                    ) : (
                      getNStepAround(isSmall ? 1 : 2)?.map((step, i) => (
                        <Tile
                          key={i}
                          {...step}
                          img={content.template == "img" ? true : false}
                        />
                      ))
                    )}
                  </Box>
                  {!(isSmall || isXSmall) && nextButton(<KeyboardArrowRight />)}
                </SectionContent>
              )}
            </Transition>

            <Transition nodeRef={controlsRef} in={show} timeout={300}>
              {(transitonState) => (
                <SectionControls
                  id={id + "-controls"}
                  transitionState={transitonState}
                  ref={controlsRef}
                >
                  {isSmall ? (
                    <MobileStepper
                      position="static"
                      backButton={previousButton(
                        <KeyboardArrowLeft
                          sx={{ color: "complementary.light" }}
                        />
                      )}
                      nextButton={nextButton(
                        <KeyboardArrowRight
                          sx={{ color: "complementary.light" }}
                        />
                      )}
                      steps={3}
                      defaultValue={1}
                      activeStep={activeStep % 3}
                      variant="dots"
                      sx={{
                        bgcolor: "transparent",
                        "& .MuiMobileStepper-dotActive": {
                          bgcolor: "complementary.light",
                        },
                      }}
                    ></MobileStepper>
                  ) : (
                    <ReactScrollWheelHandler
                      upHandler={handleUP}
                      downHandler={handleDown}
                      preventScroll
                      timeout={250}
                      wheelConfig={[7, 33, 0.05, 200]}
                    >
                      <Stack direction={"column"}>
                        {previousButton()}
                        <ToggleButtonGroup
                          value={activeStep}
                          sx={{
                            background: ({ palette }) =>
                              isScrolling
                                ? `rgba(${
                                    (
                                      palette.analogous1 as unknown as {
                                        lightChannel: string;
                                      }
                                    ).lightChannel
                                  } / 0.5)`
                                : undefined,
                            "&:hover": {
                              "--background-from": ({ palette }) =>
                                palette.analogous2.light,
                              "--background-mid": ({ palette }) =>
                                palette.analogous1.light,
                              "--background-to": ({ palette }) =>
                                palette.analogous2.light,
                              "--background-angle": "0deg",
                              background: ({ mixins }) =>
                                mixins.gradientBackground.bgGradient3
                                  .background,
                            },
                          }}
                          orientation={isSmall ? "horizontal" : "vertical"}
                          exclusive
                        >
                          <TransitionGroup>
                            {getNStepAround(nStepScroller)?.map((props, i) => {
                              const {
                                src = "",
                                path = "",
                                step = i,
                              } = props as unknown as {
                                src: string;
                                path: string;
                                step: number;
                              };
                              const isImg = src.length > 1;
                              const size =
                                i == nStepScroller
                                  ? 50
                                  : Math.max(
                                      5,
                                      50 - 10 * Math.abs(nStepScroller - i)
                                    );
                              return (
                                <Collapse in key={"c" + i}>
                                  <ToggleButton
                                    key={i}
                                    value={step}
                                    onClick={handleControlClick}
                                    sx={{
                                      width: "100%",
                                      "&.Mui-selected": (theme) => ({
                                        "& svg": {
                                          fill: theme.palette.triadic1.light,
                                        },
                                        "& img": {
                                          outline: `${theme.palette.triadic1.light} solid medium`,
                                        },
                                      }),
                                      "& img": (theme) => ({
                                        outline: `${theme.palette.triadic2.light} solid thin`,
                                      }),
                                      "& svg": (theme) => ({
                                        fill: theme.palette.triadic2.light,
                                      }),
                                    }}
                                  >
                                    <Box
                                      component={isImg ? "img" : "svg"}
                                      {...(isImg && { src })}
                                      viewBox="0 0 512 512"
                                      width={size}
                                      height={size}
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      {path ? renderIcon(path) : undefined}
                                    </Box>
                                  </ToggleButton>
                                </Collapse>
                              );
                            })}
                          </TransitionGroup>
                        </ToggleButtonGroup>
                        {nextButton()}
                      </Stack>
                    </ReactScrollWheelHandler>
                  )}
                </SectionControls>
              )}
            </Transition>
          </SectionContainer>
        </ClickAwayListener>
      )}
    </Transition>
  );
};

export default Section;

const sectionTransitionStyles: Partial<{
  [k in TransitionStatus]: CSSProperties;
}> = {
  entering: {
    gridTemplateAreas: '"title content controls" "img img img"',
    gridTemplateRows: "100% 0",
    gridTemplateColumns: "2rem 1fr min-content",
  },
  entered: {
    gridTemplateAreas: '"title content controls" "img img img"',
    gridTemplateRows: "100% 0",
    gridTemplateColumns: "2rem 1fr min-content",
  },
  exiting: {
    gridTemplateAreas: '"title content controls" "img img img"',
    gridTemplateRows: "min-content auto",
    gridTemplateColumns: "100% 0 0",
  },
  exited: {
    gridTemplateAreas: '"title content controls" "img img img"',
    gridTemplateRows: "min-content auto",
    gridTemplateColumns: "100% 0 0",
  },
};
const sectionSmTransitionStyles: Partial<{
  [k in TransitionStatus]: CSSProperties;
}> = {
  entering: {
    gridTemplateAreas: '"title content" "title controls" "img img"',
    gridTemplateRows: "1fr 1fr 0",
    gridTemplateColumns: "2rem auto",
  },
  entered: {
    gridTemplateAreas: '"title content" "title controls" "img img"',
    gridTemplateRows: "1fr 1fr 0",
    gridTemplateColumns: "2rem auto",
  },
  exiting: {
    gridTemplateAreas: '"title content" "title controls" "img img"',
    gridTemplateRows: "min-content 0 auto",
    gridTemplateColumns: "100% 0",
  },
  exited: {
    gridTemplateAreas: '"title content" "title controls" "img img"',
    gridTemplateRows: "min-content 0 auto",
    gridTemplateColumns: "100% 0",
  },
};
const SectionContainer = styled("section", {
  shouldForwardProp: (prop) => ["transitionState"].every((p) => p != prop),
})<{ transitionState: TransitionStatus }>(({ theme, transitionState }) => ({
  scrollSnapAlign: "start",
  scrollMarginTop: `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(
    3
  )})`,
  width: "100vw",
  height: `calc( 100vh - ${theme.mixins.toolbar.minHeight}px )`,
  minHeight: `calc( 100vh - ${theme.mixins.toolbar.minHeight}px )`,
  display: "grid",
  transition: theme.transitions.create(
    ["grid-template-columns", "grid-template-rows"],
    {
      duration: 300,
    }
  ),
  ...sectionTransitionStyles[transitionState],
  [theme.breakpoints.down("md")]: {
    ...sectionSmTransitionStyles[transitionState],
  },
  overflow: "clip",
  background: theme.mixins.gradientBackground.bgGradient3.background,
}));

const imgTransitionStyles: Partial<{ [k in TransitionStatus]: CSSProperties }> =
  {
    entering: { transform: "translateX(0) scale(1)" },
    entered: { transform: "translateX(0) scale(1)" },
    exiting: { transform: "translateX(-100%) scale(0)" },
    exited: { transform: "translateX(-100%) scale(0)" },
  };
const contentTransitionStyles: Partial<{
  [k in TransitionStatus]: CSSProperties;
}> = {
  entering: { transform: "translateX(0) scale(1)" },
  entered: { transform: "translateX(0) scale(1)" },
  exiting: { transform: "translateX(100%) scale(0)", height: 0 },
  exited: { transform: "translateX(100%) scale(0)", height: 0 },
};

const SectionImg = styled("div", {
  shouldForwardProp: (prop) => ["transitionState"].every((p) => p != prop),
})<{ transitionState: TransitionStatus }>(({ theme, transitionState }) => ({
  gridArea: "img",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ...imgTransitionStyles[transitionState],
  transition: theme.transitions.create("transform", {
    duration: 300,
  }),
}));
const SectionContent = styled("div", {
  shouldForwardProp: (prop) => ["transitionState"].every((p) => p != prop),
})<{ transitionState: TransitionStatus }>(({ theme, transitionState }) => ({
  display: "flex",
  gap: "0.5rem",
  margin: "auto",
  gridArea: "content",
  alignContent: "center",
  justifyContent: "center",
  transition: theme.transitions.create("transform", {
    duration: 300,
  }),
  ...contentTransitionStyles[transitionState],
}));

const SectionControls = styled("div", {
  shouldForwardProp: (prop) => ["transitionState"].every((p) => p != prop),
})<{ transitionState: TransitionStatus }>(({ theme, transitionState }) => ({
  gridArea: "controls",
  display: "flex",
  ...contentTransitionStyles[transitionState],
  alignItems: "center",
  justifyContent: "center",
  marginRight: "1rem",
  [theme.breakpoints.down("sm")]: {
    margin: "auto",
  },
}));
