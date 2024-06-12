import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import wineImage1 from "../../assets/images/one-glass.png";
import wineImage2 from "../../assets/images/glass.png";
import wineImage3 from "../../assets/images/all-bottles.png";
import wineImage4 from "../../assets/images/all-bottles-2.png";
import wineImage5 from "../../assets/images/champagne-opening.png";
import wineImage6 from "../../assets/images/liquor-jug.png";
import wineImage7 from "../../assets/images/My first design.png";
import wineImage8 from "../../assets/images/My first design (1).png";
import wineImage9 from "../../assets/images/My first design (2).png";
import wineImage10 from "../../assets/images/My first design (3).png";
import wineImage11 from "../../assets/images/My first design 5.png";
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
        <Grid item xs={3}>
          <Card sx={{ maxWidth: 250, margin:'0 auto' }}>
            <CardActionArea onClick={() => navigate("/sale-bill")}>
              <CardMedia
                component="img"
                height="100"
                image={wineImage1}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Sale Bill
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  Click to create a new sale bill
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ maxWidth: 250, margin:'0 auto'  }}>
            <CardActionArea onClick={() => navigate("/purchase-entry")}>
              <CardMedia
                component="img"
                height="100"
                image={wineImage2}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Purchase Entry
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  Click to create a new purchase bill
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ maxWidth: 250, margin:'0 auto'  }}>
            <CardActionArea onClick={() => navigate("/stock-report")}>
              <CardMedia
                component="img"
                height="100"
                image={wineImage3}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Stocks Report
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  Click to see the stocks report
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ maxWidth: 250, margin:'0 auto'  }}>
            <CardActionArea onClick={() => navigate("/stock-transfer")}>
              <CardMedia
                component="img"
                height="100"
                image={wineImage6}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Stock Transfer
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  Click to transfer stock
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ maxWidth: 250, margin:'0 auto'  }}>
            <CardActionArea onClick={() => navigate("/sale-report-summary")}>
              <CardMedia
                component="img"
                height="100"
                image={wineImage4}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Sale Report
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  Click to see the sale report
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ maxWidth: 250, margin:'0 auto'  }}>
            <CardActionArea onClick={() => navigate("/purchase-report-summary")}>
              <CardMedia
                component="img"
                height="100"
                image={wineImage5}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Purchase Report
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  Click to see the purchase report
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card sx={{ maxWidth: 250, margin:'0 auto'  }}>
            <CardActionArea onClick={() => navigate("/item-wise-sale-report")}>
              <CardMedia
                component="img"
                height="100"
                image={wineImage4}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Sale Items Report
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  Click to see item wise sale report
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ maxWidth: 250, margin:'0 auto'  }}>
            <CardActionArea onClick={() => navigate("/item-wise-purchase-report")}>
              <CardMedia
                component="img"
                height="100"
                image={wineImage7}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Purchase Items Report
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  Click to see item wise purchase report
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card sx={{ maxWidth: 250, margin:'0 auto'  }}>
            <CardActionArea onClick={() => navigate("/item-register")}>
              <CardMedia
                component="img"
                height="100"
                image={wineImage10}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Register Items
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  Click to register a item
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card sx={{ maxWidth: 250, margin:'0 auto'  }}>
            <CardActionArea onClick={() => navigate("/store-register")}>
              <CardMedia
                component="img"
                height="100"
                image={wineImage11}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Register Store
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  Click to register a store
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card sx={{ maxWidth: 250, margin:'0 auto'  }}>
            <CardActionArea onClick={() => navigate("/customer-register")}>
              <CardMedia
                component="img"
                height="100"
                image={wineImage8}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Register Customer
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  Click to register a customer
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card sx={{ maxWidth: 250, margin:'0 auto'  }}>
            <CardActionArea onClick={() => navigate("/suppliers-register")}>
              <CardMedia
                component="img"
                height="100"
                image={wineImage9}
                alt="wine glass"
                sx={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Register Supplier
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  Click to register a supplier
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
