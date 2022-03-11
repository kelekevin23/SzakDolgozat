<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Szakdolgozat</title>
        <script src="../js/jquery-3.6.0.min.js"></script>
        <script src="../js/menu.js"></script>
        <script src="../js/rendeles.js"></script>
        <script src="../js/bejelentkezes_regisztracio.js"></script>
        <link href="../css/szerkezet.css" rel="stylesheet" type="text/css"/>
        <link href="../css/tartalom.css" rel="stylesheet" type="text/css"/>
        <link href="../css/reszponzivitas.css" rel="stylesheet" type="text/css"/>
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


            <aside >
                <form class="urlapRendeles" method="post">
                    <div class="rendelesInfo">
                        <fieldset>
                            <legend>Fizetési mód</legend>
                            <p id="osszeg"></p>
                              <input type="radio" id="keszp" name="fizetes" checked>
                              <label for="keszp">Készpénz</label><br><br>
                              <input type="radio" id="kartya" name="fizetes">
                              <label for="kartya">Bankkártya</label><br><br>
                        </fieldset>
                    </div>
                    <fieldset id="vevoAdat">
                        <legend>Vevő adatai</legend>
                        <div id="Adatok">
                            <label for="vnev">Vezetéknév:</label>
                            <input type="text" id="vnev" name="vnev" placeholder="Vezetéknév">                  
                            <label for="knev">Keresztnév:</label>
                            <input type="text" id="knev" name="knev" placeholder="Keresztnév">
                            <label for="tszam">Telefonszám:</label>
                            <input type="tel" id="tszam" name="tszam" placeholder="06203682794">
                        </div>
                    </fieldset>
                    <fieldset id="szallitasi">
                        <legend>Szállítási cím</legend>
                        <div id="Adatok">
                            <label for="varos1">Város:</label>
                            <input type="text" id="varos1" name="varos1" placeholder="Budapest" value="">                  
                            <label for="irany1">Irányítószám:</label>
                            <input type="text" id="irany1" name="irany1" placeholder="1191" value="">
                            <label for="utca1">Utca/Tér/Fasor:</label>
                            <input type="text" id="utca1" name="utca1" placeholder="Hunyadi utca">
                            <label for="hsz1">Házszám:</label>
                            <input type="text" id="hsz1" name="hsz1" placeholder="23/B">
                        </div>
                    </fieldset>
                    <fieldset id="szamlazasi">
                        <legend>Számlázási cím</legend>
                        <div id="Adatok">
                            <label for="varos2">Város:</label>
                            <input type="text" id="varos2" name="varos2" placeholder="Budapest">                  
                            <label for="irany2">Irányítószám:</label>
                            <input type="text" id="irany2" name="irany2" placeholder="1191">
                            <label for="utca2">Utca/Tér/Fasor:</label>
                            <input type="text" id="utca2" name="utca2" placeholder="Hunyadi utca">
                            <label for="hsz2">Házszám:</label>
                            <input type="text" id="hsz2" name="hsz2" placeholder="23/B">
                            <label for="cnev2">Cégnév:</label>
                            <input type="text" id="cnev2" name="cnev2" placeholder="Proba Kft.">
                            <label for="asz2">Adószám:</label>
                            <input type="tel" id="asz2" name="asz2" placeholder="11111111">
                        </div>
                    </fieldset>
                    <br>
                    <button type="submit" name="rendVeglegesites" id="rendVeglegesites">Rendelés véglegesítése</button>     
                </form>
                
                <div id="ellenorzesGomb">
                    <div></div>
                    <button id="ellenorzes">Adatok ellenőrzése</button>
                </div>

            </aside>

        </main>


    </body>

</html>
<?php
include_once 'Ab.php';
$ab = new Ab();

function test_input2($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if (isset($_POST["rendVeglegesites"])) {
    $fnev = $_SESSION['felhasznalonev'];
    
    //alap adatok
    $vnev = test_input2($_POST["vnev"]);
    $knev = test_input2($_POST["knev"]);
    $tszam = test_input2($_POST["tszam"]);
    
    //szallitas
    $varos = test_input2($_POST["varos1"]);
    $irany = test_input2($_POST["irany1"]);
    $utca = test_input2($_POST["utca1"]);
    $hsz = test_input2($_POST["hsz1"]);

    
    //szamlazas
    $varos2 = test_input2($_POST["varos2"]);
    $irany2 = test_input2($_POST["irany2"]);
    $utca2 = test_input2($_POST["utca2"]);
    $hsz2 = test_input2($_POST["hsz2"]);
    $cnev2 = test_input2($_POST["cnev2"]);
    $asz2 = test_input2($_POST["asz2"]);

    $userAdatok = $ab->select("*", "Cim", "order by id");
    $utolsoId = $userAdatok['id'] + 1;

    if ($cnev2 === "" or $asz2 === "") {
        echo 'Üres';
    }




    //$ab->insert("Cim", "(id, felhasznalonev, vezeteknev, keresztnev, varos, iranyitoszam, utca, hazszam, telefonszam)", "'$utolsoId', '$fnev', '$vnev', '$knev', '$varos', '$irany', '$utca', '$hsz', '$tszam'");
}
?>