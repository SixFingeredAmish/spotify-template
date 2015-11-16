# OneList.fm

##What is the purpose of your project (i.e., why would someone use this app)?

OneList was created with the philosophy that anyone should be able to enjoy all their music everywhere, on every platform and service. The only way to achieve this is true the web that allows the user to play their music on any streaming service like Rdio and Spotify. Instead of having some of your favorite music saved in a Spotify playlist, some in an Rdio playlist, and others on YouTube, users have a single list which they can continue adding to as they venture on their music journey.

OneList creates a list of the user's favorite songs and artists and presents the user with a list of streaming platforms the user can choose to use. This way, a user doesn't have to settle with created a favorite list in Rdio and manually create another one in Spotify, of course also updating each list manually. OneList fixes that. Having a single list of your favorite music everywhere solves this problem.

The design is inspired by tiling window managers like [i3 and awesomewm](https://feednix-jarkore.rhcloud.com/wp-content/uploads/2014/06/2014-10-01-093917_1366x768_scrot.png) and also the appearance of the [Bloomberg Terminal](http://cdn.skilledup.com/wp-content/uploads/2013/02/Bloomberg-Screenshot-620x443.gif).

This version only supports manual input by search and adding. In the future, having one list everywhere will be painless. The user could select a file from Dropbox, Simplenote, or Evernote, so that their favorite music are truly everywhere and they no longer need to visit the site to update their music.

**Also, to bypass the 30 second sample, OneList uses the widget player. This means that the user needs to be logged in to Spotify on their desktop client.**

**AdBlock and other privacy extensions need to be disabled to ensure that all scripts load**

##What is the URL of this project on your student web-server?

http://students.washington.edu/nirawitj/info343/spotify-template

##Did you receive help from any other sources (classmates, etc.)? If so, please list who.
Walter Ceder (webapp genius), StackOverflow (has every error possible), and Stella Ding, Susan, and Mike Freeman's Firebase Twitter demo code.

##Approximately how many hours did it take you to complete this challenge?

24 hours. However, 6 were spent writing code that I had to trash, like trying to get most of angular-spotify to work and wrestling with authentication and OAuth.

##Did you encounter any problems in this challenge we should warn students about in the future? How can we make the challenge better?

Not specific to all students, but they might need to learn how OAuth works to get Spotify login to work and store token. This took a really long time for me and in the end little things like handling token still didn't work so I had to ditch it. However, others more fluent in code and web APIs may not encounter this problem.

PrivacyBadger (an extension made by the EFF) blocked AngularFire and Firebase CDNs but only when running from localhost. Super weird. Took a while to troubleshoot this.
