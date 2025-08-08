---
sidebar_position: 3
---

# Graph

Graphs are collections of nodes connected by edges, perfect for visualizing networks, relationships, and graph algorithms like shortest path and traversal.

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={450}
  diagramHeight={300}
  overrideSize={true}
>
{`
graph network = {
    nodes: [A, B, C, D]
    value: [10, 20, 30, 40]
    edges: [A-B, B-C, C-D, D-A]
    color: ["red", "blue", "green", "yellow"]
    arrow: [null, "start", null, "end"]
}

page
show network
`}
</SideBySide>

## Properties

Graphs support the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `nodes` | `id[]` | List of node identifiers |
| `value` | `(number \| string \| null)[]` | Values for each node |
| `edges` | `edge[]` | List of connections between nodes |
| `color` | `(color \| null)[]` | Colors for each node |
| `arrow` | `(number \| string \| null)[]` | Arrows or labels for each node |
| `hidden` | `boolean[]` | Visibility of each node |
| `above` | `string \| text_object` ([see special features](./text#special-features))  | Label positioned above the graph |
| `below` | `string \| text_object` | Label positioned below the graph |
| `left` | `string \| text_object` | Label positioned to the left |
| `right` | `string \| text_object` | Label positioned to the right |

## Methods

Graphs support these methods for manipulation:

### Text Positioning Methods
- `setText(text, position)` - Set or remove text at specific positions (`"above"`, `"below"`, `"left"`, `"right"`)

### Node Methods
- `addNode(name, value?)` - Add new node with optional value
- `removeNode(name)` - Remove node and its edges
- `setValue(index | id, value)` - Set value for node at index or node id
- `setColor(index | id, color)` - Set color for node at index or node id
- `setArrow(index | id, arrow)` - Set arrow for node at index or node id
- `setHidden(index | id, hidden)` - Set visibility for node at index or node id

### Edge Methods
- `addEdge(edge)` - Add new edge (e.g., `A-B`)
- `removeEdge(edge)` - Remove specific edge

### Multiple Element Methods
- `setValues([...])` - Set multiple node values
- `setColors([...])` - Set multiple node colors
- `setArrows([...])` - Set multiple node arrows
- `setEdges([...])` - Set multiple edges
- `setHidden([...])` - Set visibility for multiple nodes

## Examples

### Basic Graph Example

<MermaidLiteViewer>
{`graph simple = {
    nodes: [X, Y, Z]
    edges: [X-Y, Y-Z]
}

page
show simple`}
</MermaidLiteViewer>

### Graph with Values and Colors

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={250}
  overrideSize={true}
>
{`
graph weighted = {
    nodes: [start, middle, end]
    value: [0, 5, 10]
    edges: [start-middle, middle-end]
    color: ["green", "yellow", "red"]
}

page
show weighted
`}
</SideBySide>

### Dynamic Graph Operations

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={450}
  diagramHeight={350}
  overrideSize={true}
>
{`
graph network = {
    nodes: [server1, server2]
    edges: [server1-server2]
    value: [100, 50]
}

page
show network

page
network.addNode(router, 200)
network.addEdge(server1-router)
network.addEdge(server2-router)

page
network.setColor(router, "blue")
network.setArrow(router, "hub")

page
network.addNode(client, 25)
network.addEdge(client-router)
network.setColor(client, "green")
network.setArrow(router, null)
`}
</SideBySide>

### Graph Traversal Visualization

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={350}
  overrideSize={true}
>
{`
graph treeExample = {
    nodes: [root, a, b, c, d]
    edges: [root-a, root-b, a-c, a-d]
    value: [1, 2, 3, 4, 5]
}

page
show treeExample

page
treeExample.setColor(root, "blue")
treeExample.setArrow(root, "visiting")

page
treeExample.setColor(a, "blue")
treeExample.setArrow(a, "visiting")
treeExample.setColor(root, "green")
treeExample.setArrow(root, "visited")

page
treeExample.setColor(d, "blue")
treeExample.setArrow(d, "visiting")
treeExample.setColor(a, "green")
treeExample.setArrow(a, "visited")
`}
</SideBySide>

### Network with Hidden Nodes

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={250}
  overrideSize={true}
>
{`
graph network = {
    nodes: [pub, priv, sec]
    edges: [pub-priv, priv-sec]
    hidden: [false, false, true]
    color: ["green", "yellow", "red"]
}

page
show network

page
network.setHidden(sec, false)
`}
</SideBySide>

## Use Cases

Graphs are ideal for:
- **Graph algorithms** - DFS, BFS, shortest path (Dijkstra, A*)
- **Network visualization** - Computer networks, social networks
- **Tree structures** - Binary trees, parse trees, decision trees
- **State machines** - FSMs, workflow visualization
- **Dependency graphs** - Package dependencies, task scheduling
- **Transportation** - Route planning, traffic networks
- **Relationship modeling** - Entity relationships, genealogy

## Related

- [Methods Reference](../methods.md) - Complete list of graph methods
- [Tree](./tree.md) - Specialized hierarchical graphs
- [LinkedList](./linkedlist.md) - Linear node-based structure
