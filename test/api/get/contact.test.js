process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../index.js');
const conn = require('../../../db/index');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

/*const mongod = new MongoMemoryServer({instance: {dbPath:"C:\\data\\db",storageEngine:"ephemeralForTest"},binary:{version:"v3.0.3"}});

 mongod.getUri().then((uri)=>console.log("uri",uri));*/



before((done) => {
    
  conn.connect().then(done())
    .catch((err)=>done(err));
})

describe('GET /contacts', () => {

  
  

  //before(async () => await conn.connect());

  //afterEach(async () => await conn.clearDatabase());

  after(()=>{
    conn.close()
      .then(()=>console.log("close"))
      .catch((err)=>done(err));
  })

  //after(async () => await conn.closeDatabase());


  it('OK, getting empty list of contacts', (done) => {
    request(app)
      .get('/api/contact/all?filters=')
      .then((res)=>{
        const body = res.body;
        expect(body.length).to.equal(0);
        done();
      }).catch((err)=>{
        done(err);
      });
  })

  /*it('OK, getting 1 contact', (done) => {
    request(app)
      .post('/api/contact/new')
      .send({
        name: 'Contac 1',
        address: 'sdsd sdsdsd',
        email: 'test@test.com',
        phone_number: '54558412'
      })
      .then((res)=>{
        request(app)
        .get('/api/contact/all')
        .then((res)=>{
          const body = res.body;
          console.log(body);
          expect(body.length).to.equal(1);
          done();
        }).catch((err)=>{
          done(err);
        });
      }).catch((err)=>{
        done(err);
      });
  })*/



})