import React from "react";
import MaterialTable from "material-table";
import { createTheme, ThemeProvider } from "@mui/material";

const defaultMaterialTheme = createTheme({
  direction: "ltr",
});
const DataTable = ({ columns, data, title, actions }) => {
  return (
    <div>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          columns={columns}
          data={data}
          title={title}
          actions={actions}
        />
      </ThemeProvider>
    </div>
  );
};

export default DataTable;
