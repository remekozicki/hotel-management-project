import {useState} from "react";
import NavbarComponent from "./components/NavbarComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import RoomsComponent from "./components/RoomsComponent";
import FooterComponent from "./components/FooterComponent";

function App() {

    return (<BrowserRouter>
            <NavbarComponent/>
            <Routes >
                <Route path="/" element={<HomeComponent/>}></Route>
                <Route path="/home" element={<HomeComponent/>}></Route>
                <Route path="/rooms" element={<RoomsComponent/>}></Route>

            </Routes>
            <FooterComponent></FooterComponent>
        </BrowserRouter>
    )
}

export default App;
