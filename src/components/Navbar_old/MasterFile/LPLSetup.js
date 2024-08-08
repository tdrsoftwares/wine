import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const LPLSetup = () => {
  const [categories] = useState([
    "25 UP IML",
    "50 UP Country Sprit",
    "50 UP IML",
    "60 UP IML",
    "70 UP IML",
    "80 UP Country Sprit",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [volume, setVolume] = useState("");
  const [lplValue, setLplValue] = useState("");
  const [existingCategory, setExistingCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  return (
    <form>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          LPL Calculation Settings
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Item Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              name="selectedCategory"
              label="Category"
              value={selectedCategory}
              variant="outlined"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((item, id) => {
                return (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              type="number"
              name="volume"
              label="Volume"
              value={volume}
              variant="outlined"
              onChange={(e) => setVolume(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              type="number"
              name="lplValue"
              label="LPL Value"
              value={lplValue}
              variant="outlined"
              onChange={(e) => setLplValue(e.target.value)}
            />
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
              "& button": { m: 1, marginRight: 2 },
            }}
          >
            <Button
              color="primary"
              size="large"
              variant="outlined"
              onClick={() => {}}
            >
              Save
            </Button>
            <Button
              color="error"
              size="large"
              variant="outlined"
              onClick={() => {}}
            >
              Clear
            </Button>
          </Box>
        </Grid>

        <Typography variant="subtitle2" gutterBottom>
          Change Category
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              name="existingCategory"
              label="Existing Category"
              value={existingCategory}
              variant="outlined"
              onChange={(e) => setExistingCategory(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              name="newCategory"
              label="New Category"
              value={newCategory}
              variant="outlined"
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
              "& button": { m: 1, marginRight: 4 },
            }}
          >
            <Button
              color="secondary"
              size="large"
              variant="outlined"
              onClick={() => {}}
            >
              Change
            </Button>
          </Box>
        </Grid>
      </Box>
    </form>
  );
};

export default LPLSetup;
