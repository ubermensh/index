#!/usr/bin/env bash
set -o vi

echo "--- Updating packages list ---"
sudo apt-get -qq update

echo "--- Installing base packages ---"
sudo apt-get -qq install -y vim git curl python-software-properties

echo "--- Updating packages list ---"
sudo apt-get -qq update

echo "--- install n ---"
n_directory='/opt/n'
git clone https://github.com/visionmedia/n.git $n_directory
cd $n_directory
make install

echo "--- Install node.js/npm using n--"
#
n stable 

cd /vagrant

echo "--- Install the local dependencies ---"

npm install --save-dev  grunt-cli bower selenium-webdriver mocha chai
npm install --save-dev formidable@latest express jade
npm install --save-dev nodemon babel-core babel-preset-es2015 babel-preset-stage-2
