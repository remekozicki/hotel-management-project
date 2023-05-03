import {useParams} from "react-router-dom";


function ApartmentDetailsComponent(){

    const param = useParams();
    console.log(param.id);

    return(
        <p>działa</p>
    );
}

export default ApartmentDetailsComponent