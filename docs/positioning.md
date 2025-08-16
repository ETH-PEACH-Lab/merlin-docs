---
sidebar_position: 5
---

# Positioning

Positioning in Merlin allows you to arrange multiple data structures and text elements in a grid layout. You can specify the grid size and position elements using coordinates or named positions.

## Grid Layout

Use the `page AxB` command to create a grid layout with `A` columns and `B` rows:
```merlin
array numbers = {
    value: [1, 2, 3]
    color: ["blue", "green", "red"]
    below: "belowNumbers"
    above: "Prime Number Sequence"
}

text belowNumbers = {
    value: "These are the first three prime numbers."
}

page 2x1
show numbers (0, 0)
show belowNumbers (1, 0)
```

<MermaidLiteViewer 
	language="merlin"
	bordered={true}
	diagramWidth={500}
	diagramHeight={300}
	overrideSize={true}
>
{`
array numbers = {
	value: [1, 2, 3]
	color: ["blue", "green", "red"]
	below: "belowNumbers"
	above: "Prime Number Sequence"
}

text belowNumbers = {
	value: "These are the first three prime numbers."
}

page 2x1
show numbers (0, 0)
show belowNumbers (1, 0)
`}
</MermaidLiteViewer>

## Position Methods
### Named Positioning

Use descriptive position names for easier layout:

- **Quarters**: `top-left`, `top-right`, `bottom-left`, `bottom-right` (or `tl`, `tr`, `bl`, `br`)
- **Halves**: `top`, `bottom`, `left`, `right`
- **Single**: `center` (occupies one cell in center)
```merlin
array numbers = {
    value: [1, 2, 3]
    color: ["blue", "green", "red"]
}
graph myGraph = {
    nodes: [n1,n2,n3]
    edges: [n1-n2,n2-n3,n3-n1]
}
text randomText = {
    value: ["This graph forms a triangle,", "each node connected to the others.", "It's a simple cyclic graph."]
    color: ["#222222", "#0055aa", "#007700"]
}
text randomTextToo = {
    value: "Prime numbers and graphs—fundamental math concepts!"
    color: "#cc0000"
}


page 2x2
show numbers top-right
show randomText bottom-right
show myGraph left
```
<MermaidLiteViewer 
	language="merlin"
	bordered={true}
	diagramWidth={600}
	diagramHeight={400}
	overrideSize={true}
>
{`
array numbers = {
    value: [1, 2, 3]
    color: ["blue", "green", "red"]
}
graph myGraph = {
    nodes: [n1,n2,n3]
    edges: [n1-n2,n2-n3,n3-n1]
}
text randomText = {
    value: ["This graph forms a triangle,", "each node connected to the others.", "It's a simple cyclic graph."]
    color: ["#222222", "#0055aa", "#007700"]
}
text randomTextToo = {
    value: "Prime numbers and graphs—fundamental math concepts!"
    color: "#cc0000"
}


page 2x2
show numbers top-right
show randomText bottom-right
show myGraph left
`}
</MermaidLiteViewer>

### Coordinate Positioning

Use `(col, row)` coordinates where `(0, 0)` is the top-left cell:
```merlin
graph myGraph = {
    nodes: [n1, n2, n3]
    edges: [n1-n2, n2-n3, n3-n1]
    below: "Triangle Graph"
}

text description = {
    value: ["This graph forms a triangle,", "each node connected to the others.", "It's a simple cyclic graph."]
    color: ["#222222", "#0055aa", "#007700"]
}

text bottomLeft = {
    value: "Bottom Left"
}

page 2x2
show myGraph (0, 0)
show description (1, 1)
show bottomLeft (0, 1)
```
<MermaidLiteViewer 
	language="merlin"
	bordered={true}
	diagramWidth={600}
	diagramHeight={400}
	overrideSize={true}
>
{`
graph myGraph = {
    nodes: [n1, n2, n3]
    edges: [n1-n2, n2-n3, n3-n1]
    below: "Triangle Graph"
}

text description = {
    value: ["This graph forms a triangle,", "each node connected to the others.", "It's a simple cyclic graph."]
    color: ["#222222", "#0055aa", "#007700"]
}

text bottomLeft = {
    value: "Bottom Left"
}

page 2x2
show myGraph (0, 0)
show description (1, 1)
show bottomLeft (0, 1)
`}
</MermaidLiteViewer>

### Range Positioning


You can also specify ranges, e.g. `(a..b, c..d)` and span columns `a` to `b` and rows `c` to `d`:
```merlin
array numbers = {
	value: [2, 3, 5, 7, 11]
	color: ["blue", "green", "red", "orange", "purple"]
	above: "Prime Numbers"
}

text mainText = {
	value: "Prime numbers and graphs—fundamental math concepts!"
	fontSize: 15
	color: "#cc0000"
}

graph triangle = {
	nodes: [A, B, C]
	edges: [A-B, B-C, C-A]
	below: "Triangle Graph"
}

page 4x4
show numbers (0..3, 0)
show triangle (0, 1..2)
show mainText bottom-right
```

<MermaidLiteViewer 
	language="merlin"
	bordered={true}
	diagramWidth={700}
	diagramHeight={500}
	overrideSize={true}
>
{`
array numbers = {
	value: [2, 3, 5, 7, 11]
	color: ["blue", "green", "red", "orange", "purple"]
	above: "Prime Numbers"
}

text mainText = {
	value: "Prime numbers and graphs—fundamental math concepts!"
	fontSize: 15
	color: "#cc0000"
}

graph triangle = {
	nodes: [A, B, C]
	edges: [A-B, B-C, C-A]
	below: "Triangle Graph"
}

page 4x4
show numbers (0..3, 0)
show triangle (0, 1..2)
show mainText bottom-right
`}
</MermaidLiteViewer>

## Auto Layout

If no grid size is specified, Merlin automatically determines the optimal layout:
```merlin
array small = {
    value: [1, 2, 3]
    color: ["red", "green", "blue"]
}

text label = {
    value: "Auto-positioned elements"
    fontSize: 14
    color: "gray"
    align: "center"
    width: 200
    height: 25
}

page
show small
show label
```
<MermaidLiteViewer 
	language="merlin"
	bordered={true}
	diagramWidth={400}
	diagramHeight={200}
	overrideSize={true}
>
{`
array small = {
	value: [1, 2, 3]
	color: ["red", "green", "blue"]
}

text label = {
	value: "Auto-positioned elements"
	fontSize: 14
	color: "gray"
	align: "center"
	width: 200
	height: 25
}

page
show small
show label
`}
</MermaidLiteViewer>

## Best Practices

### Grid Planning
- Plan your grid size based on the number of elements
- Use `2x2`, `3x2`, or `4x3` for common layouts
- Consider element relationships when positioning

### Position Strategy
- Use named positions (`top-left`, `center`) for simple layouts
- Use coordinates `(x, y)` for precise control
- Use ranges `(0..2, 1)` for spanning multiple cells

## Related

- [Language Reference](./language-reference.md) - Complete syntax guide
- [Data Structures](./data-structures/index.md) - Available data structure types
- [Methods](./methods.md) - Available methods for manipulation
