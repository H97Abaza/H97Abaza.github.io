// Footer.tsx
import { styled } from "@mui/material";
import React, { Fragment } from "react";
import INFO from "./INFO";

const Footer: React.FC = () => (
  <FooterContainer>
    <FooterText>
      <span>© 2024 Hussein Abaza. All rights reserved.</span>
      {INFO.sections.map(({ id, title }) => (
        <Fragment key={id}>
          {" | "}
          <a href={"#" + id}>{title}</a>
        </Fragment>
      ))}
    </FooterText>
  </FooterContainer>
);

export default Footer;

const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.complementary.dark,
  minHeight: "25vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "0.75rem",
  fontWeight: "bold",
  textAlign: "center",
}));

const FooterText = styled("p")(({ theme }) => ({
  padding: theme.spacing(1),
}));
