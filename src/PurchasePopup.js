import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./App.css"; // Import the CSS file

function PurchasePopup() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Button to open the dialog */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        Buy Gold
      </Button>

      {/* Dialog Component */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          style: {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          },
        }}
      >
        <DialogTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Buy Gold</Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Click the links below to purchase gold:
          </Typography>
          <ul style={{ paddingLeft: "0", listStyleType: "none" }}>
            {[
              {
                href: "https://rajaemasindonesia.co.id/?gad_source=1&gclid=CjwKCAjw2dG1BhB4EiwA998cqPFW7vHAHJQ4p8TFuJ9OdcUz8ND7Vtn03WvSjgUC5jV3XPY2WEN4dBoCum0QAvD_BwE",
                text: "Raja Emas Indonesia",
              },
              {
                href: "https://www.logammulia.com/id/purchase/gold",
                text: "Logam Mulia",
              },
              {
                href: "https://www.anekalogam.co.id/id",
                text: "Aneka Logam",
              },
              {
                href: "https://www.indogold.id/harga-emas-hari-ini",
                text: "IndoGold",
              },
              {
                href: "https://www.lakuemas.com/",
                text: "Laku Emas",
              },
              {
                href: "https://www.antam.com/id/precious-metal-price",
                text: "Antam",
              },
              {
                href: "https://www.tokopedia.com/emas-antam-id",
                text: "Tokopedia Emas Antam",
              },
            ].map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="purchase-popup-link"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PurchasePopup;
