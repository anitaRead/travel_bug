var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

describe('User model', function(){

  beforeAll(function(done) {
    mongoose.connection.db.dropCollection('User', function( ) {
        done();
    });
  });

  it('can create a user', function(done){
    var user = new User({ username: 'anita', email: 'anita600@a.com', password: 'hello123' });

    user.save(function(err){
      if(err) { console.log(err) } 

      User.find(function(err, user) {
        if(err) { console.log(err) }
        
        expect(user[0]).toMatchObject({ username: 'anita', email: 'anita600@a.com', password: 'hello123', active: false });

        done();
      });

    });
  });
  
  it('can sign in a user', function(done){

    var user = new User({ username: 'kelvin', email: 'kelvin@example.com', password: 'nicolasturgeon1' });

    user.save(function(err){
      if(err) { console.log(err) } 

      User.find(function(err, user) {
        if(err) { console.log(err) }

        expect(user[1]).toMatchObject({ username: 'kelvin', email: 'kelvin@example.com', password: 'nicolasturgeon1', active: false });

        user[1].active = true;

        expect(user[1]).toMatchObject({ username: 'kelvin', email: 'kelvin@example.com', password: 'nicolasturgeon1', active: true });

        done();
      });

    });
  });


  it('can sign out a user', function(done){

    var user = new User({ username: 'ehelsan', email: 'ehelsan@example.com', password: 'LOOOOOL' });

    user.save(function(err){
      if(err) { console.log(err) } 

      User.find(function(err, user) {
        if(err) { console.log(err) }

        user[2].active = true;

        expect(user[2]).toMatchObject({ username: 'ehelsan', email: 'ehelsan@example.com', password: 'LOOOOOL', active: true });

        user[2].active = false;

        expect(user[2]).toMatchObject({ username: 'ehelsan', email: 'ehelsan@example.com', password: 'LOOOOOL', active: false });

        done();
      });

    });
  });
    
    
});
