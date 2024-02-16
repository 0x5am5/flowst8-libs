# flowst8-libs

A Useful library of commonly used modules inside Webflow (and outside).

## Simple server

Useful to run a simple server and work on files inside of Webflow development environment.

Note: This method has issues running in Brave browser.

Will require you to run a server

```bash
npx serve dist
```

and place the following code inside of Webflow

```html
<script src="http://localhost:[PORT]/FSSimpleServer.js"></script>
```

## Easy Nav

A helper module that changes style, adds/removes class at certain points on the page. Default is to change immediately.

## Easy Infinite Slider

Task an element and infinitely slides it such as a logo bar

## Easy Youtube

Lazy loading YouTube videos based on the click of an element.
