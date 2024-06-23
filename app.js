/**
 * 
 * @param {string} nodeName 
 * @param {Record} attributes 
 * @param  {string | Record} arguments 
 * @returns {nodeName: string, attributes: object, children: array}
 */
function h(nodeName, attributes, ...arguments) {
  const children = arguments.length ? [].concat(...arguments) : null;
  return {
    nodeName,
    attributes,
    children,
  };
}

function render(vnode) {
  // Strings just convert to #text Nodes:
  if (vnode.split) return document.createTextNode(vnode);

  // create a DOM element with the nodeName of our VDOM element:
  const n = document.createElement(vnode.nodeName);

  //copy attributes into new node
  const a = vnode.attributes || {};
  Object.entries(a).forEach(([key, value]) => n.setAttribute(key, value));

  // render (build) and then append child nodes:
  for (let child of vnode.children || []) {
    n.appendChild(render(child));
  }

  return n;
}

const vdom = h(
  "div",
  { id: "container" },
  h("img", { src: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX", alt: "random image" }),
  h(
    "p",
    {},
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed."
  )
);