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
        <script src="js/ajax.js"></script>
        <script src="js/bejelentkezes_regisztracio.js"></script>
        <link href="css/szerkezet.css" rel="stylesheet" type="text/css"/>
        <link href="css/tartalom.css" rel="stylesheet" type="text/css"/>
        <link href="css/szerkezetFooldal.css" rel="stylesheet" type="text/css"/>
        <link href="css/tartalomFooldal.css" rel="stylesheet" type="text/css"/>
        <link href="css/reszponzivitas.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    </head>
    <?php
        include_once 'php/session.php';
        
        

    /* include_once 'php/Ab.php';
      $ab = new Ab();
      $ab->select("top 9 c.*, m.marka", "Cikk", "Cikk c inner join Modell m on c.modell = m.modell", "order by keszlet desc", "Modell"); */
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

                    <?php
                    include_once 'php/udvozlo.php';
                    ?>

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
                    <h3 class="marka"></h3>
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
                                <th>Elérhető színek:</th>
                                <td colspan="5">
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