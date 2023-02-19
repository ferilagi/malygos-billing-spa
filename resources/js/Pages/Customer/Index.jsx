import { useState, useEffect, useRef, useMemo } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";

//Import Breadcrumb
import Breadcrumbs from "../../Layouts/Partials/Breadcrumb";

import {
    Button,
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Form,
    FormFeedback,
    Input,
    Label,
    Modal,
    ModalHeader,
    ModalBody,
    UncontrolledTooltip
} from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";

import TableContainer from "../../Components/Common/TableContainer";
import { Name, Email, Status, Tags, Projects, Period, Img } from "./CustomerCol";

import DeleteModal from "../../Components/Common/DeleteModal";



const Customer = (props) => {

    const datas = props.customers;
    const [customer, setCustomer] = useState();
    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    // validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            cust_id: (customer && customer.cust_id) || "",
            name: (customer && customer.name) || "",
            phone: (customer && customer.phone) || "",
            email: (customer && customer.email) || "",
            address: (customer && customer.address) || "",
            joined_at: (customer && customer.joined_at) || "",
            lat: (customer && customer.lat) || "",
            lon: (customer && customer.lon) || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Name"),
            phone: Yup.string().required("Please Enter Phone Number"),
            email: Yup.string().required("Please Enter Email"),
            address: Yup.string().required("Please Enter Address"),
            joined_at: Yup.string().required("Please Enter Date Of Join"),
        }),
        onSubmit: values => {
        if (isEdit) {
            const updateCustomer = {
            cust_id: values.cust_id,
            name: values.name,
            phone: values.phone,
            email: values.email,
            address: values.address,
            joined_at: values.joined_at,
            lat: values.lat,
            lon: values.lon,
            };

            // update user
            // dispatch(onUpdateUser(updateCustomer));
            router.post('/customer', updateCustomer, {
                preserveState: (page) => Object.keys(page.props.errors).length,
              });
            validation.resetForm();
            setIsEdit(false);
        } else {
            const newCustomer = {
            // id: Math.floor(Math.random() * (30 - 20)) + 20,
            name: values["name"],
            phone: values["phone"],
            email: values["email"],
            address: values["address"],
            joined_at: values["joined_at"],
            lat: values["lat"],
            lon: values["lon"],
            };
            // save new user
            // dispatch(onAddNewUser(newCustomer));
            router.post('/customer', newCustomer, {
                preserveState: (page) => Object.keys(page.props.errors).length,
              });
            validation.resetForm();
            toggle();
        }
        },
    });

    const columns = useMemo(
        () => [
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
                Header: "Phone",
                accessor: "phone",
                disableFilters: true,
                filterable: true,
                Cell: (cellProps) => {
                    return <Email {...cellProps} />;
                },
            },
            {
                Header: "Address",
                accessor: "address",
                disableFilters: true,
                filterable: true,
                Cell: (cellProps) => {
                    return <Email {...cellProps} />;
                },
            },
            {
                Header: "Joined",
                accessor: "joined_at",
                disableFilters: true,
                filterable: true,
                Cell: (cellProps) => {
                    return (
                        <>
                            {" "}
                            <Period {...cellProps} />{" "}
                        </>
                    );
                },
            },
            {
                Header: "Action",
                Cell: (cellProps) => {
                    return (
                        <div className="d-flex gap-3">
                            <a
                                to="#"
                                className="text-success"
                                onClick={() => {
                                    const customerEdit = cellProps.row.original;
                                    handleCustomereEdit(customerEdit);
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
                            </a>
                            <a
                                className="text-danger"
                                onClick={() => {
                                    const customerDelete = cellProps.row.original;
                                    onClickDelete(customerDelete);
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
                            </a>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(datas);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
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

    const toggle = () => {
        setModal(!modal);
    };

    const handleCustomereEdit = arg => {
        const cust = arg;

        setCustomer({
            cust_id: cust.id,
            name: cust.name,
            phone: cust.phone,
            email: cust.email,
            address: cust.address,
            joined_at: cust.joined_at,
        });
        setIsEdit(true);

        toggle();
    };

    const handleCustomerAdd = () => {
        setCustomer("");
        setIsEdit(false);
        toggle();
      };

    var node = useRef();
    const onPaginationPageChange = page => {
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

    //delete customer
    const [deleteModal, setDeleteModal] = useState(false);

    const onClickDelete = customerDelete => {
        setCustomer(customerDelete);
        setDeleteModal(true);
    };

    const handleDeleteUser = () => {
        // dispatch(onDeleteUser(customer));
        onPaginationPageChange(1);
        setDeleteModal(false);
    };

    return (
        <>
            <Head title="Customer" />

            {/* Delete Modal */}
            <DeleteModal
                show={deleteModal}
                onDeleteClick={handleDeleteUser}
                onCloseClick={() => setDeleteModal(false)}
            />

            {/* Add / Edit Modal */}
            <Modal
            size="lg"
            isOpen={modal}
            toggle={toggle}
            centered={true}
            backdrop={'static'}
            >
                <ModalHeader toggle={toggle} tag="h4">
                    {!!isEdit ? "Edit Customer" : "Add Customer"}
                </ModalHeader>
                <ModalBody>
                    <Form
                    onSubmit={e => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}
                    >
                    <Row form="true">
                        <Row className="mb-3">
                            <Label className="col-md-2 col-form-label" htmlFor="name">Name</Label>
                            <Col md={10}>
                                <Input
                                name="name"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ""}
                                invalid={
                                    validation.touched.name &&
                                    validation.errors.name
                                    ? true
                                    : false
                                }
                                />
                                {validation.touched.name &&
                                validation.errors.name ? (
                                <FormFeedback type="invalid">
                                    {validation.errors.name}
                                </FormFeedback>
                                ) : null}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Label className="col-md-2 col-form-label" htmlFor="phone">Phone</Label>
                            <Col md={4}>
                                <Input
                                name="phone"
                                label="Phone"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.phone || ""}
                                invalid={
                                    validation.touched.phone &&
                                    validation.errors.phone
                                    ? true
                                    : false
                                }
                                />
                                {validation.touched.phone &&
                                validation.errors.phone ? (
                                <FormFeedback type="invalid">
                                    {validation.errors.phone}
                                </FormFeedback>
                                ) : null}
                            </Col>
                            <Label className="col-md-2 col-form-label" htmlFor="email">Email</Label>
                            <Col md={4}>
                                <Input
                                name="email"
                                label="email"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                    validation.touched.email &&
                                    validation.errors.email
                                    ? true
                                    : false
                                }
                                />
                                {validation.touched.email &&
                                validation.errors.email ? (
                                <FormFeedback type="invalid">
                                    {validation.errors.email}
                                </FormFeedback>
                                ) : null}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Label className="col-md-2 col-form-label" htmlFor="address">Address</Label>
                            <Col md={10}>
                                <Input
                                name="address"
                                label="Address"
                                type="textarea"
                                rows="5"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.address || ""}
                                invalid={
                                    validation.touched.address &&
                                    validation.errors.address
                                    ? true
                                    : false
                                }
                                />
                                {validation.touched.address &&
                                validation.errors.address ? (
                                <FormFeedback type="invalid">
                                    {validation.errors.address}
                                </FormFeedback>
                                ) : null}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Label className="col-md-2 col-form-label">Joined</Label>
                            <Col md={4}>
                                <Input
                                name="joined_at"
                                label="Joined"
                                type="date"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                defaultValue={validation.values.joined_at || ""}
                                invalid={
                                    validation.touched.joined_at &&
                                    validation.errors.joined_at
                                    ? true
                                    : false
                                }
                                />
                                {validation.touched.joined_at &&
                                validation.errors.joined_at ? (
                                <FormFeedback type="invalid">
                                    {validation.errors.joined_at}
                                </FormFeedback>
                                ) : null}
                            </Col>
                        </Row>
                        <Row className="mb-3">

                        </Row>
                    </Row>
                    <Row>
                        <Col>
                        <div className="text-end">
                            <button
                            type="submit"
                            className="btn btn-primary waves-effect waves-light"
                            >
                            Save
                            </button>
                        </div>
                        </Col>
                    </Row>
                    </Form>
                </ModalBody>
            </Modal>

            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Customer" breadcrumbItem="Customer" />

                    <Row>
                        <Col sm={4}>
                            <Link href="/customer/create">
                                <Button
                                    type="button"
                                    color="primary"
                                    className="btn mb-2 me-2"
                                >
                                    <i className="mdi mdi-plus-circle-outline me-1" />
                                    Go To New User Page
                                </Button>
                            </Link>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle></CardTitle>
                                    <CardSubtitle className="mb-3">
                                        <Row className="mb-3">
                                            <Col sm={8}>
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
                                            </Col>
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
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Customer;
