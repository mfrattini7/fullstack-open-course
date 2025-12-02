sequenceDiagram
    participant browser
    participant server

    browser->>server: POST .../new_note_spa
    activate server
    server-->>browser: 201 CREATED response (JSON)
    deactivate server
