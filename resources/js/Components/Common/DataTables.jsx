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
    striped,
}) {
    return (
        <DataTable
            columns={columns}
            data={data}
            theme={theme}
            pagination={pagination}
            striped={striped}
        />
    );
}
