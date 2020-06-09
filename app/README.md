# Ionic 4 News App

News app in Ionic 4

## Getting started

* Install the ionic CLI globally: `npm install -g ionic`
* Clone this repository: `git clone https://github.com/cs210/ABC-1.git`.
* Run `npm install` from the app directory.
* Run `npm install node-sass` from the app directory.

## Running in an emulator

Some Ionic features only work in a native build which is why we recommend running in an ios emulator (requires Mac) to get full functionality. 

To run an ios emulator:
* `ionic cordova run ios`

If unable to run on an emulator, run on web:
* `ionic serve -- --proxy-config src/proxy.conf.json`

## Timeline Feature

The timeline feature will provide any new consumer with a comprehensive history of any given topic ordered by date. This way, the user can get all necessary information starting from the beginning of any news story.

Navigate to the second tab to access the timeline feature. On this page, there are a few pre-made timelines containing key current events that the user may be interested in. There is also a search bar so that the user can search any topic they wish.

* Implementation
The timeline feature works closely with the News Api. We access the api through an ionic api service which delivers get requsts specific to the topic of interest. The News Api returns all article data in a json file which we display as a timeline with a large date, picture, title, and description for each article. 

