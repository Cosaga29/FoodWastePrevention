-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Dec 05, 2019 at 08:02 PM
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
  `time` date NOT NULL,
  `location` varchar(255) NOT NULL,
  `loss_amount` double NOT NULL,
  `edible` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `LotTable`
--

CREATE TABLE `LotTable` (
  `l_id` int(11) NOT NULL,
  `lot_number` bigint(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `start_weight` double NOT NULL,
  `start_location` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `food_type` int(11) NOT NULL,
  `o_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `LotTable`
--

INSERT INTO `LotTable` (`l_id`, `lot_number`, `description`, `start_weight`, `start_location`, `zip`, `food_type`, `o_id`) VALUES
(1, 52214, 'test lot', 25, 'Florida', '52684', 2, 1),
(3, 589654, 'test', 25.74, 'Florida', '32628', 2, 1),
(4, 52817, 'test lotter', 78.96, 'Florida', '59678', 2, 1);

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

--
-- Dumping data for table `OrgTable`
--

INSERT INTO `OrgTable` (`o_id`, `name`, `address`, `email`, `phone`, `org_type`) VALUES
(1, 'testorg', 'testadd', 'testemail', '87476574', 2);

-- --------------------------------------------------------

--
-- Table structure for table `UserTable`
--

CREATE TABLE `UserTable` (
  `u_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `account_type` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `o_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `UserTable`
--

INSERT INTO `UserTable` (`u_id`, `username`, `password`, `fname`, `lname`, `account_type`, `email`, `o_id`) VALUES
(1, 'testuser', 'testpass', 'fname', 'lname', 1, 'email2@blah.com', 1),
(3, 'user', 'pass', 'testname', 'testname', 0, 'testmail', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `LossEventTable`
--
ALTER TABLE `LossEventTable`
  ADD PRIMARY KEY (`le_id`);

--
-- Indexes for table `LotTable`
--
ALTER TABLE `LotTable`
  ADD PRIMARY KEY (`l_id`);

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
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `LossEventTable`
--
ALTER TABLE `LossEventTable`
  MODIFY `le_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `LotTable`
--
ALTER TABLE `LotTable`
  MODIFY `l_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `OrgTable`
--
ALTER TABLE `OrgTable`
  MODIFY `o_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `UserTable`
--
ALTER TABLE `UserTable`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `LossEventTable`
--
ALTER TABLE `LossEventTable`
  ADD CONSTRAINT `le_lot_fk` FOREIGN KEY (`l_id`) REFERENCES `LotTable` (`l_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `le_org_fk` FOREIGN KEY (`o_id`) REFERENCES `OrgTable` (`o_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `LotTable`
--
ALTER TABLE `LotTable`
  ADD CONSTRAINT `lot_org_fk` FOREIGN KEY (`o_id`) REFERENCES `OrgTable` (`o_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `UserTable`
--
ALTER TABLE `UserTable`
  ADD CONSTRAINT `user_org_fk` FOREIGN KEY (`o_id`) REFERENCES `OrgTable` (`o_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
