import Breadcrumb from '@/Layouts/Partials/Breadcrumb'
import { Head } from '@inertiajs/react'
import React from 'react'
import { Container, Row } from 'reactstrap'

const Notification = (props) => {
  return (
    <>
        <Head title="Notification" />
        <div className="page-content">
            <Container fluid>
                {/* Render Breadcrumbs */}
                <Breadcrumb title="Notification" breadcrumbItem="Notification" />

                <Row>

                </Row>
            </Container>
        </div>
    </>
  )
}
export default Notification;
