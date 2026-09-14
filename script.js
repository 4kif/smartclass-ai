/* =====================================================
   SMARTCLASS AI
   Classroom Availability System
===================================================== */


/* ================= CLASSROOM DATA ================= */

const defaultClassrooms = [

    {
        roomId: "B201",
        roomNumber: "B201",
        capacity: 40,
        status: "AVAILABLE",
        currentStudent: "",
        purpose: "",
        checkInTime: null,
        expectedCheckoutTime: null
    },

    {
        roomId: "B202",
        roomNumber: "B202",
        capacity: 30,
        status: "AVAILABLE",
        currentStudent: "",
        purpose: "",
        checkInTime: null,
        expectedCheckoutTime: null
    },

    {
        roomId: "B203",
        roomNumber: "B203",
        capacity: 50,
        status: "AVAILABLE",
        currentStudent: "",
        purpose: "",
        checkInTime: null,
        expectedCheckoutTime: null
    },

    {
        roomId: "B204",
        roomNumber: "B204",
        capacity: 40,
        status: "AVAILABLE",
        currentStudent: "",
        purpose: "",
        checkInTime: null,
        expectedCheckoutTime: null
    },

    {
        roomId: "B205",
        roomNumber: "B205",
        capacity: 25,
        status: "AVAILABLE",
        currentStudent: "",
        purpose: "",
        checkInTime: null,
        expectedCheckoutTime: null
    }

];


/* ================= STORAGE ================= */

let classrooms =
    JSON.parse(
        localStorage.getItem("smartclass_classrooms")
    ) || defaultClassrooms;


let history =
    JSON.parse(
        localStorage.getItem("smartclass_history")
    ) || [];


let selectedRoom = null;

let checkoutRoom = null;


/* ================= SAVE DATA ================= */

function saveData() {

    localStorage.setItem(
        "smartclass_classrooms",
        JSON.stringify(classrooms)
    );

    localStorage.setItem(
        "smartclass_history",
        JSON.stringify(history)
    );

}



/* ================= PAGE NAVIGATION ================= */

function showPage(pageName) {

    document.querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    const target =
        document.getElementById(
            pageName + "Page"
        );


    if (target) {

        target.classList.add("active");

    }


    document.querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("active");

            if (
                item.dataset.page === pageName
            ) {

                item.classList.add("active");

            }

        });


    renderAll();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



/* ================= RENDER ALL ================= */

function renderAll() {

    renderSummary();

    renderAvailableRooms();

    renderClassrooms();

    renderHistory();

}



/* ================= SUMMARY ================= */

function renderSummary() {

    const available =
        classrooms.filter(
            room => room.status === "AVAILABLE"
        ).length;


    const occupied =
        classrooms.filter(
            room => room.status === "OCCUPIED"
        ).length;


    document.getElementById(
        "availableCount"
    ).textContent = available;


    document.getElementById(
        "occupiedCount"
    ).textContent = occupied;


    document.getElementById(
        "totalCount"
    ).textContent = classrooms.length;

}



/* ================= AVAILABLE ROOMS ================= */

function renderAvailableRooms() {

    const container =
        document.getElementById(
            "availableRooms"
        );


    const availableRooms =
        classrooms.filter(
            room => room.status === "AVAILABLE"
        );


    if (availableRooms.length === 0) {

        container.innerHTML = `
            <div class="mini-room">
                <div class="mini-room-top">
                    <h4>No rooms</h4>
                    <span class="status-dot occupied"></span>
                </div>

                <p>All classrooms are occupied.</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        availableRooms.map(room => `

            <div class="mini-room">

                <div class="mini-room-top">

                    <h4>
                        ${room.roomNumber}
                    </h4>

                    <span
                        class="status-dot available">
                    </span>

                </div>

                <p>
                    Capacity ${room.capacity}
                </p>

            </div>

        `).join("");

}



/* ================= CLASSROOMS ================= */

let currentFilter = "ALL";


function filterRooms(
    filter,
    button
) {

    currentFilter = filter;


    document.querySelectorAll(".filter")
        .forEach(item => {

            item.classList.remove("active");

        });


    button.classList.add("active");

    renderClassrooms();

}



function renderClassrooms() {

    const container =
        document.getElementById(
            "classroomList"
        );


    let rooms = classrooms;


    if (currentFilter !== "ALL") {

        rooms =
            classrooms.filter(
                room =>
                    room.status === currentFilter
            );

    }


    container.innerHTML =
        rooms.map(room => {

            const isAvailable =
                room.status === "AVAILABLE";


            const elapsed =
                room.checkInTime
                    ? formatElapsed(
                        Date.now() -
                        room.checkInTime
                    )
                    : "";


            return `

            <div class="classroom-card">

                <div class="classroom-top">

                    <div class="room-number">

                        <div class="room-icon">
                            ⌂
                        </div>

                        <div>

                            <h3>
                                ${room.roomNumber}
                            </h3>

                            <p>
                                Classroom
                            </p>

                        </div>

                    </div>


                    <div
                        class="status ${
                            isAvailable
                                ? "available"
                                : "occupied"
                        }"
                    >

                        <span
                            class="status-dot ${
                                isAvailable
                                    ? "available"
                                    : "occupied"
                            }"
                        ></span>

                        ${
                            isAvailable
                                ? "AVAILABLE"
                                : "OCCUPIED"
                        }

                    </div>

                </div>


                ${
                    !isAvailable
                    ? `

                    <div class="occupied-info">

                        <p>
                            CURRENTLY IN USE
                        </p>

                        <strong>
                            Student:
                            ${room.currentStudent}
                        </strong>

                        <br>

                        <strong>
                            ${room.purpose}
                        </strong>

                        <div class="timer">

                            ⏱ ${elapsed}

                        </div>

                    </div>

                    `
                    : ""
                }


                <div class="classroom-details">

                    <div class="room-info">

                        <div class="info-item">

                            CAPACITY

                            <strong>
                                ${room.capacity}
                            </strong>

                        </div>


                        <div class="info-item">

                            STATUS

                            <strong>
                                ${
                                    isAvailable
                                    ? "Ready"
                                    : "In use"
                                }
                            </strong>

                        </div>

                    </div>


                    ${
                        isAvailable

                        ? `

                        <button
                            class="checkin-btn"
                            onclick="openCheckIn('${room.roomId}')"
                        >
                            CHECK IN
                        </button>

                        `

                        : `

                        <button
                            class="checkout-btn"
                            onclick="openCheckOut('${room.roomId}')"
                        >
                            CHECK OUT
                        </button>

                        `
                    }

                </div>

            </div>

            `;

        }).join("");

}



/* ================= CHECK-IN ================= */

function openCheckIn(roomId) {

    const room =
        classrooms.find(
            item => item.roomId === roomId
        );


    if (!room) return;


    /* Double-check room status */

    if (room.status !== "AVAILABLE") {

        showToast(
            "Sorry, this classroom is currently occupied.",
            "!"
        );

        return;

    }


    selectedRoom = roomId;


    document.getElementById(
        "checkinRoomTitle"
    ).textContent =
        room.roomNumber;


    document.getElementById(
        "studentId"
    ).value = "";


    document.getElementById(
        "purpose"
    ).value = "";


    document.getElementById(
        "duration"
    ).value = "";


    document.getElementById(
        "checkinModal"
    ).classList.add("show");

}



/* ================= CHECK-IN FORM ================= */

document.getElementById(
    "checkinForm"
).addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const studentId =
            document.getElementById(
                "studentId"
            ).value.trim();


        const purpose =
            document.getElementById(
                "purpose"
            ).value;


        const duration =
            document.getElementById(
                "duration"
            ).value;


        /* Validation */

        if (!studentId) {

            showToast(
                "Please enter your Student ID.",
                "!"
            );

            return;

        }


        if (!purpose) {

            showToast(
                "Please select a purpose.",
                "!"
            );

            return;

        }


        if (!duration) {

            showToast(
                "Please select a duration.",
                "!"
            );

            return;

        }


        const room =
            classrooms.find(
                item =>
                    item.roomId === selectedRoom
            );


        /* Check classroom availability again */

        if (
            !room ||
            room.status !== "AVAILABLE"
        ) {

            closeModal("checkinModal");

            showToast(
                "Sorry, this classroom is currently occupied.",
                "!"
            );

            renderAll();

            return;

        }


        const now = Date.now();


        room.status = "OCCUPIED";

        room.currentStudent = studentId;

        room.purpose = purpose;

        room.checkInTime = now;

        room.expectedCheckoutTime =
            now +
            Number(duration) *
            60 *
            1000;


        saveData();


        closeModal(
            "checkinModal"
        );


        showToast(
            `Successfully checked into ${room.roomNumber}.`,
            "✓"
        );


        renderAll();

    }
);



/* ================= CHECK-OUT ================= */

function openCheckOut(roomId) {

    const room =
        classrooms.find(
            item => item.roomId === roomId
        );


    if (!room) return;


    checkoutRoom = roomId;


    document.getElementById(
        "checkoutMessage"
    ).textContent =
        `Are you sure you want to check out of ${room.roomNumber}?`;


    document.getElementById(
        "checkoutModal"
    ).classList.add("show");

}



/* ================= CONFIRM CHECKOUT ================= */

function confirmCheckout() {

    const room =
        classrooms.find(
            item => item.roomId === checkoutRoom
        );


    if (!room) return;


    const checkOutTime =
        Date.now();


    const totalDuration =
        checkOutTime -
        room.checkInTime;


    const record = {

        roomNumber:
            room.roomNumber,

        studentId:
            room.currentStudent,

        purpose:
            room.purpose,

        checkInTime:
            room.checkInTime,

        checkOutTime:
            checkOutTime,

        totalDuration:
            totalDuration

    };


    /* Save history */

    history.unshift(record);


    /* Reset classroom */

    room.status = "AVAILABLE";

    room.currentStudent = "";

    room.purpose = "";

    room.checkInTime = null;

    room.expectedCheckoutTime = null;


    saveData();


    closeModal(
        "checkoutModal"
    );


    showToast(
        `Checked out from ${room.roomNumber}.`,
        "✓"
    );


    renderAll();

}



/* ================= HISTORY ================= */

function renderHistory() {

    const container =
        document.getElementById(
            "historyList"
        );


    if (history.length === 0) {

        container.innerHTML = `

            <div class="history-empty">

                <div class="empty-icon">
                    ◷
                </div>

                <h3>
                    No history yet
                </h3>

                <p>
                    Your completed classroom sessions
                    will appear here.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        history.map(record => {

            return `

            <div class="history-card">

                <div class="history-top">

                    <div>

                        <div class="history-room">
                            ${record.roomNumber}
                        </div>

                        <div class="history-purpose">
                            ${record.purpose}
                        </div>

                    </div>

                    <div class="history-date">
                        ${formatDate(record.checkOutTime)}
                    </div>

                </div>


                <div class="history-details">

                    <div>

                        <span>
                            STUDENT
                        </span>

                        <strong>
                            ${record.studentId}
                        </strong>

                    </div>


                    <div>

                        <span>
                            CHECK-IN
                        </span>

                        <strong>
                            ${formatTime(record.checkInTime)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            TOTAL USAGE
                        </span>

                        <strong>
                            ${formatElapsed(record.totalDuration)}
                        </strong>

                    </div>

                </div>

            </div>

            `;

        }).join("");

}



/* ================= TIME ================= */

function formatTime(timestamp) {

    return new Date(timestamp)
        .toLocaleTimeString(
            "en-MY",
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );

}



function formatDate(timestamp) {

    return new Date(timestamp)
        .toLocaleDateString(
            "en-MY",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

}



function formatElapsed(milliseconds) {

    if (!milliseconds || milliseconds < 0) {

        return "0m";

    }


    const totalSeconds =
        Math.floor(
            milliseconds / 1000
        );


    const hours =
        Math.floor(
            totalSeconds / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    if (hours > 0) {

        return `${hours}h ${minutes}m`;

    }


    if (minutes > 0) {

        return `${minutes}m ${seconds}s`;

    }


    return `${seconds}s`;

}



/* ================= MODAL ================= */

function closeModal(modalId) {

    document.getElementById(
        modalId
    ).classList.remove("show");

}



/* Close modal by clicking background */

document.querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            function(event) {

                if (
                    event.target === modal
                ) {

                    modal.classList.remove(
                        "show"
                    );

                }

            }
        );

    });



/* ================= TOAST ================= */

let toastTimer;


function showToast(
    message,
    icon = "✓"
) {

    const toast =
        document.getElementById(
            "toast"
        );


    document.getElementById(
        "toastMessage"
    ).textContent =
        message;


    document.getElementById(
        "toastIcon"
    ).textContent =
        icon;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}



/* ================= LIVE TIMER ================= */

setInterval(
    function() {

        renderClassrooms();

        renderSummary();

        renderAvailableRooms();

    },
    1000
);



/* ================= START ================= */

renderAll();
