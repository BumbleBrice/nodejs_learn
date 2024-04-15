-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 15 avr. 2024 à 17:06
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `blog_1`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id`, `title`, `description`, `date`, `category_id`) VALUES
(3, 'Lapin Bellier', 'Le lapin bélier domestique, qui se distingue en différentes races différentes et variétés, a pour descendant le lapin de garenne (oryctolagus cuniculus) qui a été domestiqué par l\'homme au fil des années. La première race de lapin bélier fut le lapin bélier anglais qui s\'est développé dès le 19e siècle.', '2024-04-15', 1),
(4, 'lapin nain', 'Il existe de nombreuses races de lapin que l\'on peut classer par taille : les grandes races, les races moyennes, les races petites et les races naines. Le lapin domestique le plus courant est le lapin nain.\r\n\r\nLe lapin nain est un animal de compagnie de plus en plus fréquent dans les foyers. C\'est un animal affectueux, fragile qui demande beaucoup d\'attention.\r\n\r\nLe lapin nain n\'est pas un rongeur, mais un lagomorphe. Il est herbivore et vit le jour, même s\'il reste très actif la nuit. Son espérance de vie est de 7 à 10 ans.\r\n\r\nLes lapins nains n\'existent pas dans la nature et sont issus d\'une sélection par les éleveurs au fil du temps. Il existe de nombreuses races avec des caractéristiques différentes, de nombreuses couleurs. Nous allons vous en présenter quelques unes.', '2024-04-15', 1),
(5, 'L\'alimentation du lapin', 'Un lapin doit avoir une bonne alimentation pour rester en bonne santé. Le lapin a un transit fragile, il faut en prendre soin en respectant son régime alimentaire. Surveillez toujours sa litière : si votre lapin ne fait plus de crotte il est peut être en train de faire un arrêt de transit et dans ce cas il s\'agit d\'une urgence vétérinaire. Rappelez-vous que lorsqu\'un lapin fait de belles crottes, c\'est un signe de bonne santé. ????\r\n\r\nLe lapin n\'a qu\'un seul estomac, on dit qu\'il est \"monogastrique\". La petite taille de l\'estomac du lapin l\'oblige à fractionner ses repas tout au long de la journée.\r\n\r\nDans cet article, vous trouverez des informations utiles sur comment nourrir votre lapin. Toutefois, si votre lapin a une pathologie particulière, nous vous conseillons de prendre contact avec votre vétérinaire car il pourra vous donner des conseils adaptés à sa situation. ', '2024-04-15', 2);

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'lapin'),
(2, 'alimentation');

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `comment` text NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `article_id`, `pseudo`, `comment`, `date`) VALUES
(1, 1, 'dfgsdf', 'sdfg', '2024-04-15');

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `alt` varchar(255) NOT NULL,
  `article_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `images`
--

INSERT INTO `images` (`id`, `path`, `alt`, `article_id`) VALUES
(1, 'img/4081de73e603aa2e7dabcab6415466a8.jpg', 'test', 2),
(2, 'img/lapin_belier_1772x.webp', 'Lapin Bellier', 3),
(3, 'img/image.jpg', 'lapin nain', 4),
(4, 'img/lapin_en_train_de_manger_480x480.webp', 'L\'alimentation du lapin', 5);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
