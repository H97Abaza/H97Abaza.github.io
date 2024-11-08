import { styled, useThemeProps } from "@mui/material/styles";
import * as React from "react";
import NavLink from "./Navlink";

// eslint-disable-next-line react-refresh/only-export-components
export const renderIcon = (path: string) => (
  <>
    <path d={path} />
    <defs>
      <linearGradient id="svg-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="var(--background-from)" />
        <stop offset="100%" stopColor="var(--background-to)" />
      </linearGradient>
      <linearGradient id="svg-gradient-3" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="var(--background-from)" />
        <stop offset="50%" stopColor="var(--background-mid)" />
        <stop offset="100%" stopColor="var(--background-to)" />
      </linearGradient>
    </defs>
  </>
);

export interface TileProps {
  id?: string;
  img?: boolean;
  /**
   * @default true
   */
  path?: string;
  src?: string;
  alt?: string;
  href?: string;
  text?: string;
  tags?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface TileOwnerState extends TileProps {
  // …key value pairs for the internal state that you want to style the slot
  // but don't want to expose to the users
}

const TileRoot = styled("div", {
  name: "MuiTile",
  slot: "root",
})<{ ownerState: TileOwnerState }>(({ theme, ownerState }) => ({
  ...(ownerState.img
    ? {
        gridTemplateRows: "2fr 2fr",
      }
    : {
        gridTemplateRows: "3.5fr 0.5fr",
      }),
  display: "grid",
  borderRadius: "0.125rem",
  overflow: "hidden",
  aspectRatio: "1",
  transition: "all 0.3s ease-in-out",
  width: ownerState.img ? "min(220px, 60vmin)" : "max(9rem, 13vmax)",
  height: ownerState.img ? "min(220px, 60vmin)" : "max(9rem, 13vmax)",
  textTransform: "uppercase",
  zIndex: 1,
  border: "0rem solid transparent",
  "--background-mid": theme.palette.primary.main,
  background: theme.mixins.gradientBackground.bgGradient3.background,
  "&:hover": {
    gridTemplateRows: ownerState.img ? "3.5fr 0.5fr" : "2fr 2fr",
    transform: ownerState.img ? "" : "scale(1.1)",
    borderWidth: ownerState.img ? "" : "0.5rem",
    transition: "transform 0.3s ease-in-out",
    boxShadow: `0 0 1rem 0.25rem ${theme.palette.primary.dark}`,
    "&.MuiTile-img": {
      transform: "scaleX(1.1)",
      width: "90%",
      height: "90%",
      transition: "transform 0.3s ease-in-out",
    },
  },
}));

const TileImg = styled("img", {
  name: "MuiTile",
  slot: "img",
})<{ ownerState: TileOwnerState }>(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "0.3s ease-in-out",
  margin: "auto",
  "--background-from": theme.palette.triadic1.light,
  "--background-to": theme.palette.triadic2.light,
  fill: "url(#svg-gradient) var(--background-from)",
  background: "transparent",
}));

const TileIcon = styled("svg", {
  name: "MuiTile",
  slot: "icon",
})<{ ownerState: TileOwnerState }>(({ theme }) => ({
  width: "80%",
  height: "80%",
  margin: "auto",
  "--background-from": theme.palette.triadic1.light,
  "--background-to": theme.palette.triadic2.light,
  fill: "url(#svg-gradient) var(--background-from)",
  background: "transparent",
}));

const TileLink = styled(NavLink, {
  name: "MuiTile",
  slot: "link",
})<{ ownerState: TileOwnerState }>(({ theme }) => ({
  backgroundColor: theme.palette.complementary.dark,
  "--background-from": theme.palette.complementary.light,
  "--background-to": theme.palette.complementary.dark,
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  flexWrap: "wrap",
  padding: "0.5rem 1rem",
  textAlign: "center",
  verticalAlign: "middle",
  textShadow: theme.palette.complementary.contrastText,
  textWrap: "balance",
  wordBreak: "normal",
  wordWrap: "normal",
  background: theme.mixins.gradientBackground.bgGradient.background,
  "&:hover": {
    backgroundColor: theme.palette.analogous1.dark,
    "--background-from": theme.palette.triadic1.light,
    "--background-to": theme.palette.triadic2.light,
    color: theme.palette.complementary.light,
  },
}));

const Tile = React.forwardRef<HTMLDivElement, TileProps>(function Tile(
  inProps,
  ref
) {
  const props = useThemeProps({ props: inProps, name: "MuiTile" });
  const {
    img = true,
    alt = "",
    path = "",
    src = "",
    href = "",
    text = "",
    id = "",
  } = props;
  // todo: implement tags
  const ownerState = props;

  return (
    <TileRoot ref={ref} ownerState={ownerState} {...{ id }}>
      {img ? (
        <TileImg ownerState={ownerState} {...{ alt, src }} />
      ) : (
        <TileIcon
          ownerState={ownerState}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          {path && renderIcon(path)}
        </TileIcon>
      )}
      <TileLink ownerState={ownerState} target="_blank" {...{ href }}>
        {text}
      </TileLink>
    </TileRoot>
  );
});
export default Tile;
