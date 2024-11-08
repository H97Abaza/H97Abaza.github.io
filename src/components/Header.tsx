import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import React from "react";
import INFO from "./INFO";
import NavLink from "./Navlink";

interface Props {
  children?: React.ReactElement<unknown>;
}

function ScrollTop(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
    target: document.querySelector("body") as HTMLElement,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger} key="scrollTop">
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, left: 16, zIndex: 1 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

const pages = ["welcome"].concat(INFO.sections.map(({ id }) => id));

export function Header(props: React.PropsWithChildren<Props>) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <React.Fragment>
      <StyledAppBar id="navbar" position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="sections"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                slotProps={{
                  paper: {
                    sx: ({ mixins, palette }) => ({
                      "--background-from": palette.complementary.dark,
                      "--background-mid": palette.complementary.light,
                      "--background-to": palette.complementary.dark,
                      background:
                        mixins.gradientBackground.bgGradient.background,
                    }),
                  },
                }}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <NavLink
                      sx={{ width: "100%", textAlign: "center" }}
                      href={"#" + page}
                    >
                      {" "}
                      {page}{" "}
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <NavLink href={"#" + page}>{page}</NavLink>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
      <Offset id="back-to-top-anchor" />
      <Container>{props?.children}</Container>
      <ScrollTop {...props}>
        <Fab
          size="small"
          aria-label="scroll back to top"
          sx={{ bgcolor: "complementary.light", color: "primary.main" }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.mixins.gradientBackground.bgGradient3.background,
  "--background-from": theme.palette.complementary.dark,
  "--background-mid": theme.palette.complementary.light,
  "--background-to": theme.palette.complementary.dark,
  "--background-angle": "45deg",
}));
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default Header;
