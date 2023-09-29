type Node = {
  text: string | null;
  children: Array<Node>;
};

function stringify(contents: Node): string {
  function stringifyNode(node: Node): string {
    return `<li>${node.text}${stringifyChildren(node.children)}</li>`;
  }

  function stringifyChildren(children: Array<Node>): string {
    return children.length > 0
      ? `<ul>${children.map(stringifyNode).join('')}</ul>`
      : '';
  }

  return stringifyChildren(contents.children);
}

const headingTags = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

export default function tableOfContents(doc: Document): string {
  const rootNode = {
    text: null,
    children: [],
  };
  const stack: Array<Node> = [rootNode];
  let currentLevel = 0;

  function traverse(element: Element) {
    if (element == null || element.tagName == null) {
      return;
    }

    if (headingTags.has(element.tagName.toLowerCase())) {
      const level = parseInt(element.tagName[1], 10);
      const node = {
        text: element.textContent,
        children: [],
      };

      for (let i = level; i < currentLevel + 1; i++) {
        stack.pop();
      }

      stack[stack.length - 1].children.push(node);
      stack.push(node);
      currentLevel = level;
    }

    for (const child of element.children) {
      traverse(child);
    }
  }

  traverse(doc.body);

  return stringify(stack[0]);
}
