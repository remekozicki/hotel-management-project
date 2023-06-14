// use HotelManagerDB;

// dostepne pokoje o danym typie i w danym okresie czasowym

let input_start_date = '2023-03-03'
let input_end_date = '2023-09-07'

db.rooms.aggregate([
    {$unwind: "$rooms_array"},
    {$unwind: {
        path: "$rooms_array.room_reservations",
        preserveNullAndEmptyArrays: true
    }},
    {$project:{
        _id: 0,
        room_type: "$type",
        room_number: "$rooms_array.room_number",
        description: "$description",
        size: "$size",
        price: "$price",
        reservation_status: "$rooms_array.room_reservations.status",
        start_date: {
            $toDate: "$rooms_array.room_reservations.dates.start_date"
        },

        end_date: {
            $toDate: "$rooms_array.room_reservations.dates.end_date"
        }
    }},
    {$match:{
        $and:[
            {$or:[
                {$nor:[
                    {$and:[
                        {"start_date":{$gte: ISODate(input_start_date)}},
                        {"end_date": {$lte: ISODate(input_end_date)}},
                    ]},
                    {$and:[
                        {"start_date":{$lte: ISODate(input_start_date)}},
                        {"end_date": {$gte: ISODate(input_start_date)}},
                    ]},
                    {$and:[
                        {"start_date":{$lte: ISODate(input_end_date)}},
                        {"end_date": {$gte: ISODate(input_end_date)}},
                    ]},
                ]},
                {"reservation_status": {$eq:"cancelled"}}

            ]},
            {"room_type": input_type},
        ]
    }},
    {$project:{
        start_date: 0,
        end_date: 0,

    }},
    {$group:{
        _id: "$room_number"
    }}
])


//rezerwacje w przedziale czasowym i o danym statusie
let input_status = "accepted"
db.rooms.aggregate([
    {$unwind: "$rooms_array"},
    {$unwind:"$rooms_array.room_reservations"},
    {$project:{
        _id: 0,

        reswervation_id: "$rooms_array.room_reservations._id",
        reservation_status: "$rooms_array.room_reservations.status",
        start_reservation: "$rooms_array.room_reservations.dates.start_date",
        end_reservation: "$rooms_array.room_reservations.dates.end_date",
        start_date: {
            $toDate: "$rooms_array.room_reservations.dates.start_date"
        },

        end_date: {
            $toDate: "$rooms_array.room_reservations.dates.end_date"
        }

    }},
    {$match:{
        $and:[
            {"start_date":{$gte: ISODate(input_start_date)}},
            {"end_date": {$lte: ISODate(input_end_date)}},
            {"reservation_status": {$eq:input_status}}
        ]
    }}
])

// typy pokojow ze srednia ocena wieksza niz podana

let input_avg_stars = 3.5;

db.rooms.aggregate([
    {$unwind: "$room_reviews"},
    {$group:{
        _id: "$type",
        avg_stars: {$avg: "$room_reviews.stars"}
    }},
    {$match:{
        avg_stars: {$gte: input_avg_stars}
    }},
    {$project:{
        _id: 0,
        type: "$_id",
        avg_stars: "$avg_stars"
    }}
])

// sami klienci
db.users.find(
    {
        role: "client"
    },
    {
        firstname: 1,
        lastname: 1,
        role: 1
    }

)

// sami pracownicy
db.users.find(
{
        role: "employee"
    },
    {
        firstname: 1,
        lastname: 1,
        role: 1
    }
)

// znajac id klienta podaj wypisz jego rezerwacje:

let input_clientid = "644fd98545d4d5cfb71e6d21";

db.users.aggregate([
  { $match: { "_id": ObjectId(input_clientid) } },
  { $unwind: "$reservations_hitory" },
  {
    $project: {
      "_id": 0,
      "reservation_id": "$reservations_hitory.reservation_id",
      "room_number": "$reservations_hitory.room_number",
      "start_date": "$reservations_hitory.dates.start_date",
      "end_date": "$reservations_hitory.dates.end_date",
      "status": "$reservations_hitory.status"
    }
  }
])

// dodawanie rezerwacji

const roomNumber = 102;

const roomTypeId = ObjectId("628d0d2e22b44fb4124bb51d");
const reservation = {
  _id: ObjectId(),
  client_id: ObjectId("644fd98545d4d5cfb71e6d21"),
  dates: {
    start_date: "2023-06-01T00:00:00Z",
    end_date: "2023-06-05T00:00:00Z"
  },
  status: "pending"
};

db.rooms.updateOne(
  { "_id": roomTypeId },
  { $push: { "rooms_array.$[room].room_reservations": reservation } },
  { arrayFilters: [{ "room.room_number": roomNumber }] }
);

const userId = ObjectId("648887f1ce75e168e24b450e");
const reservation = {
  reservation_id: ObjectId("64889e263dbaab88fd7fd4f0"),
  room_number: roomNumber,
  dates: {
    start_date: "2023-09-01T00:00:00Z",
    end_date: "2023-09-05T00:00:00Z"
  },
  status: "pending"
};


db.users.updateOne(
  { "_id": userId },
  { $push: { "reservations_hitory": reservation } }
);

// dodawanie nowej opinii

const roomTypeId = ObjectId("628d0d2e9b4f386adf3c679c");
const review = {
  client_id: ObjectId("644fd985d84f95c6777a9d53"),
  stars: 4.5,
  body: "osenfoanoc pwpidcmapjdcpa poajdpoa fdpoak dk apdcmapmcaanfcosa"
};

db.rooms.updateOne(
  { "_id": roomId },
  { $push: { "room_reviews": review } }
);

// zmiana statusu rezerwacji

db.rooms.updateOne(
  {
    "rooms_array.room_reservations._id": ObjectId("6475c5752442bd943b655751")
  },
  {
  $set:
    {
        "rooms_array.$[outer].room_reservations.$[inner].status": "accepted"
    }
  },
  {
  arrayFilters: [
        { "outer.room_reservations._id": ObjectId("6475c5752442bd943b655751") },
        { "inner._id": ObjectId("6475c5752442bd943b655751") }
    ]
  }
);

db.users.updateOne(
  { "reservations_hitory.reservation_id": ObjectId("628d101398e88560beb96209") },
  { $set: { "reservations_hitory.$.status": "accepted" } }
);

// dodawanie nowego uzytkownika do bazy

const firstname_input = "John";
const last_name = "Doe";
const email_input = "johndoe@example.com";
const phone_input = "+1 (123) 456-7890";
const address_input = {
    "city": "New York",
    "street": "123 Main Street",
    "building_numer": 1234
}
const role_input = "client";

db.users.insertOne({
  "firstname": firstname_input,
  "lastname": last_name,
  "email": email_input,
  "phone": phone_input,
  "address": address_input,
  "registered": Date(),
  "reservations_hitory": [],
  "role": role_input
})

// najczesciej rezerwowany typ pokoju
db.rooms.aggregate([
  {$unwind: "$rooms_array"},
  {$unwind: "$rooms_array.room_reservations"},
  {$match: {
      "rooms_array.room_reservations.status": "accepted"
  }},
  {$group: {
      _id: "$type",
      count: { $sum: 1 }
  }},
  {$sort:{
    count: -1
  }}
])
