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
        <script src="../../js/ajax.js"></script>
        <script src="../../js/rendszergazda.js"></script>
        <script src="../../js/bejelentkezes_regisztracio.js"></script>
        <link href="../../css/szerkezet.css" rel="stylesheet" type="text/css"/>
        <link href="../../css/tartalom.css" rel="stylesheet" type="text/css"/>
        <link href="../../css/tartalomFelhasznalok.css" rel="stylesheet" type="text/css"/>
        <link href="../../css/reszponzivitas.css" rel="stylesheet" type="text/css"/>  
    </head>
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
                $menu->navRendszergazda();
                ?>
            </nav>
        </div>
        <section class="rendszerGazdaRendezes">

            <div class="rendszerGazdaRendelesek">
                <div id="rendelesek"></div>
            </div>

            <div class="rendszerGazdaBorondok">


                <div id="kereses">
                    <label for=keresCikk>Keresett cikkszám:</label>
                    <input type="text" id="keresCikk" name="keresCikk" maxlength="13" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
                </div>

                <div></div>
                <div id="borondok"></div>
                <div id="ujBorondok">
                    <form method="post">
                        <fieldset class="borondForm" >
                            <legend>Új bőrönd</legend>
                            <label for="cikkszam">Cikkszám:</label>
                            <input type="text" id="cikkszam" name="cikkszam" value="1111111111111" >

                            <label for="modell">Modell</label>
                            <input type="text" id="modell" name="modell" value="SUNSIDE SPINNER">

                            <label for="magassag">Magasság</label>
                            <input type="text" id="magassag" name="magassag" value="70">

                            <label for="szelesseg">Szélesség</label>
                            <input type="text" id="szelesseg" name="szelesseg" value="40">

                            <label for="melyseg">Mélység</label>
                            <input type="text" id="melyseg" name="melyseg" value="20">

                            <label for="urmertek">Űrmérték</label>
                            <input type="text" id="urmertek" name="urmertek" value="100">

                            <label for="szin">Szín</label>
                            <input type="text" id="szin" name="szin" value="piros">

                            <label for="ar">Ár</label>
                            <input type="text" id="ar" name="ar" value="34000">

                            <label for="keszlet">Készlet</label>
                            <input type="text" id="keszlet" name="keszlet" value="3">

                            <label for="kepElerese">Kép elérése</label>
                            <input type="text" id="kepElerese" name="kepElerese" value="/70-40-20-100/">

                            <br><button type="submit" name="ujTermek" id="ujTermek">Bőrönd felvitele</button>
                        </fieldset>
                    </form>
                </div>
            </div>

            <div class="rendszerGazdaFelhasznalok">
                <div id="felhasznalok"></div>
            </div>
        </section>
    </main>
</body>
</html>
<?php
include_once '../Ab.php';
$ab = new Ab();

function test_input4($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

//Bőröndök
if (isset($_POST["ujTermek"])) {
    $ures = false;
    $values = array();
    foreach ($_POST as $name => $value) {
        if ($name !== "ujTermek") {
            $values[] = $value;
            if ($value === "") {
                $ures = true;
            }
        }
    }

    $ertekek = "";
    $szamlalo = 0;
    foreach ($values as $szoveg) {
        if ($szamlalo < 9) {
            $ertekek .= "'" . $szoveg . "', ";
        } else if ($szamlalo === 9) {
            $ertekek .= "'" . $szoveg . "'";
        }
        $szamlalo++;
    }

    if (!$ures) {
        $ab->insert("Cikk", "(cikkszam, modell, magassag, szelesseg, melyseg, urmertek, szin, ar, keszlet, kepElerese)", $ertekek);
    }
}
if (isset($_POST["torlesBorond"])) {
    $index = test_input4($_POST["torlesBorond"]);
    $cikkszamTorol = test_input4($_POST["cikkszam" . $index]);
    $ab->delete("Cikk", " cikkszam = " . $cikkszamTorol);
}

if (isset($_POST["veglegesitesBorond"])) {
    $ures = false;
    $where = "";
    $cikk = test_input4($_POST["adat0"]);
    for ($index1 = 1; $index1 < 3; $index1++) {
        if (test_input4($_POST["adat" . $index1]) === "") {
            $ures = true;
        }
        if ($index1 === 2) {
            $where .= test_input4($_POST["adatNev" . $index1]) . " = '" . test_input4($_POST["adat" . $index1] . "'");
        } else {
            $where .= test_input4($_POST["adatNev" . $index1]) . " = '" . test_input4($_POST["adat" . $index1]) . "', ";
        }
    }
    if (!$ures) {
        $ab->update("Cikk", $where, " cikkszam =  '$cikk'");
    }
}

//Felhasználók
if (isset($_POST["torles"])) {
    $index = test_input4($_POST["torles"]);
    $fnev = test_input4($_POST["fnev" . $index]);
    $ab->delete("Felhasznalok", " felhasznalonev = '$fnev'");
}
if (isset($_POST["veglegesites"])) {
    $ures = false;
    $where = "";
    $fnev = test_input4($_POST["adat0"]);
 
    for ($index1 = 1; $index1 < 6; $index1++) {
        if (test_input4($_POST["adat" . $index1]) === "") {
            $ures = true;
        }if ($index1 === 4) {
            $regijelszo = test_input4($_POST["regijelszo"]);

            if ($regijelszo !== test_input4($_POST["adat" . $index1])) {
                
                $_POST["adat" . $index1]=md5($_POST["adat" . $index1]);
            }
        }
        if ($index1 === 5) {
            $where .= test_input4($_POST["adatNev" . $index1]) . " = '" . test_input4($_POST["adat" . $index1] . "'");
        } else {
            $where .= test_input4($_POST["adatNev" . $index1]) . " = '" . test_input4($_POST["adat" . $index1]) . "', ";
        }
    }
    if (!$ures) {
        $ab->update("Felhasznalok", $where, " felhasznalonev =  '$fnev'");
       
    }
}
?>
