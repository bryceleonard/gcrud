var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Restaurants() {
  return knex('restaurants');
}
function Employees() {
  return knex('employees');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})




router.get('/restaurants', function(req, res, next) {
  knex.select().table('restaurants').then(function(result) {
     res.render('list', {result : result})
  })
})




router.get('/restaurants/new', function(req, res, next) {
  res.render('new');
})




router.post('/restaurants', function(req, res, next) {

  Restaurants().insert({
    name:req.body.name,
    city:req.body.city,
    state:req.body.state,
    cuisine:req.body.cuisine,
    rating:req.body.rating,
    image:req.body.image,
    bio:req.body.bio
 }, 'id').then(function(result){
     res.redirect('/restaurants');
   })
})




router.get('/restaurants/:id', function(req, res, next) {
  Employees().where({restaurant_id: req.params.id}).then(function(employees){

  Restaurants().where('id', req.params.id).first().then(function(result){
      var id = result.id
      var name = result.name
      var city = result.city
      var state = result.state
      var cuisine = result.cuisine
      var rating = result.rating
      var image = result.image
      var bio = result.bio
      res.render('show', {id:id, name:name, city:city, state:state, cuisine:cuisine, rating:rating, image:image, bio:bio, employees:employees})
  })
})
})




router.get('/restaurants/:id/edit', function(req, res, next) {
  Restaurants().where('id', req.params.id).first().then(function(result){
      var id = result.id
      var name = result.name
      var city = result.city
      var state = result.state
      var cuisine = result.cuisine
      var rating = result.rating
      var image = result.image
      var bio = result.bio
      res.render('edit', {id:id, name:name, city:city, state:state, cuisine:cuisine, rating:rating, image:image, bio:bio})
  })
})



router.post('/restaurants/:id', function(req, res, next) {
  Restaurants().where('id', req.params.id).update({
      name:req.body.name,
      city:req.body.city,
      state:req.body.state,
      cuisine:req.body.cuisine,
      rating:req.body.rating,
      image:req.body.image,
      bio:req.body.bio
    }).then(function(result){
    res.redirect('/restaurants')
  })
})


router.post('/restaurants/:id/delete', function(req, res, next) {
  Restaurants().where('id', req.params.id).del().then(function(results){
    res.redirect('/restaurants')
  })
})





router.post('/employees/:id/delete', function(req, res, next) {
  Employees().where({id:req.body.id}).del().then(function(results){
    res.redirect('/restaurants')
  })
})



router.post('/employees/:id/edit', function(req, res, next) {
  Employees().where({id:req.body.id}).update({
    firstname:req.body.firstname
  }).then(function(results){
      res.redirect('/restaurants')
  })
});





router.get('/admin', function(req, res, next) {
  knex.select().table('restaurants').then(function(result) {

     res.render('admin', {result : result})
  })
})
router.post('/admin', function(req, res, next) {
  Employees().insert({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    restaurant_id: req.body.restaurant_id
  }, 'id').then(function(result){
    res.redirect('/restaurants')
  })
})



router.get('/review/:id', function(req, res, next) {
  res.render('review', {x:req.params.id});
});

module.exports = router;
