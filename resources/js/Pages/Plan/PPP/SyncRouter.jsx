import React, { useEffect, useState } from "react";
import NProgress from 'nprogress'
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
    Table,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    UncontrolledTooltip,
} from "reactstrap";



//Import Breadcrumb
import Breadcrumbs from "../../../Layouts/Partials/Breadcrumb";

import migo from "../../../../assets/images/companies/img-4.png";

const PlanPPPSync = (props) => {

    const profiles = Object.values(props.profiles);
    const routers = props.routers;

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    // const [router, setRouter] = useState(props.router);
    const [mikrotik, setMikrotik] = useState('')
    const [filters, setFilters] = useState(profiles)

    useEffect(() =>{
        setFilters([])
    }, [mikrotik])

    const handleSync = async (e) => {
        e.preventDefault();
        // console.log(mikrotik)

        if (mikrotik === "") {
            return
        }

        router.get('/plan/ppp-sync', {router: mikrotik}, {
            preserveState: true,
            replace:true,
            onSuccess: () => {
                return Promise.all([
                    setFilters(profiles)
                ])
              }
        });

    };

    const handleSaveSync = async (e) => {
        const data = ({
            router: mikrotik,
            name: e['name'],
            localAddress: e['local-address'],
            remoteAddress: e['remote-address'],
            rateLimit: e['rate-limit'],
            parentQueue: e['parent-queue'],
            onlyOne: e['only-one']
        });
        console.log(data);
        router.post(route('ppp.store'), data, {
            onProgress: progress => {
                if (NProgress.isStarted() && progress.percentage) {
                    NProgress.set((progress.percentage / 100) * 0.9)
                  }
            },
        });
    };


    return (
        <>
            <Head title="Plan" />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Plan" breadcrumbItem="PPP Import" />

                    <Row>
                        <Col lg={12}>
                            <Card className="job-filter">
                                <CardBody>
                                    <Row className="g-3">
                                    <Form onSubmit={handleSync}>
                                        <Row>
                                            <Col xxl={2} lg={4}>
                                                <div>
                                                <select
                                                className="form-select"
                                                name="router"
                                                onChange={(e) => setMikrotik(e.target.value)}
                                                >
                                                    <option value="">Select</option>
                                                    {routers.map( router => (
                                                    <option key={router.name} value={router.name}>
                                                        {router.name}
                                                    </option>
                                                    ))}
                                                </select>
                                                </div>
                                            </Col>

                                            <Col xxl={2} lg={8}>
                                                <div className="float-end">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary ms-3"
                                                    >
                                                        <i className="bx bx-search-alt align-middle"></i>{" "}
                                                        Import Profile
                                                    </button>
                                                    <a
                                                        href="#"
                                                        onClick={toggle}
                                                        className="btn btn-secondary ms-3"
                                                    >
                                                        <i className="bx bx-filter-alt align-middle"></i>{" "}
                                                        Advance
                                                    </a>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>

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
                                                            <Label
                                                                htmlFor="qualificationInput"
                                                                className="form-label fw-semibold"
                                                            >
                                                                Qualification
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                className="form-control"
                                                                id="qualificationInput"
                                                                autoComplete="off"
                                                                placeholder="Qualification"
                                                            />
                                                            <i className="ri-government-line filter-icon"></i>
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

                    <Row>
                        <Col lg="12">
                        <div className="">
                            <div className="table-responsive">
                            <Table className="project-list-table table-nowrap align-middle table-borderless">
                                <thead>
                                <tr>
                                    <th scope="col" style={{ width: "100px" }}>
                                    #
                                    </th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Local Address</th>
                                    <th scope="col">Remote Address</th>
                                    <th scope="col">Rate Limit</th>
                                    <th scope="col">Rate Limit</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filters.map((item, key) => (
                                    <tr key={key}>
                                    <td><img src={migo} alt="" className="avatar-sm" /></td>
                                    <td>
                                        <h5 className="text-truncate font-size-14"><Link to="" className="text-dark">{item.name}</Link></h5>
                                        <p className="text-muted mb-0">{item['parent-queue']} </p>
                                    </td>
                                    <td>{item['local-address']}</td>
                                    <td>{item['remote-address']}</td>
                                    <td><span className={"badge bg-primary"}>{item.comment}</span></td>
                                    <td>{item['rate-limit']}</td>
                                    <td>
                                        <div style={{ textAlign: "center" }}>
                                            <a
                                                to="#"
                                                className="text-success"
                                                onClick={() => handleSaveSync(item)}
                                                // onClick={e => console.log(cellProps)}
                                            >
                                                <i
                                                    className="mdi mdi-content-save font-size-20"
                                                    id="saveSyncTips"
                                                />
                                                <UncontrolledTooltip
                                                    placement="left"
                                                    target="saveSyncTips"
                                                >
                                                    Import to Database
                                                </UncontrolledTooltip>
                                            </a>
                                        </div>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            </div>
                        </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default PlanPPPSync;
