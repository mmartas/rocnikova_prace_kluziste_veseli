const modal = document.getElementById("modalOverlay");
const closeCross = document.querySelectorAll(".closeCross");

const formSide = document.querySelector(".rezervation_formular");
const messageSide = document.querySelector(".submit_message");
const messageContent = document.getElementById("message_content");
const modalWindow = document.querySelector(".modal_window")
const errorMessage = document.getElementById("error_message");

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'cs',

        initialView: 'timeGridWeek',

        dateClick: function(info) {
            calendar.changeView('timeGridDay', info.date);
        },

        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,dayGridMonth'
        },

        buttonText: {
            today: "Dnes",
            week: "Týden",
            day: "Den",
            month: "Měsíc"
        },
        
        expandRows: false,
        height: 'auto',
        firstDay: 1,

        slotMinTime: '06:00:00',
        slotMaxTime: '23:00:00',

        slotDuration: '01:00:00',
        slotLabelInterval: '01:00',

        allDaySlot: false,

        events: "events.php",

        eventClassNames: function(arg) {
            const type = arg.event.extendedProps.type;
            const booked = arg.event.extendedProps.booked;

            if (type === "rent" && !booked) {
                return ["rent-event"];
            }
            return [];
        },

        eventClick: function(info){
            const type = info.event.extendedProps.type;
            const booked = info.event.extendedProps.booked;

            if (type !== "rent" || booked) {
                return;
            }

            openModal(info.event.startStr, info.event.endStr);
        },

        /* nezalomení hlavičky "po 11.4." při responzivitě */
        dayHeaderContent: function(arg) {
            const date = arg.date;

            const day = date.toLocaleDateString('cs-CZ', { weekday: 'short' });
            const fullDate = date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric' });

            return {
                html: `
                    <div class="day-header">
                        <span class="day-name">${day}</span>
                        <span class="day-date">${fullDate}</span>
                    </div>
                `
            };
        },

    });

    calendar.render();

    // formulář
    document.getElementById("rezervationForm").addEventListener("submit", function(e) {
        e.preventDefault();
        
        const data = new FormData(this);

        sendReservation(data)
        .then(res => {

            if (res.success) {

                formSide.style.display = "none";

                const formValues = getFormData();

                messageSide.style.display = "flex";
                messageContent.innerHTML = `
                    <p><strong>Jméno:</strong> ${name} ${surname}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Termín:</strong> ${date}</p>
                `;

                
                modalWindow.classList.add("active");
                

                calendar.refetchEvents();
            } else {
                errorMessage.style.display = "flex";
                modalWindow.classList.add("wrong");
                errorMessage.textContent = "Došlo k chybě, obnovte stránku a zkuste to znovu. ";
            }
        });
    });
});

if(modal.style.display != "flex"){
    document.body.classList.remove("no-scroll");
}

closeCross.forEach(cross => {
    cross.addEventListener("click", closeModal);
});
window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

// otevření modalu
function openModal(start, end) {
    modal.style.display = "flex";
    document.body.classList.add("no-scroll");

    const s = new Date(start);
    const e = new Date(end);

    const startTime =
        s.getHours().toString().padStart(2, "0") + ":" +
        s.getMinutes().toString().padStart(2, "0");

    const endTime =
        e.getHours().toString().padStart(2, "0") + ":" +
        e.getMinutes().toString().padStart(2, "0");

    const dateText =
        s.getDate() + "." +
        (s.getMonth() + 1) + "." +
        s.getFullYear();

    document.getElementById("selectedDate").textContent =
        dateText + " " + startTime + " - " + endTime;
    document.getElementById("selectedDateInput").value = start;
}

// zavření modalu
function closeModal() {
    modal.style.display = "none";
    document.body.classList.remove("no-scroll");
}

// uložení rezervace
function sendReservation(data) {
    return fetch("save-rezervation.php", {
        method: "POST",
        body: data
    })

    .then(res => res.json());
}

// načtení vyplněných hodnot z formuláře
function getFormData() {
    return {
        name: document.getElementById("clientName").value,
        surname: document.getElementById("clientSurname").value,
        email: document.getElementById("clientEmail").value,
        date: document.getElementById("selectedDate").textContent
    };
}