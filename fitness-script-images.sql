USE fitness_project;
DROP TABLE IF EXISTS image; 

/*Base tables*/
CREATE TABLE image
(
	image_id		INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    image_url		VARCHAR(1024) NOT NULL,
    image_alt_text	VARCHAR(255) NOT NULL
);


INSERT INTO image(image_url, image_alt_text)
VALUES("\\images\\placeholder\\workout-placeholder.svg", "Workout Placeholder");

SELECT * FROM image;