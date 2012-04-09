# file-restriction

The file restriction module for Node.js.  
This module provides the file restriction feature like "open_basedir" system of PHP.

## Installation

``` bash
$ npm install file-restriction
```

## Usage

``` javascript
// restriction.json
[ "/etc", "/tmp" ]
```

``` javascript
var fr = require('file-restriction');
fr.activate('restriction.json');

var fs = require('fs');
fs.readFileSync('/etc/hosts');                 //=> OK
fs.readFileSync('/etc/fr.txt');                //=> OK
fs.readFileSync('/var/log/httpd/access.log');  //=> ERROR 
```

## License

(The MIT License)

Copyright (c) 2012 Moto Ishizawa &lt;summerwind.jp@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.