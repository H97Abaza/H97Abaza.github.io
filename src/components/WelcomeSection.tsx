import {
  Box,
  GlobalStyles,
  keyframes,
  styled,
  Typography,
} from "@mui/material";

const WelcomeSection: React.FC = () => {
  return (
    <WelcomeSectionContainer id="welcome">
      <GlobalStyles
        styles={{
          "#welcome *,#welcome *::before": {
            animationPlayState: "inherit",
          },
        }}
      />
      <Typography variant="h1" component="h1" hidden>
        Hussein Abaza
      </Typography>
      <Box
        className="my-name"
        display="flex"
        width="100%"
        height="100%"
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <LetterAnimationWrapper>
          <Box
            className="hussein"
            sx={{
              minWidth: "30%",
              background: (theme) =>
                theme.mixins.gradientBackground.bgGradient3.background,
            }}
          />
        </LetterAnimationWrapper>
        <NameAnimationWrapper className="header">
          <Typography
            variant="h2"
            component="h2"
            className="name"
            id="name"
            sx={{
              textTransform: "uppercase",
              fontSize: "3.5rem",
              background: (theme) =>
                theme.mixins.gradientBackground.bgGradient3.background,
              "&::before": {
                content: '"Hussein Abaza"',
                animation: `${nameAnimation}  var(--animation-duration) ease-in-out 1 var(--animation-delay)`,
              },
            }}
          />
          <Typography
            variant="h2"
            component="h2"
            className="position"
            id="position"
            sx={{
              textTransform: "capitalize",
              fontSize: "3rem",
              background: (theme) =>
                theme.mixins.gradientBackground.bgGradient3.background,
              "&::before": {
                content: '"Web Developer And ECE Engineer"',
                display: "block",
                overflow: "hidden",
                animation: `${positionAnimation}  var(--animation-duration) ease-in-out 1 var(--animation-delay)`,
              },
            }}
          />
        </NameAnimationWrapper>
        <LetterAnimationWrapper>
          <Box
            className="abaza"
            sx={{
              minWidth: "30%",
              background: (theme) =>
                theme.mixins.gradientBackground.bgGradient3.background,
            }}
          />
        </LetterAnimationWrapper>
      </Box>
    </WelcomeSectionContainer>
  );
};

export default WelcomeSection;

const WelcomeSectionContainer = styled("section")(({ theme }) => ({
  scrollSnapAlign: "start",
  scrollMarginTop: theme.mixins.toolbar.minHeight,
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
  minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  "&:hover": {
    animationPlayState: "running",
  },
  "&:has(.header:hover)": {
    animationPlayState: "paused",
    "& #name.name::before": {
      "--fullname": '"Hussein Abaza"',
      content: "var(--fullname)!important",
    },
    "& #position.position::before": {
      "--position": '"Web Developer And ECE Engineer"',
      content: "var(--position)!important",
    },
  },
  "--background-from": theme.palette.analogous1.main,
  "--background-to": theme.palette.analogous2.main,
  background: theme.mixins.gradientBackground.bgGradient.background,
}));
const LetterAnimationWrapper = styled("div")(() => ({
  resize: "both",
  width: "100%",
  height: "100%",
  "&> div": {
    width: "100%",
    height: "100%",
  },
  "&>.hussein": {
    WebkitMask: "var(--letter-h)",
    mask: "var(--letter-h)",
    animation: `${husseinAnimation}  var(--animation-duration) ease-in-out 1 var(--animation-delay)`,
    minWidth: "30%",
    "--background-from": "var(--mui-palette-triadic1-light)",
    "--background-mid": "var(--mui-palette-triadic1-main)",
    "--background-to": "var(--mui-palette-triadic1-dark)",
  },
  "&>.abaza": {
    WebkitMask: "var(--letter-a)",
    mask: "var(--letter-a)",
    animation: `${abazaAnimation}  var(--animation-duration) ease-in-out 1 var(--animation-delay)`,
    minWidth: "30%",
    "--background-from": "var(--mui-palette-triadic2-light)",
    "--background-mid": "var(--mui-palette-triadic2-main)",
    "--background-to": "var(--mui-palette-triadic2-dark)",
  },
}));
const NameAnimationWrapper = styled("div")(({ theme }) => ({
  fontFamily: '"Snap ITC", sans-serif',
  letterSpacing: "0.5rem",
  wordSpacing: "1rem",
  textAnchor: "middle",
  textAlign: "center",
  verticalAlign: "middle",
  width: "min-content",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  transition: "0.1s ease-in",
  transitionProperty: "background-image, padding, height",
  margin: "auto",
  "&:not(:hover)": {
    background: "transparent",
  },
  "&:hover": {
    borderRadius: "5%",
    border: "2rem solid transparent",
    padding: "0.5rem 1rem",
    height: "min-content",
  },
  "& .name": {
    "&:first-line": {
      "--background-from": theme.palette.triadic1.dark,
      "--background-mid": theme.palette.triadic1.main,
      "--background-to": theme.palette.triadic1.dark,
      "--background-angle": "to bottom",
      ...theme.mixins.gradientBackground.bgGradient3,
      ...theme.mixins.gradientBackground.bgClip,
    },
    "&::before": {
      fontFamily: '"Snap ITC", sans-serif',
      "--background-from": theme.palette.triadic2.dark,
      "--background-mid": theme.palette.triadic2.main,
      "--background-to": theme.palette.triadic2.dark,
      "--background-angle": "to bottom",
      ...theme.mixins.gradientBackground.bgGradient3,
      ...theme.mixins.gradientBackground.bgClip,
    },
  },
  "& .position::before": {
    fontFamily: '"Snap ITC", sans-serif',
    "--background-from": theme.palette.complementary.dark,
    "--background-mid": theme.palette.complementary.main,
    "--background-to": theme.palette.complementary.dark,
    "--background-angle": "to bottom",
    ...theme.mixins.gradientBackground.bgGradient3,
    ...theme.mixins.gradientBackground.bgClip,
  },
}));

const abazaAnimation = keyframes`
  0% {
    transform: scale(0.1);
  }

  5% {
    -webkit-mask: var(--letter-a);
    transform: scale(1);
  }

  10% {
    transform: scale(0.1);
  }

  15% {
    -webkit-mask: var(--letter-b);
    transform: scale(1);
  }

  20% {
    transform: scale(0.1);
  }

  25% {
    transform: scale(0.1);
  }

  30% {
    transform: scale(0.1);
  }

  35% {
    -webkit-mask: var(--letter-a);
    transform: scale(1);
  }

  40% {
    transform: scale(0.1);
  }

  45% {
    -webkit-mask: var(--letter-z);
    transform: scale(1);
  }

  50% {
    transform: scale(0.1);
  }

  55% {
    -webkit-mask: var(--letter-a);
    transform: scale(1);
  }

  60% {
    transform: scale(0.1);
  }

  65% {
    -webkit-mask: var(--letter-a);
    transform: scale(1);
  }

  100% {
    -webkit-mask: var(--letter-a);
    transform: scale(1);
  }
`;
const husseinAnimation = keyframes`
  0% {
    -webkit-mask: var(--letter-h);
    transform: scale(1);
  }

  5% {
    transform: scale(0.1);
  }

  10% {
    -webkit-mask: var(--letter-u);
    transform: scale(1);
  }

  15% {
    transform: scale(0.1);
  }

  20% {
    -webkit-mask: var(--letter-s);
    transform: scale(1);
  }

  25% {
    transform: scale(0.1);
  }

  30% {
    -webkit-mask: var(--letter-s);
    transform: scale(1);
  }

  35% {
    transform: scale(0.1);
  }

  40% {
    -webkit-mask: var(--letter-e);
    transform: scale(1);
  }

  45% {
    transform: scale(0.1);
  }

  50% {
    -webkit-mask: var(--letter-i);
    transform: scale(1);
  }

  55% {
    transform: scale(0.1);
  }

  60% {
    -webkit-mask: var(--letter-n);
    transform: scale(1);
  }

  65% {
    -webkit-mask: var(--letter-h);
    transform: scale(1);
  }

  100% {
    -webkit-mask: var(--letter-h);
    transform: scale(1);
  }
`;
const nameAnimation = keyframes`
  0% {
    content: "h";
  }

  5% {
    content: "h a";
  }

  10% {
    content: "hu a";
  }

  15% {
    content: "hu ab";
  }

  20% {
    content: "hus ab";
  }

  25% {
    content: "hus ab";
  }

  30% {
    content: "huss ab";
  }

  35% {
    content: "huss aba";
  }

  40% {
    content: "husse aba";
  }

  45% {
    content: "husse abaz";
  }

  50% {
    content: "hussei abaz";
  }

  55% {
    content: "hussei abaza";
  }

  60% {
    content: "hussein abaza";
  }

  100% {
    content: "hussein abaza";
  }
`;
const positionAnimation = keyframes`

  0% {
    content: "1";
    transform: scale(0.1);
  }

  5% {
    content: "2";
    transform: scale(1);
  }

  10% {
    content: "3";
    transform: scale(0.3);
  }

  15% {
    content: "4";
    transform: scale(1);
  }

  20% {
    content: "5";
    transform: scale(0.5);
  }

  25% {
    content: "6";
    transform: scale(1);
  }

  30% {
    content: "7";
    transform: scale(0.7);
  }

  35% {
    content: "8";
    transform: scale(1);
  }

  40% {
    content: "9";
    transform: scale(0.9);
  }

  45% {
    content: "10";
    transform: scale(1);
  }

  50% {
    content: "Web Developer";
    transform: rotateX(360deg) scale(1);
  }

  55% {
    content: "ECE Engineer";
    transform: rotateX(0deg) scale(1);
  }

  60% {
    content: "Web Developer And ECE Engineer";
    transform: rotateX(360deg) scale(1);
  }

  100% {
    content: "Web Developer And ECE Engineer";
    transform: rotateX(270deg) scale(1);
  }
`;
