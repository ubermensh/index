#!/usr/bin/env bash
set -o vi

echo "--- Updating packages list ---"
sudo apt-get update


echo "--- Installing base packages ---"
sudo apt-get install -y vim git curl python-software-properties

echo "--- Updating packages list ---"
sudo apt-get update

# Install n
n_directory='/opt/n'
git clone https://github.com/visionmedia/n.git $n_directory
cd $n_directory
make install

# Install node.js/npm using n
n stable 

cd /vagrant
# Install the local dependencies
npm install --save  grunt-cli bower react selenium-webdriver babel mocha chai formidable@latest
