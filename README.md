
# AI-Backend-Agent
Ai Backend Agent Project for the Luddy Fall 2024 Hackathon


License for question mark svg: MIT License 
At: https://opensource.org/license/mit

License for Thumbs Up svg: PD License
At: https://creativecommons.org/public-domain/pdm/

# AI Assistant for Operating a Backend System with Natural Language 

This is a project completed during the Luddy Fall 2024 Hackathon by Dhruv Chavan, Lincoln Firks, Eric Li, and Antonio Lee

## The Problem

Non-technical people have challenges operating backend systems. The goal of this application is to simplify the process by allowing the system to be controlled by natural language only. 

## Design

Our web application takes a CRUD (Create, Read, Update, Delete) request from the user which is sent with to a LLM (Gemini) with a prompt engineered to generate accurate JSON CRUD commands. This command is then passed back to the user, who can confirm the command. If the command isn't what was intended, they can reject it and rewrite it. If confirmed, the app will use the operation on the key-value store and return the result (if necessary) to the user. 

Our key-value store will have a collection that contains:
Key
Value
Last Updated datetime
Created datetime

For every unique key in the database.

We also have a collection of the history of requests made to the system. Each request will show:

Method used
Key
Value
datetime						

The Web Application will also display the recent successful operations performed by the AI Agent.

## Usage

Usage Demo Here

## Testing

Examples of successful prompts and unsuccessful prompts here.


