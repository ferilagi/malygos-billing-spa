import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Collapse,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormFeedback,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Breadcrumb
import Breadcrumbs from "../../../Layouts/Partials/Breadcrumb";

import PppData from "./PppData";
import DatePicker from "react-flatpickr";

const PlanPPP = (props) => {
    const pprofiles = props.pprofiles;
    const routers = props.routers;

    const [pppPlan, setPppPlan] = useState();

    const [selectDate, setSelectDate] = useState();
    const dateChange = (date) => {
        setSelectDate(date);
    };

    // advance option
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    // modal create plan
    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const toggleModal = () => setModal(!modal);

    // validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            prof_id: (pppPlan && pppPlan.cust_id) || "",
            name: (pppPlan && pppPlan.name) || "",
            remoteAddress: (pppPlan && pppPlan.remoteAddress) || "",
            localAddress: (pppPlan && pppPlan.localAddress) || "",
            rateLimit: (pppPlan && pppPlan.rateLimit) || "",
            parentQueue: (pppPlan && pppPlan.parentQueue) || "",
            onlyOne: (pppPlan && pppPlan.onlyOne) || "",
            onUp: (pppPlan && pppPlan.onUp) || "",
            onDown: (pppPlan && pppPlan.onDown) || "",
            prefixQueue: (pppPlan && pppPlan.prefixQueue) || "",
            sufixQueue: (pppPlan && pppPlan.sufixQueue) || "",
            comment: (pppPlan && pppPlan.comment) || "",
            price: (pppPlan && pppPlan.price) || "",
            commission: (pppPlan && pppPlan.commission) || "0",
            spelled: (pppPlan && pppPlan.spelled) || "",
            alias: (pppPlan && pppPlan.alias) || "",
            router: (pppPlan && pppPlan.router) || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Name"),
            remoteAddress: Yup.string().required("Please Enter Remote Address"),
            rateLimit: Yup.string().required("Please Enter Rate Limit"),
            router: Yup.string().required("Please Pick Router"),
        }),
        onSubmit: (values) => {
            if (isEdit) {
                const updatePPP = {
                    prof_id: values.prof_id,
                    name: values.name,
                    remoteAddress: values.remoteAddress,
                    localAddress: values.localAddress,
                    rateLimit: values.rateLimit,
                    parentQueue: values.parentQueue,
                    onlyOne: values.onlyOne,
                    onUp: values.onUp,
                    onDown: values.onDown,
                    prefixQueue: values.prefixQueue,
                    sufixQueue: values.sufixQueue,
                    comment: values.comment,
                    price: values.price,
                    commission: values.commission,
                    spelled: values.spelled,
                    alias: values.alias,
                    router: values.router,
                };

                // update user
                // dispatch(onUpdateUser(updateCustomer));
                router.post("/plan/ppp", updatePPP, {
                    preserveState: (page) =>
                        Object.keys(page.props.errors).length,
                });
                validation.resetForm();
                setIsEdit(false);
            } else {
                const createPPP = {
                    // id: Math.floor(Math.random() * (30 - 20)) + 20,
                    name: values["name"],
                    remoteAddress: values["remoteAddress"],
                    localAddress: values["localAddress"],
                    rateLimit: values["rateLimit"],
                    parentQueue: values["parentQueue"],
                    onlyOne: values["onlyOne"],
                    onUp: values["onUp"],
                    onDown: values["onDown"],
                    prefixQueue: values["prefixQueue"],
                    sufixQueue: values["sufixQueue"],
                    comment: values["comment"],
                    price: values["price"],
                    commission: values["commission"],
                    spelled: values["spelled"],
                    alias: values["alias"],
                    router: values["router"],
                };
                // save new user
                // dispatch(onAddNewUser(newCustomer));
                router.post("/plan/ppp", createPPP, {
                    preserveState: (page) =>
                        Object.keys(page.props.errors).length,
                });
                validation.resetForm();
                toggleModal();
            }
        },
    });

    const handlePlanEdit = (pppDataEdit) => {
        const pppVal = pppDataEdit;
        setPppPlan({
            prof_id: pppVal.prof_id,
            name: pppVal.name_prof,
            remoteAddress: pppVal.remoteAddress,
            localAddress: pppVal.localAddress,
            rateLimit: pppVal.rateLimit,
            parentQueue: pppVal.parentQueue,
            onlyOne: pppVal.onlyOne,
            onUp: pppVal.onUp,
            onDown: pppVal.onDown,
            prefixQueue: pppVal.prefixQueue,
            sufixQueue: pppVal.sufixQueue,
            comment: pppVal.comment,
            price: pppVal.price,
            commission: pppVal.commission,
            spelled: pppVal.spelled,
            alias: pppVal.alias,
            router: pppVal.routers,
        });
        setIsEdit(true);
        toggleModal();
    };

    const handlePlanAdd = () => {
        setPppPlan("");
        setIsEdit(false);
        toggleModal();
    };

    return (
        <>
            <Head title="Plan" />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Plan" breadcrumbItem="PPP" />

                    {/* Modal Create / Edit Plan */}
                    <Modal
                        size="lg"
                        isOpen={modal}
                        toggle={toggleModal}
                        centered={true}
                        backdrop={"static"}
                    >
                        <ModalHeader toggle={toggleModal} tag="h4">
                            {!!isEdit ? "Edit PPP Plan" : "Create PPP Plan"}
                        </ModalHeader>
                        <ModalBody>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    validation.handleSubmit();
                                    return false;
                                }}
                            >
                                <Row form="true">
                                    <Row className="mb-3">
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="name"
                                        >
                                            Name
                                        </Label>
                                        <Col md={10}>
                                            <Input
                                                name="name"
                                                label="Profile Name"
                                                type="text"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.name || ""
                                                }
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
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="localAddress"
                                        >
                                            Local Addr
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="localAddress"
                                                label="Local Address"
                                                type="text"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values
                                                        .localAddress || ""
                                                }
                                                invalid={
                                                    validation.touched
                                                        .localAddress &&
                                                    validation.errors
                                                        .localAddress
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.localAddress &&
                                            validation.errors.localAddress ? (
                                                <FormFeedback type="invalid">
                                                    {
                                                        validation.errors
                                                            .localAddress
                                                    }
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="remoteAddress"
                                        >
                                            Remote Addr
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="remoteAddress"
                                                label="Remote Address"
                                                type="text"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values
                                                        .remoteAddress || ""
                                                }
                                                invalid={
                                                    validation.touched
                                                        .remoteAddress &&
                                                    validation.errors
                                                        .remoteAddress
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.remoteAddress &&
                                            validation.errors.remoteAddress ? (
                                                <FormFeedback type="invalid">
                                                    {
                                                        validation.errors
                                                            .remoteAddress
                                                    }
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="rateLimit"
                                        >
                                            Rate Limit
                                        </Label>
                                        <Col md={10}>
                                            <Input
                                                name="rateLimit"
                                                label="Rate Limit"
                                                placeholder="10M/10M atau 5M/5M 0/9800k 0/2000k 0/20 8 2M/2M"
                                                type="text"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values
                                                        .rateLimit || ""
                                                }
                                                invalid={
                                                    validation.touched
                                                        .rateLimit &&
                                                    validation.errors.rateLimit
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.rateLimit &&
                                            validation.errors.rateLimit ? (
                                                <FormFeedback type="invalid">
                                                    {
                                                        validation.errors
                                                            .rateLimit
                                                    }
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="parentQueue"
                                        >
                                            Parent Queue
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="parentQueue"
                                                label="Parent Queue"
                                                type="text"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values
                                                        .parentQueue || ""
                                                }
                                                invalid={
                                                    validation.touched
                                                        .parentQueue &&
                                                    validation.errors
                                                        .parentQueue
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.parentQueue &&
                                            validation.errors.parentQueue ? (
                                                <FormFeedback type="invalid">
                                                    {
                                                        validation.errors
                                                            .parentQueue
                                                    }
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="onlyOne"
                                        >
                                            Only One
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="onlyOne"
                                                label="Only One"
                                                type="select"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.onlyOne ||
                                                    ""
                                                }
                                                invalid={
                                                    validation.touched
                                                        .onlyOne &&
                                                    validation.errors.onlyOne
                                                        ? true
                                                        : false
                                                }
                                            >
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </Input>
                                            {validation.touched.onlyOne &&
                                            validation.errors.onlyOne ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.onlyOne}
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="onUp"
                                        >
                                            Script On Up
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="onUp"
                                                label="On Up"
                                                type="text"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.onUp || ""
                                                }
                                                invalid={
                                                    validation.touched.onUp &&
                                                    validation.errors.onUp
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.onUp &&
                                            validation.errors.onUp ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.onUp}
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="onDown"
                                        >
                                            Script On Down
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="onDown"
                                                label="On Down"
                                                type="text"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.onDown ||
                                                    ""
                                                }
                                                invalid={
                                                    validation.touched.onDown &&
                                                    validation.errors.onDown
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.onDown &&
                                            validation.errors.onDown ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.onDown}
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="prefixQueue"
                                        >
                                            Prefix Queue
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="prefixQueue"
                                                label="Prefix Queue"
                                                type="text"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values
                                                        .prefixQueue || ""
                                                }
                                                invalid={
                                                    validation.touched
                                                        .prefixQueue &&
                                                    validation.errors
                                                        .prefixQueue
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.prefixQueue &&
                                            validation.errors.prefixQueue ? (
                                                <FormFeedback type="invalid">
                                                    {
                                                        validation.errors
                                                            .prefixQueue
                                                    }
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="sufixQueue"
                                        >
                                            Sufix Queue
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="sufixQueue"
                                                label="Sufix Queue"
                                                type="text"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values
                                                        .sufixQueue || ""
                                                }
                                                invalid={
                                                    validation.touched
                                                        .sufixQueue &&
                                                    validation.errors.sufixQueue
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.sufixQueue &&
                                            validation.errors.sufixQueue ? (
                                                <FormFeedback type="invalid">
                                                    {
                                                        validation.errors
                                                            .sufixQueue
                                                    }
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="price"
                                        >
                                            Price
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="price"
                                                label="Price"
                                                type="number"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.price ||
                                                    ""
                                                }
                                                invalid={
                                                    validation.touched.price &&
                                                    validation.errors.price
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.price &&
                                            validation.errors.price ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.price}
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="commission"
                                        >
                                            Commission
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="commission"
                                                label="Commission"
                                                type="number"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values
                                                        .commission || ""
                                                }
                                                invalid={
                                                    validation.touched
                                                        .commission &&
                                                    validation.errors.commission
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.commission &&
                                            validation.errors.commission ? (
                                                <FormFeedback type="invalid">
                                                    {
                                                        validation.errors
                                                            .commission
                                                    }
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="spelled"
                                        >
                                            Spelled
                                        </Label>
                                        <Col md={10}>
                                            <Input
                                                name="spelled"
                                                label="Spelled"
                                                type="text"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.spelled ||
                                                    ""
                                                }
                                                invalid={
                                                    validation.touched
                                                        .spelled &&
                                                    validation.errors.spelled
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.spelled &&
                                            validation.errors.spelled ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.spelled}
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="alias"
                                        >
                                            Alias
                                        </Label>
                                        <Col md={10}>
                                            <Input
                                                name="alias"
                                                label="Alias"
                                                type="text"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.alias ||
                                                    ""
                                                }
                                                invalid={
                                                    validation.touched.alias &&
                                                    validation.errors.alias
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.alias &&
                                            validation.errors.alias ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.alias}
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="router"
                                        >
                                            Router
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="router"
                                                label="Router"
                                                type="select"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.router ||
                                                    ""
                                                }
                                                invalid={
                                                    validation.touched.router &&
                                                    validation.errors.router
                                                        ? true
                                                        : false
                                                }
                                            >
                                                <option value=""></option>
                                                {routers.map((mkt) => (
                                                    <option
                                                        key={mkt.id}
                                                        value={mkt.name}
                                                    >
                                                        {mkt.name}
                                                    </option>
                                                ))}
                                            </Input>
                                            {validation.touched.router &&
                                            validation.errors.router ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.router}
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="comment"
                                        >
                                            Comment
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="comment"
                                                label="Comment"
                                                type="text"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.comment ||
                                                    ""
                                                }
                                                invalid={
                                                    validation.touched
                                                        .comment &&
                                                    validation.errors.comment
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.comment &&
                                            validation.errors.comment ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.comment}
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
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

                    <Row>
                        <Col lg={12}>
                            <Card className="ppp-plan">
                                <CardBody>
                                    <Row className="g-3">
                                        <Col xxl={4} lg={6}>
                                            <div className="position-relative">
                                                <div id="datepicker1">
                                                    <DatePicker
                                                        className="form-control"
                                                        selected={selectDate}
                                                        onChange={dateChange}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={4} lg={6}>
                                            <div className="position-relative h-100 hstack gap-3">
                                                <a
                                                    href="#"
                                                    onClick={toggle}
                                                    className="btn btn-secondary h-100 w-100"
                                                >
                                                    <i className="bx bx-filter-alt align-middle"></i>{" "}
                                                    Advance Options
                                                </a>
                                            </div>
                                        </Col>

                                        <Collapse
                                            isOpen={isOpen}
                                            id="collapseExample"
                                        >
                                            <div>
                                                <Row className="g-3">
                                                    <Col xxl={4} lg={6}>
                                                        <div>
                                                            <Label
                                                                htmlFor="experience"
                                                                className="form-label fw-semibold"
                                                            >
                                                                Experience
                                                            </Label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <Input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="inlineCheckbox1"
                                                                value="option1"
                                                            />
                                                            <Label
                                                                className="form-check-label"
                                                                htmlFor="inlineCheckbox1"
                                                            >
                                                                All
                                                            </Label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <Input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="inlineCheckbox2"
                                                                value="option1"
                                                            />
                                                            <Label
                                                                className="form-check-label"
                                                                htmlFor="inlineCheckbox2"
                                                            >
                                                                Fresher
                                                            </Label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <Input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="inlineCheckbox3"
                                                                value="option2"
                                                            />
                                                            <Label
                                                                className="form-check-label"
                                                                htmlFor="inlineCheckbox3"
                                                            >
                                                                1-2
                                                            </Label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <Input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="inlineCheckbox4"
                                                                value="option2"
                                                            />
                                                            <Label
                                                                className="form-check-label"
                                                                htmlFor="inlineCheckbox4"
                                                            >
                                                                2-3
                                                            </Label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <Input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="inlineCheckbox5"
                                                                value="option3"
                                                            />
                                                            <Label
                                                                className="form-check-label"
                                                                htmlFor="inlineCheckbox5"
                                                            >
                                                                4+
                                                            </Label>
                                                        </div>
                                                    </Col>
                                                    <Col xxl={4} lg={6}>
                                                        <div>
                                                            <Label
                                                                htmlFor="jobType"
                                                                className="form-label fw-semibold"
                                                            >
                                                                Job Type
                                                            </Label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <Input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="inlineCheckbox6"
                                                                value="option3"
                                                            />
                                                            <Label
                                                                className="form-check-label"
                                                                htmlFor="inlineCheckbox6"
                                                            >
                                                                Full Time
                                                            </Label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <Input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="inlineCheckbox7"
                                                                value="option3"
                                                            />
                                                            <Label
                                                                className="form-check-label"
                                                                htmlFor="inlineCheckbox7"
                                                            >
                                                                Part Time
                                                            </Label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <Input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="inlineCheckbox8"
                                                                value="option3"
                                                            />
                                                            <Label
                                                                className="form-check-label"
                                                                htmlFor="inlineCheckbox8"
                                                            >
                                                                Freelance
                                                            </Label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <Input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="inlineCheckbox9"
                                                                value="option3"
                                                            />
                                                            <Label
                                                                className="form-check-label"
                                                                htmlFor="inlineCheckbox9"
                                                            >
                                                                Internship
                                                            </Label>
                                                        </div>
                                                    </Col>
                                                    <Col xxl={4} lg={4}>
                                                        <div className="position-relative">
                                                            <Link
                                                                href={route(
                                                                    "ppp.sync"
                                                                )}
                                                                className="btn btn-info h-100 w-100"
                                                            >
                                                                <i className="bx bx-server align-middle"></i>
                                                                {"  "}
                                                                Import From
                                                                Router
                                                            </Link>
                                                        </div>
                                                    </Col>
                                                    <Col xxl={4} lg={4}>
                                                        <div className="position-relative">
                                                            <a
                                                                type="button"
                                                                className="btn btn-primary h-100 w-100"
                                                                onClick={() =>
                                                                    handlePlanAdd()
                                                                }
                                                            >
                                                                <i className="bx bx-server align-middle"></i>
                                                                {"  "}
                                                                Add New Plan
                                                            </a>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Collapse>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <PppData
                        pprofiles={pprofiles}
                        handlePlanEdit={handlePlanEdit}
                    />
                </Container>
            </div>
        </>
    );
};

export default PlanPPP;
