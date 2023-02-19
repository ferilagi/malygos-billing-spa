import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { Container } from "reactstrap";
import Breadcrumb from "@/Layouts/Partials/Breadcrumb";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Profile" />

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumb title="Profile" breadcrumbItem="Profile" />

                    <div>
                        <div>
                            <div>
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </div>

                            <div>
                                <UpdatePasswordForm className="max-w-xl" />
                            </div>

                            <div>
                                <DeleteUserForm className="max-w-xl" />
                            </div>
                        </div>
                    </div>

                </Container>
            </div>


        </>
    );
}
