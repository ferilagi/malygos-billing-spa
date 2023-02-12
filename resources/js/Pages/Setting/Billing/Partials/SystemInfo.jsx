import { CardSubtitle, CardTitle } from "reactstrap";




const SystemInfo = (props) => {

    return (

        <>
            <CardTitle>System information</CardTitle>
                <CardSubtitle className="mb-3">
                This library allows you to create editable elements on your
                page. It can be used with any engine (bootstrap, jquery-ui,
                jquery only) and includes both popup and inline modes.
                Please try out demo to see how it works.
                </CardSubtitle>

                <h1> System Info </h1>

        </>

    );

}

export default SystemInfo;
