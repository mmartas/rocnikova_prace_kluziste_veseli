<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="css/general.css">
    <link rel="stylesheet" href="css/header.css">
    
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/rezervation.css">

    <link rel="stylesheet" href="query/header-query.css">
    <link rel="stylesheet" href="query/footer-query.css">
    <link rel="stylesheet" href="query/general-query.css">
    
    <title>Kluziště v centru | Rezervace</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    <script src="https://kit.fontawesome.com/9e0a62895a.js" crossorigin="anonymous"></script>

    <link rel="shortcut icon" href="images/favicon-ice-skates.png" type="image/x-icon">


    <!-- FullCalendar -->
    <link href="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/locales-all.global.min.js"></script>

</head>
<body>
    <?php require "assets/header.php"; ?>

    <main>
        <div class="main_container">
            <!-- ÚVOD -->
            <section class="introduction one_container">
                <section class="one_section">
                    <div class="text_section box_glass_effect one_section_left_side">
                        <h1 class="title reveal delay"><span class="underline_color_gradient">Pronajmi</span> si kluziště <span class="underline_color_gradient">pro<br> sebe</span> a užij si to na<br> <span class="text_color_gradient">maximum!</span></h1>
                    </div>
                    <div class="photo_group one_section_right_side">
                        <img src="images/title_background_dark_800.jpg" alt="" class="right_photo_clip">
                    </div>
                </section>
            </section>
            <span class="decoration_red_line"></span>

            <section class="rezervation one_container">
                <section>
                    <p class="text">Formulář pro objednání najdete pod rezervačním kalendářem níže.</p>
                </section>
                <h1 class="title text_color_gradient">rezervační kalendář</h1>
                
                <section class="one_section">
                    <div id="calendar" class="box_glass_effect"></div>
                </section>

                <h1 class="title text_color_gradient">rezervační formulář</h1>
                <section class="one_section rezervation_formular text">
                    <form action="">
                        <div class="client_info_row">
                            <div class="inputBox">
                                <input placeholder=" " type="text" class="box_glass_effect" id="clientName" required>
                                <label for="clientName">Jméno</label>
                            </div>
                            <div class="inputBox">
                                <input placeholder=" " type="text" class="box_glass_effect" id="clientSurname" required>
                                <label for="clientSurname">Příjmení</label>
                            </div>
                        </div>
                        <div class="client_info_row">
                            <div class="inputBox">
                                <input placeholder=" " type="email" name="" id="clientEmail" class="box_glass_effect" required>
                                <label for="clientEmail">Email</label>
                            </div>
                            <div class="inputBox">
                                <input placeholder=" " type="tel" name="" id="clientTel" class="box_glass_effect" required>
                                <label for="clientTel">Tel. číslo</label>
                            </div>
                            
                        </div>
                        <div class="client_info_row">
                            <input type="date" name="" id="clientDate" class="box_glass_effect">
                            <input type="time" name="" id="clientTime" class="box_glass_effect">
                        </div>
                        <div class="client_info_row">
                            <div class="inputBox">
                                <textarea name="" id="clientNotes" class="box_glass_effect"></textarea>
                                <label for="clientNotes">Poznámky</label>
                            </div>
                            
                        </div>
                        
                    </form>
                </section>

                
            </section>

            

            <script>
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
            });
            </script>






        </div>
    </main>

    <button class="box_glass_effect_red" id="arrow_top_scroll" type="button"><i class="fa-solid fa-angles-up"></i></button>
    <?php require "assets/footer.php"; ?>
    <script src="js/header.js"></script>
    <script src="js/general.js"></script>
</body>
</html>


