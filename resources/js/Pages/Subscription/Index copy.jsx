import React, { useEffect, useState, useRef, useMemo } from "react";
import { Head, Link, router } from "@inertiajs/react";

import TableContainer from "../../Components/Common/TableContainer";
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

import { Name, Email, Status, Tags, Projects, Img } from "./SubscriptionCol";

//Import Breadcrumb
import Breadcrumbs from "../../Layouts/Partials/Breadcrumb";

import { isEmpty } from "lodash";

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
            // {
            //     Header: "#",
            //     Cell: (cellProps) => {
            //         return (
            //             <>{Number(cellProps.row.id) + 1}</>
            //         );
            //     },
            // },
            {
                Header: "Img",
                // accessor: "name",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps) => (
                    <>
                        {!cellProps.img ? (
                            <div className="avatar-xs">
                                <span className="avatar-title rounded-circle">
                                    {cellProps.name.charAt(0)}
                                </span>
                            </div>
                        ) : (
                            <div>
                                <img
                                    className="rounded-circle avatar-xs"
                                    src={cellProps.img}
                                    alt=""
                                />
                            </div>
                        )}
                    </>
                ),
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
                Header: "Type",
                accessor: "type",
                disableFilters: true,
                filterable: true,
                Cell: (cellProps) => {
                    return <Email {...cellProps} />;
                },
            },
            {
                Header: "Status",
                accessor: "status",
                disableFilters: true,
                filterable: true,
                Cell: (cellProps) => {
                    return  (
                        <>
                            <Button
                                type="button"
                                className="btn-sm"
                                color=
                                { cellProps.value == "active" ?
                                "success"
                                :
                                "danger"}
                                outline
                                onClick={() => {
                                    const status = cellProps.row.original;
                                    setStatusChange(status);
                                    setStatusModal(true);}}
                            >
                                {cellProps.value}
                            </Button>
                        </>
                    )
                },
            },
            {
                Header: "Plan",
                accessor: "plan",
                disableFilters: true,
                filterable: true,
                Cell: (cellProps) => {
                    return (
                        <>
                            {" "}
                            <Projects {...cellProps} />{" "}
                        </>
                    );
                },
            },
            {
                Header: "Action",
                Cell: (cellProps) => {
                    return (
                        <div style={{ textAlign: "center" }}>
                            <Link
                                href={`/subscription/${cellProps.row.original.id}`}
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

    var node = useRef();
    const onPaginationPageChange = (page) => {
        if (
            node &&
            node.current &&
            node.current.props &&
            node.current.props.pagination &&
            node.current.props.pagination.options
        ) {
            node.current.props.pagination.options.onPageChange(page);
        }
    };

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

                                    <TableContainer
                                        columns={columns}
                                        data={filters}
                                        customPageSizeOptions={true}
                                        // isGlobalFilter={true}
                                        // isAddUserList={true}
                                        customPageSize={20}
                                        // className="custom-header-css"
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
