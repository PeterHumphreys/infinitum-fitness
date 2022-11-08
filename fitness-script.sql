BEGIN;

DROP DATABASE IF EXISTS fitness_project;
CREATE DATABASE fitness_project;
USE fitness_project;
DROP TABLE IF EXISTS user_history, user, bridge_workout_scheduled_exercises, bridge_exercise_image, 
bridge_exercise_primary_muscle, bridge_exercise_secondary_muscle, bridge_exercise_equipment,
session, scheduled_exercise, workout, routine, exercise, muscle, category, equipment;

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

CREATE TABLE image
(
	image_id		INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    image_url		VARCHAR(1024) NOT NULL,
    image_alt_text	VARCHAR(255) NOT NULL
);

CREATE TABLE scheduled_exercise(
	uuid			VARCHAR(255) PRIMARY KEY NOT NULL,
    exercise_id		INTEGER NOT NULL,
    sets			INTEGER NOT NULL,
    reps			INTEGER NOT NULL,
    weight			INTEGER NOT NULL,
    rest			INTEGER NOT NULL,
    sequence		INTEGER NOT NULL,
    FOREIGN KEY(exercise_id) REFERENCES exercise(exercise_id)
);

CREATE TABLE workout(
	uuid			VARCHAR(255) PRIMARY KEY NOT NULL,
    name			VARCHAR(255)
);

CREATE TABLE routine(
	uuid			VARCHAR(255) PRIMARY KEY NOT NULL,
    name 			VARCHAR(255) NOT NULL,
    difficulty		INTEGER,
    recommended_length	INTEGER
    );

CREATE TABLE bridge_workout_scheduled_exercises(
	workout_uuid				VARCHAR(255) NOT NULL,
    scheduled_exercise_uuid		VARCHAR(255),
    PRIMARY KEY(workout_uuid, scheduled_exercise_uuid),
    FOREIGN KEY(workout_uuid) 	REFERENCES workout(uuid),
    FOREIGN KEY(scheduled_exercise_uuid) REFERENCES scheduled_exercise(uuid)
);

CREATE TABLE session(
	routine_uuid		VARCHAR(255) NOT NULL,
    workout_uuid 		VARCHAR(255) NOT NULL,
    day			ENUM("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"),
    start_time	TIME,
    end_time	TIME,
    PRIMARY KEY(routine_uuid, workout_uuid),
    FOREIGN KEY(routine_uuid) REFERENCES routine(uuid),
    FOREIGN KEY(workout_uuid) REFERENCES workout(uuid)
);

CREATE TABLE category(
	category_id		INTEGER PRIMARY KEY NOT NULL,
    category_name	VARCHAR(55) NOT NULL
);

CREATE TABLE muscle(
	muscle_id		INTEGER PRIMARY KEY NOT NULL,
    muscle_name		VARCHAR(255) NOT NULL
);

CREATE TABLE equipment(
	equipment_id	INTEGER PRIMARY KEY NOT NULL,
	equipment_name	VARCHAR(255) NOT NULL
);
CREATE TABLE exercise(
	exercise_id 					INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
	exercise_name					VARCHAR(255) NOT NULL,
	exercise_description			TEXT,
	category_id						INTEGER NOT NULL,
	old_id							INTEGER,
	FOREIGN KEY(category_id) REFERENCES category(category_id)
);

CREATE TABLE bridge_exercise_primary_muscle(
	exercise_id					INTEGER NOT NULL,
	muscle_id					INTEGER NOT NULL,
    PRIMARY KEY (exercise_id, muscle_id),
	FOREIGN KEY (muscle_id) REFERENCES muscle(muscle_id),
	FOREIGN KEY (exercise_id) REFERENCES exercise(exercise_id)
);

CREATE TABLE bridge_exercise_secondary_muscle(
    exercise_id						INTEGER NOT NULL,
    muscle_id						INTEGER NOT NULL,
    PRIMARY KEY (exercise_id, muscle_id),
    FOREIGN KEY (muscle_id) REFERENCES muscle(muscle_id),
    FOREIGN KEY (exercise_id) REFERENCES exercise(exercise_id)
);

CREATE TABLE bridge_exercise_equipment(
    exercise_id					INTEGER NOT NULL,
    equipment_id				INTEGER NOT NULL,
    PRIMARY KEY (exercise_id, equipment_id),
    FOREIGN KEY (exercise_id) REFERENCES exercise(exercise_id),
    FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id)
	);

CREATE TABLE bridge_exercise_image
(
	exercise_id		INTEGER NOT NULL,
	image_id		INTEGER NOT NULL,
    PRIMARY KEY(exercise_id, image_id)
);

/*Insert workout placeholder image into database*/
INSERT INTO image(image_url, image_alt_text)
VALUES("\\images\\placeholder\\workout-placeholder.svg", "Workout Placeholder");

/*Create Test User*/
INSERT INTO user(user_profile_photo_URL, user_first_name, user_last_name, user_email, user_password, user_dob, 
user_sex, user_height, user_activity_level, user_fitness_goal, user_date_joined)
  VALUES("\\images\\placeholder\\account-placeholder.jpg", "John", "Doe", "jDoe@test.com", "123", 
  "1992-08-04", "M", 74, "Lightly Active", "Gain Muscle","2022-09-29");

/*Create test user history entries for the test user*/
INSERT INTO user_history(historical_date, user_id, weight, body_fat_percent) 
VALUES ("2022-09-23", 2, 177.2, "14.2"),
("2022-09-24", 2, 178.8, "14.6"),
("2022-09-25", 2, 182, "12.7"),
("2022-09-26", 2, 182, "13.2"),
("2022-09-27", 2, 180, "13.0"),
("2022-09-28", 2, 180, "12.5"),
("2022-09-29", 2, 181, "12.9");

/*Populate muscles table*/
INSERT INTO muscle(muscle_id, muscle_name)
VALUES(1, "Biceps"), (2, "Shoulders"), (3, "Serratus anterior"), (4, "Chest"), (5, "Triceps"), (6, "Abs"), (7, "Calves"), (8, "Glutes"), 
(9, "Traps"), (10, "Quads"), (11, "Hamstrings"), (12, "Lats"), (13, "Brachialis"), (14, "Obliques"), (15, "Soleus");

/*Populate category table*/
INSERT INTO category(category_id, category_name)
VALUES(10, "Abs"), (8,"Arms"), (12, "Back"), (14, "Calves"), (15, "Cardio"), (11, "Chest"), (9, "Legs"), (13, "Shoulders");
 
 /*Populate equipment table*/
INSERT INTO equipment(equipment_id, equipment_name)
VALUES(1, "Barbell"), (8, "Bench"), (3, "Dumbbell"), (4, "Gym Mat"), (9, "Incline Bench"), (10, "Kettlebell"), 
(7, "none (bodyweight exercise)"), (6, "Pull-up bar"), (5, "Swiss Ball"), (2, "EZ Bar"), (11, "Machine"), (12, "Cable Machine");

