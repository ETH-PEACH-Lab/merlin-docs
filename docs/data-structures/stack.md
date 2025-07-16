---
sidebar_position: 5
---

# Stack

Stacks are Last-In-First-Out (LIFO) data structures where elements are added and removed from the top. They are perfect for visualizing function calls, expression evaluation, and backtracking algorithms.

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={300}
  diagramHeight={350}
  overrideSize={true}
>
{`
stack callStack = {
    value: ["main", "process", "calculate", "validate"]
    color: [null, "blue", "red", "green"]
    arrow: [null, null, null, "top"]
}

page
show callStack
`}
</SideBySide>

## Properties

Stacks support the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `value` | `(number \| string \| null)[]` | Stack elements (bottom to top) |
| `color` | `(color \| null)[]` | Colors for each element |
| `arrow` | `(number \| string \| null)[]` | Arrows or labels for each element |
| `above` | `string \| text_object` ([see special features](./text#special-features))  | Label positioned above the stack |
| `below` | `string \| text_object` | Label positioned below the stack |
| `left` | `string \| text_object` | Label positioned to the left |
| `right` | `string \| text_object` | Label positioned to the right |

## Methods

Stacks support these methods for manipulation:

### Single Element Methods
- `setValue(index, value)` - Set value at specific position
- `setColor(index, color)` - Set color at specific position  
- `setArrow(index, arrow)` - Set arrow at specific position

### Multiple Element Methods
- `setValues([...])` - Set multiple values (use `_` to keep existing)
- `setColors([...])` - Set multiple colors
- `setArrows([...])` - Set multiple arrows

### Stack Operations
- `addValue(value)` - Push value onto top of stack
- `insertValue(index, value)` - Insert value at specific position
- `removeValue(value)` - Remove first occurrence of value
- `removeAt(index)` - Remove element at specific position

## Examples

### Basic Stack Example

<MermaidLiteViewer>
{`stack simple = {
    value: ["A", "B", "C"]
}

page
show simple`}
</MermaidLiteViewer>

### Function Call Stack

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={350}
  diagramHeight={300}
  overrideSize={true}
>
{`
stack functions = {
    value: ["main()", "fact(5)", "fact(4)", "fact(3)"]
    color: ["green", "blue", "yellow", "red"]
    arrow: [null, null, null, "current"]
    below: "Call Stack"
}

page
show functions
`}
</SideBySide>

### Stack Push/Pop Operations

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={300}
  diagramHeight={400}
  overrideSize={true}
>
{`
stack numbers = {
    value: [10, 20]
    color: [null, null]
}

page
show numbers

page
numbers.addValue(30)
numbers.setColor(2, "blue")
numbers.setArrow(2, "pushed")

page
numbers.addValue(40)
numbers.setColor(3, "green")
numbers.setArrow(3, "top")
numbers.setArrow(2, null)

page
numbers.removeAt(3)
numbers.setArrow(2, "top")
`}
</SideBySide>

### Expression Evaluation Stack

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={350}
  diagramHeight={350}
  overrideSize={true}
>
{`
stack operators = {
    value: ["+", "*", "("]
    color: ["green", "blue", "red"]
    arrow: [null, null, "latest"]
    above: "Operator Stack"
    below: "Expression: 3 + 4 * (2 + 1)"
}

page
show operators
`}
</SideBySide>

### Undo/Redo Stack

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={300}
  overrideSize={true}
>
{`
stack undoStack = {
    value: ["'Hello'", "del char", "' World'"]
    color: ["gray", "gray", "blue"]
    arrow: [null, null, "current"]
    above: "Undo History"
}

page
show undoStack
`}
</SideBySide>

### Memory Stack Visualization

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={350}
  diagramHeight={350}
  overrideSize={true}
>
{`
stack memory = {
    value: ["int x = 5", "ch c = 'A'", "fl pi = 3.1"]
    color: ["lightblue", "lightgreen", "lightyellow"]
    arrow: [null, null, "stack pointer"]
    left: "Stack Frame"
    below: "Memory grows upward"
}

page
show memory
`}
</SideBySide>

## Use Cases

Stacks are ideal for:
- **Function call management** - Call stack, recursion visualization
- **Expression evaluation** - Infix to postfix, parentheses matching
- **Backtracking algorithms** - Maze solving, N-Queens problem
- **Undo/Redo operations** - Text editors, action history
- **Browser history** - Back/forward navigation
- **Memory management** - Stack frames, local variables
- **Parsing** - Syntax analysis, compiler design
- **DFS algorithms** - Depth-first search implementation

## Related

- [Methods Reference](../methods.md) - Complete list of stack methods
- [Array](./array.md) - Similar linear structure with indexing
- [LinkedList](./linkedlist.md) - Alternative linear structure
