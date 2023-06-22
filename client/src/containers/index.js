// we are using index.js here to export all the containers we dont want 20-25 lines like this in our code
// import a from "./containers/a";
// import b from "./containers/b";....
// in out App.js
export { default as Main } from "./Main";
export { default as Login } from "./Login";
export { default as Dashboard } from "./Dashboard";

// Now they will be exported like this
// import { Login, Main } from "./containers";
// in one single line :D
