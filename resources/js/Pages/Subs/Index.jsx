import MainLayout from '../../Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from "react";

import { Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../Layouts/Partials/Breadcrumb";

export default function Custom(props) {
    return (
      <MainLayout props>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs  title="Subscription" breadcrumbItem="Subscription" />
            <Row>
              <h1>Hello Subs</h1>
            </Row>
          </Container>
        </div>
      </MainLayout>
    );
}
