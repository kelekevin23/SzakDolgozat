<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Szakdolgozat</title>
        <script src="js/jquery-3.6.0.min.js"></script>
        <script src="js/menu.js"></script>
        <script src="js/script.js"></script>
        <script src="js/galeria.js"></script>
        <script src="js/bejelentkezes_regisztracio.js"></script>
        <link href="css/szerkezet.css" rel="stylesheet" type="text/css"/>
        <link href="css/tartalom.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    </head>
    <?php
    session_start();
    session_destroy();
    session_start();
    include_once 'php/Ab.php';
    $ab = new Ab();
    $knevErr = $vnevErr = $emailErr = $jelszoErr = "";
    $knev = $vnev = $email = $jelszo = "";

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    if (isset($_POST["submit"])) {
        $error = "";
        if (empty($_POST["vnev"])) {
            $vnevErr = "Vezetéknév megadása kötelező!";
            
        } else {
            $vnev = test_input($_POST["vnev"]);
            $_SESSION['vnev'] = $_POST['vnev'];
        }
        if (empty($_POST["knev"])) {
            $knevErr = "Keresztnév megadása kötelező!";
        } else {
            $knev = test_input($_POST["knev"]);
            $_SESSION['knev'] = $_POST['knev'];
        }
        if (empty($_POST["emailR"])) {
            $emailErr = "Email cím megadása kötelező";
        } else {
            $email = test_input($_POST["emailR"]);
            // check if e-mail address is well-formed
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $emailErr = "Érvénytelen email cím";
            }else{
                $_SESSION['emailR'] = $_POST['emailR'];
            }
        }
        if (empty($_POST["jelszo1"]) || empty($_POST["jelszo2"])) {
            $jelszoErr = "Ismételd meg a jelszót!";
        } elseif ($_POST["jelszo1"] != $_POST["jelszo2"]) {
            $jelszoErr = "A két jelszó nem egyezik!";
        } else {
            $jelszo = test_input($_POST["jelszo1"]);
        }
        $error .= $vnevErr;
        $error .= $knevErr;
        $error .= $emailErr;
        $error .= $jelszoErr;
        if (strlen($error) > 0) {
            echo '<style type="text/css">
        #regisztracioForm {
            display: block;
            }
        .tarolo-div, .header-container{
                filter: blur(2px);
                pointer-events: none;
            }
        .kepTarolo-div{
                filter: blur(2px);
                mix-blend-mode: multiply;
            }
        
        </style>';
        } else {
            $ab->getKapcsolat();
            $sql2 = "INSERT INTO felhasznalok(knev, vnev, email, jelszo, fstatusz) VALUES ('$knev','$vnev','$email','$jelszo','f')";
            if ($ab->getKapcsolat()->query($sql2) === TRUE) {
                header("Location: index.php");
            } else {
                echo "Error: Valami hiba történt ";
            }
            $ab->kapcsolatBezar();
        }
    }

    ?>

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
                    include_once 'php/nav.php';
                    $menu = new Menu();
                    $menu->navIndex();
                    ?>
                </nav>
            </div>

            <article>
                <?php
                include_once 'php/form.php';
                ?>
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
                <h3>Készítette: Helyes Márton, Nagy Domonkos, Kelemen Kevin</h3>
            </footer>
        </main>


    </body>

</html>