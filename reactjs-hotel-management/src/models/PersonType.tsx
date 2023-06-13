export default interface PersonType{
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: {
        city: string,
        street: string,
        building_number: Number
    },
    registered: string;
    reservations_hitory: [],
    role: string

}