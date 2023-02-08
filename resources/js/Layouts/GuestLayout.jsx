import ApplicationLogo from "@/Components/ApplicationLogo";

const GuestLayout = ({ children }) => {
    return (
        <>
            <div id="layout-wrapper">
                <div>{children}</div>
            </div>
        </>
    );
};

export default GuestLayout;
