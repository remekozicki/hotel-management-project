import {useEffect, useState} from "react";
import PersonType from "../models/PersonType";
import empData from "../assets/EmployeesData.json"
import cliData from "../assets/ClientsData.json"

import {
    MDBBtn,
    MDBListGroup,
    MDBListGroupItem,
    } from 'mdb-react-ui-kit';

function UsersComponent(){

    const [users, setUsers] = useState<PersonType[]>([]);
    useEffect(() =>{
        setUsers(empData);
        setUsers(cliData);

    }, [])

    users.forEach(function (elem){
        console.log(elem._id)
    })

    return (
        <div style = {{ display:"flex", justifyContent:"center", padding: "10px"}} >
            <MDBListGroup style={{ minWidth: '50rem', border:"1 solid lightgrey" }} light>
                <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                        <img
                            src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                            alt=''
                            style={{ width: '45px', height: '45px' }}
                            className='rounded-circle'
                        />
                        <div className='ms-3'>
                            <p className='fw-bold mb-1'>John Doe</p>
                            <p className='text-muted mb-0'>john.doe@gmail.com</p>
                        </div>
                    </div>
                    <MDBBtn size='sm' rounded color='link'>
                        View
                    </MDBBtn>
                </MDBListGroupItem>
                <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                        <img
                            src='https://mdbootstrap.com/img/new/avatars/6.jpg'
                            alt=''
                            style={{ width: '45px', height: '45px' }}
                            className='rounded-circle'
                        />
                        <div className='ms-3'>
                            <p className='fw-bold mb-1'>Alex Ray</p>
                            <p className='text-muted mb-0'>alex.ray@gmail.com</p>
                        </div>
                    </div>
                    <MDBBtn size='sm' rounded color='link'>
                        View
                    </MDBBtn>
                </MDBListGroupItem>
                <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                        <img
                            src='https://mdbootstrap.com/img/new/avatars/7.jpg'
                            alt=''
                            style={{ width: '45px', height: '45px' }}
                            className='rounded-circle'
                        />
                        <div className='ms-3'>
                            <p className='fw-bold mb-1'>Kate Hunington</p>
                            <p className='text-muted mb-0'>kate.hunington@gmail.com</p>
                        </div>
                    </div>
                    <MDBBtn size='sm' rounded color='link'>
                        View
                    </MDBBtn>
                </MDBListGroupItem>
            </MDBListGroup>
        </div>

    );
}
export default UsersComponent