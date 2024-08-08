import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const PriceCard = ({ title, data, imageUrl }) => {
  if (!data) return null;

  return (
    <Card
      sx={{
        width: 300,
        height: 180,
        margin: "20px",
        position: "relative",
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Box
        component="img"
        src={imageUrl}
        alt={`${title} logo`}
        sx={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          borderRadius: "50%",
          objectFit: "contain",
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography>
          <strong>Price per</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong> Gram:</strong> {data?.gr}
          <br />
          <strong>Ounce:</strong> {data?.oz}
          <br />
          <strong>Kilogram:</strong> {data?.kg}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PriceCard;
