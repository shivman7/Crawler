
#remove containers
docker stop sj-redis
docker rm sj-redis

docker stop sj-crawler 
docker rm sj-crawler 

docker run --name sj-redis -d -p 6389:6379 redis redis-server

docker build -t crawler:latest ./

docker run --name sj-crawler -d  --link si-redis:redis crawler






