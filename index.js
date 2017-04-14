module.exports = walkComponentTree;

exports.walkDom = walkDom;

function walkComponentTree(component, iterator) {
  let inner;
  if (component._component) {
    inner = [walkComponentTree(component._component, iterator)];
  } else if (component.base) {
    inner = walkDom(component.base, iterator);
  }
  return iterator(component, inner);
}

function walkDom(node, iterator) {
  let children = node.children,
    len = children && children.length || 0,
    out = [];
  for (let i = 0; i < len; i++) {
    let child = children[i];
    if (child._component) {
      out.push(walkComponentTree(child._component, iterator));
    } else {
      out.push.apply(out, walkDom(child, iterator));
    }
  }
  return out;
}
