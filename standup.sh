#!/bin/bash
set +aexof

docker-compose -f ./compose-files/kafka-stack-docker-compose/full-stack.yml up

sleep 30

for X in airbyte coston jaeger prometheus watson
do
   docker-compose -f ./compose-files/$X/docker-compose.yml up && sleep 10 && echo $X is complete
done
