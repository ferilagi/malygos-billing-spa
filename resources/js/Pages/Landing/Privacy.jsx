import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

//Import Components
import PrivacyPolicy from "./Privacy/privacy-policy";
import Footer from "./Footer/footer";

const Privacy = () => {
    return (
        <>
            <Head title="Privacy Policy" />

            {/* Privacy Policy */}
            <PrivacyPolicy />

            {/* Footer */}
            <Footer />
        </>
    );
};

Privacy.layout = (page) => <GuestLayout children={page} />;

export default Privacy;
