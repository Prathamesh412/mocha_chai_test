
// used in development stage

var chai = require('chai');  // always install with --save - dev ..chai only works in development mode

var chaiHttp = require('chai-http');  // always install with --save - dev ..chai only works in development mode

var mongoose = require('mongoose');

var server = require('../app/app');  // we are referencing the server below in line 43 for eg

var User = require("../app/models/User");

var Page = require("../app/models/Page");

var should = chai.should();

chai.use(chaiHttp);


describe('Users',function(){
  User.collection.drop();    // Dropping the entire database so no person is left in tets scenarios
  
  beforeEach(function(done){
    var user = new User({
      firstname:'Pratham',
      lastname:'Prabhu'
    });
    user.save(function(err){
      if(err)
        return err
      else
       done();                 
    });
});

  afterEach(function(done){   // This is required to clean the data which is present after the operation
    User.collection.drop();
    done();
  });
  
  
  // The test case for get all users
  it('should list ALL users on /users GET', function(done) {
       chai.request(server)
      .get('/users')                    // checking for the test conditions for get users
      .end(function(err,res){             // we are implementing the test scenarios
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.be.a('array');
         res.body[0].should.have.property('_id');
         res.body[0].should.have.property('firstname');
         res.body[0].should.have.property('lastname');
         res.body[0].firstname.should.equal('Pratham');
         res.body[0].lastname.should.equal('Prabhu');
         done();
         
       });
    });
  
  // the test case for get user by id
  
  it('should list the single users based on /user/:id Get',function(done){
        var user = new User({           // This is the user we are creating so that we can get the id for the usage
          firstname: 'Pratham',
          lastname: 'Prabhu'
        });
    user.save(function(err, data){
    
    chai.request(server)
    .get('/users/'+data._id)    // here it is checking for the data id which is the id present in the url
    .end(function(err,res){
      res.should.have.status(200);
         res.should.be.json;
         res.body.should.be.a('object');
         res.body.should.have.property('_id');
         res.body.should.have.property('firstname');
         res.body.should.have.property('lastname');
         res.body.firstname.should.equal('Pratham');
         res.body.lastname.should.equal('Prabhu');
         res.body._id.should.equal(data.id);    // here we are matching the id from url with the id from the database when the collection is generated
         done();
    });
    
  });

  });// end of user/id
  
  
//The below is for put function   
it('should be able to edit the users based on /user/:id Put',function(done){
  
    chai.request(server)
    .get('/users') // this is to get all the users from the database
     .end(function(err,resp){
      chai.request(server)
        .put('/user/'+ resp.body[0]._id)
        .send({"firstname":"Surya"})
        .end(function(err,res){
             res.should.have.status(200);
             res.should.be.json;
             res.body.should.be.a('object');
             res.body.should.have.property('success');  ///This is the output we are getting in json..in save function in controller(home).
             res.body.success.should.be.a('object');
             res.body.success.should.have.property('firstname');
             res.body.success.should.have.property('_id');
             res.body.success.firstname.should.equal('Surya');
             done();
          });
  
    });
});
 
  
//The below is for post function for a single user 
it('should be able to add a single users based on /user Post',function(done){
     
      chai.request(server)
        .post('/user')
        .send({"firstname":"Surya","lastname":"Darshan"})
        .end(function(err,res){
             res.should.have.status(200);
             res.should.be.json;
             res.body.should.be.a('object');
             res.body.should.have.property('success'); 
             res.body.success.should.be.a('object');
             res.body.success.should.have.property('firstname');
             res.body.success.should.have.property('lastname');
             res.body.success.should.have.property('_id');
             res.body.success.firstname.should.equal('Surya');
             res.body.success.lastname.should.equal('Darshan');
             done();
          });
  });
  
// The below is for delete function for a single   
  
it('should be able to delete a user based on a single /user/:id Delete',function(done){
  // this is taking the value from the before above and checking the condition based on it.
     chai.request(server)
     .get('/users') // this is to get all the users from the database
     .end(function(err,resp){
       console.log(resp.body[0]);
      chai.request(server)
        .delete('/user/'+ resp.body[0]._id)   // This is the check we are doing for the delete function
        .end(function(err,res){
             res.should.have.status(200);
             res.should.be.json;
             res.body.should.be.a('object');
             res.body.should.have.property('success'); 
             res.body.success.should.be.a('object');
             res.body.success.should.have.property('firstname');
             res.body.success.should.have.property('_id');
             res.body.success.firstname.should.equal('Pratham');
             done();
          });
  
    });
  
});  
  
  
  
// End of describe user function
});

//The below is for Pages tseting function..
describe('Pages',function(){
  Page.collection.drop();    // Dropping the entire database so no person is left in tsts scenarios
  
  beforeEach(function(done){
    var page = new Page({
      pagename:'Pratham',
      description:'Prabhu'
    });
    
    page.save(function(err){
      if(err)
        return err
      else
       done();                 
    });
});

  afterEach(function(done){   // This is required to clean the data which is present after the operation
    Page.collection.drop();
    done();
  });
  
 it('should be able to add a single pagemoderator /pages/:id/addmoderator Post',function(done){
   var page = new Page({           
          pagename: 'Pratham',  //here we have created a new user to get the id
          description: 'Prabhu'
        });   
     
   page.save(function(err,data){
      chai.request(server)
        .post('/pages/'+data._id+'/addmoderator')
        .send({"pageMod":"Pratham"})
        .end(function(err,res){
             res.should.have.status(200);
             res.should.be.json;
             res.body.should.be.a('object');
             res.body.should.have.property('success'); 
             res.body.success.should.be.a('object');
             res.body.success.should.have.property('pageMod');
             res.body.success.should.have.property('pagename');
             res.body.success.should.have.property('description');
             res.body.success.should.have.property('_id');
             res.body.success.pagename.should.equal('Pratham');
             res.body.success.pageMod.should.equal('Pratham');
             done();
            
              });
         });
    });
  
}); // End of page describe function