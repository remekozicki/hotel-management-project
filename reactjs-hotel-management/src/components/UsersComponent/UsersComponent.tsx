import {useEffect, useState} from "react";
import PersonType from "../../models/PersonType";
import empData from "../../assets/EmployeesData.json"
import cliData from "../../assets/ClientsData.json"

import {
    MDBBtn,
    MDBListGroup,
    MDBListGroupItem,
    } from 'mdb-react-ui-kit';

function UsersComponent(): JSX.Element {

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
                {users.map((user: PersonType) => {
                    return (
                        <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex align-items-center'>
                                <img
                                    src="https://img.icons8.com/officel/80/null/person-male.png"
                                    alt=''
                                    style={{ width: '45px', height: '45px' }}
                                    className='rounded-circle'
                                />
                                <div className='ms-3'>
                                    <p className='fw-bold mb-1'>{`${user.firstname} ${user.lastname}`}</p>
                                    <p className='text-muted mb-0'>{user.email}</p>
                                </div>
                            </div>
                            <a href={'/users/' + user._id}>
                                View
                            </a>
                        </MDBListGroupItem>
                    )
                })}
            </MDBListGroup>
        </div>

    );
}
export default UsersComponent