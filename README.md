# RestAPI for Quiz Resources
Build with Node JS, Express JS, and MySQL.

This API supplies quiz resource with following format
```
{
    answer: String,
    question: String,
    lang: enum('id', 'en', 'others'),
    type: enum('wordgame', 'trivia', 'jokes', 'others')
}
```

Resource is currently available in Bahasa Indonesia and English.

## Available Endpoints
| Method | Path | Description|
|-----|---|---|
| GET | '/quiz' | get one random quiz resource |
| GET |'/quiz/:id' | get one quiz resource by ID |
| POST | '/quiz' | create a new quiz resource |
| PUT | '/quiz' | update a new quiz resource |
| DELETE | '/quiz' | delete a new quiz resource |

## Prerequisites
### Database
This project assumes you have MySQL running on server. Open MySQL shell or GUI tools, and enter this command (or you can import from ```database/structure.sql```):
```
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
```
### NPM
Make sure you have NPM and Node installed.

## Project setup
```npm install```

### Run
```node server.js```
