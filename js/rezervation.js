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

        eventSources: [
            // "slots.php",
            "events.php"
        ],


        eventClick: function(info){
            if (info.event.extendedProps.type !== "rent") return;

            openModal(info.event.startStr);
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

    // 🔥 FORM SUBMIT
    document.getElementById("rezervationForm").addEventListener("submit", function(e) {
        e.preventDefault();

        console.log("jede to");


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


/** */
// const openBtn = document.getElementById("open");
// openBtn.addEventListener("click", () => {
//     modal.style.display = "flex";
//     document.body.classList.add("no-scroll");
// })
/** */

/**
 * otevření a zavření modalu
 */
const modal = document.getElementById("modalOverlay");
const closeBtn = document.getElementById("closeCross");
function openModal(date) {
    modal.style.display = "flex";
    document.getElementById("selectedDate").textContent = date;
    document.getElementById("selectedDateInput").value = date;
}
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove("no-scroll");
});
window.addEventListener("click", (e) => {
    if(e.target === modal){
        modal.style.display = "none";
        document.body.classList.remove("no-scroll");
    }
    
});



