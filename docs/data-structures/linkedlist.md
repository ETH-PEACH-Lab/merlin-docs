---
sidebar_position: 6
---

# LinkedList

LinkedLists are sequences of nodes where each node contains data and connects to the next node. They are perfect for visualizing dynamic data structures and pointer-based algorithms.

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={450}
  diagramHeight={250}
  overrideSize={true}
>
{`
linkedlist chain = {
    nodes: [head, node1, node2, tail]
    value: [10, 20, 30, 40]
    color: ["green", "blue", "blue", "red"]
    arrow: ["start", null, null, "end"]
}

page
show chain
`}
</SideBySide>

## Properties

LinkedLists support the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `nodes` | `id[]` | List of node identifiers |
| `value` | `(number \| string \| null)[]` | Values for each node |
| `color` | `(color \| null)[]` | Colors for each node |
| `arrow` | `(number \| string \| null)[]` | Arrows or labels for each node |
| `above` | `string \| text_object` ([see special features](./text#special-features))  | Label positioned above the list |
| `below` | `string \| text_object` | Label positioned below the list |
| `left` | `string \| text_object` | Label positioned to the left |
| `right` | `string \| text_object` | Label positioned to the right |

## Methods

LinkedLists support these methods for manipulation:

### Node Methods
- `addNode(name, value?)` - Add new node with optional value
- `insertNode(index, name)` - Insert node at specific position
- `removeNode(name)` - Remove specific node
- `setValue(index | id, value)` - Set value for node at index or node id
- `setColor(index | id, color)` - Set color for node at index or node id
- `setArrow(index | id, arrow)` - Set arrow for node at index or node id

### Value Methods
- `addValue(value)` - Add value to end of list
- `insertValue(index | id, value)` - Insert value at specific position or node id
- `removeValue(value)` - Remove first occurrence of value
- `removeAt(index)` - Remove node at specific position

### Multiple Element Methods
- `setValues([...])` - Set multiple node values
- `setColors([...])` - Set multiple node colors
- `setArrows([...])` - Set multiple node arrows

## Examples

### Basic LinkedList Example

<MermaidLiteViewer>
{`linkedlist simple = {
    nodes: [first, second, third]
    value: ["A", "B", "C"]
}

page
show simple`}
</MermaidLiteViewer>

### LinkedList with Pointers

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={250}
  overrideSize={true}
>
{`
linkedlist pointers = {
    nodes: [head, curr, next, end]
    value: [1, 2, 3, null]
    color: ["green", "blue", "yellow", "red"]
    arrow: ["head", "current", "next", "null"]
}

page
show pointers
`}
</SideBySide>

### Dynamic LinkedList Operations

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={450}
  diagramHeight={350}
  overrideSize={true}
>
{`
linkedlist list = {
    nodes: [n1, n2]
    value: [10, 20]
}

page
show list

page
list.addNode(n3, 30)
list.setColor(2, "green")
list.setArrow(2, "new")

page
list.insertNode(1, n1_5)
list.setValues([10, 15, 20, 30])
list.setColors([null, "blue", null, "green"])
list.setArrows([null, "inserted", null, null])

page
list.removeNode(n2)
list.setValues([10, 15, 30])
list.setColors([null, null, "green"])
list.setArrows([null, null, null])
`}
</SideBySide>

### LinkedList Traversal

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={300}
  overrideSize={true}
>
{`
linkedlist traverse = {
    nodes: [start, mid1, mid2, end]
    value: ["first", "second", "third", "last"]
    color: [null, null, null, null]
}

page
show traverse

page
traverse.setColor(0, "blue")
traverse.setArrow(0, "visiting")

page
traverse.setColor(0, "gray")
traverse.setColor(1, "blue")
traverse.setArrow(0, "visited")
traverse.setArrow(1, "visiting")

page
traverse.setColor(1, "gray")
traverse.setColor(2, "blue")
traverse.setArrow(1, "visited")
traverse.setArrow(2, "visiting")
`}
</SideBySide>

### Sorted LinkedList Insertion

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={300}
  overrideSize={true}
>
{`
linkedlist sorted = {
    nodes: [n10, n30, n50]
    value: [10, 30, 50]
    above: "Sorted LinkedList"
    below: "Inserting 25"
}

page
show sorted

page
sorted.insertNode(1, n25)
sorted.setValues([10, 25, 30, 50])
sorted.setColor(1, "red")
sorted.setArrow(1, "inserted")
`}
</SideBySide>

## Use Cases

LinkedLists are ideal for:
- **Dynamic data structures** - Variable-length lists, memory allocation
- **Insertion/deletion operations** - Efficient mid-list modifications
- **Pointer manipulation** - Understanding references and links
- **Queue implementation** - FIFO using linked nodes
- **Stack implementation** - Alternative to array-based stacks
- **Graph representations** - Adjacency lists
- **Memory management** - Free lists, garbage collection
- **Algorithm visualization** - Merging, splitting, reversing lists

## Related

- [Methods Reference](../methods.md) - Complete list of linkedlist methods
- [Array](./array.md) - Alternative linear structure
- [Stack](./stack.md) - LIFO structure that can use linked nodes
- [Graph](./graph.md) - Uses similar node-based concepts
