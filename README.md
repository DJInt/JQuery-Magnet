# JQuery-Magnet
Keep an element on top of the screen after scrolling pass it

## Installation
Just include the script file wihtin your HTML page after including JQuery
```html
<script src="/path/to/jquery-magnet.js"></script>
```


## Usage
### Basic Usage - Keep an element on top of screen after scrolling pass it
```javascript
$(".my-elem").magnet();
```

### Keep an element on top after another specified element selector
```javascript
$(".my-elem").magnet({
  after: ".after-me"
});
```
