import React from "react";
import { useMemo } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Card,
    CardBody,
    Col,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
} from "reactstrap";

//Import DataTable
import DataTables from "@/Components/Common/DataTables";

import classnames from "classnames";
import { currencyFormat, formatDate } from "@/helpers/formatValue";

const ReportTable = ({ trans, activeTab, toggleTab }) => {
    // Table Data
    const transData = useMemo(() => trans);
    const paidData = transData.filter((data) => data.status == "paid");
    const unpaidData = transData.filter((data) => data.status == "unpaid");

    const columns = useMemo(
        () => [
            {
                id: "name",
                name: "NAME",
                selector: (row) => row.name,
                sortable: true,
            },
            {
                id: "type",
                name: "TYPE",
                selector: (row) => row.type,
                sortable: true,
                maxWidth: '120px',
                hide: 'md',
            },
            {
                id: "alias",
                name: "PACKET",
                selector: (row) => row.alias,
                sortable: true,
                hide: 'md',
            },
            {
                id: "total",
                name: "TOTAL",
                selector: (row) => row.total,
                format: (row) => currencyFormat(row.total),
                sortable: true,
                maxWidth: '150px',
                hide: 'sm',
            },
            {
                id: "status",
                name: "STATUS",
                selector: (row) => row.status,
                sortable: true,
                maxWidth: '120px',
                cell: (row) => (
                    <>
                        <Button
                            type="button"
                            className="btn-sm"
                            color=
                            { row.status === "paid" ?
                            "success"
                            :
                            "danger"}
                            outline
                        >
                            { row.status === "paid" ?
                            <i className="bx bx-check-double font-size-12 align-middle me-2"></i> :
                            <i className="bx bx-sad font-size-12 align-middle me-1"></i> }
                            {row.status}
                        </Button>
                    </>
                )
            },
            {
                id: "period",
                name: "PERIOD",
                selector: (row) => row.period,
                format: (row) => formatDate(row.period, "MMM, Y"),
                sortable: true,
                maxWidth: '120px',
                hide: 'xm',
            },
        ],
        []
    );

    return (
        <Card>
            <CardBody>
                <ul className="nav nav-tabs nav-tabs-custom">
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active: activeTab === "1",
                            })}
                            onClick={() => {
                                toggleTab("1");
                            }}
                        >
                            All
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active: activeTab === "2",
                            })}
                            onClick={() => {
                                toggleTab("2");
                            }}
                        >
                            Paid
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active: activeTab === "3",
                            })}
                            onClick={() => {
                                toggleTab("3");
                            }}
                        >
                            Unpaid
                        </NavLink>
                    </NavItem>
                </ul>

                <div className="mt-4">
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1" id="all">
                            <DataTables
                                columns={columns}
                                data={transData}
                                pagination={true}
                                theme="malygos"
                                paginationPerPage={30}
                            />
                        </TabPane>

                        <TabPane tabId="2" id="paid">
                            <DataTables
                                columns={columns}
                                data={paidData}
                                pagination={true}
                                theme="malygos"
                                paginationPerPage={30}
                            />
                        </TabPane>

                        <TabPane tabId="3" id="unpaid">
                            <DataTables
                                columns={columns}
                                data={unpaidData}
                                pagination={true}
                                theme="malygos"
                                paginationPerPage={30}
                            />
                        </TabPane>
                    </TabContent>
                </div>
            </CardBody>
        </Card>
    );
};

ReportTable.propTypes = {
    activeTab: PropTypes.string,
    toggleTab: PropTypes.func,
};

export default ReportTable;
