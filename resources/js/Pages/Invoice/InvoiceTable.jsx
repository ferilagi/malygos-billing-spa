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
    Form,
    Label,
    InputGroup,
} from "reactstrap";
import classnames from "classnames";

//Import Flatepicker
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";

import TableContainer from "../../Components/Common/TableContainer";

import { InvoiceID, Name, Total, Status, Period } from "./InvoiceCol";
import { router } from "@inertiajs/react";

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
                        :
                            <Button color="danger" outline className="btn-sm"
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
    const [period, setPeriod] = useState("");
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

    const handlePeriod = (e) => {
        e.preventDefault();
        // console.log(period)

        router.get('/invoice',{rangePeriod: period}, {
            // preserveState: true,
            replace:true,
            onSuccess: () => {
                return Promise.all([
                    setFilters(trans)
                ])
              }
        });


    };

    return (
        <Card>
            <CardBody>
                <CardSubtitle className="mb-3">
                    <Row className="mb-3">
                        <Col md={8}>
                            <Form onSubmit={handlePeriod}>
                                <Label>('translation.Date_Range')</Label>
                                <div className="form-group mb-3">
                                    <InputGroup className="input-daterange input-group">
                                        <Flatpickr
                                        name="rangePeriod"
                                        className="form-control"
                                        value={period}
                                        onChange={(e, dateStr) => setPeriod(dateStr)}
                                        options={{
                                            altInput: true,
                                            mode: "range",
                                            altFormat: "F j, Y",
                                            dateFormat: "Y-m-d",
                                        }}
                                        />
                                        <button
                                        disabled={period === ""}
                                        type="submit"
                                        className="btn btn-sm btn-primary waves-effect waves-light">
                                            <span className="bx bx-search-alt me-1"></span>
                                            Periode
                                        </button>
                                    </InputGroup>
                                </div>
                            </Form>
                        </Col>
                        <Col sm={4}>
                            <Label>('translation.Filter')</Label>
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
