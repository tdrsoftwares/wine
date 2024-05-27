import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import oneGlassImage from "../../assets/images/one-glass.png";
import glassImage from "../../assets/images/glass.png";
import bottlesImage from "../../assets/images/all-bottles.png";
import allBottles from "../../assets/images/all-bottles-2.png";
import champagneBottle from "../../assets/images/champagne-opening.png";
import liqJug from "../../assets/images/liquor-jug.png";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container" style={{ padding: "20px" }}>
      {/* <Typography variant="h3" align="center" gutterBottom>
        Welcome to Home Page
      </Typography> */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
            <CardActionArea onClick={() => navigate("/sale-bill")}>
              <CardMedia
                component="img"
                height="140"
                image={oneGlassImage}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Sale Bill
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to create a new Sale Bill
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
            <CardActionArea onClick={() => navigate("/purchase-entry")}>
              <CardMedia
                component="img"
                height="140"
                image={glassImage}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Purchase Entry
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to create a new Purchase Bill
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
            <CardActionArea onClick={() => navigate("/stock-report")}>
              <CardMedia
                component="img"
                height="140"
                image={bottlesImage}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Stocks Report
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to see the Stocks Report
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
            <CardActionArea onClick={() => navigate("/sale-report-summary")}>
              <CardMedia
                component="img"
                height="140"
                image={allBottles}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Sale Report
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to see the Sale Report
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
            <CardActionArea onClick={() => navigate("/purchase-report-summary")}>
              <CardMedia
                component="img"
                height="140"
                image={champagneBottle}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Purchase Report
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to see the Purchase Report
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
            <CardActionArea onClick={() => navigate("/customer-register")}>
              <CardMedia
                component="img"
                height="140"
                image={liqJug}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Register Customer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to register a Customer
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
