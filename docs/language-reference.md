---
sidebar_position: 2
---

# Merlin Language Reference

Merlin is a domain-specific language for visualizing data structures and algorithms interactively. It is designed to be simple, readable, and powerful for both teaching and learning.

## Core Concepts

- **Data Structures**: Define arrays, matrices, graphs, stacks, trees, and text blocks with rich attributes.
- **Pages**: Use `page` to create steps or slides in your visualization.
- **Show**: Use `show` to display a data structure on a page.
- **Methods**: Manipulate data structures with intuitive methods (e.g., `setColor`, `addNode`).

## Basic Syntax

```merlin
array numbers = {
    value: [1, 2, 3]
    color: ["blue", "green", "red"]
}

page
show numbers
```

## Data Structure Types

Merlin provides several built-in data structure types. For detailed documentation, examples, and methods for each type, see the [Data Structures](./data-structures/) section.

### Array
```merlin
array arr = {
    value: [1,2,3]
    color: ["red", null, "blue"]
    arrow: [null, "i", null]
}
```
**[→ Array Documentation](./data-structures/array.md)**

### Matrix
```merlin
matrix grid = {
    value: [[1,2],[3,4]]
    color: [[null, "red"], [null, null]]
}
```
**[→ Matrix Documentation](./data-structures/matrix.md)**

### Graph
```merlin
graph g = {
    nodes: [A,B,C]
    edges: [A-B, B-C]
    value: [1,2,3]
    color: ["red", null, "blue"]
}
```
**[→ Graph Documentation](./data-structures/graph.md)**

### Stack
```merlin
stack s = {
    value: ["main", "func"]
    color: [null, "blue"]
}
```
**[→ Stack Documentation](./data-structures/stack.md)**

### Tree
```merlin
tree t = {
    nodes: [root, left, right]
    children: [root-left, root-right]
    value: [1,2,3]
}
```
**[→ Tree Documentation](./data-structures/tree.md)**

### LinkedList
```merlin
linkedlist ll = {
    nodes: [head, node1, tail]
    value: [1, 2, 3]
}
```
**[→ LinkedList Documentation](./data-structures/linkedlist.md)**

### Text
```merlin
text label = {
    value: "Hello, world!"
    fontSize: 16
    color: "gray"
}
```
**[→ Text Documentation](./data-structures/text.md)**

## Pages and Visualization

- `page` creates a new visualization step. You can add a layout (e.g., `page 2x2`).
- `show` displays a structure, optionally at a grid position: `show arr (0, 1)`.

## Methods and Operations

Merlin provides a rich set of methods for manipulating data structures. For a complete reference of all available methods, see the **[Methods Reference](./methods.md)**.

### Common Method Categories
- **Setters**: `setColor`, `setValue`, `setArrow`, `setHidden`, etc.
- **Insert/Remove**: `insertValue`, `removeValue`, `addNode`, `removeNode`, `addEdge`, `removeEdge`, etc.
- **Matrix/Array**: `addRow`, `addColumn`, `removeRow`, `removeColumn`, `addBorder`.
- **Tree**: `addChild`, `setChild`, `removeSubtree`.
- **Text**: `setFontSize`, `setColor`, `setAlign`, etc.

---

For detailed examples and comprehensive documentation of each data structure, visit the **[Data Structures](./data-structures/)** section. For more, see the [Getting Started](./getting-started.md) guide and the example gallery!
