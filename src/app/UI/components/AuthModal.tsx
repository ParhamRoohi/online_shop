"use client";
import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Authentication Required
        </Typography>
        <Typography sx={{ mt: 2, color: "red" }}>
          You need to be logged in to add items to your cart.
        </Typography>
        <Button onClick={handleLoginRedirect} sx={{ mt: 2 }}>
          Login
        </Button>
        <Button onClick={onClose} sx={{ mt: 2, ml: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default AuthModal;
