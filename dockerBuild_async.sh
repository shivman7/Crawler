#remove containers
docker stop sj-redis
docker rm sj-redis

docker stop sj-crawler-async 
docker rm sj-crawler-async 

docker run --name sj-redis -d -p 6389:6379 redis redis-server

docker build -t crawler-async:latest ./

docker run --name sj-crawler-async -d  --link sj-redis:redis crawler-async