# PenPal Exchange Kikbot

![](img/03-penpal-logo.jpg)

PenPal allows students to find other students at their school who are at a similar age, with similar hobbies. PenPal is built using the Microsoft Bot Framework and is active on Kik as `/penpal01`. 

## Links
- [Youtube](https://www.youtube.com/watch?v=A3YdHEDHupA)
- [DevPost](http://devpost.com/software/penpal-exchange)


## Frameworks and APIs
Penpal uses the following:

- [Microsoft Bot Framework](https://docs.botframework.com/en-us/)
	- Microsoft Bot Framework is the 'middleman' that connects to the Kik service. 
	- It is easy to configure it to work with the following services: Skype, email, Facebook messenger, GroupMe, Slack, Telegram, Twilio (SMS). You would only need to click through a few pages of setting up authetication of dev API ids and keys on each different service you want to set up.

## Setup


- Getting data
	- Generate data [online](https://mockaroo.com/c2431200) or connect to your own database.
	
- API keys
	- Insert your Microsoft BotFramework API keys in `app.js`, by replacing  the strings `'API_ID'` and `'API_PASSWORD'`. 


## Interacting with PenPal
- Current dataset for using PenPal:
	- *grade*: 1-12
	- *school*: Gryffindor, Slytherin, Ravenclaw, Hufflepuff
	- *hobby*: biking, reading, music

## Images
![](img/01-subscribe-on-kik.jpg)
<center>*Subscribing to penpal01 on kik.*</center>
<br/><br/>

![](img/02-penpal-exchange-complete.jpg)
<center>*Completing profile and recommended a penpal by penpal01 on kik.*</center>
<br/><br/>
