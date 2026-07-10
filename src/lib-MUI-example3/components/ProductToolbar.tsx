import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

type Props = {
  searchText: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

//Top bar of the DataGrid: title, search box, add button
export default function ProductToolbar ({
  searchText,
  onSearchChange,
  onAddClick,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}>
          Product Management
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchText}
              onChange={(event) => onSearchChange(event.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

        <Button variant="contained" startIcon={<AddIcon />} onClick={onAddClick}>
          Add Product
        </Button>
        </Box>
    </Box>
  )
}
