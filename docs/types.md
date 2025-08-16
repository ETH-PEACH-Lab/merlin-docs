---
sidebar_position: 6
---

# Types Reference

This document explains all the types used in Merlin data structures and what values they accept.

## Basic Types

### `number`
Accepts any numeric value, including integers and decimals.

```merlin
value: [1, 2, 3, 4.5, -10, 0]
fontSize: 14
width: 300
```

### `string`
Accepts any text value enclosed in quotes.

```merlin
value: ["hello", "world", "text"]
fontFamily: "Arial"
above: "Chart Title"
```

### `boolean`
Accepts `true` or `false` values.

```merlin
hidden: [true, false, true, false]
```

### `null`
Represents an empty or default value. Used to skip setting a property for specific elements.

```merlin
color: [null, "red", null, "blue"]  // First and third elements use default color
```

## Identifier Types

### `id`
String identifier for nodes in graphs and trees. Can be any valid name without spaces.

```merlin
nodes: [nodeA, nodeB, nodeC, root, child1, child2]
```

### `edge`
String representing a connection between two nodes using the format `nodeA-nodeB`.

```merlin
edges: [A-B, B-C, C-A]
```

## `child`
String representing a parent child relation between two nodes using the format `parent-child`.
```merlin
children: [parent-child1, parent-child2]
```

## Visual Types

### `color`
Accepts various color formats:

#### Named Colors
```merlin
color: ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown"]
color: ["black", "white", "gray", "grey", "navy", "maroon", "olive", "teal"]
color: ["cyan", "magenta", "lime", "aqua", "silver", "gold", "coral", "salmon"]
color: ["lightblue", "lightgreen", "lightcoral", "lightgray", "darkblue", "darkgreen"]
color: ["cornflowerblue", "crimson", "indigo", "turquoise", "violet", "tomato"]
```

#### Hexadecimal Colors
```merlin
color: ["#ff0000", "#00ff00", "#0000ff"]  // Full hex
color: ["#f00", "#0f0", "#00f"]          // Short hex
```

#### RGB/RGBA Colors
```merlin
color: ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)"]
color: ["rgba(255, 0, 0, 0.5)", "rgba(0, 255, 0, 0.8)"]
```

#### HSL/HSLA Colors
```merlin
color: ["hsl(0, 100%, 50%)", "hsl(120, 100%, 50%)"]
color: ["hsla(0, 100%, 50%, 0.5)", "hsla(240, 100%, 50%, 0.7)"]
```

#### CSS Color Level 4 (spaces and slashes)
```merlin
color: ["rgb(255 0 0 / 0.5)", "hsl(0 100% 50% / 0.5)"]
```

#### Advanced Colors (limited browser support)
```merlin
color: ["lch(62.2% 50 40)", "color(display-p3 1 0 0)"]
```

### `fontWeight`
Accepts font weight values:

```merlin
fontWeight: ["normal", "bold", "bolder", "lighter"]
fontWeight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
```

### `fontFamily`
Accepts font family names:

```merlin
fontFamily: ["Arial", "Helvetica", "Times New Roman", "Times"]
fontFamily: ["Courier New", "Courier", "Georgia", "Verdana"]
fontFamily: ["sans-serif", "serif", "monospace"]
```

### `align`
Accepts text alignment values:

```merlin
align: ["left", "center", "right"]
```

### `text_object`
References a defined text element by its name (without quotes):

```merlin
text myLabel = {
    value: "Custom Label"
    fontSize: 16
    color: "blue"
}

array myArr = {
    value: [1, 2, 3]
    above: myLabel  // References the text object
}
```

## Array Type Patterns

Most properties can accept either single values or arrays of values:

### Single Value
Applied to all elements:
```merlin
color: "red"        // All elements are red
fontSize: 14        // All text lines use size 14
```

### Array of Values
Specific value for each element:
```merlin
color: ["red", "blue", "green"]           // Different color per element
fontSize: [16, 14, 12]                    // Different size per line
value: [1, 2, 3, 4]                       // Different value per element
```

### Mixed with `null`
Use `null` to keep default values for specific positions:
```merlin
color: ["red", null, "blue", null]        // Only 1st and 3rd elements colored
arrow: [null, "min", null, "max"]         // Only 2nd and 4th elements have arrows
```

## Complex Array Types

### `(number | string | null)[]`
Array that can contain numbers, strings, or null values:

```merlin
value: [1, "hello", 3, null, "world", 6]
```

### `(color | null)[]`
Array of colors where some positions can be null:

```merlin
color: ["red", null, "#00ff00", "rgb(0,0,255)", null]
```

### `(number | string | null)[][]`
Two-dimensional array (matrix) of numbers, strings, or null:

```merlin
value: [
    [1, 2, 3],
    ["a", "b", "c"], 
    [null, 4, null]
]
```

### `(color | null)[][]`
Two-dimensional array of colors:

```merlin
color: [
    ["red", null, "blue"],
    [null, "green", null],
    ["yellow", "purple", null]
]
```

## Positioning Types

These types are used for positioning labels around data structures:

### `string | text_object`
Accepts either a string literal (creates implicit text) or reference to a text object:

```merlin
// String literal (implicit text)
above: "Chart Title"
below: "Data from 2024"

// Text object reference (explicit text)
above: customTitle
below: customFooter
```

## Property Examples by Data Structure

### Array Properties
```merlin
array example = {
    value: [1, 2, 3, 4]                           // (number | string | null)[]
    color: ["red", null, "blue", "green"]         // (color | null)[]
    arrow: ["start", null, "middle", "end"]       // (number | string | null)[]
    above: "Array Title"                          // string | text_object
    below: footerText                             // string | text_object
}
```

### Matrix Properties
```merlin
matrix grid = {
    value: [[1, 2], [3, 4]]                       // (number | string | null)[][]
    color: [["red", null], [null, "blue"]]        // (color | null)[][]
    arrow: [[null, "top"], ["left", null]]        // (number | string | null)[][]
}
```

### Graph Properties
```merlin
graph network = {
    nodes: [A, B, C]                              // id[]
    edges: [A-B, B-C, C-A]                        // edge[]
    value: [1, 2, 3]                              // (number | string | null)[]
    color: ["red", "blue", "green"]               // (color | null)[]
    hidden: [false, true, false]                  // boolean[]
}
```

### Tree Properties
```merlin
tree family = {
    nodes: [parent, child1, child2]               // id[]
    children: [parent-child1, parent-child2]      // edge[]
    value: ["John", "Alice", "Bob"]               // (number | string | null)[]
    color: ["gold", "pink", "blue"]               // (color | null)[]
}
```

### Text Properties
```merlin
text styled = {
    value: ["Title", "Subtitle"]                  // string | string[]
    fontSize: [18, 14]                            // number | number[]
    color: ["#333", "gray"]                       // color | (color | null)[]
    fontWeight: ["bold", "normal"]                // fontWeight | (fontWeight | null)[]
    fontFamily: ["Arial", "Georgia"]              // fontFamily | (fontFamily | null)[]
    align: ["center", "left"]                     // align | (align | null)[]
    lineSpacing: 20                               // number
    width: 300                                    // number
    height: 100                                   // number
}
```

## Special Syntax Notes

### Edge Format
Always use the format `nodeA-nodeB` without spaces around the dash:
```merlin
edges: [A-B, B-C, C-D]        // ✓ Correct
edges: [A - B, B - C]         // ✗ Incorrect (spaces around dash)
```

### Text Object References
Reference text objects by name without quotes:
```merlin
above: titleText              // ✓ Correct (references text object)
above: "titleText"            // ✗ Incorrect (creates literal string)
```

### Null Usage
Use `null` to skip setting a property, not empty strings:
```merlin
color: [null, "red", null]    // ✓ Correct
color: ["", "red", ""]        // ✗ Incorrect
```

## Related

- [Data Structures](./data-structures/index.md) - All available data structures
- [Positioning](./positioning.md) - Layout and positioning guide
- [Text Special Features](./data-structures/text.md#special-features) - Implicit vs explicit text
