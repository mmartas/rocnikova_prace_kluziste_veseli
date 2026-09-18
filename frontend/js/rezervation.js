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

        dayMaxEvents: 3,

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
        moreLinkText: 'další',

        events: "http://localhost:3000/api/events",

        // cursor pointer na políčka "možnost pronájmu"
        eventClassNames: function(arg) {
            const type = arg.event.extendedProps.type;
            const booked = arg.event.extendedProps.booked;

            if(type === 'rent') {
                if(!booked) {
                    return ['event-rent-available'];
                } else {
                    return ['event-rent-booked'];
                }
            } else if (type === 'public') {
                return ['event-public'];
            } else if (type === 'booked') {
                return ['event-booked'];
            } else if (type === 'maintenance') {
                return ['event-maintenance'];
            } else if (type === 'school') {
                return ['event-school'];
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

            window.selectedEventId = info.event.id; // Uložíme ID vybraného eventu do globální proměnné
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
            const day = date.toLocaleDateString('cs-CZ', { weekday: 'short' });
            const fullDate = date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric' });
            const dayDate = date.toLocaleDateString('cs-CZ', { day: 'numeric' });

            if (arg.view.type === "dayGridMonth") {
                return {
                    html: `<span class="day-name">${day}</span>`
                };
            }

            if (arg.view.type === "timeGridWeek" && window.innerWidth <= 430) {
                return {
                    html: `
                        <div class="day-header">
                            <span class="day-name">${day}</span>
                            <span class="day-date">${dayDate}</span>
                        </div>
                    `
                };
            }

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
        
        // 1. Získáme data z formuláře
        const formData = {
            event_id: window.selectedEventId, // Přibalíme ID vybraného eventu z kalendáře
            name: document.getElementById("clientName").value,     // Uprav si podle reálných ID tvých inputů ve formuláři
            email: document.getElementById("clientEmail").value    // Uprav si podle reálných ID tvých inputů ve formuláři
        };

        // 2. Pošleme data přes fetch na náš nový POST endpoint do server.js
        fetch('http://localhost:3000/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(res => {
            if (res.success) {
                formSide.style.display = "none";
                messageSide.style.display = "flex";

                messageContent.innerHTML = `
                    <p><strong>Jméno:</strong> ${formData.name}</p>
                    <p><strong>Email:</strong> ${formData.email}</p>
                `;

                modalWindow.classList.add("active");
                modalWindow.classList.remove("wrong");
                
                // Klíčový krok: Přinutí FullCalendar znova stáhnout data a překreslit slot na červeno ("Obsazeno")
                calendar.refetchEvents(); 
            } else {
                errorMessage.style.display = "flex";
                modalWindow.classList.add("wrong");
                modalWindow.classList.remove("active");
                errorMessage.textContent = "Došlo k chybě, obnovte stránku a zkuste to znovu.";
            }
        })
        .catch(error => console.error('Chyba:', error));
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


// Příklad funkce, která se zavolá po odeslání tvého modálního formuláře:
function handleReservationSubmit(eventData) {
    fetch('http://localhost:3000/api/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData) // např. { event_id, name, email }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // 1. Zavřeme modal
            closeModal();
            
            // 2. Klíčový krok: Přinutíme FullCalendar znova stáhnout data z backendu!
            calendar.refetchEvents(); 
        } else {
            alert("Chyba: " . data.error);
        }
    })
    .catch(error => console.error('Chyba:', error));
}