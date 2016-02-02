#!/usr/bin/env bash

echo "--- Updating packages list 1 ---"
sudo apt-get -qq update

echo "--- Installing base packages (if not installed) ---"

package_installed () {
    type "$1" &> /dev/null ;
}

for package in vim git curl python-software-properties
do
    if ! package_installed $package; then
        echo install $package
        sudo apt-get -qq install -y $package
    else
        echo  $package already installed

    fi
done

if ! package_installed node; then
     echo "--- Install node.js/npm using n--"
    n_directory='/opt/n'
    git clone https://github.com/visionmedia/n.git $n_directory
    cd $n_directory
    make install
    n stable
fi

echo "--- Updating packages list 2 ---"
sudo apt-get -qq update

echo " provisioning done "

