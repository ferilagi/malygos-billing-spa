import React, { useEffect, useState, useRef, useMemo } from "react";
import { Head, Link, router } from "@inertiajs/react";

//Import DataTable
import DataTables from "@/Components/Common/DataTables";

import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Row,
    UncontrolledTooltip,
    Input,
    Form,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../Layouts/Partials/Breadcrumb";

import StatusModal from "./Partials/StatusModal";

const Subscription = (props) => {
    // console.log(props);

    const datas = useMemo(() => props.subs);
    // const datas = props.subs.data;
    // const links = props.subs.links;

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(datas);

    const [statusChange, setStatusChange] = useState();
    const [statusModal, setStatusModal] = useState(false);

    const columns = useMemo(
        () => [

            {
                name: "#",
                maxWidth: '20px',
                hide: 'md',
                cell: row => (
                    <>
                        {!row.img ? (
                            <div className="avatar-xs">
                                <span className="avatar-title rounded-circle">
                                    {row.name.charAt(0)}
                                </span>
                            </div>
                        ) : (
                            <div>
                                <img
                                    className="rounded-circle avatar-xs"
                                    src={row.img}
                                    alt=""
                                />
                            </div>
                        )}
                    </>
                ),
            },
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
                hide: 'md',
            },
            {
                id: "status",
                name: "STATUS",
                selector: (row) => row.status,
                sortable: true,
                button: true,
                cell: (row) => (
                    <>
                        <Button
                            type="button"
                            className="btn-sm"
                            color=
                            { row.status === "active" ?
                            "success"
                            :
                            "danger"}
                            outline
                            onClick={() => {
                                const status = row;
                                setStatusChange(status);
                                setStatusModal(true);
                            }}
                        >
                            {row.status}
                        </Button>
                    </>

                ),
            },
            {
                id: "plan",
                name: "PLAN",
                selector: (row) => row.plan,
                sortable: true,
                hide: 'md',
            },
            {
                name: "ACTION",
                button: true,
                cell: (row) => {
                    return (
                        <div style={{ textAlign: "center" }}>
                            <Link
                                href={`/subscription/${row.id}`}
                                className="text-primary"
                                // onClick={e => console.log(cellProps)}
                            >
                                <i
                                    className="bx bx-message-square-dots font-size-20"
                                    id="showSubDetail"
                                />
                                <UncontrolledTooltip
                                    placement="top"
                                    target="showSubDetail"
                                >
                                    Details
                                </UncontrolledTooltip>
                            </Link>
                        </div>
                    );
                },
            },
        ],
        []
    );

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
                        item.type
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item.status
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item.plan.toLowerCase().includes(search.toLowerCase())
                    );
                });
                setFilters(filtered);
            }
        }, 500);
        return () => clearTimeout(deBounce);
    }, [search]);

    const handleActiveEvent = () => {
        const sub_id = statusChange.id
        const sub_status = "active"

        // console.log(sub_id, sub_status)
        router.visit(route('subscription.change'), {
            method: 'post',
            data: {
                sub_id: sub_id,
                sub_status: sub_status,
            },
            replace: true,
            preserveState: false,
            preserveScroll: true,
        })
        // dispatch(onDeleteEvent(event));
        setStatusModal(false);
        setStatusChange();
    };

    const handleIsolateEvent = () => {
        const sub_id = statusChange.id
        const sub_status = "isolated"

        // console.log(sub_id, sub_status)
        router.visit(route('subscription.change'), {
            method: 'post',
            data: {
                sub_id: sub_id,
                sub_status: sub_status,
            },
            replace: true,
            preserveState: false,
            preserveScroll: true,
        })
        // dispatch(onDeleteEvent(event));
        setStatusModal(false);
        setStatusChange();
    };


    return (
        <>
            <Head title="Subscription" />

            <StatusModal
                show={statusModal}
                statusChange={statusChange}
                onActiveClick={handleActiveEvent}
                onIsolateClick={handleIsolateEvent}
                onCloseClick={() => setStatusModal(false)}
            />

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs
                        title="Subscription"
                        breadcrumbItem="Subscription"
                    />

                    <Row>
                        <Col>
                            <Link href={route('subscription.create')} className="btn btn-primary mb-3 me-2">
                                <i className="mdi mdi-plus-circle-outline me-1" />
                                New Activation
                            </Link>
                        </Col>
                        <Col>
                            <Link href={route('sync.index')} className="btn btn-primary mb-3 float-end">
                                <i className="mdi mdi-sync me-1" />
                                Router Import
                            </Link>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <Col sm={4}>
                                        <div className="search-box me-2 mb-2 d-inline-block">
                                            <div className="position-relative">
                                                <label
                                                    htmlFor="search-bar-0"
                                                    className="search-label"
                                                >
                                                    <span
                                                        id="search-bar-0-label"
                                                        className="sr-only"
                                                    >
                                                        Search this table
                                                    </span>
                                                    <input
                                                        id="search-bar-0"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder={`Search...`}
                                                        defaultValue={search}
                                                        onChange={handleSearch}
                                                    />
                                                </label>
                                                <i className="bx bx-search-alt search-icon"></i>
                                            </div>
                                        </div>
                                    </Col>

                                    {/* <TableContainer
                                        columns={columns}
                                        data={filters}
                                        customPageSizeOptions={true}
                                        // isGlobalFilter={true}
                                        // isAddUserList={true}
                                        customPageSize={20}
                                        // className="custom-header-css"
                                    /> */}

                                    <DataTables
                                        columns={columns}
                                        data={filters}
                                        pagination={true}
                                        theme="malygos"
                                        paginationPerPage={30}
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

export default Subscription;
