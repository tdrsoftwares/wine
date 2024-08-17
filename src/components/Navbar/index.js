import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import routes from "../../routes.js";

export default function Index() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginLeft: 5,
            marginRight: 5,
          }}
        >
          {routes.map((item) => (
            <Box
              key={item.name}
              onMouseEnter={item.dropDown ? handleMenuOpen : null}
              onMouseLeave={handleMenuClose}
            >
              {item.dropDown ? (
                <React.Fragment>
                  <Button
                    sx={{
                      color: "#fff",
                      textTransform: "none",
                    }}
                    onClick={handleMenuOpen}
                  >
                    {item.name}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && anchorEl?.textContent === item.name}
                    MenuListProps={{ onMouseLeave: handleMenuClose }}
                  >
                    {item.dropDown.map((subItem) => (
                      <MenuItem
                        key={subItem.name}
                        onClick={handleMenuClose}
                        sx={{ textTransform: "none" }}
                      >
                        {subItem.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </React.Fragment>
              ) : (
                <Button
                  sx={{
                    color: "#fff",
                    textTransform: "none",
                  }}
                >
                  {item.name}
                </Button>
              )}
            </Box>
          ))}
        </Box>
      </AppBar>
    </Box>
  );
}
