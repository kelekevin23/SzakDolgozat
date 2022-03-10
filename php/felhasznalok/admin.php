<!DOCTYPE html>
<?php
include_once '../session.php';
?>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Szakdolgozat</title>
        <script src="../../js/jquery-3.6.0.min.js"></script>
        <script src="../../js/menu.js"></script>
        <script src="../../js/futar.js"></script>
        <script src="../../js/bejelentkezes_regisztracio.js"></script>
        <link href="../../css/szerkezet.css" rel="stylesheet" type="text/css"/>
        <link href="../../css/tartalom.css" rel="stylesheet" type="text/css"/>
        <link href="../../css/reszponzivitas.css" rel="stylesheet" type="text/css"/>   
    </head>
    <body>
        <main>
            <div class="header-container">
                <header>
                    <h1>B-Shop</h1>
                    <div class="kereso-panel">
                        <input type="text" placeholder="Keresés..." name="kereso" id="keresosav">
                    </div>
                    <?php
                    include_once '../udvozlo.php';
                    ?>

                </header>
                <nav>
                    <?php
                    include_once '../nav.php';
                    $menu = new Menu();
                    $menu->navAdmin();
                    ?>
                </nav>
            </div>
            <article>

            </article>
        </main>
    </body>
</html>