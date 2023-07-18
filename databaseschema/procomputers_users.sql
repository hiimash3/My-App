-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: procomputers
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `profileimage` blob,
  `phone` int DEFAULT NULL,
  `post` int DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `admin` tinyint DEFAULT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `userid_UNIQUE` (`userid`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (41,'hiimash','Ash','Brown','$2b$10$OpZ23WkwPUUXSHl8qntIaejYLT./tFuwO.6nNgWRZzmj.pcHIhz/W','ashbrown@gmail.com',NULL,60555532,71210,'Osik do 150',1),(42,'sdas','sda','sda','$2b$10$sxhkQzsuSgcRQ51olGqwK.IjTbuYfpsXaveTaTQR9iaczpsWt0Hhi','sda@gmail.com',NULL,NULL,NULL,NULL,NULL),(44,'sdasd','sda','sda','$2b$10$58rcl1sKkkhvZoe59U4mpu9vPHJneVxdSIxixdFXwuadMrrO3HZtu','sda@gmail.com',NULL,NULL,NULL,NULL,NULL),(45,'sdasda','sdasda','sdasda','$2b$10$FHay5fN8XwTVjNwMiYSEYOtar29TUuUyqff8HysBow3sUAC87kJsO','samir@gmail.com',NULL,NULL,NULL,NULL,NULL),(46,'samirdamir','samir','samir','$2b$10$FnDq/SvcT6VmzXSfOwsW4OmeJ24TNkrb223MFHgkexQujOJlJiqBS','samir@gmail.com',NULL,NULL,NULL,NULL,NULL),(47,'12345678901234567890123456','sda','sda','$2b$10$ABIY2IOFYKtvgh2wLXBEQeitUTCD2hG7c87sW1ICJab3yny65nnLi','sda@gmail.com',NULL,NULL,NULL,NULL,NULL),(48,'HowToPotatos','Potaatos','Mr.Tato','$2b$10$XS5/.NxAR6Apt3i7e5hw1OV1CM0wXJpTHcuzYtREqf2rWuFpvnQ0S','sda@gmail.com',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-18 13:46:38
