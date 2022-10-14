USE fitness_project;
DROP TABLE IF EXISTS bridge_exercise_image, bridge_exercise_primary_muscle, bridge_exercise_secondary_muscle, bridge_exercise_equipment, exercise, muscle, category, equipment ;

/*Base tables*/
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
    
INSERT INTO muscle(muscle_id, muscle_name)
VALUES(1, "Biceps"), (2, "Shoulders"), (3, "Serratus anterior"), (4, "Chest"), (5, "Triceps"), (6, "Abs"), (7, "Calves"), (8, "Glutes"), (9, "Traps"), (10, "Quads"), (11, "Hamstrings"), (12, "Lats"), (13, "Brachialis"), (14, "Obliques"), (15, "Soleus");

INSERT INTO category(category_id, category_name)
VALUES(10, "Abs"), (8,"Arms"), (12, "Back"), (14, "Calves"), (15, "Cardio"), (11, "Chest"), (9, "Legs"), (13, "Shoulders");
 
INSERT INTO equipment(equipment_id, equipment_name)
VALUES(1, "Barbell"), (8, "Bench"), (3, "Dumbbell"), (4, "Gym Mat"), (9, "Incline Bench"), (10, "Kettlebell"), 
(7, "none (bodyweight exercise)"), (6, "Pull-up bar"), (5, "Swiss Ball"), (2, "EZ Bar"), (11, "Machine"), (12, "Cable Machine");

SELECT * FROM muscle;
SELECT * FROM equipment;
SELECT * FROM bridge_exercise_equipment;
SELECT * FROM bridge_exercise_primary_muscle;
SELECT * FROM exercise;





