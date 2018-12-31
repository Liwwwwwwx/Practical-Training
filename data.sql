/*
Navicat MySQL Data Transfer

Source Server         : aliyun
Source Server Version : 50724
Source Host           : 39.105.10.99:3306
Source Database       : data

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2018-12-31 16:37:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for anthology
-- ----------------------------
DROP TABLE IF EXISTS `anthology`;
CREATE TABLE `anthology` (
  `anthologyid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `anthologyname` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `anthologycover` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`anthologyid`) USING BTREE,
  KEY `FK_anthology_user_r` (`userid`) USING BTREE,
  CONSTRAINT `FK_anthology_user_r` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=2021 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for click
-- ----------------------------
DROP TABLE IF EXISTS `click`;
CREATE TABLE `click` (
  `noteid` int(11) NOT NULL,
  `cuserid` int(11) NOT NULL,
  `clickdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`noteid`,`cuserid`) USING BTREE,
  CONSTRAINT `FK_click_note_r` FOREIGN KEY (`noteid`) REFERENCES `note` (`noteid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for collection
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `noteid` int(11) NOT NULL,
  `codate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`,`noteid`) USING BTREE,
  CONSTRAINT `FK_collection_user_r` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `replyid` int(11) NOT NULL AUTO_INCREMENT,
  `noteid` int(11) DEFAULT NULL,
  `com_replyid` int(11) DEFAULT NULL,
  `conameid` int(11) DEFAULT NULL,
  `ccontent` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `commentimg` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `commentdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`replyid`) USING BTREE,
  KEY `FK_comment_comment` (`com_replyid`) USING BTREE,
  KEY `FK_comment_note_r` (`noteid`) USING BTREE,
  CONSTRAINT `FK_comment_comment` FOREIGN KEY (`com_replyid`) REFERENCES `comment` (`replyid`),
  CONSTRAINT `FK_comment_note_r` FOREIGN KEY (`noteid`) REFERENCES `note` (`noteid`)
) ENGINE=InnoDB AUTO_INCREMENT=5006 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for fans
-- ----------------------------
DROP TABLE IF EXISTS `fans`;
CREATE TABLE `fans` (
  `fansid` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  KEY `FK_fan_user_r` (`userid`) USING BTREE,
  CONSTRAINT `FK_fan_user_r` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `feedbackid` int(11) NOT NULL AUTO_INCREMENT,
  `fcontent` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `feedbackdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedbackid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for follow
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow` (
  `followid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  PRIMARY KEY (`followid`) USING BTREE,
  KEY `FK_follow_user_r` (`userid`) USING BTREE,
  CONSTRAINT `FK_follow_user_r` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `messageid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `type` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `noteid` int(11) DEFAULT NULL,
  `replyid` int(11) DEFAULT NULL,
  `ouserid` int(11) DEFAULT NULL,
  `messagedate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`messageid`) USING BTREE,
  KEY `FK_message_user_r` (`userid`) USING BTREE,
  CONSTRAINT `FK_message_user_r` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for music
-- ----------------------------
DROP TABLE IF EXISTS `music`;
CREATE TABLE `music` (
  `musicid` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `mmusic` varchar(14) DEFAULT NULL,
  `mdate` datetime DEFAULT NULL,
  PRIMARY KEY (`musicid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for note
-- ----------------------------
DROP TABLE IF EXISTS `note`;
CREATE TABLE `note` (
  `noteid` int(11) NOT NULL AUTO_INCREMENT,
  `anthologyid` int(11) DEFAULT NULL,
  `notetag` char(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `notecategory` char(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `notecontent` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isnoteoriginal` tinyint(1) DEFAULT NULL,
  `isnoteprivate` tinyint(1) DEFAULT NULL,
  `noteimg` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `notemusic` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `notedate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`noteid`) USING BTREE,
  KEY `FK_note_anthology_r` (`anthologyid`) USING BTREE,
  CONSTRAINT `FK_note_anthology_r` FOREIGN KEY (`anthologyid`) REFERENCES `anthology` (`anthologyid`)
) ENGINE=InnoDB AUTO_INCREMENT=1034 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(24) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` char(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phoneNumber` char(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `logindate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `birth` char(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(24) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `autograph` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `qq` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `wechat` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`userid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for user_feedback
-- ----------------------------
DROP TABLE IF EXISTS `user_feedback`;
CREATE TABLE `user_feedback` (
  `userid` int(11) NOT NULL,
  `feedbackid` int(11) NOT NULL,
  PRIMARY KEY (`userid`,`feedbackid`) USING BTREE,
  KEY `FK_user_feedback_feedback_r` (`feedbackid`) USING BTREE,
  CONSTRAINT `FK_user_feedback_feedback_r` FOREIGN KEY (`feedbackid`) REFERENCES `feedback` (`feedbackid`),
  CONSTRAINT `FK_user_feedback_user_r` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;
DROP TRIGGER IF EXISTS `addClick`;
DELIMITER ;;
CREATE TRIGGER `addClick` AFTER INSERT ON `click` FOR EACH ROW begin
  insert into message(userid,type,noteid,ouserid) values((select userid from anthology where anthologyid = (select anthologyid from note where noteid = new.noteid) ),'点赞',new.noteid,new.cuserid);
end
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `addComment`;
DELIMITER ;;
CREATE TRIGGER `addComment` AFTER INSERT ON `comment` FOR EACH ROW begin
  insert into message(userid,type,noteid,replyid,ouserid) values((select userid from anthology where anthologyid = (select anthologyid from note where noteid = new.noteid)),'回复',new.noteid,new.replyid,new.conameid);
end
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `addFollow`;
DELIMITER ;;
CREATE TRIGGER `addFollow` AFTER INSERT ON `fans` FOR EACH ROW begin
  insert into message(userid,type,ouserid) values(new.userid,'关注',new.fansid);
end
;;
DELIMITER ;
