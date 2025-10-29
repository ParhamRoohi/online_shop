"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../context/CartContext";
import CartModal from "../components/CartModal";
import { useCategory } from "@/app/context/CategoryContext";
import { getUser } from "@/app/api/data";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import UserDetailsModal from "./UserDetailsModal";

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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "auto",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "12ch",
    "&:focus": {
      width: "18ch",
    },
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

const settings = ["Profile", "Logout"];
const categories = [
  "All",
  "Electronics",
  "Jewelery",
  "Men's Clothing",
  "Women's Clothing",
];

function Header() {
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const { selectedCategory, setSelectedCategory, setSearchQuery } =
    useCategory();
  const [user, setUser] = React.useState<User | null>(null);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const fetchUser = async () => {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        const userData = await getUser(Number(userId));
        setUser(userData);
      }
    };

    fetchUser();
  }, []);

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    handleCloseNavMenu();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    setUser(null);
    handleCloseUserMenu();
  };

  const handleProfileClick = () => {
    setIsUserDetailsOpen(true);
    handleCloseUserMenu();
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="2xl">
        <Toolbar disableGutters sx={{ px: { xs: 1, sm: 2 } }}>
          <Box sx={{ flexGrow: 0, mr: { xs: 1, sm: 2 } }}>
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Profile Image">
                      {user.name.firstname.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={
                        setting === "Logout"
                          ? handleLogout
                          : setting === "Profile"
                          ? handleProfileClick
                          : handleCloseUserMenu
                      }
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                color="inherit"
                onClick={() => router.push("/login")}
                sx={{
                  color: "white",
                  backgroundColor: "transparent",
                  border: "1px solid white",
                  whiteSpace: "nowrap",
                }}
              >
                Login
              </Button>
            )}
          </Box>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearchChange}
              />
            </Search>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              mr: { xs: 2, sm: 2 },
              mt: 1,
              position: "relative",
              cursor: "pointer",
            }}
            onClick={handleOpenCart}
          >
            <div className="py-0.5 px-2 bg-red-500 text-white rounded-full absolute -top-4 -right-4">
              {cartItemCount}
            </div>
            <ShoppingCartIcon />
          </Box>

          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            aria-controls="nav-menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            sx={{ display: "flex" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="nav-menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {categories.map((page) => (
              <MenuItem
                key={page}
                onClick={() => handleCategoryClick(page)}
                sx={{
                  ...(selectedCategory === page && {
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                  }),
                }}
              >
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
      <CartModal isOpen={isCartOpen} onClose={handleCloseCart} />
      {user && (
        <UserDetailsModal
          user={isUserDetailsOpen ? user : null}
          close={() => setIsUserDetailsOpen(false)}
        />
      )}
    </AppBar>
  );
}
export default Header;