<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Szakdolgozat</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="js/jquery-3.6.0.min.js"></script>
        <script src="js/script.js"></script>
        <script src="js/galeria.js"></script>
        <link rel="stylesheet" href="css/szerkezet.css">
    </head>
    <?php
    session_start();
    include_once 'php/Ab.php';
    $ab = new Ab();

    if (isset($_POST["submit"])) {
        $ab->getKapcsolat();

        $vnev = mysqli_real_escape_string($ab->getKapcsolat(), $_POST['vnev']);
        $knev = mysqli_real_escape_string($ab->getKapcsolat(), $_POST['knev']);
        $emailR = mysqli_real_escape_string($ab->getKapcsolat(), $_POST['emailR']);
        $jelszo1 = md5(mysqli_real_escape_string($ab->getKapcsolat(), $_POST['jelszo1']));
        $jelszo2 = md5(mysqli_real_escape_string($ab->getKapcsolat(), $_POST['jelszo2']));

        if ($jelszo1 == $jelszo2) {
            $sql2 = "INSERT INTO felhasznalok(knev, vnev, email, jelszo, fstatusz) VALUES ('$knev','$vnev','$emailR','$jelszo1','f')";
            if ($ab->getKapcsolat()->query($sql2) === TRUE) {
                header("Location: index.php");
            } else {
                echo "Error: Valami hiba történt ";
            }
        } else {
            header("Location: index.php");
        }

        $ab->kapcsolatBezar();
    }
    ?>
    <body>

        <main>

            <div class="header-container">
                <header>
                    <h1>B-Shop</h1>
                    <input type="text" placeholder="Keresés..." name="kereso" id="kereso">
                    <div id="panel">
                        <button id="belepes">Belépés</button>
                        <button id="regisztracio">Regisztráció</button>                        
                    </div>
                </header>

                <nav>
                    <div id="menu">
                        <li><a href="index.php">Főoldal</a></li>
                        <li><a href="php/borondok.php">Bőröndök</a></li>
                        <li><a href="php/kapcsolat.php">Kapcsolat</a></li>
                        <li><a href="php/kosar.php">Kosár</a></li>
                    </div>
                </nav>
            </div>


            <article>

                <div class="form-popup" id="bejelentkezoForm">
                    <form class="form-container" method="post">
                        <h1>Bejelentkezés</h1>

                        <div id="belepes-panel">

                            <label for="email"><b>E-mail:</b></label>
                            <input type="text" placeholder="E-mail cím" name="emailB" required>

                            <label for="psw"><b>Jelszó:</b></label>
                            <input type="password" placeholder="Jelszó megadása" name="jelszo" required>

                        </div>
                        <button type="submit" class="btn" name="login">Bejelentkezés</button>
                        <button type="button" class="btncancel" name="vissza">Vissza</button>
                    </form>
                </div>

                <div class="form-popup" id="regisztracioForm">
                    <form class="form-container" method="post">

                        <h1>Regisztráció</h1>
                        <div id="regisztracio-panel">

                            <label for="email"><b>Vezetéknév:</b></label>
                            <input type="text" placeholder="Vezetéknév" name="vnev" required>

                            <label for="email"><b>Keresztnév:</b></label>
                            <input type="text" placeholder="Keresztnév" name="knev" required>

                            <label for="email"><b>E-mail cím:</b></label>
                            <input type="text" placeholder="E-mail cím" name="emailR" required>

                            <label for="psw"><b>Jelszó:</b></label>
                            <input type="password" placeholder="Jelszó" name="jelszo1" required>

                            <label for="psw"><b>Jelszó megerősítése:</b></label>
                            <input type="password" placeholder="Jelszó megerősítése" name="jelszo2" required>
                        </div>

                        <button type="submit" class="btn" name="submit">Regisztráció</button>
                        <button type="button" class="btncancel" id ="btncancel">Vissza</button>
                    </form>
                </div>  
                <div class="kepTarolo-div">

                    <h2>Felkapottak</h2>
                    <div id="kepGaleria">
                        <button id="bal"><</button>

                        <div id="balkep"></div>
                        <div id="fokep"></div>
                        <div id="jobbkep"></div>

                        <button id="jobb">></button>
                    </div>
                </div>

            </article>

            <section>
                <div class="galeria">
                    <img src="" alt="">
                </div>
            </section>


<!--<section>
<button id="kattint">Ide kattints</button>
</section>-->

            <aside class="adatok">
                <div class="tarolo-div">

                    <table>
                        <thead>
                            <tr>
                                <th>Tulajdonság:</th>
                                <th>Magasság</th>
                                <th>Szélesség</th>
                                <th>Mélység</th>
                                <th>Űrmérték</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr id="adatok">

                            </tr>

                            <tr>
                                <th>További színek:</th>
                                <td colspan="4">
                                    <div class="szinek">

                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>


            </aside>

            <footer>

            </footer>
        </main>


    </body>

</html>