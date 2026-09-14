
function getHistory() {

    return JSON.parse(
        localStorage.getItem(
            "smartclass_history"
        )
    ) || [];

}


function renderHistory() {

    const list =
        document.getElementById(
            "historyList"
        );


    const history =
        getHistory();


    list.innerHTML = "";


    if (history.length === 0) {

        list.innerHTML = `

            <div class="history-empty">

                No classroom activity yet.

                <br><br>

                Check into a classroom to create
                your first record.

            </div>

        `;

        return;

    }


    history.forEach(item => {

        const row =
            document.createElement("div");


        row.className =
            "history-row";


        row.innerHTML = `

            <strong>
                ${item.room}
            </strong>


            <span>
                ${item.student}
            </span>


            <span>
                ${item.purpose}
            </span>


            <span>
                ${item.checkIn}
            </span>


            <span>
                ${item.checkOut}
            </span>


            <span>

                <span
                    class="status ${
                        item.status === "Active"
                            ? "available"
                            : "occupied"
                    }"
                >

                    ${item.status}

                </span>

            </span>

        `;


        list.appendChild(row);

    });

}


function clearHistory() {

    const confirmClear =
        confirm(
            "Are you sure you want to clear all history?"
        );


    if (!confirmClear)
        return;


    localStorage.removeItem(
        "smartclass_history"
    );


    renderHistory();

}


renderHistory();
