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

# Why I can't build this project? 
KendoUI from the Node Modules is not build correctly out the box; At first you are need to correct an Errors of compliler:
_variables.scss
$calendar-view-height: $calendar-cell-size * 8;// calc( #{$calendar-cell-size * 8} + #{$calendar-header-height} ) !default;
$calendar-cell-size: ($calendar-cell-size-px / $font-size) * 1em !default;

================
_layout.scss
.k-calendar-view {
	width: $calendar-cell-size;// ;(7 * $calendar-cell-size);
	height: $calendar-cell-size;// (7 * $calendar-cell-size);
}


# How to start?
1. `npm run build` to build styles
2. `npm run dev` to watch files