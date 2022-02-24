<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Szakdolgozat</title>
        <script src="../js/jquery-3.6.0.min.js"></script>
        <script src="../js/menu.js"></script>
        <script src="../js/bejelentkezes_regisztracio.js"></script>
        <link href="../css/szerkezet.css" rel="stylesheet" type="text/css"/>
        <link href="../css/tartalom.css" rel="stylesheet" type="text/css"/>
        <link href="../css/reszponzivitas.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>

    <body>

        <main>

            <div class="header-container">
                <header>
                    <h1>B-Shop</h1>
                    <div class="kereso-panel">
                        <input type="text" placeholder="Keresés..." name="kereso" id="keresosav">
                        <button type="submit" id="kereso-gomb"><i class="fa fa-search" ></i></button>
                    </div>
                    <?php
                    include_once 'session.php';
                        include_once 'udvozlo.php';
                    ?>
                </header>

                <nav>
                    <?php
                    include_once 'nav.php';
                    $menu = new Menu();
                    $menu->navOldalak();
                    ?>
                </nav>
            </div>

            <article>
                <?php
                include_once 'form.php';
                ?>


            </article>

            <section>

            </section>

            <aside class="adatok">

            </aside>

            <footer>

            </footer>
        </main>


    </body>

</html>