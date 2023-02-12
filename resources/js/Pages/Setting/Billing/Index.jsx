import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap"

import classnames from "classnames"

//Import Breadcrumb
import Breadcrumbs from "../../../Layouts/Partials/Breadcrumb";
import SystemInfo from './Partials/SystemInfo';
import BillingInfo from './Partials/BillingInfo';
import CompanyInfo from './Partials/CompanyInfo';

const Billing = (props) => {

    const comp = props.comp;
    const setting = props.set;

    const [activeTab, setactiveTab] = useState("1")
    const [selectedGroup, setselectedGroup] = useState(null)

    function handleSelectGroup(selectedGroup) {
      setselectedGroup(selectedGroup)
    }

    const confirmElement = (
      <button type="submit" className="btn btn-success editable-submit btn-sm me-1"><i className="mdi mdi-check"></i></button>
    );

    /** Cancel button */
    const cancelElement = (
      <button type="button" className="btn btn-danger editable-cancel btn-sm"><i className="mdi mdi-close"></i></button>
    );

    return (
        <>
        <Head title="Billing Setting" />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Setting" breadcrumbItem="Billing" />

                    <div className="checkout-tabs">
                      <Row>
                        <Col xl="2" sm="3">
                          <Nav className="flex-column" pills>
                            <NavItem>
                              <NavLink
                                className={classnames({ active: activeTab === "1" })}
                                onClick={() => {
                                  setactiveTab("1")
                                }}
                              >
                                <i className="bx bxs-truck d-block check-nav-icon mt-4 mb-2" />
                                <p className="fw-bold mb-4">Company Info</p>
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classnames({ active: activeTab === "2" })}
                                onClick={() => {
                                  setactiveTab("2")
                                }}
                              >
                                <i className="bx bx-money d-block check-nav-icon mt-4 mb-2" />
                                <p className="fw-bold mb-4">Billing Info</p>
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classnames({ active: activeTab === "3" })}
                                onClick={() => {
                                  setactiveTab("3")
                                }}
                              >
                                <i className="bx bx-badge-check d-block check-nav-icon mt-4 mb-2" />
                                <p className="fw-bold mb-4">System Info</p>
                              </NavLink>
                            </NavItem>
                          </Nav>
                        </Col>

                        <Col xl="10" sm="9">
                          <Card>
                            <CardBody>
                              <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">

                                    <CompanyInfo  comp={comp} />

                                </TabPane>
                                <TabPane
                                  tabId="2"
                                  id="v-pills-payment"
                                  role="tabpanel"
                                  aria-labelledby="v-pills-payment-tab"
                                >
                                    <BillingInfo />

                                </TabPane>
                                <TabPane tabId="3" id="v-pills-confir" role="tabpanel">

                                    <SystemInfo />

                                </TabPane>
                              </TabContent>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </div>

                </Container>
            </div>
        </>
    );
}

export default Billing;
