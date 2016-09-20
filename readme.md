#YelpCamp

* Add landing page
* Add Campgrounds Page that lists all campgrounds
* 
each campground has: 
*name
*image


#Layout and Basic Styling
* Create header and footer partials
* Add in bootstrap


#Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form
* 

--- routes recipe
    app.get /campgrounds
        display all campgrounds 
    app.post /campgrounds
        logic behind pushing a new campground to array "database", then redirecting to /get campgrounds
    app.get /campgrounds/new
        display the form which submits the post request to /campground


#Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid
* Add a navbar
* stack and center for new campground form


#Add Mongoose
* Install campground model inside of our routes
* Setup campground model
* Use campground model inside of our routes

 
#Show Page
* review the RESTful routes we've seen so far
    * 7 restful routes
        * 
* Add description to our campground model
    * (so we have something to show when user clicked on a campground)
* Show db.collection.drop()
    * clear all campground data and start fresh to include description rather than update each campground in the DB.
* Add a show route/template
* 

#RESTFUL ROUTES

Name    URL         Verb   Desription
 ==========================================
INDEX   /dogs       GET     Display a list of all dogs
NEW     /dog/new    GET     Display a form to make a new dog
CREATE  /dogs       POST    Add a new dog to DB
SHOW    /dogs/:id   GET     Shows info about one dog


#Refactor Mongoose Code
* Create a models directory
* Use model.exports
* Requres everything correctly :) 

# Add Seeds File
* Add a seeds.js file
* run the seeks file everytime the server starts

# Add the Comment model!
* Make our errors go away!! (create comments.js)
* Display comments on campground show page.

#Comment New/Create
* Discuss nested Routes
* Add the comment new and create routes
* Add the new comment form

#RESTFUL ROUTES

Name    URL         Verb   Desription
 ==========================================
INDEX   /dogs       GET     Display a list of all dogs
NEW     /dog/new    GET     Display a form to make a new dog
CREATE  /dogs       POST    Add a new dog to DB
SHOW    /dogs/:id   GET     Shows info about one dog


*LINK COMMENTS TO CAMPGROUND -- nested route*
NEW     /campgrounds/:id/comments/new   GET   
CREATE  /campgrounds/:id/comments       POST


#Style the Show Page 
* Add sidebar to show page
* display comments nicely


**Authentication**
# Add User Model -- auth part 1
* Install all packaged needed for auth
* Define User Model

# Register -- auth part 2
* Configure Passport
* Add register routes
* add register template

# Login -- auth part 3
* Add Login Routes
* Add login template 

# Logout/NavBar  -- auth part 4
* Add logout route
* Prevent user from adding a comment if not signed in
    * user middleware we coded called "isLoggedIn"
* Add links to navbar

# Show/Hide Links -- auth part 5
* show/hide auth links correctly (using middleware isLoggedIn)

# Refactor The Routes
* Use Express router to reorganize all routes

# Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

# Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground


# Editing Campgrounds
* Add method-override
* add edit route for campgrounds
* add link to edit page
* add update Routes
* fix $set problem

# Deleting Campgrounds
* Add Destroy Route
* Add Delete Button

# Authorization (figure out what they are allowed to do)
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete button

# Editing Comments
* Add Edit Route for Comments
* Add Edit Button
* Add Update Route

campground/:id/edit <-- campground edit route
campground/:id/comments/:comment_id/edit <-- nested comment route

# Deleting Comments
* Add Destroy Route
* Add Delete Button

# Authorization (figure out what they are allowed to do)
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete button