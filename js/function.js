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