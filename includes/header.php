<?php

    $currentPage = basename($_SERVER['PHP_SELF']);

?>

<header>
    <div class="navbar_container box_glass_effect">
        <div class="header_logo">
            <a href="index.php"><img src="images/kluziste_v_centru_vetsi_logo.png" alt=""></a>
        </div>
        <div class="ham_menu hamMenuIcon">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <nav class="mainNavMenu">
            <ul>
                <li><a href="pages/price_list.php" class="<?= $currentPage == 'pages/price_list.php' ? 'active' : '' ?> link_white">ceník</a></li>
                <li><a href="pages/webkamera.php" class="<?= $currentPage == 'pages/webkamera.php' ? 'active' : '' ?> link_white">webkamera</a></li>
                <li><a href="pages/operating_hours.php" class="<?= $currentPage == 'pages/operating_hours.php' ? 'active' : '' ?> link_white">rozpis ledu/provozní doba</a></li>
                <li><a href="pages/rezervation.php" class="<?= $currentPage == 'pages/rezervation.php' ? 'active' : '' ?> link_white box_glass_effect_red">rezervace</a></li>
            </ul>
        </nav>
    </div>
</header>