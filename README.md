How to run
client: npm run start or start before build

server:npm run build:dev
npm run dev


# 4mation
Description:
This project finished the basic functionality of 
- Get tweet for a particular user
- Post a tweet
- Search and like a tweet by keyword
- Fill in the discuss section below.

Front-end technology: React, React-Hooks, Context, Material UI
Back-end : Node,js , Redis and MongoDB.

Because this is 48 hours rushed project maybe the whole system is not robust as normal one.. I just wanna finish the functionalities asap.

notice:
1. I used the redis to store the access_token and access_token_secrect, initially, I wanna use reddis as middleware cache... but my free account is base in usa... it is quite slow to connect.. and sometime the connection would be disconnected, I console.log the redis process in console,like pict below,
![image](https://github.com/zhuxchong/4mation/raw/master/image/redisLoading.PNG)
 After 'redis mid start' if you cannot get result for a long time, yeah, disconnected, just restart the server like pict below
![image](https://github.com/zhuxchong/4mation/raw/master/image/reddisError.PNG)

2.I checked the API doc in Twitter, if I choosed OAUTH2.0 , I have no access to post a new tweet, so OAUTH1.0 is my choice.

3.Because I only have the standard API access in Twitter APP, so I only can use limited APIs, like Get tweet for a particular user. I used the API (https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html)  After reading the doc,I think that is the best way to get tweets by user(screen name), I did not find a free API can search tweet by username.But this one also has some issues,like pict
![image](https://github.com/zhuxchong/4mation/raw/master/image/getTweet.PNG)


4.Search and like a tweet by keyword. I choiced the API(https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets)... It seems use q as a keywords to search the tweet, but wired thing is tweets searched by this API whose key favorited must be false, even I have already like it.Pict
![image](https://github.com/zhuxchong/4mation/raw/master/image/Like.PNG)
![image](https://github.com/zhuxchong/4mation/raw/master/image/likeIssue.PNG)
So I add a new function named favorite list, when you click like for one tweet and you can find this tweet in favorite list, and also you can cancel like in that page.

5..env I have sent to your email , don't forget to add it before launching.

6.The standard API doesn't provide pagnation, so I just get the max number of results and passed them to front-end. I finished a very basic pagnation function in message border via skip and limit.

7.I'd like to make this project robust when I free.
==========================================================================================================================
# Discuss
- What are your thoughts on this app?
- What were the difficulties you ran into?
- What would you improve given more time?
- What would be the next steps?
- How long did it take you?
- How could this skill assessment be made better?

1.I think it is quite good, as I said ahead, because this is 48 hours rushed project maybe the whole system is not robust as normal one..

2. First challenge is Oauth1.0 ... twitter doesn't recomm developer to use Oauth1.0 whose technology is JS.. but I resovled this challenge.
Next one is DOCs in twitter I think it is not quite clear as the DOCs in Github, I spent much time for selecting a correct API.
Need more time
Learning GraphQL and Apollo

3.A lot.
front-end: 
Unit test or TDD patter(hope..)
performance issus, because I used the Hooks for whole project, using the useEffect to replace shouldComUpdate, but I am not the master for this new feature, maybe some re-render is not necessary. 
Tomorrow I will add lazy loading to this project.
As you see I use the material UI for this project, it helps me rapidly build the layout of this structure, but the view ..is not quite good, I need a lot of time to do CSS work
I need to make the page reponsive later using @media, Grid system or Flexbox
remove reundant code and make pattern reusable

back-end: 
Unit test
modify the code and follow the restful principal.
remove reundant code and make pattern reusable
Add logic checking and make system robust.

4. Make the system strong and waiting for your reply.Learning GraphQL and Apollo

5.Around 2 days, I spent most time in Oauth1.0 and API reading/testing 

6.It is quite good I like it

