import {useState} from "react";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import RoomsComponent from "./components/RoomsComponent/RoomsComponent.jsx";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import ApartmentDetailsComponent from "./components/ApartmentDetailsComponent/ApartmentDetailsComponent";
import UsersComponent from "./components/UsersComponent/UsersComponent";
import UserComponent from "./components/UserComponent/UserComponent";

function App() {

    return (<BrowserRouter >
            <NavbarComponent/>
            <div style={{minHeight:"80vh"}}>
                <Routes >
                    <Route path="/" element={<HomeComponent/>}></Route>
                    <Route path="/home" element={<HomeComponent/>}></Route>
                    <Route path="/rooms" element={<RoomsComponent/>}></Route>
                    <Route path="/rooms/:id" element={<ApartmentDetailsComponent/>}></Route>
                    <Route path="/users" element={<UsersComponent/>}></Route>
                    <Route path="/users/:id" element={<UserComponent/>}></Route>
                </Routes>
            </div>
            <FooterComponent></FooterComponent>
        </BrowserRouter>
    )
}

export default App;
