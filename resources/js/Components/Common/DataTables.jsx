import { useEffect } from "react";
import { useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";

// createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme(
    "malygos",
    {
        text: {
            primary: "#c3cbe4",
            secondary: "#eff2f7",
        },
        background: {
            default: "#2a3042",
        },
        context: {
            background: "#a6b0cf",
            text: "#FFFFFF",
        },
        divider: {
            default: "#32394e",
        },
        button: {
            default: "#eff2f7",
            hover: "rgba(0,0,0,.08)",
            focus: "rgba(255,255,255,.12)",
            disabled: "rgba(255, 255, 255, .34)",
        },
        sortFocus: {
            default: "#eff2f7",
        },
    },
    "dark"
);

export default function DataTables({
    columns,
    data,
    theme,
    pagination,
    paginationPerPage,
    striped,
    selectableRows,
    selectableRowDisabled,
    onSelectedRowsChange

}) {

    const [isDark, SetIsDark] = useState(true)
    useEffect(() => {
        let themeState = document.body.attributes['data-layout-mode'].value;
        if (themeState === "dark") {
            SetIsDark(true)
            } else {
            SetIsDark(false)
            }
        // console.log(document.body.attributes['data-layout-mode'].value, isDark)
    }, [document.body.attributes['data-layout-mode'].value])


    const handleOnSort = (column, sortDirection) => console.log(column.selector, sortDirection)

    return (
        <DataTable
            columns={columns}
            data={data}
            {...isDark ? theme={ theme } : null}
            pagination={pagination}
            paginationPerPage={paginationPerPage}
            striped={striped}
            selectableRows={selectableRows}
            selectableRowDisabled={selectableRowDisabled}
            onSelectedRowsChange={onSelectedRowsChange}
            onSort={handleOnSort}
        />
    );
}
