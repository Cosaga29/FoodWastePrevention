-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Nov 29, 2019 at 08:53 AM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs361_edmundsm`
--

-- --------------------------------------------------------

--
-- Table structure for table `LossEventTable`
--

CREATE TABLE `LossEventTable` (
  `le_id` int(11) NOT NULL,
  `l_id` int(11) NOT NULL,
  `o_id` int(11) NOT NULL,
  `time` date NOT NULL DEFAULT current_timestamp(),
  `location` varchar(255) NOT NULL,
  `loss_amount` double NOT NULL,
  `edible` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `LotTable`
--

CREATE TABLE `LotTable` (
  `l_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `start_weight` double NOT NULL,
  `start_location` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `food_type` int(11) NOT NULL,
  `o_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `OrgTable`
--

CREATE TABLE `OrgTable` (
  `o_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `org_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `UserTable`
--

CREATE TABLE `UserTable` (
  `u_id` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `account_type` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `o_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `LossEventTable`
--
ALTER TABLE `LossEventTable`
  ADD PRIMARY KEY (`le_id`),
  ADD UNIQUE KEY `l_id` (`l_id`),
  ADD UNIQUE KEY `o_id` (`o_id`);

--
-- Indexes for table `LotTable`
--
ALTER TABLE `LotTable`
  ADD PRIMARY KEY (`l_id`),
  ADD UNIQUE KEY `o_id_2` (`o_id`),
  ADD KEY `o_id` (`o_id`);

--
-- Indexes for table `OrgTable`
--
ALTER TABLE `OrgTable`
  ADD PRIMARY KEY (`o_id`);

--
-- Indexes for table `UserTable`
--
ALTER TABLE `UserTable`
  ADD PRIMARY KEY (`u_id`),
  ADD UNIQUE KEY `o_id` (`o_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `LossEventTable`
--
ALTER TABLE `LossEventTable`
  ADD CONSTRAINT `le_lot_fk` FOREIGN KEY (`l_id`) REFERENCES `LotTable` (`l_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `le_org_fk` FOREIGN KEY (`o_id`) REFERENCES `OrgTable` (`o_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `LotTable`
--
ALTER TABLE `LotTable`
  ADD CONSTRAINT `lot_org_fk` FOREIGN KEY (`o_id`) REFERENCES `OrgTable` (`o_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `UserTable`
--
ALTER TABLE `UserTable`
  ADD CONSTRAINT `user_org_fk` FOREIGN KEY (`u_id`) REFERENCES `OrgTable` (`o_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
