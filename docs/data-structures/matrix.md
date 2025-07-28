---
sidebar_position: 2
---

# Matrix

Matrices are two-dimensional grids of elements organized in rows and columns. They are perfect for visualizing 2D algorithms, image processing, and grid-based operations.

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={300}
  overrideSize={true}
>
{`
matrix grid = {
    value: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    color: [[null, "blue", null], [null, "red", null], [null, "green", null]]
    arrow: [[null, null, null], [null, "center", null], [null, null, null]]
}

page
show grid
`}
</SideBySide>

## Properties

Matrices support the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `value` | `(number \| string \| null)[][]` | 2D array of matrix elements |
| `color` | `(color \| null)[][]` | Colors for each element |
| `arrow` | `(number \| string \| null)[][]` | Arrows or labels for each element |
| `above` | `string \| text_object` ([see special features](./text#special-features))  | Label positioned above the matrix |
| `below` | `string \| text_object` | Label positioned below the matrix |
| `left` | `string \| text_object` | Label positioned to the left |
| `right` | `string \| text_object` | Label positioned to the right |

## Methods

Matrices support these methods for manipulation:

### Single Element Methods
- `setValue(row, col, value)` - Set value at specific position
- `setColor(row, col, color)` - Set color at specific position
- `setArrow(row, col, arrow)` - Set arrow at specific position

### Multiple Element Methods
- `setValues([[...], ...])` - Set multiple values (use `_` to keep existing)
- `setColors([[...], ...])` - Set multiple colors
- `setArrows([[...], ...])` - Set multiple arrows

### Structural Methods
+ `addRow([values]?)` - Add new row (optionally with values)
+ `addColumn([values]?)` - Add new column (optionally with values)
+ `insertRow(index, [values]?)` - Insert row at specific index with optional values
+ `insertColumn(index, [values]?)` - Insert column at specific index with optional values
+ `removeRow(index)` - Remove row at index
+ `removeColumn(index)` - Remove column at index
+ `addBorder(value, color?)` - Add border around matrix

## Examples

### Basic Matrix Example

<MermaidLiteViewer>
{`matrix simple = {
    value: [[1, 2], [3, 4]]
}

page
show simple`}
</MermaidLiteViewer>

### Matrix with Colors

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={350}
  diagramHeight={250}
  overrideSize={true}
>
{`
matrix colorful = {
    value: [["A", "B"], ["C", "D"]]
    color: [["red", "blue"], ["green", "yellow"]]
}

page
show colorful
`}
</SideBySide>

### Dynamic Matrix Operations

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={350}
  overrideSize={true}
>
{`
matrix mat = {
    value: [[1, 2], [3, 4]]
}

page
show mat

page
mat.setValue(0, 1, 5)
mat.setColor(0, 1, "red")

page
mat.addRow()
mat.setValue(2, 0, 7)
mat.setValue(2, 1, 8)

page
mat.addColumn(0)
mat.setValues([[0, 1, 5], [0, 3, 4], [0, 7, 8]])
mat.setColors([["gray", null, "red"], ["gray", null, null], ["gray", null, null]])
`}
</SideBySide>

### Matrix with Border

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={300}
  overrideSize={true}
>
{`
matrix bordered = {
  value: [[5, 8], [2, 9]]
  color: [[null, null], [null, null]]
}

page
show bordered
bordered.addBorder(0, "gray")
`}
</SideBySide>

### Matrix with Labels

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={300}
  overrideSize={true}
>
{`
matrix myMatrix = {
    value: [[12, 15, 18], [24, 27, 30]]
    above: "Temperature Data (°C)"
    left: "Days"
    below: "Hours: 9AM, 12PM, 3PM"
}

page
show myMatrix
`}
</SideBySide>

## Use Cases

Matrices are ideal for:
- **2D algorithms** - Pathfinding, flood fill, Conway's Game of Life
- **Image processing** - Filters, transformations, pixel operations
- **Dynamic programming** - Visualize DP tables and memoization
- **Graph adjacency matrices** - Represent graph connections
- **Mathematical operations** - Matrix multiplication, transformations
- **Game boards** - Chess, checkers, tic-tac-toe
- **Coordinate systems** - 2D grids and spatial algorithms

## Related

- [Methods Reference](../methods.md) - Complete list of matrix methods
- [Array](./array.md) - One-dimensional arrays
- [Graph](./graph.md) - Alternative way to represent 2D relationships
