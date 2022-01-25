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

<div class="form-popup" id="regisztracioForm">
    <form class="form-container" method="post">

        <h1>Regisztráció</h1>
        <div id="regisztracio-panel">

            <label for="email"><b>Vezetéknév:</b></label>
            <input type="text" placeholder="Vezetéknév" name="vnev" required>

            <label for="email"><b>Keresztnév:</b></label>
            <input type="text" placeholder="Keresztnév" name="knev" required>

            <label for="email"><b>E-mail cím:</b></label>
            <input type="text" placeholder="E-mail cím" name="emailR" required>

            <label for="psw"><b>Jelszó:</b></label>
            <input type="password" placeholder="Jelszó" name="jelszo1" required>

            <label for="psw"><b>Jelszó megerősítése:</b></label>
            <input type="password" placeholder="Jelszó megerősítése" name="jelszo2" required>
        </div>

        <button type="submit" class="btn" name="submit">Regisztráció</button>
        <button type="button" class="btncancel" id ="btncancel">Vissza</button>
    </form>
</div>  

