import {MDBBtn, MDBContainer, MDBFooter, MDBIcon} from "mdb-react-ui-kit";


function FooterComponent(){

    return (
        <footer >
            <div style={{
                    height: "10vh",
                    width: "100%",
                    background: "lightgray",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    margin: "auto"
                }}>
                <p className="p-3"
                   style={{
                    fontFamily: "arial",
                    fontSize: "30px"
                }}>
                    Footer

                </p>
            </div>
        </footer>
    );
}
export default FooterComponent