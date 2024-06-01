import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

const CategoryModal = ({
  isOpen,
  handleClose,
  categoryName,
  setCategoryName,
  indexNoCate,
  setIndexNoCate,
  groupNameCate,
  setGroupNameCate,
  groupNoCate,
  setGroupNoCate,
  handleCreateCategory,
  handleCategoriesClear
}) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={modalStyles}>
        <Typography variant="h6" component="h2" align="center" mb={3}>
          Create Category:
        </Typography>

        <TextField
          fullWidth
          size="small"
          type="text"
          label="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
          required
        />

        <TextField
          fullWidth
          size="small"
          type="text"
          label="Group Name"
          value={groupNameCate}
          onChange={(e) => setGroupNameCate(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
          required
        />

        <TextField
          fullWidth
          size="small"
          type="number"
          label="Index No."
          value={indexNoCate}
          onChange={(e) => setIndexNoCate(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
          required
        />

        <TextField
          fullWidth
          size="small"
          type="number"
          label="Group No."
          value={groupNoCate}
          onChange={(e) => setGroupNoCate(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
          required
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleCreateCategory}
          >
            Create
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => {
              handleClose();
              handleCategoriesClear();
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default CategoryModal;
