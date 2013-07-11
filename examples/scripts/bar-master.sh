#!/bin/bash

TEMPDIR="/tmp/$(date +%s%N)";
PROJECTPATH="/var/node/bar/"

echo "Creating temporary dir $TEMPDIR";
mkdir -p $TEMPDIR;
cd $TEMPDIR;

echo "Cloning repository";
/usr/bin/git clone -b master git@github.com:foo/bar.git bar;
cd bar;

echo "Installing modules";
npm install;

echo "Removing $PROJECTPATH";
/bin/rm -rf $PROJECTPATH/node_modules;
/bin/rm -rf --verbose $PROJECTPATH;
cd;
echo "Moving $TEMPDIR/repr/ to $PROJECTPATH";
/bin/mv $TEMPDIR/bar/ $PROJECTPATH;
echo "Setting permissions";
/bin/chown -R node:node $PROJECTPATH;
/bin/chmod -R 700 $PROJECTPATH;

echo "Restarting script";
# system uses upstart
/sbin/restart node-bar
