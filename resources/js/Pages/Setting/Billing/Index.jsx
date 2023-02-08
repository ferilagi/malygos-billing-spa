// import React, { useState } from 'react';
// import { Head } from '@inertiajs/react';

// import Editable from "react-bootstrap-editable"
// // import MetaTags from "react-meta-tags"

// import {
//   Container,
//   Row,
//   Col,
//   Table,
//   Input,
//   Nav,
//   NavItem,
//   NavLink,
//   TabContent,
//   TabPane,
//   Card,
//   Form,
//   FormGroup,
//   Label,
//   CardBody,
//   CardTitle,
//   CardSubtitle
// } from "reactstrap"
// import Select from "react-select"
// import classnames from "classnames"

// //Import Breadcrumb
// import Breadcrumbs from "../../../Layouts/Partials/Breadcrumb";

// const Billing = (props) => {

//     const [activeTab, setactiveTab] = useState("1")
//     const [selectedGroup, setselectedGroup] = useState(null)

//     function handleSelectGroup(selectedGroup) {
//       setselectedGroup(selectedGroup)
//     }

//     const confirmElement = (
//       <button type="submit" className="btn btn-success editable-submit btn-sm me-1"><i className="mdi mdi-check"></i></button>
//     );

//     /** Cancel button */
//     const cancelElement = (
//       <button type="button" className="btn btn-danger editable-cancel btn-sm"><i className="mdi mdi-close"></i></button>
//     );

//     return (
//         <>
//         <Head title="Billing Setting" />
//             <div className="page-content">
//                 <Container fluid>
//                     {/* Render Breadcrumbs */}
//                     <Breadcrumbs title="Setting" breadcrumbItem="Billing" />

//                     <div className="checkout-tabs">
//                       <Row>
//                         <Col xl="2" sm="3">
//                           <Nav className="flex-column" pills>
//                             <NavItem>
//                               <NavLink
//                                 className={classnames({ active: activeTab === "1" })}
//                                 onClick={() => {
//                                   setactiveTab("1")
//                                 }}
//                               >
//                                 <i className="bx bxs-truck d-block check-nav-icon mt-4 mb-2" />
//                                 <p className="fw-bold mb-4">Shipping Info</p>
//                               </NavLink>
//                             </NavItem>
//                             <NavItem>
//                               <NavLink
//                                 className={classnames({ active: activeTab === "2" })}
//                                 onClick={() => {
//                                   setactiveTab("2")
//                                 }}
//                               >
//                                 <i className="bx bx-money d-block check-nav-icon mt-4 mb-2" />
//                                 <p className="fw-bold mb-4">Payment Info</p>
//                               </NavLink>
//                             </NavItem>
//                             <NavItem>
//                               <NavLink
//                                 className={classnames({ active: activeTab === "3" })}
//                                 onClick={() => {
//                                   setactiveTab("3")
//                                 }}
//                               >
//                                 <i className="bx bx-badge-check d-block check-nav-icon mt-4 mb-2" />
//                                 <p className="fw-bold mb-4">Confirmation</p>
//                               </NavLink>
//                             </NavItem>
//                           </Nav>
//                         </Col>

//                         <Col xl="10" sm="9">
//                           <Card>
//                             <CardBody>
//                               <TabContent activeTab={activeTab}>
//                                 <TabPane tabId="1">
//                                   <div>
//                                     <CardTitle>Shipping information</CardTitle>
//                                       <CardSubtitle className="mb-3">
//                                         This library allows you to create editable elements on your
//                                         page. It can be used with any engine (bootstrap, jquery-ui,
//                                         jquery only) and includes both popup and inline modes.
//                                         Please try out demo to see how it works.
//                                       </CardSubtitle>

//                                       <div className="table-responsive">
//                                         <Table responsive striped className="table-nowrap mb-0">
//                                           <thead>
//                                             <tr>
//                                               <th style={{ width: "50%" }}>Inline</th>
//                                               <th>Examples</th>
//                                             </tr>
//                                           </thead>
//                                           <tbody>
//                                             <tr>
//                                               <td>Simple Text Field</td>
//                                               <td>
//                                                 <Editable
//                                                   alwaysEditing={false}
//                                                   disabled={false}
//                                                   editText="superuser"
//                                                   id={null}
//                                                   isValueClickable={false}
//                                                   mode="inline"
//                                                   placement="top"
//                                                   showText
//                                                   type="textfield"
//                                                   renderConfirmElement={confirmElement}
//                                                   renderCancelElement={cancelElement}
//                                                 />
//                                               </td>
//                                             </tr>
//                                             <tr>
//                                               <td>Empty text field, required</td>
//                                               <td>
//                                                 <Editable
//                                                   ajax={null}
//                                                   alwaysEditing={false}
//                                                   className={null}
//                                                   disabled={false}
//                                                   editText="Empty"
//                                                   id={null}
//                                                   isValueClickable={false}
//                                                   label={null}
//                                                   mode="inline"
//                                                   onSubmit={null}
//                                                   onValidated={null}
//                                                   placement="top"
//                                                   showText
//                                                   type="textfield"
//                                                   validate={value => {
//                                                     if (!value) {
//                                                       return "Required"
//                                                     }
//                                                   }}
//                                                   renderConfirmElement={confirmElement}
//                                                   renderCancelElement={cancelElement}
//                                                 />
//                                               </td>
//                                             </tr>
//                                             <tr>
//                                               <td>Select, local array, custom display</td>
//                                               <td>
//                                                 <Editable
//                                                   ajax={null}
//                                                   alwaysEditing={false}
//                                                   className={null}
//                                                   disabled={false}
//                                                   editText="male"
//                                                   id={null}
//                                                   isValueClickable={false}
//                                                   label={null}
//                                                   mode="inline"
//                                                   onSubmit={null}
//                                                   onValidated={null}
//                                                   options={["male", "female"]}
//                                                   placement="top"
//                                                   showText
//                                                   type="select"
//                                                   validate={null}
//                                                   renderConfirmElement={confirmElement}
//                                                   renderCancelElement={cancelElement}
//                                                 />
//                                               </td>
//                                             </tr>

//                                             <tr>
//                                               <td>Combodate</td>
//                                               <td>
//                                                 <Editable
//                                                   ajax={null}
//                                                   alwaysEditing={false}
//                                                   className={null}
//                                                   disabled={false}
//                                                   editText="Enter Date"
//                                                   id={null}
//                                                   isValueClickable={false}
//                                                   label={null}
//                                                   mode="inline"
//                                                   onSubmit={null}
//                                                   onValidated={null}
//                                                   placement="top"
//                                                   showText
//                                                   type="date"
//                                                   validate={null}
//                                                   renderConfirmElement={confirmElement}
//                                                   renderCancelElement={cancelElement}
//                                                 />
//                                               </td>
//                                             </tr>
//                                             <tr>
//                                               <td>Textarea, buttons below. Submit by ctrl+enter</td>
//                                               <td>
//                                                 <Editable
//                                                   ajax={null}
//                                                   alwaysEditing={false}
//                                                   className={null}
//                                                   disabled={false}
//                                                   editText="Awesome User"
//                                                   id={null}
//                                                   isValueClickable={false}
//                                                   label={null}
//                                                   mode="inline"
//                                                   onSubmit={null}
//                                                   onValidated={null}
//                                                   placement="top"
//                                                   showText
//                                                   type="textarea"
//                                                   validate={null}
//                                                   renderConfirmElement={confirmElement}
//                                                   renderCancelElement={cancelElement}
//                                                 />
//                                               </td>
//                                             </tr>
//                                           </tbody>
//                                         </Table>
//                                       </div>
//                                   </div>
//                                 </TabPane>
//                                 <TabPane
//                                   tabId="2"
//                                   id="v-pills-payment"
//                                   role="tabpanel"
//                                   aria-labelledby="v-pills-payment-tab"
//                                 >
//                                   <div>
//                                     <CardTitle>Payment information</CardTitle>
//                                       <CardSubtitle className="mb-3">
//                                         This library allows you to create editable elements on your
//                                         page. It can be used with any engine (bootstrap, jquery-ui,
//                                         jquery only) and includes both popup and inline modes.
//                                         Please try out demo to see how it works.
//                                       </CardSubtitle>

//                                       <div className="table-responsive">
//                                         <Table responsive striped className="table-nowrap mb-0">
//                                           <thead>
//                                             <tr>
//                                               <th style={{ width: "50%" }}>Inline</th>
//                                               <th>Examples</th>
//                                             </tr>
//                                           </thead>
//                                           <tbody>
//                                             <tr>
//                                               <td>Simple Text Field</td>
//                                               <td>
//                                                 <Editable
//                                                   alwaysEditing={false}
//                                                   disabled={false}
//                                                   editText="superuser"
//                                                   id={null}
//                                                   isValueClickable={false}
//                                                   mode="inline"
//                                                   placement="top"
//                                                   showText
//                                                   type="textfield"
//                                                   renderConfirmElement={confirmElement}
//                                                   renderCancelElement={cancelElement}
//                                                 />
//                                               </td>
//                                             </tr>
//                                             <tr>
//                                               <td>Empty text field, required</td>
//                                               <td>
//                                                 <Editable
//                                                   ajax={null}
//                                                   alwaysEditing={false}
//                                                   className={null}
//                                                   disabled={false}
//                                                   editText="Empty"
//                                                   id={null}
//                                                   isValueClickable={false}
//                                                   label={null}
//                                                   mode="inline"
//                                                   onSubmit={null}
//                                                   onValidated={null}
//                                                   placement="top"
//                                                   showText
//                                                   type="textfield"
//                                                   validate={value => {
//                                                     if (!value) {
//                                                       return "Required"
//                                                     }
//                                                   }}
//                                                   renderConfirmElement={confirmElement}
//                                                   renderCancelElement={cancelElement}
//                                                 />
//                                               </td>
//                                             </tr>
//                                             <tr>
//                                               <td>Select, local array, custom display</td>
//                                               <td>
//                                                 <Editable
//                                                   ajax={null}
//                                                   alwaysEditing={false}
//                                                   className={null}
//                                                   disabled={false}
//                                                   editText="male"
//                                                   id={null}
//                                                   isValueClickable={false}
//                                                   label={null}
//                                                   mode="inline"
//                                                   onSubmit={null}
//                                                   onValidated={null}
//                                                   options={["male", "female"]}
//                                                   placement="top"
//                                                   showText
//                                                   type="select"
//                                                   validate={null}
//                                                   renderConfirmElement={confirmElement}
//                                                   renderCancelElement={cancelElement}
//                                                 />
//                                               </td>
//                                             </tr>

//                                             <tr>
//                                               <td>Combodate</td>
//                                               <td>
//                                                 <Editable
//                                                   ajax={null}
//                                                   alwaysEditing={false}
//                                                   className={null}
//                                                   disabled={false}
//                                                   editText="Enter Date"
//                                                   id={null}
//                                                   isValueClickable={false}
//                                                   label={null}
//                                                   mode="inline"
//                                                   onSubmit={null}
//                                                   onValidated={null}
//                                                   placement="top"
//                                                   showText
//                                                   type="date"
//                                                   validate={null}
//                                                   renderConfirmElement={confirmElement}
//                                                   renderCancelElement={cancelElement}
//                                                 />
//                                               </td>
//                                             </tr>
//                                             <tr>
//                                               <td>Textarea, buttons below. Submit by ctrl+enter</td>
//                                               <td>
//                                                 <Editable
//                                                   ajax={null}
//                                                   alwaysEditing={false}
//                                                   className={null}
//                                                   disabled={false}
//                                                   editText="Awesome User"
//                                                   id={null}
//                                                   isValueClickable={false}
//                                                   label={null}
//                                                   mode="inline"
//                                                   onSubmit={null}
//                                                   onValidated={null}
//                                                   placement="top"
//                                                   showText
//                                                   type="textarea"
//                                                   validate={null}
//                                                   renderConfirmElement={confirmElement}
//                                                   renderCancelElement={cancelElement}
//                                                 />
//                                               </td>
//                                             </tr>
//                                           </tbody>
//                                         </Table>
//                                       </div>
//                                   </div>
//                                 </TabPane>
//                                 <TabPane tabId="3" id="v-pills-confir" role="tabpanel">
//                                   <div>
//                                     <CardTitle>Confirmation information</CardTitle>
//                                       <CardSubtitle className="mb-3">
//                                         This library allows you to create editable elements on your
//                                         page. It can be used with any engine (bootstrap, jquery-ui,
//                                         jquery only) and includes both popup and inline modes.
//                                         Please try out demo to see how it works.
//                                       </CardSubtitle>

//                                       <div className="table-responsive">
//                                         <Table responsive striped className="table-nowrap mb-0">
//                                           <thead>
//                                             <tr>
//                                               <th style={{ width: "50%" }}>Inline</th>
//                                               <th>Examples</th>
//                                             </tr>
//                                           </thead>
//                                           <tbody>
//                                             <tr>
//                                               <td>Simple Text Field</td>
//                                               <td>
//                                                 <Editable
//                                                   alwaysEditing={false}
//                                                   disabled={false}
//                                                   editText="superuser"
//                                                   id={null}
//                                                   isValueClickable={false}
//                                                   mode="inline"
//                                                   placement="top"
//                                                   showText
//                                                   type="textfield"
//                                                   renderConfirmElement={confirmElement}
//                                                   renderCancelElement={cancelElement}
//                                                 />
//                                               </td>
//                                             </tr>
//                                             <tr>
//                                               <td>Empty text field, required</td>
//                                               <td>
//                                                 <Editable
//                                                   ajax={null}
//                                                   alwaysEditing={false}
//                                                   className={null}
//                                                   disabled={false}
//                                                   editText="Empty"
//                                                   id={null}
//                                                   isValueClickable={false}
//                                                   label={null}
//                                                   mode="inline"
//                                                   onSubmit={null}
//                                                   onValidated={null}
//                                                   placement="top"
//                                                   showText
//                                                   type="textfield"
//                                                   validate={value => {
//                                                     if (!value) {
//                                                       return "Required"
//                                                     }
//                                                   }}
//                                                   renderConfirmElement={confirmElement}
//                                                   renderCancelElement={cancelElement}
//                                                 />
//                                               </td>
//                                             </tr>
//                                             <tr>
//                                               <td>Select, local array, custom display</td>
//                                               <td>
//                                                 <Editable
//                                                   ajax={null}
//                                                   alwaysEditing={false}
//                                                   className={null}
//                                                   disabled={false}
//                                                   editText="male"
//                                                   id={null}
//                                                   isValueClickable={false}
//                                                   label={null}
//                                                   mode="inline"
//                                                   onSubmit={null}
//                                                   onValidated={null}
//                                                   options={["male", "female"]}
//                                                   placement="top"
//                                                   showText
//                                                   type="select"
//                                                   validate={null}
//                                                   renderConfirmElement={confirmElement}
//                                                   renderCancelElement={cancelElement}
//                                                 />
//                                               </td>
//                                             </tr>

//                                             <tr>
//                                               <td>Combodate</td>
//                                               <td>
//                                                 <Editable
//                                                   ajax={null}
//                                                   alwaysEditing={false}
//                                                   className={null}
//                                                   disabled={false}
//                                                   editText="Enter Date"
//                                                   id={null}
//                                                   isValueClickable={false}
//                                                   label={null}
//                                                   mode="inline"
//                                                   onSubmit={null}
//                                                   onValidated={null}
//                                                   placement="top"
//                                                   showText
//                                                   type="date"
//                                                   validate={null}
//                                                   renderConfirmElement={confirmElement}
//                                                   renderCancelElement={cancelElement}
//                                                 />
//                                               </td>
//                                             </tr>
//                                             <tr>
//                                               <td>Textarea, buttons below. Submit by ctrl+enter</td>
//                                               <td>
//                                                 <Editable
//                                                   ajax={null}
//                                                   alwaysEditing={false}
//                                                   className={null}
//                                                   disabled={false}
//                                                   editText="Awesome User"
//                                                   id={null}
//                                                   isValueClickable={false}
//                                                   label={null}
//                                                   mode="inline"
//                                                   onSubmit={null}
//                                                   onValidated={null}
//                                                   placement="top"
//                                                   showText
//                                                   type="textarea"
//                                                   validate={null}
//                                                   renderConfirmElement={confirmElement}
//                                                   renderCancelElement={cancelElement}
//                                                 />
//                                               </td>
//                                             </tr>
//                                           </tbody>
//                                         </Table>
//                                       </div>
//                                   </div>
//                                 </TabPane>
//                               </TabContent>
//                             </CardBody>
//                           </Card>
//                         </Col>
//                       </Row>
//                     </div>

//                 </Container>
//             </div>
//         </>
//     );
// }

// export default Billing;
