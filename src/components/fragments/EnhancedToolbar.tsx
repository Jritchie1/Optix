import * as React from "react";
import { Toolbar, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

interface EnhancedTableToolbarProps {
  numSelected: number;
}

export function EnhancedToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected >= 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Available Movies
      </Typography>
    </Toolbar>
  );
}
