<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Szakdolgozat</title>
        <script src="../js/jquery-3.6.0.min.js"></script>
        <script src="../js/menu.js"></script>
        <script src="../js/borondok.js"></script>
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

            <div class="borondok-oldalszerkezet">
                <aside class="szures">
                    <form id="szures_form">

                        <p>Márkák:</p>
                          <input type="radio" id="Samsonite" name="marka" value="Samsonite">
                          <label for="html">Samsonite</label><br>
                          <input type="radio" id="American_Tourister" name="marka" value="American_Tourister">
                          <label for="css">American Tourister</label><br>
                          <input type="radio" id="Tommy_Hilfiger" name="marka" value="Tommy_Hilfiger">
                          <label for="javascript">Tommy Hilfiger</label>
                        <br><br>


                        <p>Űrmérték:</p>
                        0
                        <input type="range" id="a" name="a" value="50">
                        100
                        <br><br>


                        <p>Színek:</p>
                        <input type="checkbox" id="szin1" name="szin1" value="Piros">
                        <label for="szin1"> Piros</label><br>
                        <input type="checkbox" id="szin2" name="szin2" value="Fehér">
                        <label for="szin2"> Fehér</label><br>
                        <input type="checkbox" id="szin3" name="szin3" value="Kék">
                        <label for="szin3"> Kék</label><br>
                        <input type="checkbox" id="szin4" name="szin4" value="Zöld">
                        <label for="szin4"> Zöld</label><br>
                        <input type="checkbox" id="szin5" name="szin5" value="Sárga">
                        <label for="szin5"> Sárga</label><br>
                        <input type="checkbox" id="szin6" name="szin6" value="Fekete">
                        <label for="szin6"> Fekete</label><br>
                        <input type="checkbox" id="szin7" name="szin7" value="Rózsaszín">
                        <label for="szin7"> Rózsaszín</label><br>
                        <input type="checkbox" id="szin8" name="szin8" value="Barna">
                        <label for="szin8"> Barna</label><br><br>


                        <button type="submit" id="szures-gomb">Szűrés</button>

                    </form> 
                </aside>

                <section>
                    <div class="termek">
                        <div class="borond-kep">
                            <img class="termek_eleres" src="" alt="">
                        </div>

                        <div id="adatok_tarolo">
                            <p>Magasság:</p>
                            <p class="termek_magassag"></p>
                            <p>Szélesség:</p>
                            <p class="termek_szelesseg"></p>
                            <p>Mélység:</p>
                            <p class="termek_melyseg"></p>
                            <p>Űrmérték:</p>
                            <p class="termek_urmertek"></p>
                        </div>
                    </div>
                </section>


            </div>

            <footer>

            </footer>
        </main>


    </body>

</html>