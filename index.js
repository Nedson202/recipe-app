/* I commented out the raw connection method to postgresql
and used sequelize orm instead */

const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cons = require('consolidate'),
      dust = require('dustjs-helpers'),
      app = express();


/*{ Client } = require('pg'),
{ Pool } = require('pg'),*/
//Database connection string

/*const connectionString = 'postgresql://postgres:null@127.0.0.1:5432/eduonix-recipes';

const  client = new Client({
  connectionString: connectionString
});

const pool = new Pool({
  connectionString: connectionString
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
})*/

const db = require('./models/index');
const recipes = db.recipes

//Assign dust engine to .dust files
app.engine('dust', cons.dust);

//Set default ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views/');

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//index/homepage renderer
app.get('/', (req, res) => {
  /*pool.connect((err, client, done) => {
    if(err) throw err
    client.query('SELECT * FROM recipes', (err, result) => {
      done();

      if(err) {
        console.log(err.stack)
      } else {
        res.render('index', {recipes: result.rows});
      }
    });
  })*/
  recipes.findAll()
  .then((recipes) => {
    res.render('index', {
      recipes: recipes
    })
  })
});

app.post('/add', (req, res) => {
  recipes.create({
    name: req.body.name,
    ingredients: req.body.ingredients,
    directions: req.body.directions
  })
    .then(() => {
      res.redirect('/');
    })
});

app.delete('/delete/:id', (req,res) => {
  /*pool.connect((err, client, done) => {
    if (err) throw err;
    client.query('DELETE FROM recipes WHERE id = $1',
      [req.params.id]);
      done();
  });*/
  recipes.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.send(200);
    })
})

app.post('/edit', (req, res) => {
  /*pool.connect((err, client, done) => {
    if (err) throw err;
    client.query('UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE id =$4',
      [req.body.name, req.body.ingredients, req.body.directions, req.body.id]);
      done();
  });*/
  recipes.findOne({
    where: {
      id: req.body.id
    }
  }).then((recipes) => {
    if(recipes) {
      recipes.updateAttributes({
        name: req.body.name,
        ingredients: req.body.ingredients,
        directions: req.body.directions
      }).then(() => {
        res.redirect('/');
      });
    };
  });
});

const port = 4000;

//This sync's your database(rather than doing sequelize db:migrate )
//then starts the port
app.listen(port, () => {
  db.sequelize.sync()
  .then(() => {
    console.log(`App listening on port: ${port}`);
  });
})
