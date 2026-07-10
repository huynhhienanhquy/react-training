import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";

import { useState } from "react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
}

// Action menu for each row in the DataGrid
export default function ProductActionMenu ({
  onEdit,
  onDelete
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  function handleOpen(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleEdit () {
    handleClose();
    onEdit();
  }

  function handleDelete() {
    handleClose();
    onDelete();
  }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon>

        </MoreVertIcon>
      </IconButton>

      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small">

            </EditIcon>
          </ListItemIcon>

          <ListItemText>
            Edit
          </ListItemText>
        </MenuItem>

        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error">

            </DeleteIcon>
          </ListItemIcon>
          <ListItemText>
            Delete
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
