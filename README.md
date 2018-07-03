# Crawler
Web Crawler to recursively crawl the website for the urls present in them and store the occurence and params of that url.
# Installation
Install the Redis and run the redis-server locally before running the following commands.

    git clone https://github.com/shivman7/Crawler.git
    cd Crawler
    npm install
## For Async version
    npm run start-async
## For Promise version
    npm run start
# Install using Docker
Run the following script
## For Async version
    ./dockerBuild_async.sh
## For Promise version
    ./dockerBuild.sh
    
# Result
To see the result of the Crawler open redis-cli on your system and type the following commands.
## For redis-cli run 
    npm run ssh-redis
## For getting Occurnce
    HGETALL _count
## For getting Params
    HGETALL _params
## For Keys List
    KEYS *
