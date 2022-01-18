-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Jan 13. 18:03
-- Kiszolgáló verziója: 10.4.18-MariaDB
-- PHP verzió: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `felhasznalok`
--
CREATE DATABASE IF NOT EXISTS `felhasznalok` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `felhasznalok`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

DROP TABLE IF EXISTS `felhasznalok`;
CREATE TABLE IF NOT EXISTS `felhasznalok` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `knev` varchar(55) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `vnev` varchar(55) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `jelszo` varchar(55) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `fstatusz` varchar(1) COLLATE utf8mb4_hungarian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `knev`, `vnev`, `email`, `jelszo`, `fstatusz`) VALUES
(1, 'Domonkos', 'Nagy', 'nagydomonkoskristof@gmail.com', 'd41d8cd98f00b204e9800998ecf8427e', 'f'),
(2, 'Domonkos', 'Nagy', 'nagydomonkoskristof@gmail.com', 'd41d8cd98f00b204e9800998ecf8427e', 'f'),
(3, 'Domonkos', 'Nagy', 'nagydomonkoskristof@gmail.com', 'd41d8cd98f00b204e9800998ecf8427e', 'f'),
(4, 'Domonkos', 'Nagy', 'nagydomonkoskristof@gmail.com', 'd41d8cd98f00b204e9800998ecf8427e', 'f'),
(5, 'Domonkos', 'Nagy', 'nagydomonkoskristof@gmail.com', '13c6258ac857bbd2471910cea2eae4bb', 'f');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
