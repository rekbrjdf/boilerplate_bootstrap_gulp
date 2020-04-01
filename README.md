# An Introduction to Bootstrap 4
How to use this?
Add to the head of your page next strings:

```
  <link rel="stylesheet" href="dist/bootstrap.css"> <!-- Customized bootstrap -->
  <link
    href="https://fonts.googleapis.com/css?family=Raleway:100,200,300,400,500,600,700,800,900&display=swap&subset=latin-ext"
    rel="stylesheet"> <!-- google cdn base font -->
  <link
    href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900&display=swap&subset=cyrillic"
    rel="stylesheet"> <!-- google cdn cyrillic base font -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
    integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous"> <!-- font awesome (used on menu icons) -->
```
 
```bash
├── src
│   ├── assets
│   │   ├── favicon
│   │   ├── fonts
│   │   ├── img
│   │   └── logotipe
│   ├── styles
│   │   └──  **/*.scss
│   └── templates
│       └── **/*.html
├── build
│   ├── assets
│   │   ├── favicon
│   │   ├── fonts
│   │   ├── img
│   │   └── logotipe
│   ├── components
│   |   └── **/*.html
│   ├── fonts
│   ├── js
│   │   └── **/*.js
│   ├── pages
│   |   └── **/*.html
│   ├── styles
│   │   └──  **/*.css
│   ├── component-list.html
│   └── index.html
├── node_modules
├── site (Hugo static resources)
├── config.yml (Hugo configuration) 
├── .browserslistrc
├── README.md
├── package.json
└── .gitignore
```

# How to start?
1. `npm install`
2. `npm run build-prod`: to build assets for production
3. `npm run build-dev`: to build assets for preview 
4. `npm run watch-dev`: to watch files (Runs BrowserSync and watches for changes, running build when changes are detected)
    
    