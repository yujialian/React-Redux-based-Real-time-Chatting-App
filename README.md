# talent_hunter


Below is some Q/A I met while doing this project:

1. babel-plugin-import: On demand loading when use ant-design.
2. transform-decorators-legacy: When writing redux, support @ service(decorators).
3. proxy: http://localhost:9093, Front end (webpack): 3000 port, back end: 9093 port,if we try to access back end port in front end, which is cross domain, will throw an error.so we do forwarding on
3000 port when access the 9093 port is needed, in this way we can acquire node js port."
4. What is use of Curly Braces in ES6 import statement: https://stackoverflow.com/questions/41337709/what-is-use-of-curly-braces-in-es6-import-statement  
5. Atom: For selecting one at a time: ⌘ + D, For selecting all occurrence at once: ⌘ + CTRL + G  
6. npm install body-parser: receive post data.
7. npm install cookie-parser: Parse Cookie header and populate req.cookies with an object keyed by the cookie names.  
8. npm install utility: Password md5 hash  
9. npm install browser-cookies: Clear user information in cookie when logout.  
10. I find out logout button not working, the problem is in .am-tab-bar element, it has higher stack order compare to the logout button, so I set css z-index to -1:
```
.am-tab-bar{
  z-index: -1;
}
```
to put the am-tab-bar element in the buttom.
