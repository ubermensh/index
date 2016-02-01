module.exports = function (height, weight) {
    //sm to meters
    height = height / 100;
    return weight / (height * height);
};
