# MRSBB

Movie Recommendation System By Bot

## Product Summary

The proposed software engineering project is a web application that recommends movies to users based on their previous ratings. The system will have a backend developed using Flask, a frontend using React, and a database using MongoDB. The system's functional requirements include user authentication management, movie management, rating management, recommendation system, admin authentication management, admin users management, and admin movies management. The non-functional requirements include a friendly graphic user interface, multi-platform compatibility, fast response to user, availability of movie covers, and encrypted user passwords. Additionally, the domain requirements include the need for an internet connection, access through a browser, and the requirement for Flask to run in Python 3.10. The stakeholders will be provided with designs at the end explaining the algorithms and mechanisms of the backend. Overall, this project has the potential to provide users with a personalized movie recommendation system, improving their movie-watching experience.

## Software Development Process

Scrum
Details of the Scrum implementation steps are available in the Report:
Scrum Initial Phase: VI.
Scrum Implementation Phase: VII.
Scrum Project Closure: VIII.

## System Design

### Architecture

Database: MongoDB
Backend: Flask
Recommendation System: Matrix Factorization Collaborative Filtering
Frontend: ReactJS

### Recommendation System Algorithm Design

Details of the Recommendation System Algorithm Design are available in the Report in section IX.

### Use Case Diagram

![alt text](https://raw.githubusercontent.com/iamtienng/movie-recommendation-system/master/design/Usecase.jpg?token=GHSAT0AAAAAACBGBWER6M5LT5WFIDAUWAZWZC7JNYA)

### Component Diagram

![alt text](https://raw.githubusercontent.com/iamtienng/movie-recommendation-system/master/design/Component_Architecture_Design.jpg?token=GHSAT0AAAAAACBGBWEQMHYTZFDZUEPNFMXKZC7JN3A)

### Sequence Diagram

![alt text](https://raw.githubusercontent.com/iamtienng/movie-recommendation-system/master/design/Sequence_Diagram_User.jpg?token=GHSAT0AAAAAACBGBWEQZHOH5XPTOHYTBYMCZC7JN4A)

![alt text](https://raw.githubusercontent.com/iamtienng/movie-recommendation-system/master/design/Sequence_Diagram_Admin.jpg?token=GHSAT0AAAAAACBGBWERIX2GJ7PVUXBZ3XCMZC7JN5A)

### Database Schema

![alt text](https://raw.githubusercontent.com/iamtienng/movie-recommendation-system/master/design/MongoDBSchemaDiagram.jpg?token=GHSAT0AAAAAACBGBWEQW3FMWJWLRORLD4A6ZC7JN6Q)

### Backend Class Diagram

![alt text](https://raw.githubusercontent.com/iamtienng/movie-recommendation-system/master/design/Class_Diagram.jpg?token=GHSAT0AAAAAACBGBWEQPAI3S6HAWVRC6OZCZC7JN7Q)

### Frontend Design

#### Redux Design Diagram

![alt text](https://raw.githubusercontent.com/iamtienng/movie-recommendation-system/master/design/ReduxDiagram.jpg?token=GHSAT0AAAAAACBGBWEQPPNOXYHHTG6YUWEQZC7JOAQ)

#### UI Layer Design Diagram

![alt text](https://raw.githubusercontent.com/iamtienng/movie-recommendation-system/master/design/UIDesign.jpg?token=GHSAT0AAAAAACBGBWERKXBTBDMDINCPEVUGZC7JOCA)

## Deployment

#### Deployment Order

Frontend will only work when it gets response from Backend.
Backend will only work when it gets data from database to process.
So, the deployment order will be as follows:

1. Database
2. Backend
3. Frontend

Deployment details can be found in the Report in section VIII.4.
