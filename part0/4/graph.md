sequenceDiagram
    participant browser
    participant server

    browser->>server: POST .../new_note
    activate server
    server-->>browser: 302 response with location header
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
