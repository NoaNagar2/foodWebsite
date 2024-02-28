A website for recipes and workshops
Welcome to our recipes and workshops website! This platform allows users to explore a variety of recipes, categorized by different types of foods, and sign up for workshops. Users can register on the site, mark their favorite recipes and receive notifications about upcoming workshops they have registered for.
Administrators have additional permissions to manage recipes, workshops and user registration.

The project includes a server side (React) and a client side (nodeJS)

#Properties

Registration / login to the website
Browse recipes by category
Bookmark favorite recipes
Sign up for workshops
Receive emails to register for workshops

# Administrator permissions:

Create, edit and delete recipes
Create, edit and delete workshops
Watch the workshop participants
View all registered users

#Starting the application

##Starting the server:

pnpm watch
The server will be available at http://localhost:8080

##Activating the website (client side):

pnpm start
The site will be available at http://localhost:3000.

#Examples to use

##User registration
Users can register by providing their details (name, email, phone and password)

##Login existing user
Already registered users can login to the site by providing their email and password.

## Viewing recipes

Users can browse recipes by category and mark their favorite recipes.

##Register for the workshop
Users can register for workshops by providing their details. An email will be sent to the user confirming his registration, and another email will be sent to the site administrator.

##Administrator dashboard
Administrators can access the dashboard to manage recipes, workshops and user registration.

#technologies in use
Node.js
Express.js
MongoDB
React.js
Redux (for state management)
Nodemailer (for sending emails)
JWT (JSON Web Tokens) for authentication
