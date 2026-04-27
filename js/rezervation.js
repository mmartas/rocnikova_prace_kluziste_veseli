const modal = document.getElementById("modalOverlay");
const closeCross = document.getElementById("closeCross");

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
            if (arg.event.extendedProps.type === "rent") {
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
        //console.log("jede to");
        const data = new FormData(this);

        fetch("save-rezervation.php", {
            method: "POST",
            body: data
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                alert("Rezervace uložená");
                modal.style.display = "none";
                calendar.refetchEvents();
            } else {
                alert("Termín je obsazený");
            }
        });
    });
});


/**
 * otevření a zavření modalu
 */
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

closeCross.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove("no-scroll");
});
window.addEventListener("click", (e) => {
    if(e.target === modal){
        modal.style.display = "none";
        document.body.classList.remove("no-scroll");
    }
});

if(modal.style.display != "flex"){
    document.body.classList.remove("no-scroll");
}





