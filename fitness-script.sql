BEGIN;

DROP DATABASE IF EXISTS fitness_project;

CREATE DATABASE fitness_project;

USE fitness_project;

DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS user_history;

CREATE TABLE user(
user_id 				INTEGER PRIMARY KEY AUTO_INCREMENT,
user_email 				VARCHAR(35) NOT NULL, 
user_first_name 		VARCHAR(35) NOT NULL, 
user_last_name 			VARCHAR(35) NOT NULL,
user_password			VARCHAR(35) NOT NULL,
user_dob 				DATE NOT NULL, 
user_sex 				CHAR(1) NOT NULL, 
user_height 			FLOAT NOT NULL, 
user_profile_photo_URL	VARCHAR(1024) NOT NULL,		
user_activity_level 	VARCHAR(35) NOT NULL,
user_fitness_goal		VARCHAR(35) NOT NULL,
user_date_joined 		DATE NOT NULL
);

CREATE TABLE user_history(
historical_date		DATE PRIMARY KEY,
user_id				INTEGER,
weight				DOUBLE,
body_fat_percent	DOUBLE,
FOREIGN KEY (user_id) REFERENCES user(user_id)
);

