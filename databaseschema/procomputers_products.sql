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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productid` int NOT NULL AUTO_INCREMENT,
  `productname` varchar(100) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `price` int NOT NULL,
  `productimg` varchar(500) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`productid`),
  UNIQUE KEY `productid_UNIQUE` (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Super Gaming Racunar','OS: Windows 10, Procesor: Intel Core i3-10100F 3,6 GHz, Matična ploča: H410M, Grafika: AMD Radeon RX550 4GB, Ram: 8GB DDR4, SSD: M.2 500GB, Kućište: MS Industrial, Napajanje: 400w 80+, Ostalo: DP i HDMI. Garancija: 24 mjeseca',900,'https://i.pinimg.com/564x/25/c3/d9/25c3d9a25ebbbbc272e8caf484ac07c0.jpg','PC'),(3,'RedDragon  Mehanicka Tastatura','Blue Switch, Wired, Layout Eng, Mechanical, RGB, Keys No: 104, Key actuation force: 60 g., Key actuation distance: 2.0 mm., Key route: 4.0 mm., Key life span: 50 million Anti-ghosting, Rainbow backlight, adjustable effects and intensity, Mechanical switches with noticeable tactile and audible feedback, Long lasting laser etched symbols, USB, 1,6m',59,'https://assetsio.reedpopcdn.com/k552.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp','Keyboard'),(4,'BORG KB-2820 Tastatura','Keyboard Connection: Wired USB, Layout: BH, Keys Life: 3000000 times, Voltage: 5V DC, Color: Black, Waterproof, Plug and Play, no driver required, Layout: Bosnian',14,'https://www.ue.ba/img/product/28845-BORG-Tastatura-KB-2820-1.jpg','Keyboard'),(5,'BORG Tastatura KB02','Keyboard Connection: Wired USB, Keys Life: 3000000 times, Voltage: 5V DC, Color: Black, Waterproof, Plug and Play, no driver required, Lokalizacija: BiH',13,'https://www.ue.ba/img/product/33702-BORG-KB03-Tastatura-1.webp','Keyboard'),(6,'Cooler Master SK622','Low Profile Mechanical Switch Red, 60% Keyboard, Wired USB Type-C + Bluetooth 4.0, Customizable RGB Backlight per Key, Key Rollover 6-Key Wireless, N-Key Wired, Keystroke Life Span 50 Million, Polling Rate 125 Hz, 1000 Hz, Full RGB (Individually Lit), Onboard Memory 512 kB, Internal Battery Type 4000 mAh Lithium-Ion, Aluminum, Plastic',199,'https://www.ue.ba/img/product/30074-Cooler-Master-SK622-Bluetooth-Mechanical-Keyboard-RGB-1.jpg','Keyboard'),(7,'HyperX Alloy Core RGB','Membrane, Wired, Layout Eng, Veličina tastature:Velika tastatura (Full Size - sa numeričkim djelom),Slovni raspored: EN (US),Tip tastera Membranski tasteri,Nisko-profilni tasteri:Ne, Anti-ghost tasteri;Da,Odziv (Polling rate) 1000 Hz / 1 ms, Multimedijalni tasteri 10 tastera + preko Fn tastera,Vodootpornost (manje količine tečnosti) Da,Oslonac za dlanove Ne, Ergonomski raspored tastera Ne,Dužina kabla tastature 1,8 m,Ostale karakteristike tastature:Pleteni kabl, Pozadinsko osvetljenje Da,Opis pozadinskog osvetljenja:LED RGB pozadinsko osvetljenje sa 6 efekata i 3 nivoa osvetljenosti,Povezivanje USB, Podržane verzije operativnih sistemaWindows 7/8/10, Dimenzije443 x 175 x 36 mm (ŠxVxD), Masa 1120 g, Boja Crna',109,'https://www.ue.ba/img/product/25848-Kingston-HyperX-Tastatura-Alloy-Core-RGB-1.jpg','Keyboard'),(8,'Masterfull Gaming Racunar','OS: Windows 10, Procesor: Intel Core i3-10100F 3,6 GHz, Matična ploča: H410M, Grafika: AMD Radeon RX550 4GB, Ram: 8GB DDR4, SSD: M.2 500GB, Kućište: MS Industrial, Napajanje: 400w 80+, Ostalo: DP i HDMI. Garancija: 24 mjeseca',1200,'https://i.pinimg.com/564x/e0/23/35/e023352cc1c2d5b8ce346c8408c3c17d.jpg','PC'),(9,'DELL P2222H','Veličina ekrana: 21.5\", Rezolucija: 1920x1080, Vrijeme odziva: 5ms, Osvetljenje: 250cd/m2, Osvježenje: 60Hz Antiglare, Priključci: Display port, HDMI, DVI, 4xUSB 3.2.',379,'https://www.ue.ba/img/product/32995-AOC-Montitor-24G2SAEBK-1.webp','Monitor'),(10,'LG 27GQ50A','Veličina ekrana: 27\" VA, Rezolucija: 1920x1080, Osvjetljenje: 250 cd/m2, Kontrast: 3000:1, Vrijeme odziva: 1ms MBR (GtG at Faster), Osvježenje: 165Hz, AMD FreeSync Premium, Priključci: HDMI,DisplayPort, Boja: Crna',439,'https://www.ue.ba/img/product/33611-27-LG-27GQ50A-B-Gaming-165Hz-Display-2.webp','Monitor'),(11,'AULA Obsidian','Wired USB cable, DPI: 800/1200/1600/2400 adjustable, Buttons quantity: 6, Polling rate: 125 Hz, , Sensors: Instant A704E, Speed modes : 30 ips, Illumination: 4 colour adjustable, USB 2.0.',25,'https://www.ue.ba/img/product/24815-ACME-AULA-Obsidian-gaming-mouse-3.jpg','Mouse'),(12,'Razer Gaming Mouse','Dual mode: Bezicni (Razer HyperSpeed Wireless) i Zicani (Speedflex Cable),USB, Opticki, Senzor Razer Focus+, DPI: 20000, Broj tipki 11, Speed 650, Acceleration 50, 70 Million Clicks, 100% PTFE Mouse Feet, 14 Razer Chroma RGB Lighting Zones, Battery Up to 100 Hours, Weight 107 g.',349,'https://www.ue.ba/img/product/29397-Razer-Gaming-Mis-Basilisk-Ultimate-Wireless-1.jpg','Mouse'),(13,'Razer Slušalice','Over-ear, Žičane, Priključci: USB Type A, dužina kabla 2.0 m, 7.1 Surround Sound, Razer™ TriForce Titanium Driver; Oval Ear Cushions, Heat-Transfer Fabric / Leatherette / Memory Foam, Outfitted with custom tuned 40 millimeter drivers, Designed for All Day Comfort, 344 grams, Passive noise cancellation, Detachable HyperClear Cardioid Microphone: A cardioid mic reduces background and ambient noises for crystal clear communication, Chroma RGB Lighting.',379,'https://www.ue.ba/img/product/33210-Razer-Slualice-Kraken-V3-HyperSense-Haptic-1.webp','Headphones'),(14,'HyperX Slušalice','Over-ear, Bežične, 2.4GHz Wireless and up to 30 hour battery2, HyperX 7.1 Surround Sound, Signature HyperX Comfort, Durable, aluminum frame, Detachable, noise-cancelling mic and Built-in mic monitoring, Dynamic, 53mm with neodymium magnets, Circumaural, Closed back, Frequency response 15Hz–20kHz, Impedance 60 Ω, Sound pressure level 104dBSPL/mW at 1kHz, T.H.D. ≤ 1%, Electret condenser microphone, Polar pattern, Bi-directional, Noise-cancelling',309,'https://www.ue.ba/img/product/29364-Kingston-HyperX-Headset-Cloud-2-Wireless-1.jpg','Headphones'),(16,'Monster Gaming Racunar','Dell Vostro Desktop 3910, Core i5-12400, 8GB (1x8GB) DDR4, M.2 512GB SSD, Intel UHD 730, WiFi + BT, no Mouse/Kb, Ubuntu, 3Y',1400,'https://i.pinimg.com/564x/3c/5b/56/3c5b56b5da1c6c4b4a00ef014a0f7eaf.jpg','PC'),(17,'Monster II Gaming','OS: Ne Kučište: Midi Tower CPU: Intel Core i7 12700F 2.1 GHz (turbo 4,9GHz 25MB) RAM: 32 GB DDR4 (2x16GB) SSD: M.2 1TB HDD: 1 TB VGA: nVidia GeForce RTX 3060TI 8GB DDR6 Mreža: LAN, WIFi, Bluetooth Portovi: 2xUSB2.0, 4xUSB3.2, 1xUSB Type-C, 1xDisplayPort 1xHDMI, 1xRJ45 Napajanje: 700W tastatura + miš, Garancija: 3 godine',2150,'https://i.pinimg.com/564x/ce/c5/ee/cec5eeddae49df56d5d144712f7e3cd5.jpg','PC'),(18,'Godzilla Gaming','OS: Windows 11 PRO CPU: Intel Core i3-12100 (3.3GHz, 17MB) RAM: 8GB DDR4 SSD: 256 GB Grafika: Intel UHD Graphics 730 Portovi: 6xUSB3.1, 2xUSB2.0, HDMI Mreža: LAN, Miš i tastatura. Garancija: 12 mjeseci.',2500,'https://i.pinimg.com/originals/23/d0/9b/23d09b613882cc096233e145dfb2cbd0.gif','PC'),(19,'Godzilla 4.0','OS: Ne CPU: Intel Core i5-12400 (3.3GHz, 25,5MB) RAM: 8GB DDR4 SSD: 256 GB Grafika: Intel UHD Graphics 730 Portovi: 6xUSB3.1, 2xUSB2.0, HDMI, VGA Mreža: LAN, DVD-RW, Miš i tastatura. Garancija: 12 mjeseci.',4500,'https://i.pinimg.com/originals/6c/e6/00/6ce600b3862a4c682a78c04102b56e97.gif','PC');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-18 13:46:37
