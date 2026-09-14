const roomData = [

    {
        id: "A101",
        capacity: 30,
        floor: "Ground Floor",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: "A102",
        capacity: 40,
        floor: "Ground Floor",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: "A103",
        capacity: 60,
        floor: "Ground Floor",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: "B201",
        capacity: 50,
        floor: "First Floor",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: "B202",
        capacity: 40,
        floor: "First Floor",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: "B203",
        capacity: 70,
        floor: "First Floor",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: "C301",
        capacity: 80,
        floor: "Second Floor",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: "C302",
        capacity: 35,
        floor: "Second Floor",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=700&q=80"
    }

];


let selectedRoom = null;


function getHistory() {

    return JSON.parse(
        localStorage.getItem("smartclass_history")
    ) || [];

}


function saveHistory(history) {

    localStorage.setItem(
        "smartclass_history",
        JSON.stringify(history)
    );

}


function isRoomOccupied(roomId) {

    const history = getHistory();

    return history.some(
        item =>
            item.room === roomId &&
            item.status === "Active"
    );

}


function renderRooms() {

    const grid =
        document.getElementById("roomGrid");


    const search =
        document
            .getElementById("searchRoom")
            .value
            .toLowerCase();


    const capacity =
        document
            .getElementById("capacityFilter")
            .value;


    const status =
        document
            .getElementById("statusFilter")
            .value;


    grid.innerHTML = "";


    roomData

        .filter(room =>
            room.id
                .toLowerCase()
                .includes(search)
        )

        .filter(room => {

            if (capacity === "all")
                return true;

            return room.capacity >= Number(capacity);

        })

        .filter(room => {

            const occupied =
                isRoomOccupied(room.id);

            const currentStatus =
                occupied
                    ? "occupied"
                    : "available";


            if (status === "all")
                return true;

            return currentStatus === status;

        })

        .forEach(room => {

            const occupied =
                isRoomOccupied(room.id);


            const status =
                occupied
                    ? "occupied"
                    : "available";


            const card =
                document.createElement("div");


            card.className =
                "room-card";


            card.innerHTML = `

                <div class="room-top">

                    <div class="room-name">
                        ${room.id}
                    </div>

                    <span class="status ${status}">
                        ${status.toUpperCase()}
                    </span>

                </div>


                <img
                    class="room-image"
                    src="${room.image}"
                    alt="${room.id}"
                >


                <div class="room-info">

                    <div>

                        <small>
                            Capacity
                        </small>

                        <strong>
                            ${room.capacity} seats
                        </strong>

                    </div>


                    <div>

                        <small>
                            Location
                        </small>

                        <strong>
                            ${room.floor}
                        </strong>

                    </div>

                </div>


                ${
                    occupied

                    ?

                    `<button
                        class="btn secondary full"
                        onclick="checkOut('${room.id}')"
                    >
                        Check-Out
                    </button>`

                    :

                    `<button
                        class="btn primary full"
                        onclick="openCheckIn('${room.id}')"
                    >
                        Check-In
                    </button>`
                }

            `;


            grid.appendChild(card);

        });

}


function openCheckIn(roomId) {

    selectedRoom = roomId;


    document.getElementById(
        "selectedRoomText"
    ).textContent =
        `You are checking into classroom ${roomId}.`;


    document.getElementById(
        "checkinModal"
    ).classList.add("show");

}


function closeModal() {

    document.getElementById(
        "checkinModal"
    ).classList.remove("show");

}


function confirmCheckIn() {

    const name =
        document
            .getElementById("studentName")
            .value
            .trim();


    const purpose =
        document
            .getElementById("purpose")
            .value;


    if (!name) {

        alert("Please enter your name.");

        return;

    }


    if (isRoomOccupied(selectedRoom)) {

        alert("This classroom is already occupied.");

        closeModal();

        renderRooms();

        return;

    }


    const history =
        getHistory();


    const newRecord = {

        id: Date.now(),

        room: selectedRoom,

        student: name,

        purpose: purpose,

        checkIn:
            new Date().toLocaleString(),

        checkOut: "-",

        status: "Active"

    };


    history.unshift(newRecord);


    saveHistory(history);


    alert(
        `Successfully checked into ${selectedRoom}!`
    );


    document.getElementById(
        "studentName"
    ).value = "";


    closeModal();

    renderRooms();

}


function checkOut(roomId) {

    const history =
        getHistory();


    const session =
        history.find(
            item =>
                item.room === roomId &&
                item.status === "Active"
        );


    if (!session) {

        alert(
            "No active session found."
        );

        renderRooms();

        return;

    }


    session.status = "Completed";

    session.checkOut =
        new Date().toLocaleString();


    saveHistory(history);


    alert(
        `Successfully checked out from ${roomId}.`
    );


    renderRooms();

}


/* FILTER EVENTS */

document
    .getElementById("searchRoom")
    .addEventListener(
        "input",
        renderRooms
    );


document
    .getElementById("capacityFilter")
    .addEventListener(
        "change",
        renderRooms
    );


document
    .getElementById("statusFilter")
    .addEventListener(
        "change",
        renderRooms
    );


renderRooms();
