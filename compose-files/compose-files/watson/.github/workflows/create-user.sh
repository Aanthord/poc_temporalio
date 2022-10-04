#!/bin/bash

# this script is used to create default users in the mongo database on localhost and in the CI pipeline
mongo admin --host localhost -u root -p password --eval "db.getSiblingDB('admin').createUser({user: 'localAdmin', pwd: 'admin', roles: [{role: 'readWrite', db: 'test'}, {role: 'readWrite', db: 'watson'}]});"
mongo admin --host localhost -u root -p password --eval "db.getSiblingDB('test').createUser({user: 'localAdmin', pwd: 'admin', roles: [{role: 'readWrite', db: 'test'}]});"
mongo admin --host localhost -u root -p password --eval "db.getSiblingDB('watson').createUser({user: 'localAdmin', pwd: 'admin', roles: [{role: 'readWrite', db: 'watson'}]});"
# mongo admin --host localhost -u root -p password --eval "db.getSiblingDB('test');db.grantRolesToUser('localAdmin', [{role: 'readWrite', db: 'test'}]);"
mongo admin --host localhost -u localAdmin -p admin --eval "db.getSiblingDB('test').runCommand({ping: 1});"
mongo admin --host localhost -u localAdmin -p admin --eval "db.getSiblingDB('watson').runCommand({ping: 1});"