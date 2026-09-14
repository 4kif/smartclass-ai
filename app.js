
const rooms = [

    {
        id: "A101",
        capacity: 30,
        floor: "Ground Floor",
        status: "available"
    },

    {
        id: "A102",
        capacity: 40,
        floor: "Ground Floor", 
        status: "occupied"
    },

    {
        id: "A103",
        capacity: 60,
        floor: "Ground Floor",
        status: "available"
    },

    {
        id: "B201",
        capacity: 50,
        floor: "First Floor",
        status: "occupied"
    },

    {
        id: "B202",
        capacity: 40,
        floor: "First Floor",
        status: "available"
    },

    {
        id: "B203",
        capacity: 70,
        floor: "First Floor",
        status: "available"
    },

    {
        id: "C301",
        capacity: 80,
        floor: "Second Floor",
        status: "occupied"
    },

    {
        id: "C302",
        capacity: 35,
        floor: "Second Floor",
        status: "available"
    }

];


function getHistory() {

    return JSON.parse(
        localStorage.getItem("smartclass_history")
    ) || [];

}


function updateDashboard() {

    const history = getHistory();

    const activeSessions =
        history.filter(
            item => item.status === "Active"
        );


    let available =
        rooms.length - activeSessions.length;


    if (available < 0)
        available = 0;


    const total =
        document.getElementById("totalRooms");

    const availableElement =
        document.getElementById("availableRooms");

    const used =
        document.getElementById("usedRooms");

    const availableCount =
        document.getElementById("availableCount");


    if (total)
        total.textContent = rooms.length;


    if (availableElement)
        availableElement.textContent = available;


    if (used)
        used.textContent = rooms.length - available;


    if (availableCount)
        availableCount.textContent = available;

}


updateDashboard();
