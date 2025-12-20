<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="css/general.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/webkamera.css">
    
    <link rel="stylesheet" href="css/footer.css">

    <link rel="stylesheet" href="query/header-query.css">
    <link rel="stylesheet" href="query/footer-query.css">
    <link rel="stylesheet" href="query/webkamera-query.css">
    <link rel="stylesheet" href="query/general-query.css">
    
    <title>Kluziště v centru | Webkamera</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    <script src="https://kit.fontawesome.com/9e0a62895a.js" crossorigin="anonymous"></script>

    <link rel="shortcut icon" href="images/favicon-ice-skates.png" type="image/x-icon">
</head>
<body>
    <?php require "assets/header.php"; ?>

    <main>
        <div class="main_container">
            <!-- ÚVOD -->
            <section class="introduction one_container">
                <section class="one_section">
                    <div class="text_section box_glass_effect one_section_left_side">
                        <h1 class="title"><span class="underline_color_gradient">Mrkněte</span> na naše <span class="underline_color_gradient">kluziště<br>online</span> a zjistěte,<br> <span class="text_color_gradient">jak to u nás právě žije!</span></h1>
                    </div>
                    <div class="photo_group one_section_right_side">
                        <img src="images/title_background_dark_800.jpg" alt="" class="right_photo_clip">
                    </div>
                </section>
            </section>
            <span class="decoration_red_line"></span>
            <!-- WEBKAMERA -->
            <section class="webkamera one_container">
                <h1 class="title text_color_gradient">Webkamera</h1>
                <section class="one_section_webkamera">
                    <iframe id="blockrandom" name="iframe" src="https://g0.ipcamlive.com/player/player.php?alias=65645d56307e4" width="100%" height="500px" scrolling="auto" frameborder="1" title="Web Kamera" class="box_glass_effect"></iframe>
                </section>
            </section>
        </div>
    </main>

    <button class="box_glass_effect_red" id="arrow_top_scroll" type="button"><i class="fa-solid fa-angles-up"></i></button>
    <?php require "assets/footer.php"; ?>
    <script src="js/header.js"></script>
    <script src="js/general.js"></script>
</body>
</html>