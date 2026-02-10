<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="css/general.css">
    <link rel="stylesheet" href="css/header.css">
    
    <link rel="stylesheet" href="css/footer.css">

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

    <style>
        #calendar {
            background: white;
            padding: 10px;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <?php require "assets/header.php"; ?>

    <main>
        <div class="main_container">
            <!-- ÚVOD -->
            <section class="introduction one_container">
                <section class="one_section">
                    <div class="text_section box_glass_effect one_section_left_side">
                        <h1 class="title"><span class="underline_color_gradient">Pronajmi</span> si kluziště <span class="underline_color_gradient">pro<br> sebe</span> a užij si to na<br> <span class="text_color_gradient">maximum!</span></h1>
                    </div>
                    <div class="photo_group one_section_right_side">
                        <img src="images/title_background_dark_800.jpg" alt="" class="right_photo_clip">
                    </div>
                </section>
            </section>
            <span class="decoration_red_line"></span>

            <section clas="rezervation one_container">
                <h1 class="title text_color_gradient">rezervační kalendář</h1>
            </section>

            <div id="calendar"></div>

            <script>
            document.addEventListener('DOMContentLoaded', function () {
                const calendarEl = document.getElementById('calendar');

                const calendar = new FullCalendar.Calendar(calendarEl, {
                    locale: 'cs',

                    initialView: 'timeGridDay',

                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'timeGridDay,timeGridWeek'
                    },

                    slotMinTime: '08:00:00',
                    slotMaxTime: '18:00:00',

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


