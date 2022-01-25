<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Szakdolgozat</title>
        <script src="../js/jquery-3.6.0.min.js"></script>
        <script src="../js/proba.js"></script>
        <script src="../js/script.js"></script>
        <script src="../js/galeria.js"></script>
        <script src="../js/bejelentkezes_regisztracio.js"></script>
        <link href="../css/szerkezet.css" rel="stylesheet" type="text/css"/>
        <link href="../css/tartalom.css" rel="stylesheet" type="text/css"/>
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
                    <div id="panel">
                        <button id="belepes">Belépés</button>
                        <button id="regisztracio">Regisztráció</button>
                    </div>
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
                <div class="tarolo-div">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1348.006404621573!2d19.072705537020642!3d47.48966382960781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc58db93ef53%3A0x45683f828d1abf24!2zSmF2w610w7MgQ2VudHJ1bSBCdC50w6Fza2EgamF2w610w6Fz!5e0!3m2!1shu!2shu!4v1643033248570!5m2!1shu!2shu" id="terkep"></iframe>
                </div>
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