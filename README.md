
# Event Monster
A Jandlebars JS Jquery Node Express mySQL event management system

Using the Sign-Up Genius api, the PTA Planner helps volunteers get involved in an easy and coordinate in an easy way! With separate volunteer and administrator views, updating content and distributing is incredibly easy. 

App deployed on Heroku:
https://eventmonster.herokuapp.com/



# Starting/Stopping the app
In the package.json file, you'll see a scripts section. You can run of any them by doing  
`npm run [scriptName]`  
`npm run start` -Runs our app in 'production'  
`npm run dev` -Runs our app in 'dev'  
They are essentialy the same, except an enironment variable is pass in when we run our app in production so it knows to look at the production database host, username and password.  
The other major difference is that when you do `npm run dev` our app starts with nodemon, so you don't have to start and stop the server for every little frontend tweak.

# Node Version
We talked about using node version 8.9.1 for this project. If the group decides they want to go another way on this, then let me know ASAP, because that will effect the rest of our dependancies.

Things to consider when switching from one version of node to another, you'll lose access to your Globally installed packages, so you'll want to keep that in mind that you might need to replace things like nodemon.

# NVM (Node Version Manager)
Using NVM allows you to swtich back and forth between node versions.  
`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash`  
`nvm install 8.9.1`  
`nvm use 8.9.1`  
You can check which version of node you are using by running  
`node -v`  
  
# Routes
/events
/events/:id
/users
/users/:id  
/login

# Tables in sql database
## You don't need to run the sequal commands, I just kept them there in case we needed to change our models
users:  
first_name: string,  
last_name: string,  
email: string,  
password:string,  
roleID: int,
active: boolean  
`sequelize model:generate --name User --attributes first_name:string,last_name:string,email:string,password:string,roleID:integer`  
  
events:   
event_name: string,  
start_date: Date,  
end_date: Date,  
start_time: Time,  
end_time: Time  
`sequelize model:generate --name Event --attributes event_name:string,start_date:Date,end_date:Date,start_time:Time,end_time:Time`    
  
staging:   
event_id: integer,  
user_id: integer  
`sequelize model:generate --name Staging --attributes event_id:integer,user_id:integer`
  
## Development database setup
First you need to update your local .env file to have your db username & db password  
`npm install -g sequelize-cli` - install sequalize command line interface globally  
`sequelize db:create` - this will create your local/dev db from the command line  
`sequelize db:migrate` = this will create your db tables from the models

## Development database setup
`sequelize db:seed:all` - this will seed all the db's with some mock data for testing  
Data comes form /seeders files and can be referenced in /sample_data  
This was all randomly generated, so logically there could be some issues, like start and end times that don't make sense  
or end dates that are before start dates for events. If that becomes important as we are working on the project then  
update the sampe data JSON files and message me and I'll update the seeders files.  

#.ENV to launch app in vscode create a .ENV file
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_PORT=3306
tokenSecret=EventMonsterMadness4Life!

# To Launch Unit Testing
1. pull latest repo from master in github
2. `npm install` will install mocha and proxyrequire from package.json
3. `npm test` will run all unit tests automatically
The unit test files are stored (and must be stored) in project root/test (i.e. EVENT-MONSTER/test)

Each file is named exactly the same as the file it tests for transparency as per standard practice
e.g. test/api.js ---> tests the routes in file routes/api.js 
test/events.js ---> tests the 'creation of an event' in the DB table events - more acceptance test than unit test
test/sample-test.js ---> A sample test file with boilerplate code  
All files in test directory are run each time `npm test` is run from command line, as per standard practice.


