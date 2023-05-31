# my-first-electron-app
Black Jack card counter desktop app.

This app is designed to help players count cards in the Black Jack card game, keeping track of the current count. It is built with the Electron JS framework and uses HTTP requests to communicate with a local server (written in Java in my case) to handle data storage and retrieval.

The value calculation logic is quite simple and I could add the logic to the front-end easily but the purpose of this project was partly to practice using HTTP requests and their methods and to work with a real server (a local java server in my case)

Features: 
- Always on top
- Customizable background color
- Adjustable window size

TODO:
- Move score value calculation logic to the front-end
- Refactor using async/await instead of callbacks
- Add more customizable settings to UI
