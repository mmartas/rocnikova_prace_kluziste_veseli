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
                <li><a href="price_list.php" class="<?= $currentPage == 'price_list.php' ? 'active' : '' ?>">ceník</a></li>
                <li><a href="webkamera.php" class="<?= $currentPage == 'webkamera.php' ? 'active' : '' ?>">webkamera</a></li>
                <li><a href="">rozpis ledu/provozní doba</a></li>
                <li><a href="" class="box_glass_effect_red">rezervace</a></li>
            </ul>
        </nav>
    </div>
</header>