import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            fontSize: "12px",
            background: "#fdfbc8",
            borderRadius: "4px",
          },
          "& .MuiInputBase-input": {
            padding: "6px 8px",
            fontSize: "12px",
          },
          "& .MuiSelect-select": {
            fontSize: "12px",
            padding: "6px 8px",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "12px",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          "& .MuiFormControlLabel-label": {
            fontSize: "12px",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "11px",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-toolbarContainer, .MuiButtonBase-root, .MuiDataGrid-cell, .MuiDataGrid-footerContainer":
            {
              fontSize: "12px",
            },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "13px",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "& .MuiTypography-subtitle1": {
            fontSize: "15px",
          },
          "& .MuiTypography-subtitle2": {
            fontSize: "14px",
            fontWeight: "bolder",
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            fontSize: "12px",
            whiteSpace: "nowrap",
          },
          "& .MuiTableCell-body, .MuiInput-input": {
            fontSize: "11px",
            whiteSpace: "nowrap",
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          height: 300,
          width: "100%",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: 10,
            height: 10,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#fff",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#d5d8df",
            borderRadius: 2,
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          "& .MuiRadio-root, .PrivateSwitchBase-input": {
            fontSize: "12px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "4px 10px",
          fontSize: "11px",
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              fontSize: "12px",
            },
        },
      },
    },
  },
});
