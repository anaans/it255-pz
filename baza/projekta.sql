-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2017 at 09:29 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projekta`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `aid` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `tokenadmin` varchar(128) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`aid`, `username`, `password`, `tokenadmin`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', '30d2cb980e4039297b424c3d30a4a15b1641502c');

-- --------------------------------------------------------

--
-- Table structure for table `bikes`
--

CREATE TABLE `bikes` (
  `lid` int(11) NOT NULL,
  `marka_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `kategorija_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `options` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bikes`
--

INSERT INTO `bikes` (`lid`, `marka_id`, `model_id`, `kategorija_id`, `price`, `options`) VALUES
(1, 6, 4, 1, 524, 'Nesto'),
(2, 1, 1, 1, 220, 'nista'),
(3, 3, 5, 2, 150, 'nesto'),
(4, 5, 3, 2, 300, 'n');

-- --------------------------------------------------------

--
-- Table structure for table `kategorija`
--

CREATE TABLE `kategorija` (
  `kategorija_id` int(11) NOT NULL,
  `kategorija_type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kategorija`
--

INSERT INTO `kategorija` (`kategorija_id`, `kategorija_type`) VALUES
(1, 'Kategorija1'),
(2, 'Kategorija2');

-- --------------------------------------------------------

--
-- Table structure for table `korisnik`
--

CREATE TABLE `korisnik` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `firstname` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `lastname` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `address` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `city` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `phone` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `hobi` int(11) DEFAULT NULL,
  `token` varchar(128) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `korisnik`
--

INSERT INTO `korisnik` (`id`, `username`, `password`, `firstname`, `lastname`, `address`, `city`, `email`, `phone`, `hobi`, `token`) VALUES
(4, 'korisnik', 'e10adc3949ba59abbe56e057f20f883e', 'KorisnikIme', 'KorisnikPrezime', 'Adresa 2', 'Novi Sad', 'korisnik@email.com', '0213456789', 987654321, '5f73623ae44513c5fe4420d392acd0a2e9105e0c'),
(5, 'neko123', 'e9152b7736697ba1af5db3b8c28e9f35', 'Neko', 'Nekic', 'Nekovljeva 57', 'Beograd', 'neko@neki.com', '44644848', 8451515, '9990f81983d85a632caed824453afad3e7fd040a'),
(6, 'fwwfefw', '2053378eb48348af1b2b786ae6e46a03', 'fwfqef', 'dssfsfs', 'sgsgsgrg', 'ssafwef3', 'anananan@gmail.com', '113456798', 0, '2e4d927d42c4a662b4bc5adb86fda91351361ca6'),
(7, 'aki92', 'e25eb36e3afe653648f5166ce0563ebb', 'andrej', 'vasiljev', 'andrejeva', 'beograd', 'aki992@gmail.com', '1234686', 0, '5421c1104063ff613942e1035532bfa8978f4a2b');

-- --------------------------------------------------------

--
-- Table structure for table `marka`
--

CREATE TABLE `marka` (
  `marka_id` int(11) NOT NULL,
  `marka_type` varchar(30) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `marka`
--

INSERT INTO `marka` (`marka_id`, `marka_type`) VALUES
(1, 'Rocky Mountain'),
(2, 'Ram Bikes'),
(3, 'Tomac'),
(4, 'Time Bikes'),
(5, 'Bentley'),
(6, 'Capriolo');

-- --------------------------------------------------------

--
-- Table structure for table `model`
--

CREATE TABLE `model` (
  `model_id` int(11) NOT NULL,
  `model_type` varchar(30) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `model`
--

INSERT INTO `model` (`model_id`, `model_type`) VALUES
(1, 'Road bicycle'),
(2, 'Longtail bicycle'),
(3, '650 S'),
(4, '488 Spider'),
(5, 'Porteur bicycle'),
(6, 'GranCabrio MC');

-- --------------------------------------------------------

--
-- Table structure for table `probna`
--

CREATE TABLE `probna` (
  `fuel_id` int(11) NOT NULL,
  `fuel_type` varchar(30) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `probna`
--

INSERT INTO `probna` (`fuel_id`, `fuel_type`) VALUES
(1, 'Gasoline'),
(2, 'Disel'),
(3, 'Essence');

-- --------------------------------------------------------

--
-- Table structure for table `probnadva`
--

CREATE TABLE `probnadva` (
  `transmission_id` int(11) NOT NULL,
  `transmission_type` varchar(30) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `probnadva`
--

INSERT INTO `probnadva` (`transmission_id`, `transmission_type`) VALUES
(1, 'Automatic'),
(2, 'Manual');

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `rid` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_bin NOT NULL,
  `marka_type` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `model_type` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `kategorija_type` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `numberofdays` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`rid`, `username`, `marka_type`, `model_type`, `kategorija_type`, `price`, `numberofdays`) VALUES
(7, 'marko', 'Rolls Royce', 'Phantom DropHead', 'Gasoline', '1000.00', 5),
(8, 'korisnik', 'Bentley', 'GTC', 'Gasoline', '2300.00', 8),
(9, 'aki92', 'Maserati', '488 Spider', NULL, '524.00', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `bikes`
--
ALTER TABLE `bikes`
  ADD PRIMARY KEY (`lid`);

--
-- Indexes for table `kategorija`
--
ALTER TABLE `kategorija`
  ADD PRIMARY KEY (`kategorija_id`);

--
-- Indexes for table `korisnik`
--
ALTER TABLE `korisnik`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `marka`
--
ALTER TABLE `marka`
  ADD PRIMARY KEY (`marka_id`);

--
-- Indexes for table `model`
--
ALTER TABLE `model`
  ADD PRIMARY KEY (`model_id`);

--
-- Indexes for table `probna`
--
ALTER TABLE `probna`
  ADD PRIMARY KEY (`fuel_id`);

--
-- Indexes for table `probnadva`
--
ALTER TABLE `probnadva`
  ADD PRIMARY KEY (`transmission_id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`rid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `bikes`
--
ALTER TABLE `bikes`
  MODIFY `lid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `kategorija`
--
ALTER TABLE `kategorija`
  MODIFY `kategorija_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `korisnik`
--
ALTER TABLE `korisnik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `marka`
--
ALTER TABLE `marka`
  MODIFY `marka_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `model`
--
ALTER TABLE `model`
  MODIFY `model_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `probna`
--
ALTER TABLE `probna`
  MODIFY `fuel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `probnadva`
--
ALTER TABLE `probnadva`
  MODIFY `transmission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
