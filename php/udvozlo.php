<?php
if(isset($_SESSION['keresztnev'])){
    ?>
    <div id="panel">
        <h1>Üdv <?php echo utf8_encode($_SESSION['keresztnev']) ?></h1>
    <button id="kijelentkezes">Kijelentkezés</button>                        
    </div>
<?php
    
}else{
    ?>
    <div id="panel">
    <button id="belepes">Belépés</button>
    <button id="regisztracio">Regisztráció</button>                        
    </div>
<?php
}




?>
