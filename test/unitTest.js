var supertest = require("supertest");
var should = require("should");
var assert = require("assert");
var bmiCalculator = require("../src/modules/bmiCalculator");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:1185");

function containsSubstring(str, substr){
    return str.indexOf(substr) > -1;
}
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
                assert.strictEqual(true,  containsSubstring(res.text, 'bmi calculator'));
                assert.strictEqual(true, containsSubstring(res.text, 'Your height (centimeters):'));
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
                assert.strictEqual(true, containsSubstring(res.text, 'Your height (centimeters):'));
                done();
            });
    });

    it('should calculate a bmi through module',function(done){

        var heightRandom = getRandomParameter();
        var weightRandom = getRandomParameter();
        //bmi generated with same module as in server
        var bmiFromRandom = bmiCalculator(heightRandom, weightRandom);

        server
            .post("/")
            .field('height', heightRandom)
            .field('weight',  weightRandom)
            .expect(200)
            .end(function(err,res){
                if (err) return done(err);
                assert.strictEqual(true, containsSubstring(res.text, 'your bmi: '+bmiFromRandom));
                res.status.should.equal(200);
                done();
            });
    });

    it('should generate correct bmi (compare to constant)',function(done){
        var height = 180;
        var weight = 75;
        var correctBmi = 23.1;
        server
            .post("/")
            .field('height', height)
            .field('weight', weight)
            .expect(200)
            .end(function(err,res){
                if (err) return done(err);
                assert.strictEqual(true, containsSubstring(res.text, 'your bmi: '+correctBmi));
                res.status.should.equal(200);
                done();
            });
    });
    it('should leave entered values in placeholders after submission', function(done){
        var height = getRandomParameter();
        var weight = getRandomParameter();
        server
            .post("/")
            .field('height', height)
            .field('weight', weight)
            .expect(200)
            .end(function(err,res){
                if (err) return done(err);
                assert.strictEqual(true, containsSubstring(res.text, 'name="height" placeholder="'+height));
                assert.strictEqual(true, containsSubstring(res.text, 'name="weight" placeholder="'+weight));
                res.status.should.equal(200);
                done();
            });
    });
    it('should refuse empty submissions');
    it('should refuse partial submissions');
    it('should keep values on partial submissions');
    it('should accept complete submissions');

})