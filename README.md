# actionHero auth example

> Based on Evan Tahler's example [Authentication with actionHero Again](http://blog.evantahler.com/blog/authentication-with-actionHero-again.html)
> This module is under development and not yet ready for production use.

## Requirements

- node >= 0.8.0
- MongoDB

## Setup

1. ```git clone https://github.com/stefanbuck/actionhero-auth-example```
1. ```cd actionhero-auth-example```
1. ```npm install```
1. Start your MongoDB server ``mongod``` (if not already running)
1. Start the actionHero server ```./node_modules/.bin/actionHero start```

## Example

- [http://localhost:8080/api/userAdd?email=evan@evantahler.com&password=password&firstName=Evan&lastName=tahler](http://localhost:8080/api/userAdd?email=evan@evantahler.com&password=password&firstName=Evan&lastName=tahler)
- [http://localhost:8080/api/logIn?email=evan@evantahler.com&password=password](http://localhost:8080/api/logIn?email=evan@evantahler.com&password=password)
- [http://localhost:8080/api/authenticatedAction](http://localhost:8080/api/authenticatedAction)


## License

The MIT License (MIT)

Copyright (c) 2013 Stefan Buck

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
