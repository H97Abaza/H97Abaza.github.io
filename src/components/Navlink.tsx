import { styled } from "@mui/material/styles";

const NavLink = styled("a")(({ theme }) => ({
  textDecoration: "none",
  textTransform: "uppercase",
  fontSize: "0.85rem",
  fontWeight: "bold",
  letterSpacing: "0.02em",
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    outline: `${theme.palette.primary.main} solid thick`,
    color: theme.palette.complementary.main,
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem",
    fontWeight: "bold",
    letterSpacing: "0.01em",
    lineBreak: "loose",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.65rem",
  },
}));
export default NavLink;
