import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Head, Link } from "@inertiajs/react";
import { map } from "lodash";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";

// TableContainer

import { Pdate, Ddate, Name, Idno, Budget } from "./Partials/SubsDetailCol";

import TableContainer from "@/Components/Common/TableContainer";

//Import Breadcrumb
import Breadcrumb from "@/Layouts/Partials/Breadcrumb";

//Import mini card widgets
import MiniCards from "./Partials/mini-card";

//Import Images
import profile1 from "../../../assets/images/profile-img.png"

// import charts
import ApexRevenue from "./Partials/ApexRevenue";

const ContactsProfile = (props) => {

  const subProfile = props.subs;

  const trans = Object.values(props.trans);
  // eslint-disable-next-line no-unused-vars
  const [miniCards, setMiniCards] = useState([
    {
      title: "Completed Projects",
      iconClass: "bx-check-circle",
      text: "125",
    },
    { title: "Pending Projects", iconClass: "bx-hourglass", text: "12" },
    { title: "Total Revenue", iconClass: "bx-package", text: "$36,524" },
  ]);

  const columns = useMemo(
    () => [
    //   {
    //     Header: "#",
    //     accessor: "id",
    //     disableFilters: true,
    //     filterable: true,
    //     Cell: (cellProps) => {
    //       return <Idno {...cellProps} />;
    //     },
    //   },
      {
        Header: "Invoice",
        accessor: "invoice",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Status",
        accessor: "date",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          return <Pdate {...cellProps} />;
        },
      },
      {
        Header: "Period",
        accessor: "dueDate",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          return <Ddate {...cellProps} />;
        },
      },
      {
        Header: "Total",
        accessor: "total",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          return <Budget {...cellProps} />;
        },
      },
    ],
  );

  return (
    <>
    <Head title="Subscription" />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumb title="Subscription" breadcrumbItem="Profile" />

          <Row>
            <Col xl="4">
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs="7">
                      <div className="text-primary p-3">
                        <h5 className="text-primary">Detail Subscriber !</h5>
                        <p>It will seem like simplified</p>
                      </div>
                    </Col>
                    <Col xs="5" className="align-self-end">
                      <img src={profile1} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <Row>
                    <Col sm="4">
                      <div className="avatar-md profile-user-wid mb-4">
                        {/* <img
                          src={subProfile.img || ""}
                          alt=""
                          className="img-thumbnail rounded-circle"
                        /> */}
                      </div>
                      <h5 className="font-size-15 text-truncate">
                        {subProfile.name}
                      </h5>
                      <p className="text-muted mb-0 text-truncate">
                        {subProfile.type}
                      </p>
                    </Col>

                    <Col sm={8}>
                      <div className="pt-4">
                        <Row>
                          <Col xs="6">
                            <h5 className="font-size-15">
                              {subProfile.status}
                            </h5>
                            <p className="text-muted mb-0">Projects</p>
                          </Col>
                          <Col xs="6">
                            <h5 className="font-size-15">
                              ${subProfile.integration}
                            </h5>
                            <p className="text-muted mb-0">Revenue</p>
                          </Col>
                        </Row>
                        <div className="mt-4">
                          <Link to="" className="btn btn-primary  btn-sm">
                            View Profile{" "}
                            <i className="mdi mdi-arrow-right ms-1" />
                          </Link>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Personal Information</CardTitle>
                  <p className="text-muted mb-4">
                        Hi I'm Cynthia Price,has been the industry's standard dummy text To an English person, it will seem like simplified English, as a skeptical Cambridge.
                  </p>
                  <div className="table-responsive">
                    <Table className="table-nowrap mb-0">
                      <tbody>
                        <tr>
                          <th scope="row">Full Name :</th>
                          <td>{subProfile.name}</td>
                        </tr>
                        <tr>
                          <th scope="row">Mobile :</th>
                          <td>{subProfile.phone}</td>
                        </tr>
                        <tr>
                          <th scope="row">E-mail :</th>
                          <td>{subProfile.email}</td>
                        </tr>
                        <tr>
                          <th scope="row">Location :</th>
                          <td>{subProfile.address}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>

              {/* <Card>
                <CardBody>
                  <CardTitle className="mb-5">Experience</CardTitle>
                  <div>
                    <ul className="verti-timeline list-unstyled">
                      {map(subProfile.experiences, (experience, i) => (
                        <li
                          className={
                            experience.id === 1
                              ? "event-list active"
                              : "event-list"
                          }
                          key={"_exp_" + i}
                        >
                          <div className="event-timeline-dot">
                            <i
                              className={
                                experience.id === 1
                                  ? "bx bx-right-arrow-circle bx-fade-right"
                                  : "bx bx-right-arrow-circle"
                              }
                            />
                          </div>
                          <div className="d-flex">
                            <div className="me-3">
                              <i
                                className={
                                  "bx " +
                                  experience.iconClass +
                                  " h4 text-primary"
                                }
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div>
                                <h5 className="font-size-15">
                                  <Link
                                    to={experience.link}
                                    className="text-dark"
                                  >
                                    {experience.designation}
                                  </Link>
                                </h5>
                                <span className="text-primary">
                                  {experience.timeDuration}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardBody>
              </Card> */}

            </Col>

            <Col xl="8">
              <Row>
                {map(miniCards, (card, key) => (
                  <MiniCards
                    title={card.title}
                    text={card.text}
                    iconClass={card.iconClass}
                    key={"_card_" + key}
                  />
                ))}
              </Row>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Revenue</CardTitle>
                  <div id="revenue-chart">
                    <ApexRevenue dataColors='["--bs-primary"]' />
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">My Projects</CardTitle>

                  <TableContainer
                    columns={columns}
                    data={trans}
                    isGlobalFilter={false}
                    customPageSize={5}
                    customPageSizeOptions={true}
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

ContactsProfile.propTypes = {
  subProfile: PropTypes.any,
  onGetSubProfile: PropTypes.func,
};


export default ContactsProfile
