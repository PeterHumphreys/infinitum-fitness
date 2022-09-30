BEGIN;

DROP DATABASE IF EXISTS fitness_project;

CREATE DATABASE fitness_project;

USE fitness_project;

DROP TABLE IF EXISTS user_history;
DROP TABLE IF EXISTS user;

CREATE TABLE user(
user_id 				INTEGER PRIMARY KEY AUTO_INCREMENT,
user_email 				VARCHAR(35) NOT NULL UNIQUE, 
user_first_name 		VARCHAR(35) NOT NULL, 
user_last_name 			VARCHAR(35) NOT NULL,
user_password			VARCHAR(35) NOT NULL,
user_dob 				DATE NOT NULL, 
user_sex 				CHAR(1) NOT NULL, 
user_height 			DOUBLE NOT NULL, 
user_profile_photo_URL	VARCHAR(1024),		
user_activity_level 	VARCHAR(35) NOT NULL,
user_fitness_goal		VARCHAR(35) NOT NULL,
user_date_joined 		DATE NOT NULL
);

CREATE TABLE user_history(
historical_date		DATE NOT NULL,
user_id				INTEGER NOT NULL,
weight				DOUBLE NOT NULL,
body_fat_percent	DOUBLE NOT NULL,
PRIMARY KEY (historical_date, user_id),
FOREIGN KEY (user_id) REFERENCES user(user_id)
);

/*Create Test User*/
INSERT INTO user(user_profile_photo_URL, user_first_name, user_last_name, user_email, user_password, user_dob, user_sex, user_height, user_activity_level, user_fitness_goal, user_date_joined)
  VALUES("\\images\\placeholder\\account-placeholder.jpg", "Amruth", "Vishwaryathan", "avishwaryathan@test.com", "123", "1992-08-04", "M", 74, "Lightly Active", "Gain Muscle","2022-09-29");

INSERT INTO user_history(historical_date, user_id, weight, body_fat_percent) 
VALUES ("2022-09-23", 2, 177.2, "14.2"),
("2022-09-24", 2, 178.8, "14.6"),
("2022-09-25", 2, 182, "12.7"),
("2022-09-26", 2, 182, "13.2"),
("2022-09-27", 2, 180, "13.0"),
("2022-09-28", 2, 180, "12.5"),
("2022-09-29", 2, 181, "12.9")

