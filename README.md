(Current dev branch: working_version)
## Inspiration
CookHack was inspired by the fact that students in university are always struggling with the responsibility of cooking their next healthy and nutritious meal. However, most of the time, we as students are always too busy to decide and learn how to cook basic meals, and we resort to the easy route and start ordering Uber Eats or Skip the Dishes. Now, the goal with CookHack was to eliminate the mental resistance and make the process of cooking healthy and delicious meals at home as streamlined as possible while sharing the process online. 


## What it does
CookHack, in a nutshell, is a full-stack web application that provides users with the ability to log in to a personalized account to browse a catalog of 50 different recipes from our database and receive simple step-by-step instructions on how to cook delicious homemade dishes. CookHack also provides the ability for users to add the ingredients that they have readily available and start cooking recipes with those associated ingredients. Lastly, CookHack encourages the idea of interconnection by sharing their cooking experiences online by allowing users to post updates and blog forums about their cooking adventures.

## How we built it
The web application was built using the following tech stack: React, MongoDB, Firebase, and Flask. The frontend was developed with React to make the site fast and performant for the web application and allow for dynamic data to be passed to and from the backend server built with Flask. Flask connects to MongoDB to store our recipe documents on the backend, and Flask essentially serves as the delivery system for the recipes between MongoDB and React. For our authentication, Firebase was used to implement user authentication using Firebase Auth, and Firestore was used for storing and updating documents about the blog/forum posts on the site. Lastly, the Hammer of the Gods API was connected to the frontend, allowing us to use machine learning image detection.

## Challenges we ran into
- Lack of knowledge with Flask and how it works together with react. 
- Implementing the user ingredients and sending back available recipes 
- Had issues with the backend 
- Developing the review page 
- Implementing HoTG API

## Accomplishments that we're proud of
- The frontend UI and UX design for the site
- How to use Flask and React together
- The successful transfer of data flow between frontend, backend, and the database
- How to create a "forum" page in react
- The implementation of Hammer of the Gods API
- The overall functionality of the project 

## What we learned
- How to setup Flask backend server
- How to use Figma and do UI and UX design
- How to implement Hammer of the Gods API
- How to make a RESTFUL API
- How to create a forum page
- How to create a login system
- How to implement Firebase Auth
- How to implement Firestore
- How to use MongoDB

## What's next for CookHack
- Fix any nit-picky things on each web page
- Make sure all the functionality works reliably
- Write error checking code to prevent the site from crashing due to unloaded data
- Add animations to the frontend UI
- Allow users to have more interconnections by allowing others to share their own recipes to the database
- Make sure all the images have the same size proportions
