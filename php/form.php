<div class="form-popup" id="bejelentkezoForm">
    <form class="form-container" method="post">
        <h1>Bejelentkezés</h1>

        <div id="belepes-panel">

            <label for="email"><b>E-mail:</b></label>
            <input type="text" placeholder="E-mail cím" name="emailB" required>

            <label for="psw"><b>Jelszó:</b></label>
            <input type="password" placeholder="Jelszó" name="jelszo" required>

        </div>
        <button type="submit" class="btn" name="login">Bejelentkezés</button>
        <button type="button" class="btncancel" name="vissza">Vissza</button>
    </form>
</div>
<?php



//if (isset($_POST["submit"])) {
//    $ab->getKapcsolat();
//
//    $vnev = mysqli_real_escape_string($ab->getKapcsolat(), $_POST['vnev']);
//    $knev = mysqli_real_escape_string($ab->getKapcsolat(), $_POST['knev']);
//    $emailR = mysqli_real_escape_string($ab->getKapcsolat(), $_POST['emailR']);
//    $jelszo1 = md5(mysqli_real_escape_string($ab->getKapcsolat(), $_POST['jelszo1']));
//    $jelszo2 = md5(mysqli_real_escape_string($ab->getKapcsolat(), $_POST['jelszo2']));
//
//    if ($jelszo1 == $jelszo2) {
//        $sql2 = "INSERT INTO felhasznalok(knev, vnev, email, jelszo, fstatusz) VALUES ('$knev','$vnev','$emailR','$jelszo1','f')";
//        if ($ab->getKapcsolat()->query($sql2) === TRUE) {
//            header("Location: index.php");
//        } else {
//            echo "Error: Valami hiba történt ";
//        }
//    } else {
//        header("Location: index.php");
//    }
//    $ab->kapcsolatBezar();
//}
?>
<div class="form-popup" id="regisztracioForm">
    <form class="form-container" method="post">

        <h1>Regisztráció</h1>
        <div id="regisztracio-panel">

            <label for="vnev"><b>Vezetéknév:</b></label>
            <input type="text" placeholder="Vezetéknév" name="vnev" value="<?php if(isset($_SESSION['vnev'])){ echo $_SESSION['vnev'];}?>" >
            <span class="error">* <?php echo $vnevErr; ?></span>

            <label for="knev"><b>Keresztnév:</b></label>
            <input type="text" placeholder="Keresztnév" name="knev" value="<?php if(isset($_SESSION['knev'])){ echo $_SESSION['knev'];}?>" >
            <span class="error">* <?php echo $knevErr; ?></span>

            <label for="emailR"><b>E-mail cím:</b></label>
            <input type="text" placeholder="E-mail cím" name="emailR" value="<?php if(isset($_SESSION['emailR'])){ echo $_SESSION['emailR'];}?>">
            <span class="error">* <?php echo $emailErr; ?></span>

            <label for="psw"><b>Jelszó:</b></label>
            <input type="password" placeholder="Jelszó" name="jelszo1" >
            <span class="error">* <?php echo $jelszoErr;?></span>
            
            <label for="psw"><b>Jelszó megerősítése:</b></label>
            <input type="password" placeholder="Jelszó megerősítése" name="jelszo2" >
        </div>

        <button type="submit" class="btn" name="submit">Regisztráció</button>
        <button type="button" class="btncancel" id ="btncancel">Vissza</button>
    </form>
</div>  

