document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'cs',

        initialView: 'timeGridWeek',

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

        events: 'events.php'

        

    });

    calendar.render();

    // 🔥 FORM SUBMIT SEM
    document.getElementById("rezervationForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        console.log("jede to");

        const data = {
            name: document.getElementById("clientName").value,
            surname: document.getElementById("clientSurname").value,
            email: document.getElementById("clientEmail").value,
            tel: document.getElementById("clientTel").value,
            date: document.getElementById("clientDate").value,
            time: document.getElementById("clientTime").value,
            notes: document.getElementById("clientNotes").value
        };

        const res = await fetch("save-rezervation.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.status === "ok") {
            alert("Rezervace uložena!");
            calendar.refetchEvents(); // 🔥 lepší než reload
        } else {
            alert("Chyba: " + result.message);
        }
    });
});
            