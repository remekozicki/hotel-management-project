import Message from "./components/Message";
import RoomList from "./components/RoomList";
import Alert from "./components/Alert";
import ButtonTut from "./components/ButtonTut";
import {useState} from "react";

function App(){
    const [alertVisible, setAlertVisibility] = useState(false)

    const rooms = [
        'pokoj 1',
        'pokoj 2',
        'pokoj 3',
        'pokoj 4',
        'pokoj 5',
    ];

    const handleSelectItem = (item: string) => {
        console.log(item);
    }

    return <div>
        <RoomList
            items = {rooms}
            heading="Cities"
            onSelectItem={handleSelectItem}/>
        {alertVisible && <Alert onClose={() => setAlertVisibility(false)}> Hello world</Alert>}

        <ButtonTut
            color='danger'
            onClick={() => setAlertVisibility(true)}
        >
            My button
        </ButtonTut>
    </div>
}

export default App;