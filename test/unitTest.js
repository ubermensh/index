var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:1185");

describe("calculator page",function(){

    it('should show a form',function(done){
        server
            .get("/")
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    it('should resolve all wrong requests to index',function(done){
        server
            .get("/some-error-route")
            .expect(200)
            .end(function(err,res){
                if (err) return done(err);
                res.status.should.equal(200);
                done();
            });
    });

    it('should refuse empty submissions');
    it('should refuse partial submissions');
    it('should keep values on partial submissions');
    it('should accept complete submissions');

})