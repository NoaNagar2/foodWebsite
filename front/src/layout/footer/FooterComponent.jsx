import React, { useState } from "react";
import { Box, Typography, Container, Dialog, Divider } from "@mui/material";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./footer.css";
import MapComponent from "./MapComponent";

const FooterComponent = () => {
  const [openMap, setOpenMap] = useState(false);

  const handleLocation = () => {
    setOpenMap(true);
  };

  const handleClose = () => {
    setOpenMap(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255,233,244,0.5)",
        textAlign: "center",
        width: "99vw",
        maxWidth: "99.5vw",
      }}
    >
      <Container
        className="footerContainer"
        sx={{
          m: "0 auto",
          p: 2,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Box sx={{ mb: 1, mt: 1 }}>
          <Link href="/allworkshop" underline="hover" color="black">
            סדנאות
          </Link>
        </Box>

        <Box sx={{ mb: 1, mt: 1, display: "flex", flexDirection: "column" }}>
          <Link
            href={"/recipebycategory?data=עוגות ועוגיות"}
            underline="hover"
            sx={{ color: "black", mb: 1 }}
          >
            עוגות ועוגיות
          </Link>
          <Link
            href="/recipebycategory?data=מאפים מטורפים"
            underline="hover"
            sx={{ color: "black", mb: 1 }}
          >
            מאפים מטורפים
          </Link>
          <Link
            href="/recipebycategory?data=סלטים"
            underline="hover"
            sx={{ color: "black", mb: 1 }}
          >
            סלטים
          </Link>
          <Link
            href="/recipebycategory?data=מנות אירוח / פתיחה"
            underline="hover"
            sx={{ color: "black", mb: 1 }}
          >
            מנות אירוח / פתיחה
          </Link>
          <Link
            href="/recipebycategory?data=מנות של חג"
            underline="hover"
            sx={{ color: "black", mb: 1 }}
          >
            מנות של חג
          </Link>
        </Box>

        <Box sx={{ mb: 1, mt: 1 }}>
          <IconButton
            href="https://www.instagram.com/invites/contact/?i=1pwua9sdpaev1&utm_content=3kfxmi"
            target="blank"
          >
            <InstagramIcon />
          </IconButton>
          <IconButton href="https://wa.me/972506409478" target="blank">
            <WhatsAppIcon />
          </IconButton>
          <IconButton
            href="https://www.facebook.com/shenhav.binyamin?mibextid=LQQJ4d"
            target="blank"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton onClick={handleLocation}>
            <LocationOnIcon />
          </IconButton>
          <Dialog open={openMap} onClose={handleClose} sx={{ width: "100vw" }}>
            <MapComponent />
          </Dialog>
        </Box>
      </Container>

      <Divider />
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ p: 2 }}
      >
        {"Copyright © "}
        <Link
          color="inherit"
          href="https://api.whatsapp.com/send?phone=972583292249"
        >
          Noa Nagar{" "}
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default FooterComponent;
