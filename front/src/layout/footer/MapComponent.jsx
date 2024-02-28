import React from "react";
import { Box, Typography } from "@mui/material";

const MapComponent = () => {
  return (
    <Box>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3411.1335180821693!2d34.77600682390952!3d31.24472696070784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x150265e290753135%3A0xe4e5db6a8b16fafe!2z157Xqdei15XXnCDXodeV16HXmdeQIDYsINeR15DXqCDXqdeR16I!5e0!3m2!1siw!2sil!4v1707308479864!5m2!1siw!2sil"
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Box>
  );
};

export default MapComponent;
