import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Collapse,
    Table,
    Input,
    CardTitle,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Label,
    Button,
    FormFeedback,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../Layouts/Partials/Breadcrumb";

const Mikrotik = (props) => {

    const routers = props.routers
    const [routerModal, setRouterModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        mkt_id : "",
        name: "",
        ip_addr: "",
        port: "",
        user: "",
        pass: "",
        description: "",
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name, event.target.value
        );
    };

    const handleAddRouter = (e) => {
        e.preventDefault();
        setIsEdit(false);
        toggle();
    };

    const handleEditRouter = (router) => {
        setIsEdit(true);
        setData({
            mkt_id: router.id,
            name: router.name,
            ip_addr: router.ip_addr,
            port: router.port,
            user: router.user,
            pass: router.pass,
            description: router.description,
        });
        toggle();
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            setData(
                e.target.name, e.target.value
            );
        }
        console.log(data)
        post(route('mikrotik.store'));
        reset();
        toggle();
    };

    /**
   * Handling the modal state
   */
    const toggle = () => {
        if (routerModal) {
          setRouterModal(false);
          reset();
        } else {
            setRouterModal(true);
        }
      };


    return (
        <>
            <Head title="Setting" />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Setting" breadcrumbItem="Mikrotik" />

                    <Row>
                        <Col lx="8">
                            <Card>
                                <CardBody>
                                    <Row className="mb-4">
                                        <Col md="6">
                                            <Link
                                                to="/ecommerce-products"
                                                className="btn btn-secondary"
                                            >
                                                <i className="mdi mdi-arrow-left me-1" />{" "}
                                                Back{" "}
                                            </Link>
                                        </Col>
                                        <Col md="6">
                                            <div className="text-sm-end mt-2 mt-sm-0">
                                                <button
                                                    className="btn btn-success"
                                                    onClick={handleAddRouter}
                                                >
                                                    <i className="mdi mdi-cart-arrow-right me-1" />{" "}
                                                    Add Router{" "}
                                                </button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="table-responsive">
                                        <Table className="table align-middle mb-0 table-nowrap">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Name</th>
                                                    <th>IP Address</th>
                                                    <th>Description</th>
                                                    <th>Active</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {routers.map(router => (
                                                <tr key={router.id}>
                                                <td>
                                                    <h5 className="font-size-14 text-truncate">
                                                    <Link
                                                        href={"/setting/mikrotik/" + router.id}
                                                        className="text-dark"
                                                    >
                                                        {router.name}
                                                    </Link>
                                                    </h5>
                                                    <p className="mb-0">
                                                    Port :{" "}
                                                    <span className="fw-medium">
                                                        {router.port}
                                                    </span>
                                                    </p>
                                                </td>
                                                <td>{router.ip_addr}</td>
                                                <td><div className="text-truncate">{router.description}</div></td>
                                                <td>$ {router.is_active}</td>
                                                <td>
                                                    <a
                                                    to="#"
                                                    onClick={() => handleEditRouter(router)}
                                                    className="action-icon text-info"
                                                    >
                                                    {" "}
                                                    <i className="mdi mdi-circle-edit-outline font-size-18" />
                                                    </a>
                                                </td>
                                                </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* New/Edit event modal */}
                            <Modal
                                isOpen={routerModal}
                                centered
                            >
                                <ModalHeader toggle={toggle} tag="h5" className="py-3 px-4 border-bottom-0">
                                {!!isEdit ? "Edit Mikrotik" : "Add Mikrotik"}
                                </ModalHeader>
                                <ModalBody className="p-4">
                                <Form onSubmit={submit}
                                >
                                <Row>
                                    <Col className="col-12">
                                        <div className="mb-3">
                                        <Label className="form-label">Name</Label>
                                        <Input
                                            name="name"
                                            type="text"
                                            // value={event ? event.title : ""}
                                            value={data.name}
                                            onChange={onHandleChange}
                                            autoComplete="name"
                                        />
                                        {errors.name ? (
                                            <FormFeedback type="invalid">{errors.name}</FormFeedback>
                                        ) : null}
                                        </div>
                                    </Col>
                                    <Col className="col-6">
                                        <div className="mb-3">
                                        <Label className="form-label">IP Address</Label>
                                        <Input
                                            name="ip_addr"
                                            type="text"
                                            // value={event ? event.title : ""}
                                            value={data.ip_addr}
                                            onChange={onHandleChange}
                                            autoComplete="ip_addr"
                                        />
                                        {errors.ip_addr ? (
                                            <FormFeedback type="invalid">{errors.ip_addr}</FormFeedback>
                                        ) : null}
                                        </div>
                                    </Col>
                                    <Col className="col-6">
                                        <div className="mb-3">
                                        <Label className="form-label">Port API</Label>
                                        <Input
                                            name="port"
                                            type="text"
                                            // value={event ? event.title : ""}
                                            value={data.port}
                                            onChange={onHandleChange}
                                            autoComplete="port"
                                        />
                                        {errors.port ? (
                                            <FormFeedback type="invalid">{errors.port}</FormFeedback>
                                        ) : null}
                                        </div>
                                    </Col>
                                    <Col className="col-6">
                                        <div className="mb-3">
                                        <Label className="form-label">Username</Label>
                                        <Input
                                            name="user"
                                            type="text"
                                            // value={event ? event.title : ""}
                                            value={data.user}
                                            onChange={onHandleChange}
                                            autoComplete="user"
                                        />
                                        {errors.user ? (
                                            <FormFeedback type="invalid">{errors.user}</FormFeedback>
                                        ) : null}
                                        </div>
                                    </Col>
                                    <Col className="col-6">
                                        <div className="mb-3">
                                        <Label className="form-label">Password</Label>
                                        <Input
                                            name="pass"
                                            type="text"
                                            // value={event ? event.title : ""}
                                            value={data.pass}
                                            onChange={onHandleChange}
                                            autoComplete="pass"
                                        />
                                        {errors.pass ? (
                                            <FormFeedback type="invalid">{errors.pass}</FormFeedback>
                                        ) : null}
                                        </div>
                                    </Col>
                                    <Col className="col-12">
                                        <div className="mb-3">
                                        <Label className="form-label">Description</Label>
                                        <Input
                                            name="description"
                                            type="textarea"
                                            // value={event ? event.title : ""}
                                            value={data.description}
                                            onChange={onHandleChange}
                                            autoComplete="description"
                                        />
                                        {errors.description ? (
                                            <FormFeedback type="invalid">{errors.description}</FormFeedback>
                                        ) : null}
                                        </div>
                                    </Col>
                                </Row>

                                    <Row className="mt-2">
                                    <Col className="col-6">
                                        {!!isEdit && (
                                        <button
                                            type="button"
                                            className="btn btn-danger me-2"
                                            onClick={() => setDeleteModal(true)}
                                        >
                                            Delete
                                        </button>
                                        )}
                                    </Col>
                                    <Col className="col-6 text-end">
                                        <button
                                        type="button"
                                        className="btn btn-light me-2"
                                        onClick={toggle}
                                        >
                                        Close
                                        </button>
                                        <button type="submit"
                                        className="btn btn-success"
                                        id="btn-save-event"
                                        disabled={processing}
                                        >
                                        Save
                                        </button>
                                    </Col>
                                    </Row>
                                </Form>
                                </ModalBody>
                            </Modal>

                        </Col>
                        <Col xl="4">
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">
                                        Card Details
                                    </CardTitle>

                                    <div className="card bg-primary text-white visa-card mb-0">
                                        <CardBody>
                                            <div>
                                                <i className="bx bxl-visa visa-pattern" />

                                                <div className="float-end">
                                                    <i className="bx bxl-visa visa-logo display-3" />
                                                </div>

                                                <div>
                                                    <i
                                                        className="bx bx-chip h1 text-warning"
                                                        style={{
                                                            lineHeight: 1,
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <Row className="mt-5">
                                                <Col xs="4">
                                                    <p>
                                                        <i className="fas fa-star-of-life m-1" />
                                                        <i className="fas fa-star-of-life m-1" />
                                                        <i className="fas fa-star-of-life m-1" />
                                                    </p>
                                                </Col>
                                                <Col xs="4">
                                                    <p>
                                                        <i className="fas fa-star-of-life m-1" />
                                                        <i className="fas fa-star-of-life m-1" />
                                                        <i className="fas fa-star-of-life m-1" />
                                                    </p>
                                                </Col>
                                                <Col xs="4">
                                                    <p>
                                                        <i className="fas fa-star-of-life m-1" />
                                                        <i className="fas fa-star-of-life m-1" />
                                                        <i className="fas fa-star-of-life m-1" />
                                                    </p>
                                                </Col>
                                            </Row>

                                            <div className="mt-5">
                                                <h5 className="text-white float-end mb-0">
                                                    12/22
                                                </h5>
                                                <h5 className="text-white mb-0">
                                                    Fredrick Taylor
                                                </h5>
                                            </div>
                                        </CardBody>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-3">
                                        Order Summary
                                    </CardTitle>

                                    <div className="table-responsive">
                                        <Table className="table mb-0">
                                            <tbody>
                                                <tr>
                                                    <td>Grand Total :</td>
                                                    <td>$ 1,857</td>
                                                </tr>
                                                <tr>
                                                    <td>Discount : </td>
                                                    <td>- $ 157</td>
                                                </tr>
                                                <tr>
                                                    <td>Shipping Charge :</td>
                                                    <td>$ 25</td>
                                                </tr>
                                                <tr>
                                                    <td>Estimated Tax : </td>
                                                    <td>$ 19.22</td>
                                                </tr>
                                                <tr>
                                                    <th>Total :</th>
                                                    <th>$ 1744.22</th>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Mikrotik;
