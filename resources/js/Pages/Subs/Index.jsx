import MainLayout from '../../Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

export default function Custom(props) {
    return (
        <MainLayout props>
            <Breadcrumbs  title="Subscription" breadcrumbItem="Subscription" />
            <div className="page-content">
                    <div className="container-fluid">
                        <h1>Hello Subs</h1>
                    </div>
            </div>
        </MainLayout>
    );
}
