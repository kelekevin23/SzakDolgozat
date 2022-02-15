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
    session_start();
    session_destroy();
    session_start();
    include_once 'Ab.php';
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
            //$jelszo = md5($jelszo);
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
            $ab->insert("Felhasznalok", "(felhasznalonev, vezeteknev, keresztnev, email, jelszo, fstatusz)", "'Domonkos', '$vnev','$knev','$email','$jelszo','f'");
        }
    }

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

