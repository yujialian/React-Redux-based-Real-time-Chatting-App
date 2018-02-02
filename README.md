# talent_hunter

```
├── README.md
├── build   compile-build-package for the whole project
├── cmrh.conf.js   A require hook to compile CSS Modules in runtime
├── config   webpack config package
├── node_modules   Project Dependencies
├── package-lock.json  
├── package.json   records of package version
├── public
├── scripts  
├── server  Back end express/mongodb server
└── src  Front end JSX code
```  

Below is some Q/A I met and react learning notes:

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

All the components in react essentially a function.React: Functional programming
  
Couple of links helps me:  
https://www.jianshu.com/p/0aae7d4d9bc1  
https://cnodejs.org/topic/5865a866189fd5ad6459006c  
  
Higher Order Component Demo function:
```
First style of writing:

class hello extends React.Component{
  render() {
    return <h2>Hello I love React&Redux</h2>
    }
  }
  
function wrapperHello(Comp) {
  class WrapComp extends React.Component {
    render() {
      return (
        <div>
          <p>This is Higher Order Component</p>
          <Comp {...this.props}></Comp>
        </div>)
      }
    }
    return WrapComp
  }
  hello = wrapperHello(hello)
  
  Second style of writing:
  
  function wrapperHello(Comp) {
    class WrapComp extends React.Component {
      render() {
        return (
          <div>
            <p>This is Higher Order Component</p>
            <Comp {...this.props}></Comp>
          </div>)
        }
      }
    return WrapComp
  }
  
  @wrapperHello
  class hello extends React.Component{
  render() {
    return <h2>Hello I love React&Redux</h2>
    }
  }
  Give a component, return second component, and the second component cooperate the first component.
  ```
  There are 2 use of Higher Order Component:  
&nbsp;&nbsp;1.Props Proxy:The HOC manipulates the props being passed to the WrappedComponent(As the demo shows)  
&nbsp;&nbsp;2.Inheritance Inversion: The HOC extends the WrappedComponent, reusable code, hold render. Example is below:
```
function WrapperHello(Comp) {
  class WrapComp extends Comp {
    componentDidMount() {
      console.log('New add higher order life cycle been loaded')
      }
    render() {
      return <Comp></Comp>
      }
    }
    return WrapComp
  }
  @wrapperHello
  class hello extends React.Component {
    render() {
      return <h2>hello react!</h2>
      }
    }
```
