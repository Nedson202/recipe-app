This repo is built on Brad Traversy's Recipe App Using Node.js & PostgreSQL
tutorial on youtube.

It is a great tutorial centered on teaching you the basics of ExpressJs
(and its REST API methods) and PostgreSQL

What's different about this repo?

Rather than use the raw connection method to the postgres db (i commented out
  my connection to the postgres db
  --Our connection method is different since the pg module used has been updated),
i chose to use sequelize orm to manipulate the db.

Helpful resources to help you get started on sequelize--

https://lorenstewart.me/2016/10/03/sequelize-crud-101/
https://gist.github.com/JoeKarlsson/ebb1c714466ae3de88ae565fa9ba4779
http://mherman.org/blog/2015/10/22/node-postgres-sequelize/#.Wo3w9XXwbQr
http://docs.sequelizejs.com/

How to get started?

            Do: git clone https://github.com/Nedson202/recipe-app.git

                    cd recipe-app

      npm i  --- to install the dependencies used

          npm i -g nodemon --- to install nodemon globally

                    nodemon

Update the config.json file in config folder with your db name and password
