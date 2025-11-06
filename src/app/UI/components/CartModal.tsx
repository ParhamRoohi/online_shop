import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useCart } from "../../context/CartContext";
import Image from "next/image";
import { red } from "@mui/material/colors";

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCart();

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 600 },
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          Shopping Cart
        </Typography>
        {cartItems.length > 0 ? (
          <>
            <List sx={{ maxHeight: 400, overflowY: "auto" }}>
              {cartItems.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem sx={{ gap: 2, flexWrap: "wrap" }}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={50}
                      height={50}
                    />
                    <ListItemText
                      primary={item.title}
                      secondary={`$${item.price.toFixed(2)}`}
                    />
                    <div className="flex items-center">
                      <IconButton onClick={() => decreaseQuantity(item.id)}>
                        <Remove />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton onClick={() => increaseQuantity(item.id)}>
                        <Add />
                      </IconButton>
                      <IconButton onClick={() => removeFromCart(item.id)}>
                        <Delete />
                      </IconButton>
                    </div>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total: ${getTotalPrice().toFixed(2)}
            </Typography>
          </>
        ) : (
          <Typography sx={{ mt: 2, color: red[500] }}>Cart is empty</Typography>
        )}
        <Button onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default CartModal;