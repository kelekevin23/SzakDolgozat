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
                    <fieldset id="rendelesInfo">
                        <legend>Fizetési mód</legend>
                        <input type="hidden" id="termekDarab" name="termekDarab" value="">
                        <div id="rendelesBetolt">

                        </div>
                        <p id="osszeg"></p>
                          <input type="radio" id="keszp" name="fizetes" value="Készpénz" checked>
                          <label for="keszp">Készpénz</label><br><br>
                          <input type="radio" id="kartya" name="fizetes" value="Bankkártya">
                          <label for="kartya">Bankkártya</label><br><br>
                    </fieldset>
                    
                    <fieldset id="vevoAdat">
                        <legend>Vevő adatai</legend>
                        <div class="rendAdatok">
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
                        <div class="rendAdatok">
                            <label for="varos1">Város:</label>
                            <input type="text" id="varos" name="varos" placeholder="Budapest">                                        
                            <label for="irany1">Irányítószám:</label>
                            <input type="text" id="irany" name="irany" placeholder="1191">
                            <label for="utca1">Utca/Tér/Fasor:</label>
                            <input type="text" id="utca" name="utca" placeholder="Hunyadi utca">
                            <label for="hsz1">Házszám:</label>
                            <input type="text" id="hsz" name="hsz" placeholder="23/B">
                            <div></div>
                            <button id="szamlCim" onclick="return false">A Számlázási cím megegyezik a Szállítás címmel</button>
                        </div>
                    </fieldset>
                    <fieldset id="szamlazasi">
                        <legend>Számlázási cím</legend>
                        <div class="rendAdatok">
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
                            <input type="tel" id="asz2" name="asz2" placeholder="11111111-x-yz">
                        </div>
                    </fieldset>
                    <button id="szerkesztes" onclick="return false">Adatok szerkesztése</button>
                    <button id="ellenorzes" onclick="return false">Adatok véglegesítése</button>
                    <button type="submit" name="rendVeglegesites" id="rendVeglegesites">Rendelés véglegesítése</button>     
                </form>


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
    $varos = test_input2($_POST["varos"]);
    $irany = test_input2($_POST["irany"]);
    $utca = test_input2($_POST["utca"]);
    $hsz = test_input2($_POST["hsz"]);

    //szamlazas
    $varos2 = test_input2($_POST["varos2"]);
    $irany2 = test_input2($_POST["irany2"]);
    $utca2 = test_input2($_POST["utca2"]);
    $hsz2 = test_input2($_POST["hsz2"]);
    $cnev2 = test_input2($_POST["cnev2"]);
    $asz2 = test_input2($_POST["asz2"]);

    $userAdatok = $ab->select("*", "Cim", "order by id");
    $utolsoId = 1;
    if (count($userAdatok) !== 0) {
        $utolsoId = $userAdatok['id'] + 1;
    }

    $ujId = 0;
    if ($varos === $varos2 and $irany === $irany2 and $utca === $utca2 and $hsz === $hsz2) {
        if ($cnev2 === "" and $asz2 === "") {
            $ab->insert("Cim", "(id, felhasznalonev, vezeteknev, keresztnev, varos, iranyitoszam, utca, hazszam, telefonszam)", "'$utolsoId', '$fnev', '$vnev', '$knev', '$varos', '$irany', '$utca', '$hsz', '$tszam'");
        } else if ($cnev2 !== "" and $asz2 !== "") {
            $ujId = $utolsoId + 1;
            $ab->insert("Cim", "(id, felhasznalonev, vezeteknev, keresztnev, varos, iranyitoszam, utca, hazszam, telefonszam)", "'$utolsoId', '$fnev', '$vnev', '$knev', '$varos', '$irany', '$utca', '$hsz', '$tszam'");
            $ab->insert("Cim", "(id, felhasznalonev, vezeteknev, keresztnev, varos, iranyitoszam, utca, hazszam, telefonszam, cegnev, adoszam)", "'$ujId', '$fnev', '$vnev', '$knev', '$varos', '$irany', '$utca', '$hsz', '$tszam', '$cnev2', '$asz2'");
        }
    } else {
        if ($cnev2 === "" and $asz2 === "") {
            $ujId = $utolsoId + 1;
            $ab->insert("Cim", "(id, felhasznalonev, vezeteknev, keresztnev, varos, iranyitoszam, utca, hazszam, telefonszam)", "'$utolsoId', '$fnev', '$vnev', '$knev', '$varos', '$irany', '$utca', '$hsz', '$tszam'");
            $ab->insert("Cim", "(id, felhasznalonev, vezeteknev, keresztnev, varos, iranyitoszam, utca, hazszam, telefonszam)", "'$ujId', '$fnev', '$vnev', '$knev', '$varos2', '$irany2', '$utca2', '$hsz2', '$tszam'");
        } else if ($cnev2 !== "" and $asz2 !== "") {
            $ujId = $utolsoId + 1;
            $ab->insert("Cim", "(id, felhasznalonev, vezeteknev, keresztnev, varos, iranyitoszam, utca, hazszam, telefonszam)", "'$utolsoId', '$fnev', '$vnev', '$knev', '$varos', '$irany', '$utca', '$hsz', '$tszam'");
            $ab->insert("Cim", "(id, felhasznalonev, vezeteknev, keresztnev, varos, iranyitoszam, utca, hazszam, telefonszam, cegnev, adoszam)", "'$ujId', '$fnev', '$vnev', '$knev', '$varos2', '$irany2', '$utca2', '$hsz2', '$tszam', '$cnev2', '$asz2'");
        }
    }


    $rendelesAdatok = $ab->select("*", "Rendeles", "order by rend_szam");
    $rendelesUtolsoId = 1;
    if (count($rendelesAdatok) !== 0) {
        $rendelesUtolsoId = $rendelesAdatok['rend_szam'] + 1;
    }

    $vegOsszeg = 0;
    $fizMod = test_input2($_POST["fizetes"]);

    $darab = test_input2($_POST["termekDarab"]);
    for ($index = 0; $index < $darab; $index++) {
        $reszOsszeg = test_input2($_POST["osszeg" . $index]);
        $vegOsszeg += $reszOsszeg;
    }

    if ($ujId === 0) {
        $ab->insert("Rendeles", "(rend_szam, megrendelo, fizetesimod, fizetesiosszeg, szallcim, szamlcim)", "'$rendelesUtolsoId', '$fnev', '$fizMod', '$vegOsszeg', '$utolsoId', '$utolsoId'");
    } else {
        $ab->insert("Rendeles", "(rend_szam, megrendelo, fizetesimod, fizetesiosszeg, szallcim, szamlcim)", "'$rendelesUtolsoId', '$fnev', '$fizMod', '$vegOsszeg', '$utolsoId', '$ujId'");
    }

    $cikkszam = "";
    $darabszam = "";

    for ($index = 0; $index < $darab; $index++) {
        $cikkszam = test_input2($_POST["cikk" . $index]);
        $darabszam = test_input2($_POST["darab" . $index]);
        $ab->insert("Rend_tetel", "(rend_szam, cikkszam, darabszam)", "'$rendelesUtolsoId', '$cikkszam', '$darabszam'");
        $ab->update("Cikk", "keszlet -=" . $darabszam, " cikkszam like " . $cikkszam);
    }
}
?>