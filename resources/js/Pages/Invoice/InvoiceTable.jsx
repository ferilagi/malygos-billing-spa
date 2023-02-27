import React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, router } from "@inertiajs/react";
import {
    Col,
    Card,
    CardBody,
    CardSubtitle,
    Row,
    Button,
    Form,
    Label,
    InputGroup,
    Input,
} from "reactstrap";

//Import DataTable
import DataTables from "@/Components/Common/DataTables";

import { currencyFormat, formatDate } from "@/helpers/formatValue";

//Import Flatepicker
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";

const InvoiceTable = ({ trans, setPayModal, setPayInvoice }) => {

    // Table Data
    const transData = trans;

    const [search, setSearch] = useState("");
    const [period, setPeriod] = useState("");
    const [filters, setFilters] = useState(transData);

    const [selectedRows, setSelectedRows] = useState(false);
    const [toggledClearRows, setToggleClearRows] = useState(false);

    const columns = useMemo(
        () => [
            {
                id: "id",
                name: "INVOICE",
                selector: (row) => row.id,
            },
            {
                id: "name",
                name: "NAME",
                selector: (row) => row.name,
                sortable: true,
                grow: 2
            },
            {
                id: "total",
                name: "TOTAL",
                selector: (row) => row.total,
                format: (row) => currencyFormat(row.total),
                maxWidth: '150px',
                sortable: true,
                hide: 'md',
            },
            {
                id: "status",
                name: "STATUS",
                selector: (row) => row.status,
                sortable: true,
                maxWidth: '120px',
                cell: (row) =>
                (
                    row.status === "paid" ?
                            <Button color="success" outline className="btn-sm">
                                {" "}
                                <i className="bx bx-check-double font-size-12 align-middle me-2"></i>
                                {" "}{row.status}
                            </Button>
                        :
                            <Button color="danger" outline className="btn-sm"
                                onClick={() => {
                                    const invPay = row;
                                    setPayInvoice(invPay);
                                    setPayModal(true);}}
                                >
                                {" "}
                                <i className="bx bx-sad font-size-12 align-middle me-1"></i>
                                {row.status}
                            </Button>
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
                right:true
            },
            {
                id: "action",
                name: "ACTION",
                hide: 'md',
                right:true,
                cell: (row) => (
                    <>
                        <ul className="list-inline font-size-20 contact-links mb-0">
                            <li className="list-inline-item px-1">
                                <Link href={`/invoice/${row.id}`} title="@lang('translation.View_Details')"><i className="bx bx-show-alt"></i></Link>
                            </li>
                            <li className="list-inline-item px-1">
                                <a href="{{URL('invoices/pdf', $tran->invoice )}}" title="@lang('translation.Download_Invoice')"><i className="bx bx-printer"></i></a>
                            </li>
                            <li className="list-inline-item px-1">
                                <a href="{{route('invoices.edit', $tran->invoice)}}" title="@lang('translation.Receipt')"><i className="bx bx-notepad"></i></a>
                            </li>
                        </ul>
                    </>
                )
            },
        ],
        []
    );

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

	const handleChange = useCallback(state => {
        const pickId = state.selectedRows.map((cell)=> cell.id)
		setSelectedRows(pickId);
	}, []);

    const handleClearRows = () => {
        setToggleClearRows(!toggledClearRows);
    }

    const rowDisabledCriteria = row => row.status === "paid";

    useEffect(() => {
		// console.log('state', selectedRows);
	}, [selectedRows]);

    return (
        <Card>
            <CardBody>
                <CardSubtitle className="mb-3">
                    <Row className="mb-3">
                        <Col md={4}>
                            <Form onSubmit={handlePeriod}>
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

                    </Row>
                    <Row>
                        <Col md={4}>
                            <div className="form-group mb-3">
                                <InputGroup className="input-daterange input-group">
                                    <Label
                                    className="input-group-text"
                                    htmlFor="search">
                                        Search
                                    </Label>
                                    <Input
                                        className="form-control"
                                        name="search"
                                        type="search"
                                        placeholder="Search..."
                                        defaultValue={search}
                                        onChange={handleSearch}
                                    />


                                </InputGroup>
                            </div>
                        </Col>
                        <Col md={8}>
                            <Button
                            id="mass-pay"
                            type="button"
                            outline
                            className="mb-3 waves-effect waves-light float-end">
                                <span>💰</span> @lang('translation.Mass_Pay')
                            </Button>
                        </Col>
                    </Row>
                </CardSubtitle>

                <DataTables
                    columns={columns}
                    data={filters}
                    pagination={true}
                    theme="malygos"
                    paginationPerPage={30}
                    selectableRows
                    selectableRowDisabled={rowDisabledCriteria}
                    onSelectedRowsChange={handleChange}
                />
            </CardBody>
        </Card>
    );
};

export default InvoiceTable;
