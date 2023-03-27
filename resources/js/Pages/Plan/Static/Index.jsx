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

import StaticData from "./StaticData";
import DatePicker from "react-flatpickr";

const PlanPPP = (props) => {
    const sprofiles = props.sprofiles;
    const routers = props.routers;

    const [staticPlan, setStaticPlan] = useState();

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
            prof_id: (staticPlan && staticPlan.cust_id) || "",
            name: (staticPlan && staticPlan.name) || "",
            ipRange: (staticPlan && staticPlan.ipRange) || "",
            netmask: (staticPlan && staticPlan.netmask) || "24",
            limitAt: (staticPlan && staticPlan.limitAt) || "",
            rateLimit: (staticPlan && staticPlan.rateLimit) || "",
            burstLimit: (staticPlan && staticPlan.burstLimit) || "",
            burstThres: (staticPlan && staticPlan.burstThres) || "",
            burstTime: (staticPlan && staticPlan.burstTime) || "",
            priority: (staticPlan && staticPlan.priority) || "8",
            parentQueue: (staticPlan && staticPlan.parentQueue) || "",
            prefixQueue: (staticPlan && staticPlan.prefixQueue) || "",
            sufixQueue: (staticPlan && staticPlan.sufixQueue) || "",
            comment: (staticPlan && staticPlan.comment) || "",
            price: (staticPlan && staticPlan.price) || "",
            commission: (staticPlan && staticPlan.commission) || "0",
            spelled: (staticPlan && staticPlan.spelled) || "",
            alias: (staticPlan && staticPlan.alias) || "",
            router: (staticPlan && staticPlan.router) || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Name"),
            ipRange: Yup.string().required("Please Enter Ip Range"),
            netmask: Yup.string().required("Please Enter NetMask"),
            rateLimit: Yup.string().required("Please Enter Rate Limit"),
            router: Yup.string().required("Please Pick Router"),
        }),
        onSubmit: (values) => {
            if (isEdit) {
                const updateStatic = {
                    prof_id: values.prof_id,
                    name: values.name,
                    ipRange: values.ipRange,
                    netmask: values.netmask,
                    limitAt: values.limitAt,
                    rateLimit: values.rateLimit,
                    burstLimit: values.burstLimit,
                    burstThres: values.burstThres,
                    burstTime: values.burstTime,
                    priority: values.priority,
                    parentQueue: values.parentQueue,
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
                router.post("/plan/static", updateStatic, {
                    preserveState: (page) =>
                        Object.keys(page.props.errors).length,
                });
                validation.resetForm();
                setIsEdit(false);
                toggleModal();
            } else {
                const createStatic = {
                    // id: Math.floor(Math.random() * (30 - 20)) + 20,
                    name: values["name"],
                    ipRange: values["ipRange"],
                    netmask: values["netmask"],
                    limitAt: values["limitAt"],
                    rateLimit: values["rateLimit"],
                    burstLimit: values["burstLimit"],
                    burstThres: values["burstThres"],
                    burstTime: values["burstTime"],
                    priority: values["priority"],
                    parentQueue: values["parentQueue"],
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
                router.post("/plan/static", createStatic, {
                    preserveState: (page) =>
                        Object.keys(page.props.errors).length,
                });
                validation.resetForm();
                toggleModal();
            }
        },
    });

    const handlePlanEdit = (staticDataEdit) => {
        const staticVal = staticDataEdit;
        setStaticPlan({
            prof_id: staticVal.prof_id,
            name: staticVal.name_prof,
            ipRange: staticVal.ip_range,
            netmask: staticVal.netmask,
            limitAt: staticVal.limitAt,
            rateLimit: staticVal.rateLimit,
            burstLimit: staticVal.burstLimit,
            burstThres: staticVal.burstThres,
            burstTime: staticVal.burstTime,
            priority: staticVal.priority,
            parentQueue: staticVal.parentQueue,
            prefixQueue: staticVal.prefixQueue,
            sufixQueue: staticVal.sufixQueue,
            comment: staticVal.comment,
            price: staticVal.price,
            commission: staticVal.commission,
            spelled: staticVal.spelled,
            alias: staticVal.alias,
            router: staticVal.routers,
        });
        setIsEdit(true);
        toggleModal();
    };

    const handlePlanAdd = () => {
        setStaticPlan("");
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
                            {!!isEdit
                                ? "Edit Static Plan"
                                : "Create Static Plan"}
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
                                            htmlFor="ipRange"
                                        >
                                            IP Range
                                        </Label>
                                        <Col md={6}>
                                            <Input
                                                name="ipRange"
                                                label="IP Range"
                                                type="text"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.ipRange ||
                                                    ""
                                                }
                                                invalid={
                                                    validation.touched
                                                        .ipRange &&
                                                    validation.errors.ipRange
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.ipRange &&
                                            validation.errors.ipRange ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.ipRange}
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="netmask"
                                        >
                                            Netmask /
                                        </Label>
                                        <Col md={2}>
                                            <Input
                                                name="netmask"
                                                label="Netmask"
                                                type="number"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.netmask ||
                                                    ""
                                                }
                                                invalid={
                                                    validation.touched
                                                        .netmask &&
                                                    validation.errors.netmask
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.netmask &&
                                            validation.errors.netmask ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.netmask}
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="limitAt"
                                        >
                                            Limit At
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="limitAt"
                                                label="Limit At"
                                                type="text"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.limitAt ||
                                                    ""
                                                }
                                                invalid={
                                                    validation.touched
                                                        .limitAt &&
                                                    validation.errors.limitAt
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.limitAt &&
                                            validation.errors.limitAt ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.limitAt}
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="rateLimit"
                                        >
                                            Rate Limit
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="rateLimit"
                                                label="Rate Limit"
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
                                            htmlFor="burstLimit"
                                        >
                                            Burst Limit
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="burstLimit"
                                                label="Burst Limit"
                                                type="text"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values
                                                        .burstLimit || ""
                                                }
                                                invalid={
                                                    validation.touched
                                                        .burstLimit &&
                                                    validation.errors.burstLimit
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.burstLimit &&
                                            validation.errors.burstLimit ? (
                                                <FormFeedback type="invalid">
                                                    {
                                                        validation.errors
                                                            .burstLimit
                                                    }
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="burstThres"
                                        >
                                            Burst Threshold
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="burstThres"
                                                label="Burst Threshold"
                                                type="text"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values
                                                        .burstThres || ""
                                                }
                                                invalid={
                                                    validation.touched
                                                        .burstThres &&
                                                    validation.errors.burstThres
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.burstThres &&
                                            validation.errors.burstThres ? (
                                                <FormFeedback type="invalid">
                                                    {
                                                        validation.errors
                                                            .burstThres
                                                    }
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="burstTime"
                                        >
                                            Burst Time
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="burstTime"
                                                label="Burst Time"
                                                type="text"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values
                                                        .burstTime || ""
                                                }
                                                invalid={
                                                    validation.touched
                                                        .burstTime &&
                                                    validation.errors.burstTime
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.burstTime &&
                                            validation.errors.burstTime ? (
                                                <FormFeedback type="invalid">
                                                    {
                                                        validation.errors
                                                            .burstTime
                                                    }
                                                </FormFeedback>
                                            ) : null}
                                        </Col>
                                        <Label
                                            className="col-md-2 col-form-label"
                                            htmlFor="priority"
                                        >
                                            Priority
                                        </Label>
                                        <Col md={4}>
                                            <Input
                                                name="priority"
                                                label="Priority"
                                                type="number"
                                                onChange={
                                                    validation.handleChange
                                                }
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values
                                                        .priority || ""
                                                }
                                                invalid={
                                                    validation.touched
                                                        .priority &&
                                                    validation.errors.priority
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {validation.touched.priority &&
                                            validation.errors.priority ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.priority}
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
                                                                disabled={true}
                                                                href="#"
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

                    <StaticData
                        sprofiles={sprofiles}
                        handlePlanEdit={handlePlanEdit}
                    />
                </Container>
            </div>
        </>
    );
};

export default PlanPPP;
