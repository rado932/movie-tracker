# Movie Tracker

## Description
This app allows the users to track their movie knowledge.
It has one view that allows for filtering, viewing extra data, editing and adding movies.
Each movie has a Title, Description, Image, Genres (separated by comma) and Year.

## To Run
`npm i` to install the npm dependencies.  
`npm run dev` to start a development server, the application will be available under localhost:8080.  
`npm run prod` to create a app-prod.js that can be deployed to external server.  

## Assumptions
* mocked API, reading data from json.  
* when no filter vars are selected, all the available items should be displayed.  
* when the filter is changed the currently showed object (in the details area) should stay the same.  
