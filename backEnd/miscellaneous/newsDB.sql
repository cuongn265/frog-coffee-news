CREATE DATABASE  IF NOT EXISTS `newsdb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `newsdb`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: newsdb
-- ------------------------------------------------------
-- Server version	5.7.13-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apisource`
--

DROP TABLE IF EXISTS `apisource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apisource` (
  `idAPISource` int(11) NOT NULL AUTO_INCREMENT,
  `sourceName` varchar(100) DEFAULT NULL,
  `sourceLink` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idAPISource`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apisource`
--

LOCK TABLES `apisource` WRITE;
/*!40000 ALTER TABLE `apisource` DISABLE KEYS */;
INSERT INTO `apisource` VALUES (1,'Ars Technica - Latest','https://newsapi.org/v1/articles?source=ars-technica&sortBy=latest&apiKey=b1a9eb71513f43d49c154dd48427a833'),(2,'Ars Technica - Top','https://newsapi.org/v1/articles?source=ars-technica&sortBy=top&apiKey=b1a9eb71513f43d49c154dd48427a833'),(3,'EnGadget - Top','https://newsapi.org/v1/articles?source=engadget&sortBy=top&apiKey=b1a9eb71513f43d49c154dd48427a833'),(4,'EnGadget - Latest','https://newsapi.org/v1/articles?source=engadget&sortBy=latest&apiKey=b1a9eb71513f43d49c154dd48427a833'),(5,'Polygon - Latest','https://newsapi.org/v1/articles?source=polygon&sortBy=top&apiKey=b1a9eb71513f43d49c154dd48427a833'),(6,'Recode - Top','https://newsapi.org/v1/articles?source=recode&sortBy=top&apiKey=b1a9eb71513f43d49c154dd48427a833'),(7,'TechCrunch - Top','https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=b1a9eb71513f43d49c154dd48427a833'),(8,'TechCrunch - Latest','https://newsapi.org/v1/articles?source=techcrunch&sortBy=latest&apiKey=b1a9eb71513f43d49c154dd48427a833'),(9,'TechRadar - Top','https://newsapi.org/v1/articles?source=techradar&sortBy=top&apiKey=b1a9eb71513f43d49c154dd48427a833'),(10,'TechRadar - Latest','https://newsapi.org/v1/articles?source=techradar&sortBy=latest&apiKey=b1a9eb71513f43d49c154dd48427a833'),(11,'TheVerge - Top','https://newsapi.org/v1/articles?source=the-verge&sortBy=top&apiKey=b1a9eb71513f43d49c154dd48427a833'),(12,'TheVerge - Latest','https://newsapi.org/v1/articles?source=the-verge&sortBy=latest&apiKey=b1a9eb71513f43d49c154dd48427a833');
/*!40000 ALTER TABLE `apisource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article` (
  `idArticle` int(11) NOT NULL AUTO_INCREMENT,
  `articleHeaderTitle` varchar(500) DEFAULT NULL,
  `articleHeaderDescription` varchar(500) DEFAULT NULL,
  `Category` int(11) DEFAULT NULL,
  `articleEditor` int(11) DEFAULT NULL,
  `date` varchar(100) DEFAULT NULL,
  `headerImagePath` varchar(500) DEFAULT NULL,
  `published` int(11) DEFAULT NULL,
  `pending` int(11) DEFAULT NULL,
  `articleContent` varchar(2000) DEFAULT NULL,
  `articleKeyword` varchar(100) DEFAULT NULL,
  `numberOfFigure` int(11) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `source` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idArticle`),
  KEY `FK_Article_Author_idx` (`articleEditor`),
  KEY `FK_Article_Category_idx` (`Category`),
  CONSTRAINT `FK_Article_Category` FOREIGN KEY (`Category`) REFERENCES `category` (`idCategory`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_Article_Editor` FOREIGN KEY (`articleEditor`) REFERENCES `useraccount` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'Daily Deals: Gears of War With Season Pass, 4K HDR TVs, Consoles With $50 Gift Cards - IGN','Plus The Witcher 3 Complete Edition, Deus Ex, Settlers of Catan, and more!',14,1,'2016-11-13T02:48:50Z','http://assets1.ignimgs.com/2016/04/13/gearsofwar41280jpg-6847d9_1280w.jpg',1,0,'Dell has Vizio latest (and greatest) 4K HDR TV going for $800, the same price you will find at Best Buy, but with a $250 eGift Card attached. Meanwhile, Amazon has the 55 and 65-inch versions of Samsung 4K HDR set going for prices well below average. Both are great choices, and maker appearances on our best 4K HDR TVs for gaming list.',NULL,1,'Alex Roth','IGN'),(2,'New attack reportedly lets 1 modest laptop knock big servers offline','“BlackNurse” could turn lone attackers with modest resources into Internet bullies.',11,2,'2016-11-12T21:20:58Z','https://cdn.arstechnica.net/wp-content/uploads/2016/11/disconnected.jpg',1,0,'Researchers said they have discovered a simple way lone attackers with limited resources can knock large servers offline when they\'re protected by certain firewalls made by Cisco Systems and other manufacturers.',NULL,1,'Dan Goodin','Ars Technica'),(3,'National Geographic’s Mars imagines the planet first colonists','New miniseries mixes present-day documentary with a fictional mission.',15,1,'2016-11-12T20:40:48Z','https://cdn.arstechnica.net/wp-content/uploads/2016/11/IMG_3395-760x380.jpg',1,0,'To promote its upcoming new miniseries Mars, the National Geographic Channel convinced its associated magazine to print a Mars-focused issue, and it set up a VR-Mars outpost in the middle of New York City. For the channel, the miniseries is more than just a new show; its part of an effort to rebrand itself as a source of serious, premium, science-focused content.',NULL,1,'John Timmer','Ars Technica'),(4,'Mark Zuckerberg says it’s ‘extremely unlikely’ fake news on Facebook changed the election outcome','So what responsibility does the social network have as a media purveyor?',15,1,'2016-11-13T05:15:24Z','https://cdn0.vox-cdn.com/thumbor/jb8kj2cZ2-JylOIyipYiF0JR2B0=/0x0:3000x1688/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/51807577/542774578.0.jpg',1,0,'In a post on Facebook, founder and CEO Mark Zuckerberg said that fake stories on the powerful social network did not change the recent presidential election results.',NULL,1,'Kara Swisher','Recode'),(5,'Tech CEO letters to employees address feelings of unrest after election','Over the past 24 hours, top executives at Apple, eBay, Box, LinkedIn, and Microsoft have all sent company-wide memos urging employees to try to move forward, and expressing the belief that people...',15,2,'2016-11-10T20:24:10Z','https://cdn0.vox-cdn.com/thumbor/i-d_R_8quOqNWOQ3Wzlpi6hWwYc=/0x51:1020x625/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/51773567/2012-09-12timcook-iphone5-27.0.jpg',1,0,'Sure, CEOs have congratulated president-elects before, and are doing that now. They’ve marked momentous and historic occasions with tweets and letters and opinion pieces. But this is different. This time, a presidential candidate has run a divisive campaign that simultaneously appealed to working-class voters and alienated many others who felt — who still feel — threatened by the racist, misogynistic, and authoritarian views he has expressed.',NULL,1,'Lauren Goode','Recode'),(6,'Vudu\'s upgraded mobile app brings offline rental viewing','You can also watch extras, buy discs and AirPlay your videos.',11,2,'2016-11-13T06:47:00Z','https://s.aolcdn.com/dims5/amp:1e2655ec8979a0c479aa195a1603e11446c21baa/t:1200,630/q:80/?url=https%3A%2F%2Fs.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F1e313ebe72146ea35f8d4112aa10104b%2F204580550%2Fvudu-ios-5.jpg',1,0,'Unlike some big streaming video services, Vudu isn\'t sitting on the fence when it comes to offline playback. The Walmart-owned provider has revamped its Android and iOS apps with several big features, most notably an option to download your rentals -- you can watch that movie in mid-flight even when the in-air WiFi is lousy. You\'ll also have access to movie extras for supporting titles, and iOS users now get both higher-quality 1080p HDX streaming as well as AirPlay. And if you\'re still attached to hard copies, you can buy discs inside the app instead of heading to the web. So long as you live in the US and like Vudu\'s à la carte approach to movies and TV, you can check out the upgrade right now.',NULL,1,'Jon Fingas','Engadget');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articlefigure`
--

DROP TABLE IF EXISTS `articlefigure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articlefigure` (
  `idArticleFigure` int(11) NOT NULL AUTO_INCREMENT,
  `idArticle` int(11) DEFAULT NULL,
  `figureImagePath` varchar(50) DEFAULT NULL,
  `figureImageCaption` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idArticleFigure`),
  KEY `FK_Figure_Article_idx` (`idArticle`),
  CONSTRAINT `FK_Figure_Article` FOREIGN KEY (`idArticle`) REFERENCES `article` (`idArticle`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articlefigure`
--

LOCK TABLES `articlefigure` WRITE;
/*!40000 ALTER TABLE `articlefigure` DISABLE KEYS */;
/*!40000 ALTER TABLE `articlefigure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articletaglist`
--

DROP TABLE IF EXISTS `articletaglist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articletaglist` (
  `idArticleTag` int(11) NOT NULL AUTO_INCREMENT,
  `idArticle` int(11) DEFAULT NULL,
  `idTag` int(11) DEFAULT NULL,
  PRIMARY KEY (`idArticleTag`),
  KEY `FK_Tag_Taglist_idx` (`idTag`),
  KEY `FK_Article_idx` (`idArticle`),
  CONSTRAINT `FK_Article` FOREIGN KEY (`idArticle`) REFERENCES `article` (`idArticle`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_Tag_Taglist` FOREIGN KEY (`idTag`) REFERENCES `categorytag` (`idCategoryTag`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articletaglist`
--

LOCK TABLES `articletaglist` WRITE;
/*!40000 ALTER TABLE `articletaglist` DISABLE KEYS */;
/*!40000 ALTER TABLE `articletaglist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `idCategory` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(100) DEFAULT NULL,
  `categoryDescription` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idCategory`),
  UNIQUE KEY `catname_UNIQUE` (`categoryName`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (10,'Mobiles','Everyone\'s inseparable shit. Why don\'t we learn more about them ?'),(11,'Gadgets','Camera, Laptop, VR ? We have all !'),(12,'Technology','Blown away with latest new advancing technology'),(13,'Start-up','See how new comer rules the world'),(14,'Gaming','Bored ? Go Gaming !'),(15,'Social','Get rock along social sickest trends !');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorytag`
--

DROP TABLE IF EXISTS `categorytag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorytag` (
  `idCategoryTag` int(11) NOT NULL AUTO_INCREMENT,
  `categoryTagName` varchar(100) DEFAULT NULL,
  `categoryTagDescription` varchar(200) DEFAULT NULL,
  `idCategory` int(11) DEFAULT NULL,
  PRIMARY KEY (`idCategoryTag`),
  KEY `PK_SubCat_Cat_idx` (`idCategory`),
  CONSTRAINT `PK_SubCat_Cat` FOREIGN KEY (`idCategory`) REFERENCES `category` (`idCategory`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorytag`
--

LOCK TABLES `categorytag` WRITE;
/*!40000 ALTER TABLE `categorytag` DISABLE KEYS */;
INSERT INTO `categorytag` VALUES (3,'Android','Android News',10),(4,'iOS','iOS News',10),(5,'WindowsPhone','Windows Phone News',10),(6,'Laptop','Laptop News',11),(7,'VR','Virtual Reality',11),(8,'Audio Gear','Audio Gear',11),(9,'Software','Software',12),(10,'Network','Network',12),(11,'Dota','Dota',14),(12,'League of Legends','Lol',14),(13,'FPS','FPS',14),(14,'Facebook','Trend in Facebook',15);
/*!40000 ALTER TABLE `categorytag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `idrole` int(11) NOT NULL AUTO_INCREMENT,
  `roleName` varchar(100) DEFAULT NULL,
  `roleDescription` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idrole`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'administrator','Administrator'),(2,'collaborator','Collaborator'),(3,'member','Registered Member');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useraccount`
--

DROP TABLE IF EXISTS `useraccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `useraccount` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(200) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  `Username` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Role` int(11) DEFAULT NULL,
  `TelephoneNumber` varchar(45) DEFAULT NULL,
  `FacebookAddress` varchar(100) DEFAULT NULL,
  `GoogleAddress` varchar(100) DEFAULT NULL,
  `TwitterAddress` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `Username_UNIQUE` (`Username`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  KEY `PK_Personnel_Role_idx` (`Role`),
  CONSTRAINT `PK_Member_Role` FOREIGN KEY (`Role`) REFERENCES `role` (`idrole`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useraccount`
--

LOCK TABLES `useraccount` WRITE;
/*!40000 ALTER TABLE `useraccount` DISABLE KEYS */;
INSERT INTO `useraccount` VALUES (1,'Thang','Le Quoc','silverhairguy','123456','silverhair.guy@gmail.com',1,'01882557332','https://www.facebook.com/silverhair.guy',NULL,NULL),(2,'Cuong','Ngo Manh','ngomanhcuong','654321','cuongnm265@gmail.com',1,'0833255214','https://www.facebook.com/eugene.1726',NULL,NULL);
/*!40000 ALTER TABLE `useraccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userpreferences`
--

DROP TABLE IF EXISTS `userpreferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userpreferences` (
  `idUserPreferences` int(11) NOT NULL AUTO_INCREMENT,
  `idMember` int(11) DEFAULT NULL,
  `idSubCategory` int(11) DEFAULT NULL,
  `timeOfVisit` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUserPreferences`),
  KEY `FK_Pre_Member_idx` (`idMember`),
  KEY `FK_Pre_SubCat_idx` (`idSubCategory`),
  CONSTRAINT `FK_Pre_Member` FOREIGN KEY (`idMember`) REFERENCES `useraccount` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_Pre_SubCat` FOREIGN KEY (`idSubCategory`) REFERENCES `categorytag` (`idCategoryTag`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userpreferences`
--

LOCK TABLES `userpreferences` WRITE;
/*!40000 ALTER TABLE `userpreferences` DISABLE KEYS */;
/*!40000 ALTER TABLE `userpreferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'newsdb'
--

--
-- Dumping routines for database 'newsdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-15 20:38:43
