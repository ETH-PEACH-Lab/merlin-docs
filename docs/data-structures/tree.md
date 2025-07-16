---
sidebar_position: 4
---

# Tree

Trees are hierarchical data structures with parent-child relationships. They are perfect for visualizing tree algorithms, organizational structures, and hierarchical data.

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={450}
  diagramHeight={350}
  overrideSize={true}
>
{`
tree family = {
    nodes: [grandpa, dad, mom, child1, child2]
    children: [grandpa-dad, grandpa-mom, dad-child1, dad-child2]
    value: ["John", "Mike", "Sarah", "Emma", "Alex"]
    color: ["gold", "blue", "pink", "lightblue", "lightgreen"]
}

page
show family
`}
</SideBySide>

## Properties

Trees support the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `nodes` | `id[]` | List of node identifiers |
| `children` | `child[]` | Parent-child relationships (e.g., `parent-child`) |
| `value` | `(number \| string \| null)[]` | Values for each node |
| `color` | `(color \| null)[]` | Colors for each node |
| `arrow` | `(number \| string \| null)[]` | Arrows or labels for each node |
| `above` | `string \| text_object` ([see special features](./text#special-features))  | Label positioned above the tree |
| `below` | `string \| text_object` | Label positioned below the tree |
| `left` | `string \| text_object` | Label positioned to the left |
| `right` | `string \| text_object` | Label positioned to the right |

## Methods

Trees support these methods for manipulation:

### Node Methods
- `addNode(name, value?)` - Add new node with optional value
- `removeNode(name)` - Remove node and its subtree
- `setValue(index | id, value)` - Set value for node at index or node id
- `setColor(index | id, color)` - Set color for node at index or node id
- `setArrow(index | id, arrow)` - Set arrow for node at index or node id

### Tree Structure Methods
- `addChild(parent-child, value?)` - Add child to parent with optional value
- `setChild(parent-child)` - Change parent-child relationship
- `removeSubtree(node)` - Remove node and entire subtree

### Multiple Element Methods
- `setValues([...])` - Set multiple node values
- `setColors([...])` - Set multiple node colors
- `setArrows([...])` - Set multiple node arrows

## Examples

### Basic Tree Example

<MermaidLiteViewer>
{`tree simple = {
    nodes: [root, l, r]
    children: [root-l, root-l]
    value: [1, 2, 3]
}

page
show simple`}
</MermaidLiteViewer>

### Binary Search Tree

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={300}
  overrideSize={true}
>
{`
tree bst = {
    nodes: [root, l, r, ll, lr]
    children: [root-l, root-r, l-ll, l-lr]
    value: [50, 30, 70, 20, 40]
    color: [null, null, null, null, null]
}

page
show bst
`}
</SideBySide>

### Dynamic Tree Operations

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={450}
  diagramHeight={400}
  overrideSize={true}
>
{`
tree org = {
    nodes: [CEO, CTO]
    children: [CEO-CTO]
    value: ["Alice", "Bob"]
}

page
show org

page
org.addChild(CEO-CFO, "Carol")
org.setColor(CFO, "lightgreen")

page
org.addChild(CTO-DevLead, "Dave")
org.setColor(DevLead, "lightblue")

page
org.addChild(DevLead-Engineer, "Eve")
org.setColor(Engineer, "yellow")
`}
</SideBySide>

### Tree Traversal Visualization

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={350}
  overrideSize={true}
>
{`
tree traverse = {
    nodes: [A, B, C, D, E]
    children: [A-B, A-C, B-D, B-E]
    value: [1, 2, 3, 4, 5]
}

page
show traverse

page
traverse.setColor(A, "blue")
traverse.setArrow(A, "visiting")

page
traverse.setColor(B, "blue")
traverse.setArrow(B, "visiting")
traverse.setColor(A, "gray")
traverse.setArrow(A, "visited")

page
traverse.setColor(D, "blue")
traverse.setArrow(D, "visiting")
traverse.setColor(B, "gray")
traverse.setArrow(B, "visited")
`}
</SideBySide>

### Organizational Chart

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={450}
  diagramHeight={300}
  overrideSize={true}
>
{`
tree company = {
    nodes: [president, marketing, engineering, sales]
    children: [president-marketing, president-engineering, president-sales]
    value: ["Jane Smith", "Marketing Dept", "Engineering Dept", "Sales Dept"]
    color: ["gold", "lightcoral", "lightblue", "lightgreen"]
    above: "Company Structure"
}

page
show company
`}
</SideBySide>

## Use Cases

Trees are ideal for:
- **Tree algorithms** - Tree traversal (pre/in/post-order), tree search
- **Binary search trees** - Insertion, deletion, search operations
- **Decision trees** - Decision making processes, game trees
- **Parse trees** - Syntax trees, expression evaluation
- **File systems** - Directory hierarchies, folder structures
- **Organizational charts** - Company hierarchy, family trees
- **Heap operations** - Priority queues, heap sort visualization
- **Trie structures** - String matching, autocomplete

## Related

- [Methods Reference](../methods.md) - Complete list of tree methods
- [Graph](./graph.md) - General graph structures
- [LinkedList](./linkedlist.md) - Linear linked structures
