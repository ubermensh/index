#!/usr/bin/env bash

echo "--- Updating packages list 1 ---"
sudo apt-get -qq update

echo "--- Install python-software-properties ---"
sudo apt-get -qq install -y python-software-properties
echo "--- Installing base packages (if not installed) ---"

package_installed () {
    type "$1" &> /dev/null ;
}

for package in vim git curl
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


echo '----------'
echo "  provison for selenium start  http://www.chrisle.me/2013/08/running-headless-selenium-with-chrome/"
echo '----------'

set -e

if [ -e /.installed ]; then
  echo 'Already installed.'

else
  echo '----------'
  echo 'INSTALLING'
  echo '----------'

  # Add Google public key to apt
  wget -q -O - "https://dl-ssl.google.com/linux/linux_signing_key.pub" | sudo apt-key add -

  # Add Google to the apt-get source list
  echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list

  echo 'Update app-get'
  apt-get -qq update

  echo ' Install Java, Chrome, Xvfb, and unzip'
  apt-get -qq  install -y openjdk-7-jre google-chrome-stable xvfb unzip

  echo 'Download and copy the ChromeDriver to /usr/local/bin'
  cd /tmp
  wget "http://chromedriver.storage.googleapis.com/2.21/chromedriver_linux64.zip"

  wget "http://selenium-release.storage.googleapis.com/2.50/selenium-server-standalone-2.50.0.jar"

  unzip chromedriver_linux64.zip
  mv chromedriver /usr/local/bin
  mv selenium-server-standalone-2.50.0.jar /usr/local/bin

  sudo chmod -R +x /usr/local/bin
  # So that running `vagrant provision` doesn't redownload everything
  touch /.installed
fi

echo 'Start Xvfb, Chrome, and Selenium in the background'
export DISPLAY=:10
cd /vagrant

echo "Starting Xvfb ..."
Xvfb :10 -screen 0 1366x768x24 -ac &

echo "Starting Google Chrome ..."
google-chrome --remote-debugging-port=9222 &

echo "Starting Selenium ..."
cd /usr/local/bin
nohup java -jar ./selenium-server-standalone-2.50.0.jar &
