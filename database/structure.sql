CREATE TABLE quizzes (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
lang ENUM('en', 'id', 'others') NOT NULL,
type ENUM('wordgame', 'jokes', 'trivia', 'others') NOT NULL,
question VARCHAR(255) NOT NULL,
answer VARCHAR(255) NOT NULL
);

SET time_zone='+07:00';

CREATE TABLE apikeys (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
email varchar(255) NOT NULL,
api_key varchar(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
hit_count INT(8) UNSIGNED NOT NULL DEFAULT 0,
last_hit TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);