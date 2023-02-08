import React from "react";
import { useMemo } from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardBody,
    Col,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
} from "reactstrap";
import classnames from "classnames";

import TableContainer from "../../Components/Common/TableContainer";

import { InvoiceID, Name, Alias, Total, Status, Period } from "./ReportCol";

const ReportTable = ({ trans, activeTab, toggleTab }) => {
    // Table Data
    const transData = useMemo(() => trans);
    const paidData = transData.filter((data) => data.status == "paid");
    const unpaidData = transData.filter((data) => data.status == "unpaid");

    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
                filterable: true,
                Cell: (cellProps) => {
                    return <Name {...cellProps} />;
                },
            },
            {
                Header: "Type",
                accessor: "type",
                filterable: true,
                Cell: (cellProps) => {
                    return <Name {...cellProps} />;
                },
            },
            {
                Header: "Packet",
                accessor: "alias",
                filterable: true,
                Cell: (cellProps) => {
                    return <Alias {...cellProps} />;
                },
            },
            {
                Header: "Total",
                accessor: "total",
                filterable: true,
                Cell: (cellProps) => {
                    return <Total {...cellProps} />;
                },
            },
            {
                Header: "Status",
                accessor: "status",
                filterable: true,
                Cell: (cellProps) => {
                    return <Status {...cellProps} />;
                },
            },
            {
                Header: "Period",
                accessor: "period",
                filterable: true,
                Cell: (cellProps) => {
                    return <Period {...cellProps} />;
                },
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
                            <TableContainer
                                columns={columns}
                                data={transData}
                                // isGlobalFilter={true}
                                customPageSize={30}
                            />
                        </TabPane>

                        <TabPane tabId="2" id="paid">
                            <TableContainer
                                columns={columns}
                                data={paidData}
                                // isGlobalFilter={true}
                                customPageSize={30}
                            />
                        </TabPane>

                        <TabPane tabId="3" id="unpaid">
                            <TableContainer
                                columns={columns}
                                data={unpaidData}
                                // isGlobalFilter={true}
                                customPageSize={30}
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
