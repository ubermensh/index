"use strict";
module.exports = function (height, weight) {
    //sm to meters
    height = height / 100;
    let bmi =  weight / (height * height);
    return Math.round( bmi * 10 ) / 10;
};
