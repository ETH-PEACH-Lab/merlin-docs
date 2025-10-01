---
sidebar_position: 1
---

# Array

Arrays are linear sequences of elements that can be accessed by index. They are perfect for visualizing sorting algorithms, searching, and other sequential operations.

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={200}
  overrideSize={true}
>
{`
array numbers = {
    value: [1, 2, 3, 4, 5]
    color: [null, "blue", null, "red", null]
    arrow: [null, "min", null, "max", null]
}

page
show numbers
`}
</SideBySide>

## Properties

Arrays support the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `value` | `(number \| string \| null)[]` | The array elements |
| `color` | `(color \| null)[]` | Colors for each element |
| `arrow` | `(number \| string \| null)[]` | Arrows or labels for each element |
| `above` | `string \| text_object` ([see special features](./text#special-features)) | Label positioned above the array|
| `below` | `string \| text_object` | Label positioned below the array|
| `left` | `string \| text_object` | Label positioned to the left|
| `right` | `string \| text_object` | Label positioned to the right|

## Methods

Arrays support these methods for manipulation:

### Text Positioning Methods
- `setText(text, position)` - Set or remove text at specific positions (`"above"`, `"below"`, `"left"`, `"right"`)

### Single Element Methods
- `setValue(index, value)` - Set value at specific index
- `setColor(index, color)` - Set color at specific index  
- `setArrow(index, arrow)` - Set arrow at specific index

### Multiple Element Methods
- `setValues([...])` - Set multiple values (use `_` to keep existing)
- `setColors([...])` - Set multiple colors
- `setArrows([...])` - Set multiple arrows

### Add/Insert Methods
- `addValue(value)` - Add value to end of array
- `insertValue(index, value)` - Insert value at specific index

### Remove Methods
- `removeValue(value)` - Remove first occurrence of value
- `removeAt(index)` - Remove element at specific index

## Examples

### Basic Array Example

<MermaidLiteViewer>
{`array simple = {
    value: ["A", "B", "C"]
}

page
show simple`}
</MermaidLiteViewer>

### Array with Colors and Arrows

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={450}
  diagramHeight={200}
  overrideSize={true}
>
{`
array myArr = {
    value: [10, 20, 30, 40]
    color: ["red", "green", null, "blue"]
    arrow: ["start", null, "pivot", "end"]
}

page
show myArr
`}
</SideBySide>

### Dynamic Array Manipulation

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={300}
  overrideSize={true}
>
{`
array arr = {
    value: [5, 3, 8, 1]
}

page
show arr

page
arr.setColor(0, "red")
arr.setColor(1, "red")

page
arr.setValues([3, 5, 8, 1])
arr.setColors(["green", "green", null, null])

page
arr.addValue(9)
arr.setColor(4, "blue")
`}
</SideBySide>

### Array with Labels

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={250}
  overrideSize={true}
>
{`
array scores = {
    value: [85, 92, 78, 95]
    above: "Student Test Scores"
    below: "Spring 2024"
}

page
show scores
`}
</SideBySide>

### Dynamic Text with setText

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={300}
  overrideSize={true}
>
{`
array arr = {
    value: [1, 2, 3, 4]
}

page
show arr

page
arr.setText("Array Elements", "above")
arr.setText("Index: 0, 1, 2, 3", "below")

page
arr.setText("Modified Array", "above")
arr.above.setFontWeight("bold")
arr.below.setColor("gray")

page
// remove bottom text
arr.setText(null, "below")
arr.setText("Size: 4", "right")
`}
</SideBySide>

## Use Cases

Arrays are ideal for:
- **Sorting algorithms** - Visualize bubble sort, merge sort, etc.
- **Search algorithms** - Show binary search, linear search
- **Algorithm analysis** - Demonstrate time/space complexity
- **Data processing** - Show filtering, mapping operations
- **Index-based operations** - Array access patterns

## Related

- [Methods Reference](../methods.md) - Complete list of array methods
- [Matrix](./matrix.md) - Two-dimensional arrays
- [Stack](./stack.md) - LIFO array-like structure
