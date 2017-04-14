# preact-walk

Originally copied from this fiddle: https://jsfiddle.net/developit/4b3935mp/4/

## Install

```
npm install preact-walk
```

## Usage

```js
import walkComponentTree from 'preact-walk';

walkComponentTree(root, (component, children) => {
  // root is the `_component` property of a rendered component (see example below)
  // ...
});
```


## Example

```js
import { h, Component, render } from 'preact'; /** @jsx h */
import walkComponentTree from 'preact-walk';

setTimeout( () => {
  let root = document.body.lastElementChild._component;
  let doc = walkComponentTree(root, (component, children) => {
    let ctor = component.render ? component.constructor : component,
      name = ctor.displayName || ctor.name;
    let node = document.createElement(name);
    for (let prop in component.props) {
      if (prop=='children') continue;
      let value = component.props[prop];
      if (value && typeof value==='object') {
        value = JSON.stringify(value);
      }
      node.setAttribute(prop, value);
    }
    for (let i=0; i<children.length; i++) {
      node.appendChild(children[i]);
    }
    return node;
  });
  console.log(doc);
}, 1000);


class Foo extends Component {
  renders = 0;
  shouldComponentUpdate() {
    return false;
  }
  render({ children, ...props }) {
    return (
      <foo {...props}>
        <span class="renders">{++this.renders}</span>
        {children || 'shouldComponentUpdate():false'}
      </foo>
    );
  }
}

class Demo extends Component {
  render() {
    return (
      <div>
        <button onClick={ () => deepForceUpdate(this) }>deepForceUpdate()</button>
        <Foo><Foo />
        <Foo>
          <div>
            <Foo />
            <Foo />
            <Foo />
          </div>
        </Foo>
        <Foo />
        <Foo />
      </div>
    );
  }
}


render(<Demo />, document.body);

```
