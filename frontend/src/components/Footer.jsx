import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        p: 2,
        textAlign: "center",
        bgcolor: "floralwhite",
        boxShadow: 1,
      }}
    >
      <Typography variant="body2">© 2025 My App. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
