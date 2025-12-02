sequenceDiagram
    participant browser
    participant server

    browser->>server: GET .../spa
    activate server
    server-->>browser: HTML file
    deactivate server

    browser->>server: GET .../main.css
    activate server
    server-->>browser: css file
    deactivate server

    browser->>server: GET .../main.js
    activate server
    server-->>browser: js file
    deactivate server

    browser->>server: GET .../data.json
    activate server
    server-->>browser: JSON file
    deactivate server
