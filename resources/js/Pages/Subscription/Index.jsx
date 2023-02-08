import React, { useEffect, useState, useRef, useMemo } from "react";
import { Head, Link } from "@inertiajs/react";

import TableContainer from "../../Components/Common/TableContainer";
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    FormFeedback,
    UncontrolledTooltip,
    Input,
    Form,
    Pagination,
    PaginationItem,
    PaginationLink,
} from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";

import { Name, Email, Status, Tags, Projects, Img } from "./SubscriptionCol";

//Import Breadcrumb
import Breadcrumbs from "../../Layouts/Partials/Breadcrumb";
import DeleteModal from "../../Components/Common/DeleteModal";

import {
    getUsers as onGetUsers,
    addNewUser as onAddNewUser,
    updateUser as onUpdateUser,
    deleteUser as onDeleteUser,
} from "../../store/contacts/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";

const Subscribtion = (props) => {
    // console.log(props);

    const dispatch = useDispatch();
    const [contact, setContact] = useState();
    // validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: (contact && contact.name) || "",
            designation: (contact && contact.designation) || "",
            tags: (contact && contact.tags) || "",
            email: (contact && contact.email) || "",
            projects: (contact && contact.projects) || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Your Name"),
            designation: Yup.string().required("Please Enter Your Designation"),
            tags: Yup.array().required("Please Enter Tag"),
            email: Yup.string().required("Please Enter Your Email"),
            projects: Yup.number().required("Please Enter Your Project"),
        }),
        onSubmit: (values) => {
            if (isEdit) {
                const updateUser = {
                    id: contact.id,
                    name: values.name,
                    designation: values.designation,
                    tags: values.tags,
                    email: values.email,
                    projects: values.projects,
                };

                // update user
                dispatch(onUpdateUser(updateUser));
                validation.resetForm();
                setIsEdit(false);
            } else {
                const newUser = {
                    name: values["name"],
                    designation: values["designation"],
                    email: values["email"],
                    tags: values["tags"],
                    projects: values["projects"],
                };
                // save new user
                dispatch(onAddNewUser(newUser));
                validation.resetForm();
            }
            toggle();
        },
    });

    const datas = props.subs;
    // const datas = props.subs.data;
    // const links = props.subs.links;

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(datas);

    const [subsList, setSubsList] = useState([]);
    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const columns = useMemo(
        () => [
            {
                Header: "#",
                Cell: () => {
                    return (
                        <input type="checkbox" className="form-check-input" />
                    );
                },
            },
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
                    return <Status {...cellProps} />;
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
                    );
                },
            },
        ],
        []
    );

    // useEffect(() => {
    //   if (users && !users.length) {
    //     dispatch(onGetUsers());
    //     setIsEdit(false);
    //   }
    // }, [dispatch, users]);

    // useEffect(() => {
    //   setContact(users);
    //   setIsEdit(false);
    // }, [users]);

    // useEffect(() => {
    //   if (!isEmpty(users) && !!isEdit) {
    //     setContact(users);
    //     setIsEdit(false);
    //   }
    // }, [users]);

    const toggle = () => {
        setModal(!modal);
    };

    const handleUserClick = (arg) => {
        const subs = arg;

        setContact({
            id: subs.id,
            name: subs.name,
            designation: subs.designation,
            email: subs.email,
            tags: subs.tags,
            projects: subs.projects,
        });
        setIsEdit(true);

        toggle();
    };

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

    //delete customer
    const [deleteModal, setDeleteModal] = useState(false);

    const onClickDelete = (users) => {
        setContact(users);
        setDeleteModal(true);
    };

    const handleDeleteUser = () => {
        dispatch(onDeleteUser(contact));
        onPaginationPageChange(1);
        setDeleteModal(false);
    };

    const handleUserClicks = () => {
        setSubsList("");
        setIsEdit(false);
        toggle();
    };

    const keyField = "id";

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

    return (
        <>
            <DeleteModal
                show={deleteModal}
                onDeleteClick={handleDeleteUser}
                onCloseClick={() => setDeleteModal(false)}
            />

            <Head title="Subscription" />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs
                        title="Subscription"
                        breadcrumbItem="Subscription"
                    />

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
                                        handleUserClick={handleUserClicks}
                                        customPageSize={20}
                                        // className="custom-header-css"
                                    />

                                    <Modal isOpen={modal} toggle={toggle}>
                                        <ModalHeader toggle={toggle} tag="h4">
                                            {!!isEdit
                                                ? "Edit User"
                                                : "Add User"}
                                        </ModalHeader>
                                        <ModalBody>
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                            >
                                                <Row form>
                                                    <Col xs={12}>
                                                        <div className="mb-3">
                                                            <Label className="form-label">
                                                                Name
                                                            </Label>
                                                            <Input
                                                                name="name"
                                                                type="text"
                                                                onChange={
                                                                    validation.handleChange
                                                                }
                                                                onBlur={
                                                                    validation.handleBlur
                                                                }
                                                                value={
                                                                    validation
                                                                        .values
                                                                        .name ||
                                                                    ""
                                                                }
                                                                invalid={
                                                                    validation
                                                                        .touched
                                                                        .name &&
                                                                    validation
                                                                        .errors
                                                                        .name
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                            {validation.touched
                                                                .name &&
                                                            validation.errors
                                                                .name ? (
                                                                <FormFeedback type="invalid">
                                                                    {
                                                                        validation
                                                                            .errors
                                                                            .name
                                                                    }
                                                                </FormFeedback>
                                                            ) : null}
                                                        </div>
                                                        <div className="mb-3">
                                                            <Label className="form-label">
                                                                Designation
                                                            </Label>
                                                            <Input
                                                                name="designation"
                                                                label="Designation"
                                                                type="text"
                                                                onChange={
                                                                    validation.handleChange
                                                                }
                                                                onBlur={
                                                                    validation.handleBlur
                                                                }
                                                                value={
                                                                    validation
                                                                        .values
                                                                        .designation ||
                                                                    ""
                                                                }
                                                                invalid={
                                                                    validation
                                                                        .touched
                                                                        .designation &&
                                                                    validation
                                                                        .errors
                                                                        .designation
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                            {validation.touched
                                                                .designation &&
                                                            validation.errors
                                                                .designation ? (
                                                                <FormFeedback type="invalid">
                                                                    {
                                                                        validation
                                                                            .errors
                                                                            .designation
                                                                    }
                                                                </FormFeedback>
                                                            ) : null}
                                                        </div>
                                                        <div className="mb-3">
                                                            <Label className="form-label">
                                                                Email
                                                            </Label>
                                                            <Input
                                                                name="email"
                                                                label="Email"
                                                                type="email"
                                                                onChange={
                                                                    validation.handleChange
                                                                }
                                                                onBlur={
                                                                    validation.handleBlur
                                                                }
                                                                value={
                                                                    validation
                                                                        .values
                                                                        .email ||
                                                                    ""
                                                                }
                                                                invalid={
                                                                    validation
                                                                        .touched
                                                                        .email &&
                                                                    validation
                                                                        .errors
                                                                        .email
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                            {validation.touched
                                                                .email &&
                                                            validation.errors
                                                                .email ? (
                                                                <FormFeedback type="invalid">
                                                                    {
                                                                        validation
                                                                            .errors
                                                                            .email
                                                                    }
                                                                </FormFeedback>
                                                            ) : null}
                                                        </div>
                                                        <div className="mb-3">
                                                            <Label className="form-label">
                                                                Option
                                                            </Label>
                                                            <Input
                                                                type="select"
                                                                name="tags"
                                                                className="form-select"
                                                                multiple={true}
                                                                onChange={
                                                                    validation.handleChange
                                                                }
                                                                onBlur={
                                                                    validation.handleBlur
                                                                }
                                                                value={
                                                                    validation
                                                                        .values
                                                                        .tags ||
                                                                    []
                                                                }
                                                                invalid={
                                                                    validation
                                                                        .touched
                                                                        .tags &&
                                                                    validation
                                                                        .errors
                                                                        .tags
                                                                        ? true
                                                                        : false
                                                                }
                                                            >
                                                                <option>
                                                                    Photoshop
                                                                </option>
                                                                <option>
                                                                    illustrator
                                                                </option>
                                                                <option>
                                                                    Html
                                                                </option>
                                                                <option>
                                                                    Php
                                                                </option>
                                                                <option>
                                                                    Java
                                                                </option>
                                                                <option>
                                                                    Python
                                                                </option>
                                                                <option>
                                                                    UI/UX
                                                                    Designer
                                                                </option>
                                                                <option>
                                                                    Ruby
                                                                </option>
                                                                <option>
                                                                    Css
                                                                </option>
                                                            </Input>
                                                            {validation.touched
                                                                .tags &&
                                                            validation.errors
                                                                .tags ? (
                                                                <FormFeedback type="invalid">
                                                                    {
                                                                        validation
                                                                            .errors
                                                                            .tags
                                                                    }
                                                                </FormFeedback>
                                                            ) : null}
                                                        </div>
                                                        <div className="mb-3">
                                                            <Label className="form-label">
                                                                Projects
                                                            </Label>
                                                            <Input
                                                                name="projects"
                                                                label="Projects"
                                                                type="text"
                                                                onChange={
                                                                    validation.handleChange
                                                                }
                                                                onBlur={
                                                                    validation.handleBlur
                                                                }
                                                                value={
                                                                    validation
                                                                        .values
                                                                        .projects ||
                                                                    ""
                                                                }
                                                                invalid={
                                                                    validation
                                                                        .touched
                                                                        .projects &&
                                                                    validation
                                                                        .errors
                                                                        .projects
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                            {validation.touched
                                                                .projects &&
                                                            validation.errors
                                                                .projects ? (
                                                                <FormFeedback type="invalid">
                                                                    {
                                                                        validation
                                                                            .errors
                                                                            .projects
                                                                    }
                                                                </FormFeedback>
                                                            ) : null}
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <div className="text-end">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-success save-user"
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </ModalBody>
                                    </Modal>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Subscribtion;
