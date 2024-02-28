# Project Summary
- Film Collection API used to manage a database of films (movies) and their related reviews using CRUD functions
- Used EJS for templating, generating HTML markup with JavaScript
- MySQL database connection achieved with connection pooling, and prevented SQL injection 
- Made use of AJAX to retrieve information from the database without interfering with the behavior of the current page
- Used ESlint for modularization, to achieve high code quality and fix coding style issues
- Implemented filtering based on given terms
<img src="/imagesToShow/films.png"/>
- Users can upload their own films
<img src="/imagesToShow/uploadfilm.png"/>
- Users can view the reviews a film has received
<img src="/imagesToShow/reviews.png>
- Users can view their own reviews of different films, including accepted and pending ones
<img src="/imagesToShow/ownReviews.png"/>
- Used cookies for authentication + authorization, with an admin and a basic user role
<img src="/imagesToShow/notAdmin1.png"/>
- Admins have the right to designate others as admins, accept pending reviews, and delete existing ones, as well as delete films
<img src="/imagesToShow/userspage.png"/>
<img src="/imagesToShow/acceptReviews.png"/>
