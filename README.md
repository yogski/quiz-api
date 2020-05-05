# RestAPI for Quiz Resources
Build with Node JS, Express JS, and MySQL.

This API supplies quiz resource with following format
```
{
    answer: String,
    question: String
}
```

Resource is currently available in Bahasa Indonesia. More language support is being added to the backlog.

## Available Endpoints
```
GET '/quiz' --> get one random quiz resource
```
```
GET '/quiz/:id' --> get one quiz resource by ID
```
```
POST '/quiz' --> create a new quiz resource
```
```
PUT '/quiz' --> update a new quiz resource
```
```
DELETE '/quiz' --> delete a new quiz resource
```
## Prerequisites
### Database
This project assumes you have MySQL running on server. Open MySQL shell or GUI tools, and enter this command:
```
CREATE TABLE quizzes (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
question VARCHAR(255) NOT NULL,
answer VARCHAR(255) NOT NULL
);
```
### NPM
Make sure you have NPM and Node installed.

## Project setup
```
npm install
```

### Run
```
node server.js
```
