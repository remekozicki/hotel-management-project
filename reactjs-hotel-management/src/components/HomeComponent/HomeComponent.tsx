import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function HomeComponent(): JSX.Element {

    return (
        <div className="Wrapper"
            style={{
                border:"1px solid black",
                width:"100vw",
                height:"80vh",
                display:"flex",
                flexFlow:"row",
                justifyContent:"center"
            }}
        >
            <main
                style={{
                    display:"flex",
                    flexFlow:"column",
                    alignItems:"center"
                }}
            >
                <h1>Welcome to "HotelName"</h1>
                <h2></h2>
                <div className="MapWrapper">
                    <div>
                        <image>
                            <img
                                style={{
                                    width:"400px",
                                    height:"400px",
                                    borderRadius:'50%'
                                }}
                                    src="https://pixabay.com/get/g844da94000aee405550a8c49729a79ccb905bca95f6174e20e0ef64a7b68c6a06e6299ba48ab269f62b208aa0b2f197c40b5bf0410845b221809cbe9caa9ae6a_1920.jpg"/>
                        </image>
                    </div>
                </div>
            </main>
            <aside>
            </aside>
        </div>

    );

}

export default HomeComponent
