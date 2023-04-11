import {useState} from "react";

interface RoomListProps{
    items: string[];
    heading: string;

    onSelectItem: (item: string) => void;
}

function RoomList({items, heading, onSelectItem}: RoomListProps){

    //hook
    let [selectedIndex, setSelectedIndex ] = useState(-1);

    // arr[0] // selected index
    // arr[1] // updated function

    // const [name, setName] = useState('');

    return (
        <>
            <h1>{heading}</h1>
            <ul className="list-group">
                {items.map((item, index) =>(
                    <li
                        className = {selectedIndex === index ? 'list-group-item active' : 'list-group-item' }
                        key={item}
                        onClick={()=>{
                            setSelectedIndex(index);
                            onSelectItem(item);
                        }}
                    >{item}</li>
                ))}
            </ul>
        </>




    );
}
export default RoomList;