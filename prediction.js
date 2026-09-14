
const predictionPatterns = {

    A101: {
        morning: 78,
        afternoon: 55,
        evening: 82
    },

    A102: {
        morning: 60,
        afternoon: 35,
        evening: 70
    },

    A103: {
        morning: 85,
        afternoon: 65,
        evening: 88
    },

    B201: {
        morning: 48,
        afternoon: 30,
        evening: 65
    },

    B202: {
        morning: 72,
        afternoon: 58,
        evening: 80
    },

    B203: {
        morning: 88,
        afternoon: 73,
        evening: 91
    },

    C301: {
        morning: 45,
        afternoon: 25,
        evening: 55
    },

    C302: {
        morning: 80,
        afternoon: 60,
        evening: 85
    }

};


function getPredictionScore(
    room,
    hour
) {

    let period;


    if (hour < 12) {

        period = "morning";

    } else if (hour < 17) {

        period = "afternoon";

    } else {

        period = "evening";

    }


    let score =
        predictionPatterns[room][period];


    /*
        WEEKEND BONUS

        Classrooms tend to have lower usage
        during weekends.
    */

    const selectedDate =
        document.getElementById(
            "predictionDate"
        ).value;


    if (selectedDate) {

        const day =
            new Date(
                selectedDate
            ).getDay();


        if (day === 0 || day === 6) {

            score += 12;

        }

    }


    /*
        SMALL RANDOM VARIATION

        Simulates real-world variation.
    */

    const variation =
        Math.floor(
            Math.random() * 9
        ) - 4;


    score += variation;


    score =
        Math.max(
            5,
            Math.min(
                97,
                score
            )
        );


    return score;

}


function predictAvailability() {

    const room =
        document.getElementById(
            "predictionRoom"
        ).value;


    const date =
        document.getElementById(
            "predictionDate"
        ).value;


    const time =
        document.getElementById(
            "predictionTime"
        ).value;


    if (!date || !time) {

        alert(
            "Please select a date and time."
        );

        return;

    }


    const hour =
        Number(
            time.split(":")[0]
        );


    const score =
        getPredictionScore(
            room,
            hour
        );


    let level;


    if (score >= 75) {

        level = "HIGH";

    } else if (score >= 50) {

        level = "MEDIUM";

    } else {

        level = "LOW";

    }


    const result =
        document.getElementById(
            "predictionResult"
        );


    result.innerHTML = `

        <div class="ai-circle">
            AI
        </div>


        <div class="probability">
            ${score}%
        </div>


        <div class="probability-label">
            Probability of classroom availability
        </div>


        <div class="progress">

            <div
                class="progress-fill"
                style="width:${score}%"
            ></div>

        </div>


        <h2 style="margin-top:25px">
            ${level} Availability
        </h2>


        <p style="margin-top:10px">

            Classroom <strong>${room}</strong>

            is predicted to have a

            <strong>${score}%</strong>

            chance of being available on

            <strong>${date}</strong>

            at

            <strong>${time}</strong>.

        </p>

    `;

}


/* DEFAULT DATE */

const today =
    new Date()
        .toISOString()
        .split("T")[0];


document.getElementById(
    "predictionDate"
).value = today;
