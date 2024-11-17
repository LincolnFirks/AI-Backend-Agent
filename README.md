# AI Tool for Operating a Backend System with Natural Langauge

This was created for the Luddy Fall 2024 Hackathon by Lincoln Firks, Dhruv Chavan, Eric Li, and Antonio Lee

## Demo

[Youtube Demo Link](https://www.youtube.com/watch?v=_onq2kuiPtU)

## Project Description
Duke (delete update kreate examine) is an AI backend agent
that enables users to do create, read, update, and delete (CRUD)
operations on a database through natural language commands.
After a user enters an operation, Gemini processes it, and the
resulting interpretation of the operation is displayed to the
user. Then, a user must confirm the enactment of the interpreted
operation. If a user does not wish to confirm, they can enter
another operation. If a user does confirm the operation, the
database will be updated accordingly, and the log displaying the
recent operations will be updated.
## Accomplishments
Despite our minimal experience with full stack development,
we were able to complete a full stack application within 48
hours for a case that we knew was going to be a tough challenge.
For three of us, this was our second Luddy Hackathon, and for
the other, it was their first. Involving ourselves in these
events has elevated our team collaboration, communication, and
leadership abilities. We have also put a great deal of effort in
over the past 48 hours, and regardless of the result of this
Hackathon, we know our hard work will aid us in our future
endeavors.
## Challenges
Coming into this project, we had limited experience with
React, APIs, managing databases, natural language processing,
and full stack development. However, we were able to overcome
these challenges by delegating tasks to team members that had
some experience/interest in that aspect of the project. We also
leveraged ChatGPT extensively to maximize our learning and patch
our inexperience.

Additionally, we ran into countless problems when trying to
get Gemini to interpret the prompt correctly, when trying to get
the UI to look how we wanted it to, and also when trying to
combine the frontend and backend of our website. Our
inexperience with Github especially made the last challenge
harder, because we struggled with merging and managing our
different branches. On the flip side, Github allowed us to
divide and conquer and also retrieve backups when we ran into
unsolvable problems with the project’s dependencies.

## Backend Design

[Diagram](https://docs.google.com/drawings/d/15kg1uQtCE8bQ4xWPpDn_qZolx0QMya2PCQwcKzWexiI/edit)


## Sample Prompt Usage

### Create:
- “Create a new key color with value red”
- “Make a new entry color with value red”
- “Add a new key for color red”
### Update:
- “Update the key color with value blue”
- “Set the key color with value blue”
- “Make entry color have the value blue”
### Read:
- “What is the key color’s value?”
- “What is the color’s value?”
- “Tell me what color is the key color?”
### Delete:
- “Delete the key color”
- Get rid of the key color”
- “Remove color”
### Limitations:
- Due to the inconsistency of AI (Gemini), the user has to be very clear with key
words such as “make” and “set” as both examples can be discerned as either
creating or updating a key.


## Installation & Set Up

This project runs the recently released Meteor 3.0

Navigate into the Meteor project (this repo).
If you do not currently have Meteor 3.0 installed, run this command to install Meteor on Windows, Linux and OS X.

```bash
npx meteor
```

If you have errors installing Meteor 3.0, please refer to the [Meteor Installation Guide](https://v3-docs.meteor.com/about/install.html)

Then, you can install dependencies by running the following commands: 

```bash
meteor npm install
```

To start the app, simply run the following command: 
```bash
meteor
```
You can access the web application at http://localhost:3000 in the browser by default

> [!NOTE]
> Meteor's default ports are 3000 and 3001 for the web application and MongoDB database, respectively. To change this when booting the app up, you can run:
> ```bash
> meteor --port ####
> ```
> Keep in mind that meteor will use the specified port + 1 to run the built-in MongoDB database on.
>
> e.g.
> ```bash
> meteor --port 5000
> ```
> will run the web application on port 5000 and the MongoDB database on port 5001

You will also need to make a keys.js file in the server directory with exported varibles API_KEY and GEMINI_MODEL in order for the gemini api to work
