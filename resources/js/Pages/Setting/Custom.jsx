import MainLayout from '../../Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

export default function Custom(props) {
    return (
        <MainLayout props>
            <Breadcrumbs  title="Setting" breadcrumbItem="Setting" />
            <div className="page-content">
                    <div className="container-fluid">
                        <h1>Hello Custom</h1>
                    </div>
            </div>
        </MainLayout>
    );
}
