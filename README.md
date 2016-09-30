# ee-runner

Command line runner of [Google Earth Engine Playground](https://ee-api.appspot.com/) scripts using Node.js.

### Install

* Clone or download this repository.
* Inside Repository
  * Run: npm run init

You may have to remove any previous and no longer valid tokens, for example having played with ee-python.
```rm ~/.config/earthengine/credentials```.

### Usage
* node ee-runner.js \<playground script file\>

### Example

* node ee-runner.js examples/hello.js

```
First image in LANDSAT 8 TOA collection was aquired on 2013-09-26
Downloading thumbnail ...
```

* cat examples/hello.js

```javascript
var image = new ee.Image(new ee.ImageCollection('LANDSAT/LC8_L1T_TOA').first());
var info = image.getInfo();

var date = info.properties['DATE_ACQUIRED']
print('First image in LANDSAT 8 TOA collection was aquired on ' + date);

print('Downloading thumbnail ...');

var url = image
  .visualize({bands:['B6','B5','B3'], gamma: 1.5})
  .getThumbURL({dimensions:'1024x1024', format: 'jpg'});

download(url, 'hello.jpg');

```

* hello.jpg

![hello.jpg](https://github.com/gena/ee-runner/blob/master/examples/hello.jpg?raw=true "Result")
