"use strict";
var supertest = require("supertest");
var should = require("should");
var assert = require("assert");
var bmiCalculator = require("../src/modules/bmiCalculator");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:1185");

//range 1-250
function getRandomParameter() {
    return Math.round(Math.random() * (250 - 1) + 1);
}

describe("calculator page",function(){

    it('should show a form',function(done){
        server
            .get("/")
            .expect(200)
            .end(function(err,res){
                if (err) return done(err);
                assert.strictEqual(true,  res.text.includes('bmi calculator'));
                assert.strictEqual(true, res.text.includes('Your height (centimeters):'));
                res.status.should.equal(200);
                done();
            });
    });

    it('should resolve all wrong requests to form',function(done){
        server
            .get("/some-error-route")
            .expect(200)
            .end(function(err,res){
                if (err) return done(err);
                assert.strictEqual(true, res.text.includes('Your height (centimeters):'));
                done();
            });
    });

    it('should calculate a bmi through module',function(done){

        let heightRandom = getRandomParameter();
        let weightRandom = getRandomParameter();
        //bmi generated with same module as in server
        let bmiFromRandom = bmiCalculator(heightRandom, weightRandom);

        server
            .post("/")
            .field('height', heightRandom)
            .field('weight',  weightRandom)
            .expect(200)
            .end(function(err,res){
                if (err) return done(err);
                assert.strictEqual(true, res.text.includes(`your bmi: ${bmiFromRandom}`));
                res.status.should.equal(200);
                done();
            });
    });

    it('should generate correct bmi (compare to constant)',function(done){
        let height = 180;
        let weight = 75;
        let correctBmi = 23.1;
        server
            .post("/")
            .field('height', height)
            .field('weight', weight)
            .expect(200)
            .end(function(err,res){
                if (err) return done(err);
                assert.strictEqual(true, res.text.includes(`your bmi: ${correctBmi}`));
                res.status.should.equal(200);
                done();
            });
    });
    it('should leave entered values in placeholders after submission', function(done){
        let height = getRandomParameter();
        let weight = getRandomParameter();
        server
            .post("/")
            .field('height', height)
            .field('weight', weight)
            .expect(200)
            .end(function(err,res){
                if (err) return done(err);
//                console.log(`name="height" placeholder="${height}"`);
                assert.strictEqual(true, res.text.includes(`name="height" placeholder="${height}"`));
                assert.strictEqual(true, res.text.includes(`name="weight" placeholder="${weight}"`));
                res.status.should.equal(200);
                done();
            });
    });
    it('should refuse empty submissions');
    it('should refuse partial submissions');
    it('should keep values on partial submissions');
    it('should accept complete submissions');
    it('should accept complete submissions');

})