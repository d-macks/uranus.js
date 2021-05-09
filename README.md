# Uranus.js
## A library to interact with Kronos' V1 API


### Installation:

`npm i uranus.js`

### Sample Code:

```js
const Uranus = require('uranus.js');
const Kronos = new Uranus('API KEY');

Kronos.get.blacklist("PBST", "ROBLOX");
Kronos.get.schedule("TMS");
```

### Current Methods:

#### **get.schedule()**  
_Parameter 1: **Division**_

 

#### **get.blacklist()**  
_Parameter 1: **Division**_  
_Parameter 2: **Username**_


