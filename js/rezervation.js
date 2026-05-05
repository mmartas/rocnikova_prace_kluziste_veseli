const modal = document.getElementById("modalOverlay");
const closeCross = document.querySelectorAll(".closeCross");

const formSide = document.querySelector(".rezervation_formular");
const messageSide = document.querySelector(".submit_message");
const messageContent = document.getElementById("message_content");
const modalWindow = document.querySelector(".modal_window")
const errorMessage = document.getElementById("error_message");

const calendarEl = document.getElementById('calendar');

document.addEventListener('DOMContentLoaded', function () {
    // kalendář
    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'cs',

        initialView: 'timeGridWeek',

        dayHeaderDidMount: function(info) {

            if (info.view.type === "dayGridMonth") return;

            info.el.style.cursor = "pointer";

            info.el.addEventListener("click", () => {
                calendar.changeView('timeGridDay', info.date);
            });
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

        events: "/events.php",

        // cursor pointer na políčka "možnost pronájmu"
        eventClassNames: function(arg) {
            const type = arg.event.extendedProps.type;
            const booked = arg.event.extendedProps.booked;

            if (type === "rent" && !booked) {
                return ["rent-event"];
            }
            return [];
        },

        // otevření modalu při kliknutí na políčko "možnost pronájmu"
        eventClick: function(info){
            const type = info.event.extendedProps.type;
            const booked = info.event.extendedProps.booked;

            if (type !== "rent" || booked) {
                return;
            }

            openModal(info.event.startStr, info.event.endStr);
        },

        dayCellDidMount: function(info) {
            if (info.view.type === "dayGridMonth") {
                info.el.style.cursor = "pointer";
            }
        },

        dateClick: function(info) {
            if (info.view.type === "dayGridMonth") {
                calendar.changeView('timeGridDay', info.date);
            }
        },

        /* nezalomení hlavičky "po 11.4." při responzivitě */
        dayHeaderContent: function(arg) {

            const date = arg.date;

            if (arg.view.type === "dayGridMonth") {
                const day = date.toLocaleDateString('cs-CZ', { weekday: 'short' });

                return {
                    html: `<span class="day-name">${day}</span>`
                };
            }

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
                    <p><strong>Jméno:</strong> ${formValues.name} ${formValues.surname}</p>
                    <p><strong>Email:</strong> ${formValues.email}</p>
                    <p><strong>Termín:</strong> ${formValues.date}</p>
                `;

                modalWindow.classList.add("active");
                modalWindow.classList.remove("wrong");
                
                calendar.refetchEvents();
            } else {
                errorMessage.style.display = "flex";

                modalWindow.classList.add("wrong");
                modalWindow.classList.remove("active");

                errorMessage.textContent = "Došlo k chybě, obnovte stránku a zkuste to znovu. ";
            }
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
});