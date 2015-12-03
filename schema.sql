CREATE DATABASE IF NOT EXISTS workout_server;

USE workout_server;

CREATE TABLE person (
	person_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(200) NOT NULL,
	PRIMARY KEY (person_id),
	UNIQUE KEY name (name)
) ENGINE=InnoDB;

CREATE TABLE work_type (
	work_type_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	PRIMARY KEY (work_type_id),
	UNIQUE KEY name (name)
) ENGINE=InnoDB;

CREATE TABLE work_done (
	work_done_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	work_type_id INT UNSIGNED NOT NULL,
	person_id INT UNSIGNED NOT NULL,
	reps INT UNSIGNED,
	date_reported DATETIME NOT NULL,
	PRIMARY KEY (work_done_id),
	INDEX work_type (work_type_id),
	INDEX person (person_id)
) ENGINE=InnoDB;
