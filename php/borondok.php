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
        <script src="../js/ajax.js"></script>
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

                        <fieldset>
                            <legend>Márkák:</legend>
                          <input type="radio" id="Samsonite" name="marka" value="Samsonite">
                          <label for="html">Samsonite</label><br>
                          <input type="radio" id="American_Tourister" name="marka" value="American_Tourister">
                          <label for="css">American Tourister</label><br>
                          <input type="radio" id="Tommy_Hilfiger" name="marka" value="Tommy_Hilfiger">
                          <label for="javascript">Tommy Hilfiger</label>
                        </fieldset>
                        <br>


                        <fieldset>
                            <legend>Űrmérték:</legend>
                        
                        <input type="range" min="1" max="150" value="75" class="slider">
                        <p id="slider_ertek">Jelenlegi érték: 75</p>
                        </fieldset>
                        <br>


                        <fieldset>
                            <legend>Színek:</legend>
                        <div id="szinek_tarolo">

                        </div>
                        
                         </fieldset>
                        <br>


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