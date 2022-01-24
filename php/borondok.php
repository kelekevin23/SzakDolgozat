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
        <link rel="stylesheet" href="../css/szerkezet.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>

    <body>

        <main>

            <div class="header-container">
                <header>
                    <h1>B-Shop</h1>
                    <div class="kereso-panel">
                        <input type="text" placeholder="Keresés..." name="kereso" id="kereso">
                        <button type="submit" id="kereso-gomb"><i class="fa fa-search" ></i></button>
                    </div>
                    <div id="panel">
                        <button id="belepes">Belépés</button>
                        <button id="regisztracio">Regisztráció</button>
                    </div>
                </header>

                <nav>
                    <div id="menu">
                        <li><a href="../index.php">Főoldal</a></li>
                        <li><a href="borondok.php">Bőröndök</a></li>
                        <li><a href="kapcsolat.php">Kapcsolat</a></li>
                        <li><a href="kosar.php">Kosár</a></li>
                    </div>
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