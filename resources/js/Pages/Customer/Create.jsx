import { useState, useEffect, setState, useMemo } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

//Import Breadcrumb
import Breadcrumbs from "../../Layouts/Partials/Breadcrumb";

//Import DataTable
import DataTables from "@/Components/Common/DataTables";

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    UncontrolledTooltip,
} from "reactstrap";

import { formatDate, trunCate } from "../../helpers/formatValue";


const CustomerCreate = (props) => {
    const datas = props.customers;

    const columns = useMemo(
        () => [
            {
                id: "name",
                name: "NAME",
                selector: (row) => row.name,
                sortable: true,
            },
            {
                id: "phone",
                name: "PHONE",
                selector: (row) => row.phone,
                hide: 'sm',
            },
            {
                id: "address",
                name: "ADDRESS",
                selector: (row) => row.address,
                format: (row) => trunCate(row.address, 25),
                hide: 'md',
            },
            {
                id: "joined_at",
                name: "JOINED",
                selector: (row) => row.joined_at,
                format: (row) => formatDate(row.joined_at, "MMM-Y"),
                sortable: true,
                hide: 'md',
            },
            {
                name: "ACTION",
                button: true,
                cell: () => (
                    <div className="d-flex gap-3">
                        <Link
                            to="#"
                            className="text-success"
                            onClick={() => {
                                const subsData = cellProps.row.original;
                                handleUserClick(subsData);
                            }}
                        >
                            <i
                                className="mdi mdi-pencil font-size-18"
                                id="edittooltip"
                            />
                            <UncontrolledTooltip
                                placement="top"
                                target="edittooltip"
                            >
                                Edit
                            </UncontrolledTooltip>
                        </Link>
                        <Link
                            href="#"
                            className="text-danger"
                            onClick={() => {
                                const subsData = cellProps.row.original;
                                onClickDelete(subsData);
                            }}
                        >
                            <i
                                className="mdi mdi-delete font-size-18"
                                id="deletetooltip"
                            />
                            <UncontrolledTooltip
                                placement="top"
                                target="deletetooltip"
                            >
                                Delete
                            </UncontrolledTooltip>
                        </Link>
                    </div>
                ),
            },
        ],
        []
    );


    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(datas);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        e.preventDefault();
    };

    useEffect(() => {
        // fixthrottled.current(search), [search]
        const deBounce = setTimeout(() => {
            if (search == "") {
                setFilters(datas);
            } else {
                // console.log("event.target.value",event.target.value);
                let filtered = datas.filter((item) => {
                    return (
                        item.id == search ||
                        item.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item.phone
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item.address
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item.joined_at
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
        <>
            <Head title="Customer" />
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Customer" breadcrumbItem="Create" />

                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>Search</CardTitle>
                                    <CardSubtitle className="mb-3">
                                        <Row className="mb-3">
                                            <div className="col-md-4">
                                                <input
                                                    className="form-control"
                                                    name="search"
                                                    type="search"
                                                    defaultValue={search}
                                                    onChange={handleSearch}
                                                />
                                            </div>
                                        </Row>
                                        This is an experimental awesome solution
                                        for responsive tables with complex data.
                                    </CardSubtitle>

                                    <DataTables
                                        columns={columns}
                                        data={filters}
                                        pagination={true}
                                        paginationPerPage={30}
                                        theme="malygos"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default CustomerCreate;
