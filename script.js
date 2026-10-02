// =====================================
// BGTI Updates - PHASE 1
// =====================================


// =====================================
// DEFAULT EVENTS
// =====================================

const defaultEvents = [

    {
        day: "07",
        month: "FEB",
        title: "Annual Sports Meet",
        description:
            "Annual college sports meet featuring cricket, volleyball, kabaddi and other competitions.",
        date: "7 February 2026",
        location: "KNRR College Ground"
    },

    {
        day: "15",
        month: "MAR",
        title: "Technical Fest",
        description:
            "Coding competitions, project exhibitions, quizzes and technical activities.",
        date: "15 March 2026",
        location: "College Auditorium"
    },

    {
        day: "25",
        month: "MAR",
        title: "<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ltural Fest",
        description:
            "Music, dance, <img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ltural performances and student activities.",
        date: "25 March 2026",
        location: "College Campus"
    },

    {
        day: "10",
        month: "APR",
        title: "Project Expo",
        description:
            "Students showcase innovative projects and technical ideas.",
        date: "10 April 2026",
        location: "Seminar Hall"
    }

];


// =====================================
// DEFAULT NOTIFICATIONS
// =====================================

const defaultNotifications = [

    {
        title: "Internal Examination Notification",

        description:
            "Internal examinations will be conducted as per the college schedule.",

        date: "20/09/2026"
    },

    {
        title: "Assignment Submission",

        description:
            "Students are requested to submit their assignments before the deadline.",

        date: "22/09/2026"
    },

    {
        title: "Placement Training Program",

        description:
            "Placement training sessions will be conducted for eligible students.",

        date: "25/09/2026"
    },

    {
        title: "Scholarship Application",

        description:
            "Students can apply for the available scholarship programs.",

        date: "28/09/2026"
    }

];


// =====================================
// DEFAULT SPORTS
// =====================================

const defaultSports = [

    {
        sport: "Cricket",
        title: "Inter College Cricket Tournament",

        description:
            "Cricket team registration and tournament activities.",

        icon: "🏏"
    },

    {
        sport: "Volleyball",
        title: "Volleyball Championship",

        description:
            "Students can participate in the college volleyball championship.",

        icon: "🏐"
    },

    {
        sport: "Kabaddi",
        title: "Kabaddi Tournament",

        description:
            "College-level kabaddi tournament for student teams.",

        icon: "🤼"
    },

    {
        sport: "Athletics",
        title: "Annual Athletics Meet",

        description:
            "Track and field events for interested students.",

        icon: "🏃"
    }

];


// =====================================
// DEFAULT CLUBS
// =====================================

const defaultClubs = [

    {
        name: "Coding Club",

        description:
            "Programming, coding contests and software development activities.",

        icon: "💻"
    },

    {
        name: "Sports Club",

        description:
            "Sports activities, tournaments and fitness programs.",

        icon: "🏆"
    },

    {
        name: "<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ltural Club",

        description:
            "Music, dance, <img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ltural programs and celebrations.",

        icon: "🎭"
    },

    {
        name: "Technical Club",

        description:
            "Technology workshops, projects and technical events.",

        icon: "⚙️"
    },

    {
        name: "Photography Club",

        description:
            "Photography activities, campus coverage and creative work.",

        icon: "📷"
    },

    {
        name: "Literary Club",

        description:
            "Debates, writing, speeches and literary activities.",

        icon: "📚"
    }

];


// =====================================
// LOCAL STORAGE FUNCTIONS
// =====================================

function getSaved(key) {

    return JSON.parse(
        localStorage.getItem(key)
    ) || [];

}


function saveData(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}


// =====================================
// SAFE TEXT FUNCTION
// =====================================

function escapeText(value) {

    const element =
        do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.createElement("div");

    element.textContent = value;

    return element.innerHTML;

}


// =====================================
// DATE FUNCTION
// =====================================

function formatDate(date) {

    return new Date(
        date + "T00:00:00"
    ).toLocaleDateString("en-GB");

}


// =====================================
// ANNOUNCEMENT
// =====================================

function loadAnnouncement() {

    const announcement =
        do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById("announcement");

    if (!announcement) {
        return;
    }

    const savedAnnouncement =
        localStorage.getItem(
            "collegeAnnouncement"
        );

    if (savedAnnouncement) {

        announcement.textContent =
            "📢 " + savedAnnouncement;

    } else {

        announcement.textContent =
            "📢 Welcome to BGTI Updates!";

    }

}

loadAnnouncement();



// =====================================
// EVENTS
// =====================================

const eventList =
    document.getElementById("eventList");


async function loadEvents() {

    if (!eventList) {
        return;
    }

    try {

        const response = await fetch(
            "https://bgti-updates-backend.onrender.com/api/events"
        );

        if (!response.ok) {
            throw new Error("Failed to load events");
        }

        const events = await response.json();

        eventList.innerHTML = "";

        if (events.length === 0) {

            eventList.innerHTML =
                '<div class="empty">No events available.</div>';

            return;
        }

        events.forEach(function (event) {

            const eventCard =
                document.createElement("div");

            eventCard.className =
                "event-card";

            eventCard.innerHTML = `

                <div class="event-date">

                    <span class="day">
                        ${escapeText(event.date || "")}
                    </span>

                    <span class="month">
                        EVENT
                    </span>

                </div>

                <div class="event-details">

                    <h3>
                        ${escapeText(event.title || "")}
                    </h3>

                    <p>
                        ${escapeText(event.description || "")}
                    </p>

                    <div class="event-info">

                        <span>
                            📅 ${escapeText(event.date || "")}
                        </span>

                        <span>
                            📍 ${escapeText(
                                event.venue ||
                                event.location ||
                                ""
                            )}
                        </span>

                    </div>

                </div>

            `;

            eventCard.addEventListener(
                "click",
                function () {

                    const modal =
                        document.getElementById(
                            "eventModal"
                        );

                    if (!modal) {
                        return;
                    }

                    document.getElementById(
                        "modalTitle"
                    ).textContent =
                        event.title || "";

                    document.getElementById(
                        "modalDescription"
                    ).textContent =
                        event.description || "";

                    document.getElementById(
                        "modalDate"
                    ).textContent =
                        event.date || "";

                    document.getElementById(
                        "modalLocation"
                    ).textContent =
                        event.venue ||
                        event.location ||
                        "";

                    modal.style.display =
                        "flex";

                }
            );

            eventList.appendChild(
                eventCard
            );

        });

    } catch (error) {

        console.error(
            "Error loading events:",
            error
        );

        eventList.innerHTML =
            '<div class="empty">Unable to load events.</div>';
    }
}


loadEvents();

// =====================================
// EVENT SEARCH
// =====================================

const eventSearch =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
        "eventSearch"
    );


if (eventSearch) {

    eventSearch.addEventListener(
        "input",
        function () {

            const searchText =
                eventSearch.value.toLowerCase();


            const eventCards =
                do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.querySelectorAll(
                    ".event-card"
                );


            eventCards.forEach(
                function (card) {

                    const cardText =
                        card.textContent
                            .toLowerCase();


                    if (
                        cardText.includes(
                            searchText
                        )
                    ) {

                        card.style.display =
                            "flex";

                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );

        }
    );

}


// =====================================
// EVENT MODAL
// =====================================

const eventModal =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
        "eventModal"
    );


const closeModal =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
        "closeModal"
    );


if (closeModal && eventModal) {

    closeModal.addEventListener(
        "click",
        function () {

            eventModal.style.display =
                "none";

        }
    );

}


if (eventModal) {

    eventModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                eventModal
            ) {

                eventModal.style.display =
                    "none";

            }

        }
    );

}


// =====================================
// NOTIFICATIONS
// =====================================

const savedNotifications =
    getSaved(
        "collegeNotifications"
    );


const allNotifications = [

    ...defaultNotifications,

    ...savedNotifications

];


const notificationList =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
        "notificationList"
    );


if (notificationList) {

    if (
        allNotifications.length === 0
    ) {

        notificationList.innerHTML =
            '<div class="empty">No notifications available.</div>';

    }


    allNotifications.forEach(
        function (notification) {

            const card =
                do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.createElement(
                    "div"
                );


            card.className =
                "notification-card";


            card.innerHTML = `

                <div class="notification-icon">

                    📢

                </div>


                <div class="notification-content">

                    <h3>
                        ${escapeText(
                            notification.title
                        )}
                    </h3>

                    <p>
                        ${escapeText(
                            notification.description
                        )}
                    </p>

                    <span class="notification-date">

                        📅
                        ${escapeText(
                            notification.date
                        )}

                    </span>

                </div>

            `;


            notificationList.appendChild(
                card
            );

        }
    );

}


// =====================================
// SPORTS
// =====================================

const savedSports =
    getSaved("collegeSports");


const allSports = [

    ...defaultSports,

    ...savedSports

];


const sportsList =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
        "sportsList"
    );


if (sportsList) {

    allSports.forEach(
        function (sport) {

            const card =
                do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.createElement(
                    "div"
                );


            card.className =
                "sports-big-card";


            card.innerHTML = `

                <div class="sports-image">

                    ${escapeText(
                        sport.icon ||
                        "🏆"
                    )}

                </div>


                <div class="sports-content">

                    <span class="sports-category">

                        ${escapeText(
                            sport.sport
                        )}

                    </span>


                    <h3>

                        ${escapeText(
                            sport.title
                        )}

                    </h3>


                    <p>

                        ${escapeText(
                            sport.description
                        )}

                    </p>

                </div>

            `;


            sportsList.appendChild(
                card
            );

        }
    );

}


// =====================================
// SPORTS RESULTS
// =====================================

const resultsList =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
        "resultsList"
    );


if (resultsList) {

    const results =
        getSaved("collegeResults");


    if (results.length === 0) {

        resultsList.innerHTML = `

            <div class="card">

                <h3>
                    Recent Result
                </h3>

                <p>
                    Sports results will be
                    updated here.
                </p>

                <p class="result-status">
                    Coming Soon
                </p>

            </div>

        `;

    } else {

        results.forEach(
            function (result) {

                const card =
                    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.createElement(
                        "div"
                    );


                card.className =
                    "card";


                card.innerHTML = `

                    <h3>
                        ${escapeText(
                            result.title
                        )}
                    </h3>

                    <p>
                        ${escapeText(
                            result.result
                        )}
                    </p>

                    <p class="result-status">

                        ${escapeText(
                            result.status ||
                            "Completed"
                        )}

                    </p>

                `;


                resultsList.appendChild(
                    card
                );

            }
        );

    }

}


// =====================================
// CLUBS
// =====================================

const savedClubs =
    getSaved("collegeClubs");


const allClubs = [

    ...defaultClubs,

    ...savedClubs

];


const clubList =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
        "clubList"
    );


if (clubList) {

    allClubs.forEach(
        function (club) {

            const card =
                do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.createElement(
                    "div"
                );


            card.className =
                "club-card";


            card.innerHTML = `

                <div class="club-icon">

                    ${escapeText(
                        club.icon ||
                        "👥"
                    )}

                </div>


                <h3>

                    ${escapeText(
                        club.name
                    )}

                </h3>


                <p>

                    ${escapeText(
                        club.description
                    )}

                </p>

            `;


            clubList.appendChild(
                card
            );

        }
    );

}


// =====================================
// HOMEPAGE EVENTS
// =====================================

const homeEvents =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
        "homeEvents"
    );


if (homeEvents) {

    const latestEvents =
        allEvents
            .slice(-3)
            .reverse();


    latestEvents.forEach(
        function (event) {

            const card =
                do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.createElement(
                    "div"
                );


            card.className =
                "card";


            card.innerHTML = `

                <h3>
                    📅
                    ${escapeText(
                        event.title
                    )}
                </h3>

                <p>
                    ${escapeText(
                        event.date
                    )}
                </p>

                <p>
                    📍
                    ${escapeText(
                        event.location
                    )}
                </p>

            `;


            homeEvents.appendChild(
                card
            );

        }
    );

}


// =====================================
// HOMEPAGE NOTIFICATIONS
// =====================================

const homeNotifications =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
        "homeNotifications"
    );


if (homeNotifications) {

    const latestNotifications =
        allNotifications
            .slice(-3)
            .reverse();


    latestNotifications.forEach(
        function (notification) {

            const card =
                do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.createElement(
                    "div"
                );


            card.className =
                "card";


            card.innerHTML = `

                <h3>
                    🔔
                    ${escapeText(
                        notification.title
                    )}
                </h3>

                <p>
                    ${escapeText(
                        notification.description
                    )}
                </p>

                <p>
                    📅
                    ${escapeText(
                        notification.date
                    )}
                </p>

            `;


            homeNotifications.appendChild(
                card
            );

        }
    );

}

// =====================================
// ADMIN - ADD EVENT
// =====================================

const eventForm =
    document.getElementById("eventForm");

if (eventForm) {

    eventForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const title =
                document.getElementById(
                    "eventTitle"
                ).value.trim();

            const description =
                document.getElementById(
                    "eventDescription"
                ).value.trim();

            const date =
                document.getElementById(
                    "eventDate"
                ).value;

            const venue =
                document.getElementById(
                    "eventLocation"
                ).value.trim();

            const category =
                document.getElementById(
                    "eventCategory"
                ).value;

            if (
                !title ||
                !description ||
                !date ||
                !venue ||
                !category
            ) {

                alert(
                    "Please fill all the fields."
                );

                return;
            }

            const newEvent = {

                title: title,

                description: description,

                date: date,

                venue: venue,

                category: category
            };

            try {

                const response =
                    await fetch(
                        "https://bgti-updates-backend.onrender.com/api/events",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    newEvent
                                )
                        }
                    );

                const result =
                    await response.json();

                if (!response.ok) {

                    throw new Error(
                        result.error ||
                        "Failed to add event"
                    );
                }

                alert(
                    "Event added successfully!"
                );

                eventForm.reset();

                location.reload();

            } catch (error) {

                console.error(
                    "Error adding event:",
                    error
                );

                alert(
                    "Unable to add event. Please try again."
                );
            }
        }
    );
}


// =====================================
// ADMIN - ADD NOTIFICATION
// =====================================

const notificationForm =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
        "notificationForm"
    );


if (notificationForm) {

    notificationForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const title =
                do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
                    "notificationTitle"
                ).value.trim();


            const description =
                do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
                    "notificationDescription"
                ).value.trim();


            const date =
                do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
                    "notificationDate"
                ).value;


            if (
                !title ||
                !description ||
                !date
            ) {

                alert(
                    "Please fill all the fields."
                );

                return;

            }


            const newNotification = {

                title:
                    title,

                description:
                    description,

                date:
                    formatDate(date)

            };


            const saved =
                getSaved(
                    "collegeNotifications"
                );


            saved.push(
                newNotification
            );


            saveData(
                "collegeNotifications",
                saved
            );


            alert(
                "Notification added successfully!"
            );


            notificationForm.reset();


            location.reload();

        }
    );

}


// =====================================
// ADMIN - ADD SPORTS
// =====================================

const sportsForm =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
        "sportsForm"
    );


if (sportsForm) {

    sportsForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const sport =
                do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
                    "sportName"
                ).value.trim();


            const title =
                do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
                    "sportTitle"
                ).value.trim();


            const description =
                do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
                    "sportDescription"
                ).value.trim();


            const icon =
                do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
                    "sportIcon"
                ).value.trim();


            if (
                !sport ||
                !title ||
                !description
            ) {

                alert(
                    "Please fill all the fields."
                );

                return;

            }


            const newSport = {

                sport:
                    sport,

                title:
                    title,

                description:
                    description,

                icon:
                    icon || "🏆"

            };


            const saved =
                getSaved(
                    "collegeSports"
                );


            saved.push(
                newSport
            );


            saveData(
                "collegeSports",
                saved
            );


            alert(
                "Sports update added successfully!"
            );


            sportsForm.reset();


            location.reload();

        }
    );

}


// =====================================
// ADMIN - ADD CLUB
// =====================================

const clubForm =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
        "clubForm"
    );


if (clubForm) {

    clubForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
                    "clubName"
                ).value.trim();


            const description =
                do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
                    "clubDescription"
                ).value.trim();


            const icon =
                do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
                    "clubIcon"
                ).value.trim();


            if (
                !name ||
                !description
            ) {

                alert(
                    "Please fill all the fields."
                );

                return;

            }


            const newClub = {

                name:
                    name,

                description:
                    description,

                icon:
                    icon || "👥"

            };


            const saved =
                getSaved(
                    "collegeClubs"
                );


            saved.push(
                newClub
            );


            saveData(
                "collegeClubs",
                saved
            );


            alert(
                "Club added successfully!"
            );


            clubForm.reset();


            location.reload();

        }
    );

}


// =====================================
// ADMIN - ANNOUNCEMENT
// =====================================

const announcementForm =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
        "announcementForm"
    );


if (announcementForm) {

    announcementForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const text =
                do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
                    "announcementText"
                ).value.trim();


            if (!text) {

                alert(
                    "Please enter an announcement."
                );

                return;

            }


            localStorage.setItem(
                "collegeAnnouncement",
                text
            );


            alert(
                "Announcement updated successfully!"
            );


            announcementForm.reset();


            location.reload();

        }
    );

}


// =====================================
// ADMIN - MANAGE EVENTS
// =====================================

const adminEventList =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
        "adminEventList"
    );


if (adminEventList) {

    const saved =
        getSaved(
            "collegeEvents"
        );


    if (saved.length === 0) {

        adminEventList.innerHTML =
            '<div class="admin-message">No events have been added yet.</div>';

    } else {

        saved.forEach(
            function (event, index) {

                const item =
                    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.createElement(
                        "div"
                    );


                item.className =
                    "admin-item";


                item.innerHTML = `

                    <div>

                        <h3>
                            ${escapeText(
                                event.title
                            )}
                        </h3>

                        <p>
                            📅
                            ${escapeText(
                                event.date
                            )}
                        </p>

                        <p>
                            📍
                            ${escapeText(
                                event.location
                            )}
                        </p>

                    </div>


                    <button
                        class="delete-btn"
                        data-index="${index}"
                        data-type="event">

                        Delete

                    </button>

                `;


                adminEventList.appendChild(
                    item
                );

            }
        );

    }

}


// =====================================
// ADMIN - MANAGE NOTIFICATIONS
// =====================================

const adminNotificationList =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
        "adminNotificationList"
    );


if (adminNotificationList) {

    const saved =
        getSaved(
            "collegeNotifications"
        );


    if (saved.length === 0) {

        adminNotificationList.innerHTML =
            '<div class="admin-message">No notifications have been added yet.</div>';

    } else {

        saved.forEach(
            function (
                notification,
                index
            ) {

                const item =
                    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.createElement(
                        "div"
                    );


                item.className =
                    "admin-item";


                item.innerHTML = `

                    <div>

                        <h3>
                            ${escapeText(
                                notification.title
                            )}
                        </h3>

                        <p>
                            ${escapeText(
                                notification.description
                            )}
                        </p>

                        <p>
                            📅
                            ${escapeText(
                                notification.date
                            )}
                        </p>

                    </div>


                    <button
                        class="delete-btn"
                        data-index="${index}"
                        data-type="notification">

                        Delete

                    </button>

                `;


                adminNotificationList.appendChild(
                    item
                );

            }
        );

    }

}


// =====================================
// ADMIN - MANAGE SPORTS
// =====================================

const adminSportsList =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
        "adminSportsList"
    );


if (adminSportsList) {

    const saved =
        getSaved(
            "collegeSports"
        );


    if (saved.length === 0) {

        adminSportsList.innerHTML =
            '<div class="admin-message">No sports updates have been added yet.</div>';

    } else {

        saved.forEach(
            function (
                sport,
                index
            ) {

                const item =
                    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.createElement(
                        "div"
                    );


                item.className =
                    "admin-item";


                item.innerHTML = `

                    <div>

                        <h3>
                            ${escapeText(
                                sport.title
                            )}
                        </h3>

                        <p>
                            🏆
                            ${escapeText(
                                sport.sport
                            )}
                        </p>

                    </div>


                    <button
                        class="delete-btn"
                        data-index="${index}"
                        data-type="sport">

                        Delete

                    </button>

                `;


                adminSportsList.appendChild(
                    item
                );

            }
        );

    }

}


// =====================================
// ADMIN - MANAGE CLUBS
// =====================================

const adminClubList =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.getElementById(
        "adminClubList"
    );


if (adminClubList) {

    const saved =
        getSaved(
            "collegeClubs"
        );


    if (saved.length === 0) {

        adminClubList.innerHTML =
            '<div class="admin-message">No clubs have been added yet.</div>';

    } else {

        saved.forEach(
            function (
                club,
                index
            ) {

                const item =
                    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.createElement(
                        "div"
                    );


                item.className =
                    "admin-item";


                item.innerHTML = `

                    <div>

                        <h3>
                            ${escapeText(
                                club.name
                            )}
                        </h3>

                        <p>
                            ${escapeText(
                                club.description
                            )}
                        </p>

                    </div>


                    <button
                        class="delete-btn"
                        data-index="${index}"
                        data-type="club">

                        Delete

                    </button>

                `;


                adminClubList.appendChild(
                    item
                );

            }
        );

    }

}


// =====================================
// DELETE BUTTONS
// =====================================

const deleteButtons =
    do<img src="images/bgti-logo.jpg" alt="BGTI Logo" class="bgti-logo">ment.querySelectorAll(
        ".delete-btn"
    );


deleteButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const index =
                    parseInt(
                        button.dataset.index
                    );


                const type =
                    button.dataset.type;


                let storageKey;


                if (type === "event") {

                    storageKey =
                        "collegeEvents";

                }

                else if (
                    type === "notification"
                ) {

                    storageKey =
                        "collegeNotifications";

                }

                else if (
                    type === "sport"
                ) {

                    storageKey =
                        "collegeSports";

                }

                else if (
                    type === "club"
                ) {

                    storageKey =
                        "collegeClubs";

                }


                if (!storageKey) {
                    return;
                }


                const confirmDelete =
                    confirm(
                        "Are you sure you want to delete this item?"
                    );


                if (!confirmDelete) {
                    return;
                }


                const saved =
                    getSaved(
                        storageKey
                    );


                saved.splice(
                    index,
                    1
                );


                saveData(
                    storageKey,
                    saved
                );


                alert(
                    "Item deleted successfully!"
                );


                location.reload();

            }
        );

    }
);


// =====================================
// PAGE LOAD MESSAGE
// =====================================

console.log(
    "BGTI Updates Phase 1 loaded successfully!"
);