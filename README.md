# Event Monster
Using the Sign-Up Genius api, the PTA Planner helps volunteers get involved in an easy and coordinate in an easy way! With separate volunteer and administrator views, updating content and distributing is incredibly easy. 

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
/volunteers  
/admin/login  
/volunteer/login  

# Tables in sql database
## You don't need to run the sequal commands, I just kept them there in case we needed to change our models
users:  
first_name: string,  
last_name: string,  
email: string,  
password:string,  
roleID: int  
`sequelize model:generate --name User --attributes first_name:string,last_name:string,email:string,password:string,roleID:integer`  
  
events:   
event_name: string,  
start_date: Date,  
end_date: Date,  
start_time: Time,  
end_time: Time  
`sequelize model:generate --name Events --attributes event_name:string,start_date:Date,end_date:Date,start_time:Time,end_time:Time`    
  
staging:   
event_id: integer,  
user_id: integer  
`sequelize model:generate --name Staging --attributes event_id:integer,user_id:integer`
  
## Development database setup
First you need to update your local .env file to have your db username & db password
`npm install -g sequelize-cli` - install sequalize command line interface globally  
`sequelize db:create` - this will create your local/dev db from the command line  
`sequelize db:migrate` = this will create your db tables from the models  