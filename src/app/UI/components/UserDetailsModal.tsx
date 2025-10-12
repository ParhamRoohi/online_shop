import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

interface UserDetailsModalProps {
  user: User | null;
  close: () => void;
}

function UserDetailsModal({ user, close }: UserDetailsModalProps) {
  return (
    <Modal
      open={Boolean(user)}
      onClose={close}
      aria-labelledby="user-details-modal-title"
      aria-describedby="user-details-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="user-details-modal-title" variant="h6" component="h2">
          User Details
        </Typography>
        <Typography id="user-details-modal-description" sx={{ mt: 2 }}>
          Username: {user?.username}
        </Typography>
        <Typography sx={{ mt: 2 }}>Email: {user?.email}</Typography>
        <Typography sx={{ mt: 2 }}>Phone: {user?.phone}</Typography>
        <Typography sx={{ mt: 2 }}>
          Address: {user?.address.number}, {user?.address.street},{" "}
          {user?.address.city}, {user?.address.zipcode}
        </Typography>
        <Button onClick={close} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default UserDetailsModal;
