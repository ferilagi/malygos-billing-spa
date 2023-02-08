import React from "react";
import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
    Col,
    Card,
    CardBody,
    CardSubtitle,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
    Button,
} from "reactstrap";
import classnames from "classnames";

import TableContainer from "../../Components/Common/TableContainer";

import { InvoiceID, Name, Total, Status, Period } from "./InvoiceCol";

const InvoiceTable = ({ trans, activeTab, toggleTab, setPayModal, setPayInvoice }) => {

    // Table Data
    const transData = trans;

    const columns = useMemo(
        () => [
            {
                Header: "Invoice",
                accessor: "id",
                disableFilters: true,
                filterable: true,
                Cell: (cellProps) => {
                    return <InvoiceID {...cellProps} />;
                },
            },
            {
                Header: "Name",
                accessor: "name",
                disableFilters: true,
                filterable: true,
                Cell: (cellProps) => {
                    return <Name {...cellProps} />;
                },
            },
            {
                Header: "Total",
                accessor: "total",
                disableFilters: true,
                filterable: true,
                Cell: (cellProps) => {
                    return <Total {...cellProps} />;
                },
            },
            {
                Header: "Status",
                accessor: "status",
                disableFilters: true,
                filterable: true,
                Cell: (cellProps,) => {
                    return (
                        cellProps.value === "paid" ?
                            <Button color="success" outline className="btn-sm">
                                {" "}
                                <i className="bx bx-check-double font-size-12 align-middle me-2"></i>
                                {cellProps.value}
                            </Button>
                        :   <Button color="danger" outline className="btn-sm"
                                onClick={() => {
                                    const invPay = cellProps.row.original;
                                    setPayInvoice(invPay);
                                    setPayModal(true);}}
                                >
                                {" "}
                                <i className="bx bx-sad font-size-12 align-middle me-1"></i>
                                {cellProps.value}
                            </Button>
                    )
                },
            },
            {
                Header: "Period",
                accessor: "period",
                disableFilters: true,
                filterable: true,
                Cell: (cellProps) => {
                    return <Period {...cellProps} />;
                },
            },
        ],
        []
    );

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(transData);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    useEffect(() => {
        // fixthrottled.current(search), [search]
        const deBounce = setTimeout(() => {
            if (search == "") {
                setFilters(transData);
            } else {
                // console.log("event.target.value",event.target.value);
                let filtered = transData.filter((item) => {
                    return (
                        item.invoice == search ||
                        item.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item.total
                            .toString()
                            .includes(search.toLowerCase()) ||
                        item.status
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item.period
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    );
                });
                setFilters(filtered);
            }
        }, 500);
        return () => clearTimeout(deBounce);
    }, [search]);

    return (
        <Card>
            <CardBody>
                <CardSubtitle className="mb-3">
                    <Row className="mb-3">
                        {/* <Col sm={8}>
                            <a>
                                <Button
                                    type="button"
                                    color="primary"
                                    className="btn mb-2 me-2"
                                    onClick={() => {
                                        handleCustomerAdd();
                                    }}
                                >
                                    <i className="mdi mdi-plus-circle-outline me-1" />
                                    Create New User
                                </Button>
                            </a>
                        </Col> */}
                        <Col sm={4}>
                            <input
                                className="form-control"
                                name="search"
                                type="search"
                                placeholder="Search..."
                                defaultValue={search}
                                onChange={handleSearch}
                            />
                        </Col>
                    </Row>
                    This is an experimental awesome solution
                    for responsive tables with complex data.
                </CardSubtitle>

                <TableContainer
                    columns={columns}
                    data={filters}
                    customPageSizeOptions={true}
                    // isGlobalFilter={true}
                    customPageSize={20}
                    // className="custom-header-css"
                />
            </CardBody>
        </Card>
    );
};

InvoiceTable.propTypes = {
    activeTab: PropTypes.string,
    toggleTab: PropTypes.func,
    invPay: PropTypes.func,
};

export default InvoiceTable;
