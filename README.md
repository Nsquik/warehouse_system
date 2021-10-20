# Warehouse Management System

### Stack

1. Project management
	- npm
	- lerna monorepo
	- husky pre-commits
	- commitizen
	- cz-conventional-changelog

2. Back-end
	- node
	- express
	- SQLite

3. Front-end
	- vanilla js
	- es6 dom selectors

### How to run project?!

```console
1. Run `npm install`
2. Run `lerna bootstrap`
3. Run `lerna run start`
3. Open back-end on `localhost:8080`
4. Open front-end on `localhost:3000`
```


### How to commit?!

This project uses `commitizen` with  `cz-conventional-changelog` config. 

```console
1. Install commitizen `npm i -g commitizen`
2. Change some files and run `git add .`
3. Run `git cz`
4. Commitizen will open up in console. Go through all the steps.
5. Push to proper branch :)
```


