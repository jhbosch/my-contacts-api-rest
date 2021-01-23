process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../index.js');
const conn = require('../../db/index');



before((done) => {
    
  conn.connect().then(done())
    .catch((err)=>done(err));
})

after(()=>{
  conn.close()
    .then(()=>{})
    .catch((err)=>done(err));
});

describe('OK /contacts', () => {

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
  });

  it('OK, getting 1 contact ', (done) => {
    request(app)
      .post('/api/contact/new')
      .send({
        name: 'Contac new',
        address: 'address new',
        email: 'email@new.com',
        phone_number: '555-555-555-555'
      })
      .then((res)=>{
        request(app)
        .get('/api/contact/all?filters=')
        .then((res)=>{
          const body = res.body;
          expect(body.length).to.equal(1);
          done();
        }).catch((err)=>{
          done(err);
        });
      }).catch((err)=>{
        done(err);
      });
  });

  it('OK, update  contact', (done) => {
    request(app)
      .get('/api/contact/all?filters=').then((res)=>{
        const body = res.body;
        const id_update = body[0]._id;
        request(app)
        .patch('/api/contact/'+id_update)
        .send({
          name: 'Contac change',
          address: 'address change',
          email: 'email@change.com',
          phone_number: '511-115-511-115'
        })
        .then((res)=>{
          const body = res.body;
          expect(body.name).to.equal('Contac change');
          expect(body.address).to.equal('address change');
          expect(body.email).to.equal('email@change.com');
          expect(body.phone_number).to.equal('511-115-511-115');
          done();
        }).catch((err)=>{
          done(err);
        });
      }).catch((err)=>{
        done(err);
      });
   
  });


  it('OK, filters contacts', (done) => {
    request(app)
      .post('/api/contact/new')
      .send({
        name: 'Contac new',
        address: 'address new',
        email: 'email@new.com',
        phone_number: '555-555-555-555'
      })
      .then((res)=>{
        request(app)
        .get('/api/contact/all?filters=new')
        .then((res)=>{
          const body = res.body;
          expect(body.length).to.equal(1);
          expect(body[0].name).to.equal('Contac new');
          done();
        }).catch((err)=>{
          done(err);
        });
      }).catch((err)=>{
        done(err);
      });
  });

  it('OK, deleting 1 contact', (done) => {
    request(app)
      .get('/api/contact/all?filters=').then((res)=>{
        const body = res.body;
        const id_delete = body[0]._id;
        request(app)
        .delete('/api/contact/'+id_delete)
        .then((res)=>{
          const body = res.body;
          expect(body.msg).to.equal('Contact has been removed successfully!');
          request(app)
          .get('/api/contact/all?filters=')
          .then((res)=>{
            const body = res.body;
            expect(body.length).to.equal(1);
            done();
          }).catch((err)=>{
            done(err);
          });
        }).catch((err)=>{
          done(err);
        });
      }).catch((err)=>{
        done(err);
      });
   
  });


  



})


describe('FAIL /contacts', () => {


  it('FAIL, bad router whitout filter query string', (done) => {
    request(app)
      .get('/api/contact/all')
      .then((res)=>{
        const body = res.body;
        expect(body.error).to.equal('Unable to find contacts');
        done();
      }).catch((err)=>{
        done(err);
      });
  });

  

  it('FAIL, Invalid object id', (done) => {
      const bad_id_update = 666;
      request(app)
        .patch('/api/contact/'+ bad_id_update)
        .send({
          name: 'Contac change',
          address: 'address change',
          email: 'email@change.com',
          phone_number: '511-115-511-115'
        })
        .then((res)=>{
          const body = res.body;
          expect(body.error).to.equal('Invalid ID');
          done();
        }).catch((err)=>{
          done(err);
        });  
  });

  it('FAIL, Required field', (done) => {
    request(app)
      .post('/api/contact/new')
      .send({
        name: '',
        address: 'address change',
        email: 'email@change.com',
        phone_number: '511-115-511-115'
      })
      .then((res)=>{
        const body = res.body;
        expect(body.msg._message).to.equal('Contact validation failed');
        done();
      }).catch((err)=>{
        done(err);
      });  
  });


  it('FAIL, Required field name', (done) => {
    request(app)
      .post('/api/contact/new')
      .send({
        name: '',
        address: 'address change',
        email: 'email@change.com',
        phone_number: '511-115-511-115'
      })
      .then((res)=>{
        const body = res.body;
        expect(body.msg.message).to.equal('Contact validation failed: name: Path `name` is required.');
        done();
      }).catch((err)=>{
        done(err);
      });  
  });


  /*it('OK, filters contacts', (done) => {
    request(app)
      .post('/api/contact/new')
      .send({
        name: 'Contac new',
        address: 'address new',
        email: 'email@new.com',
        phone_number: '555-555-555-555'
      })
      .then((res)=>{
        request(app)
        .get('/api/contact/all?filters=new')
        .then((res)=>{
          const body = res.body;
          expect(body.length).to.equal(1);
          expect(body[0].name).to.equal('Contac new');
          done();
        }).catch((err)=>{
          done(err);
        });
      }).catch((err)=>{
        done(err);
      });
  });

  it('OK, deleting 1 contact', (done) => {
    request(app)
      .get('/api/contact/all?filters=').then((res)=>{
        const body = res.body;
        const id_delete = body[0]._id;
        request(app)
        .delete('/api/contact/'+id_delete)
        .then((res)=>{
          const body = res.body;
          expect(body.msg).to.equal('Contact has been removed successfully!');
          request(app)
          .get('/api/contact/all?filters=')
          .then((res)=>{
            const body = res.body;
            expect(body.length).to.equal(1);
            done();
          }).catch((err)=>{
            done(err);
          });
        }).catch((err)=>{
          done(err);
        });
      }).catch((err)=>{
        done(err);
      });
   
  });*/


  



})