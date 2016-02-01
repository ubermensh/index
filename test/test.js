//var webdriver = require('selenium-webdriver');
//
//var keyword = "chris le twitter";
//
//var driver = new webdriver.Builder().
//    usingServer('http://localhost:4444/wd/hub').
//    withCapabilities(webdriver.Capabilities.chrome()).
//    build();
//
//driver.get('http://www.google.com');
//driver.findElement(webdriver.By.name('q')).sendKeys(keyword);
//driver.findElement(webdriver.By.name('btnG')).click();
//driver.wait(function() {
//    return driver.getTitle().then(function(title) {
//        driver.getPageSource().then(function(html) {
//            console.log(html);
//            return true;
//        });
//    });
//}, 1000);
//console.log('here');
//
//driver.quit();





var webdriver = require('selenium-webdriver');
var SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
var server = new SeleniumServer('/selenium-server-standalone-2.46.0.jar', {
    port: 4444
});

server.start();


var driver = new webdriver.Builder()
    .usingServer(server.address())
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

driver.get('http://localhost:1185/');
driver.findElement(webdriver.By.name('height')).sendKeys('222');
driver.findElement(webdriver.By.name('weight')).sendKeys('120');
driver.findElement(webdriver.By.name('submit')).click();
driver.quit();

