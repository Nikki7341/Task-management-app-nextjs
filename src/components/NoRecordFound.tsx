import React from "react";
import { Box, Typography } from "@mui/material";

const NoRecordFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      style={{ height: "100%" }}
    >
      <Typography 
      sx={{fontSize:'25px', fontWeight:"800", color:"gray"}}
      >No tasks available</Typography>
    </Box>
  );
};

export default NoRecordFound;
