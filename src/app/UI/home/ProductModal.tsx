import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function ProductrModal() {
  const rootRef = React.useRef<HTMLDivElement>(null);

  return (
    <Box
      sx={{
        height: 300,
        flexGrow: 1,
        minWidth: 300,
        transform: "translateZ(0)",
      }}
      ref={rootRef}
    >
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        sx={{
          display: "flex",
          p: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        container={() => rootRef.current!}
      >
        <Box
          sx={(theme) => ({
            position: "relative",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            p: 4,
          })}
        >
          <h2>Product Modal</h2>
          <Typography id="server-modal-description" sx={{ pt: 2 }}>
            Cart Number:
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
