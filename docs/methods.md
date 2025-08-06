---
sidebar_position: 3
---

# Methods Reference

This is a complete reference of all methods available for manipulating Merlin data structures. Methods are organized by category and indicate which data structures support them.

## Page Control Methods

### `page`
Creates a new visualization step.

**Syntax:**
```merlin
page
page 2x3  // with layout
```

**Supported by:** All structures

---

### `show`
Displays a data structure on the current page.

**Syntax:**
```merlin
show objectName
show objectName (0, 1)  // with position
show objectName top-left // with text based position
```

See more: [Positioning](./positioning.md)

**Supported by:** All structures

---

### `hide`
Hides a data structure from the current page.

**Syntax:**
```merlin
hide objectName
```

**Supported by:** All structures

---

## Single Element Methods

### `setValue(index, value)`
Sets the value at a specific index.

**Syntax:**
```merlin
obj.setValue(0, "newValue")
```

**Supported by:** Array, Stack

---

### `setValue(index | id, value)`
Sets the value at a specific index or node ID.

**Syntax:**
```merlin
obj.setValue(0, "newValue")        // by index
obj.setValue(nodeA, "newValue")    // by node ID
```

**Supported by:** Graph, Tree, LinkedList

---

### `setValue(row, col, value)`
Sets the value at a specific matrix position.

**Syntax:**
```merlin
matrix.setValue(1, 2, "newValue")
```

**Supported by:** Matrix

---

### `setValue(value)`
Sets the text content for all lines.

**Syntax:**
```merlin
text.setValue("newText")
```

**Supported by:** Text

---

### `setValue(line, value)`
Sets the text content for a specific line.

**Syntax:**
```merlin
text.setValue(0, "newText")  // first line
```

**Supported by:** Text

---

### `setColor(index, color)`
Sets the color at a specific index.

**Syntax:**
```merlin
obj.setColor(0, "red")
obj.setColor(0, null)  // remove color
```

**Supported by:** Array, Stack

---

### `setColor(index | id, color)`
Sets the color at a specific index or node ID.

**Syntax:**
```merlin
obj.setColor(0, "red")             // by index
obj.setColor(nodeA, "red")         // by node ID
obj.setColor(nodeA, null)          // remove color
```

**Supported by:** Graph, Tree, LinkedList

---

### `setColor(row, col, color)`
Sets the color at a specific matrix position.

**Syntax:**
```merlin
matrix.setColor(1, 2, "blue")
```

**Supported by:** Matrix

---

### `setArrow(index, arrow)`
Sets the arrow/label at a specific index.

**Syntax:**
```merlin
obj.setArrow(0, "important")
obj.setArrow(0, null)  // remove arrow
```

**Supported by:** Array, Stack

---

### `setArrow(index | id, arrow)`
Sets the arrow/label at a specific index or node ID.

**Syntax:**
```merlin
obj.setArrow(0, "important")       // by index
obj.setArrow(nodeA, "important")   // by node ID
obj.setArrow(nodeA, null)          // remove arrow
```

**Supported by:** Graph, Tree, LinkedList

---

### `setArrow(row, col, arrow)`
Sets the arrow/label at a specific matrix position.

**Syntax:**
```merlin
matrix.setArrow(1, 2, "target")
```

**Supported by:** Matrix

---

### `setHidden(index | id, hidden)`
Sets the visibility of an element by index or node ID.

**Syntax:**
```merlin
graph.setHidden(0, true)        // hide by index
graph.setHidden(0, false)       // show by index
graph.setHidden(nodeA, true)    // hide by node ID
graph.setHidden(nodeA, false)   // show by node ID
```

**Supported by:** Graph

---

## Multiple Element Methods

### `setValues([...])`
Sets multiple values at once. Use `_` to keep existing values.

**Syntax:**
```merlin
obj.setValues([1, 2, 3])
obj.setValues([_, 2, _])  // only change middle value
```

**Supported by:** Array, Stack, LinkedList, Graph, Tree, Text

---

### `setValues([[...], ...])`
Sets multiple matrix values at once.

**Syntax:**
```merlin
matrix.setValues([[1, 2], [3, 4]])
matrix.setValues([[_, 2], [3, _]])  // partial update
```

**Supported by:** Matrix

---

### `setColors([...])`
Sets multiple colors at once.

**Syntax:**
```merlin
obj.setColors(["red", "blue", null])
obj.setColors([_, "blue", _])  // only change middle color
```

**Supported by:** Array, Stack, LinkedList, Graph, Tree

---

### `setColors([[...], ...])`
Sets multiple matrix colors at once.

**Syntax:**
```merlin
matrix.setColors([["red", "blue"], [null, "green"]])
```

**Supported by:** Matrix

---

### `setArrows([...])`
Sets multiple arrows at once.

**Syntax:**
```merlin
obj.setArrows(["start", null, "end"])
obj.setArrows([_, null, _])  // only change middle arrow
```

**Supported by:** Array, Stack, LinkedList, Graph, Tree

---

### `setArrows([[...], ...])`
Sets multiple matrix arrows at once.

**Syntax:**
```merlin
matrix.setArrows([["start", null], [null, "end"]])
```

**Supported by:** Matrix

---

### `setHidden([...])`
Sets visibility for multiple elements.

**Syntax:**
```merlin
graph.setHidden([true, false, true])
```

**Supported by:** Graph

---

## Text Positioning Methods

### `setText(text, position)`
Sets or removes text at a specific position around a data structure.

**Syntax:**
```merlin
obj.setText("text", "above")
obj.setText("text", "below")
obj.setText("text", "left")
obj.setText("text", "right")
obj.setText(null, "above")  // remove text
```

**Parameters:**
- `text`: String value to set, or `null` to remove text
- `position`: String literal indicating placement - `"above"`, `"below"`, `"left"`, or `"right"`

**Behavior:**
- Creates a new text component if none exists at the specified position
- Updates existing text component if one exists at the position
- Removes text component when `text` is `null`
- Automatically handles text object lifecycle (creation/deletion)

**Chained Method Access:**
Access methods of linked text objects through position chaining:
```merlin
// Access text object methods through the main object
obj.above.setFontSize(16)
obj.below.setColor("#ff0000")
obj.left.setValue("New Text")
obj.right.setFontWeight("bold")
```

**Supported by:** Array, Matrix, Graph, Tree, Stack, LinkedList (all non-text structures)

---

## Add/Insert Methods

### `addValue(value)`
Adds a value to the end of the structure.

**Syntax:**
```merlin
obj.addValue("newItem")
```

**Supported by:** Array, Stack, LinkedList

---

### `insertValue(index, value)`
Inserts a value at a specific index.

**Syntax:**
```merlin
obj.insertValue(1, "inserted")
```

**Supported by:** Array, Stack

---

### `addNode(name, value?)`
Adds a new node with optional value.

**Syntax:**
```merlin
graph.addNode(newNode, "value")
graph.addNode(newNode)  // no value
```

**Supported by:** Graph, Tree, LinkedList

---

### `insertNode(index | id, name, value?)`
Inserts a node at a specific index or after a specific node ID with optional value.

**Syntax:**
```merlin
list.insertNode(1, newNode)           // by index
list.insertNode(1, newNode, "value")  // by index with value
list.insertNode(nodeA, newNode)       // after node ID
list.insertNode(nodeA, newNode, "value") // after node ID with value
```

**Supported by:** LinkedList

---

### `addEdge(edge)`
Adds an edge between nodes.

**Syntax:**
```merlin
graph.addEdge(nodeA-nodeB)
```

**Supported by:** Graph

---

### `setEdges([...])`
Sets all edges at once.

**Syntax:**
```merlin
graph.setEdges([A-B, B-C, C-A])
```

**Supported by:** Graph

---

## Remove Methods

### `removeValue(value)`
Removes the first occurrence of a value.

**Syntax:**
```merlin
obj.removeValue("target")
```

**Supported by:** Array, Stack, LinkedList

---

### `removeAt(index)`
Removes the element at a specific index.

**Syntax:**
```merlin
obj.removeAt(2)
```

**Supported by:** Array, Stack, LinkedList

---

### `removeNode(name)`
Removes a specific node.

**Syntax:**
```merlin
graph.removeNode(targetNode)
```

**Supported by:** Graph, Tree, LinkedList

---

### `removeEdge(edge)`
Removes a specific edge.

**Syntax:**
```merlin
graph.removeEdge(nodeA-nodeB)
```

**Supported by:** Graph

---

## Tree-Specific Methods

### `addChild(parent-child, value?)`
Adds a child to a parent node.

**Syntax:**
```merlin
tree.addChild(parent-newChild, "value")
tree.addChild(parent-newChild)  // no value
```

**Supported by:** Tree

---

### `setChild(parent-child)`
Changes parent-child relationship.

**Syntax:**
```merlin
tree.setChild(newParent-existingChild)
```

**Supported by:** Tree

---

### `removeSubtree(node)`
Removes a node and its entire subtree.

**Syntax:**
```merlin
tree.removeSubtree(nodeToRemove)
```

**Supported by:** Tree

---

## Matrix-Specific Methods

### `addRow([values]?)`
Adds a new row to the matrix.

**Syntax:**
```merlin
matrix.addRow()             // empty row at end
matrix.addRow([1, 2, 3])    // row with values at end
```

**Supported by:** Matrix

---

### `addColumn([values]?)`
Adds a new column to the matrix.

**Syntax:**
```merlin
matrix.addColumn()             // empty column at end
matrix.addColumn([4, 5, 6])    // column with values at end
```

**Supported by:** Matrix

---

### `removeRow(index)`
Removes a row at the specified index.

**Syntax:**
```merlin
matrix.removeRow(1)
```

**Supported by:** Matrix

---

### `removeColumn(index)`
Removes a column at the specified index.

**Syntax:**
```merlin
matrix.removeRow(1)
```

**Supported by:** Matrix

--- 

### `insertRow(index, [values]?)`
Inserts a row at a specific index with optional values.

**Syntax:**
```merlin
matrix.insertRow(1)             // empty row at index 1
matrix.insertRow(1, [4, 5, 6])  // row with values at index 1
```

**Supported by:** Matrix

---

### `insertColumn(index, [values]?)`
Inserts a column at a specific index with optional values.

**Syntax:**
```merlin
matrix.insertColumn(1)             // empty column at index 1
matrix.insertColumn(1, [4, 5, 6])  // row with values at index 1
```

**Supported by:** Matrix

---

## Text-Specific Methods

### `setFontSize(size)`
Sets font size for all text.

**Syntax:**
```merlin
text.setFontSize(16)
```

**Supported by:** Text

---

### `setFontSize(line, size)`
Sets font size for a specific line.

**Syntax:**
```merlin
text.setFontSize(0, 20)  // first line
```

**Supported by:** Text

---

### `setColor(line, color)`
Sets color for a specific line.

**Syntax:**
```merlin
text.setColor(1, "red")  // second line
```

**Supported by:** Text

---

### `setFontWeight(weight)`
Sets font weight for all text.

**Syntax:**
```merlin
text.setFontWeight("bold")
text.setFontWeight("normal")
```

**Supported by:** Text

---

### `setFontWeight(line, weight)`
Sets font weight for a specific line.

**Syntax:**
```merlin
text.setFontWeight(0, "bold")
```

**Supported by:** Text

---

### `setFontFamily(family)`
Sets font family for all text.

**Syntax:**
```merlin
text.setFontFamily("Arial")
text.setFontFamily("Georgia")
```

**Supported by:** Text

---

### `setFontFamily(line, family)`
Sets font family for a specific line.

**Syntax:**
```merlin
text.setFontFamily(1, "Courier")
```

**Supported by:** Text

---

### `setAlign(alignment)`
Sets text alignment for all text.

**Syntax:**
```merlin
text.setAlign("center")
text.setAlign("left")
text.setAlign("right")
```

**Supported by:** Text

---

### `setAlign(line, alignment)`
Sets text alignment for a specific line.

**Syntax:**
```merlin
text.setAlign(0, "center")
```

**Supported by:** Text

---

### `setLineSpacing(spacing)`
Sets spacing between lines.

**Syntax:**
```merlin
text.setLineSpacing(20)
```

**Supported by:** Text

---

### `setWidth(width)`
Sets text box width.

**Syntax:**
```merlin
text.setWidth(300)
```

**Supported by:** Text

---

### `setHeight(height)`
Sets text box height.

**Syntax:**
```merlin
text.setHeight(100)
```

**Supported by:** Text

---

### Text Multiple Element Methods

### `setFontSizes([...])`
Sets font sizes for multiple lines.

**Syntax:**
```merlin
text.setFontSizes([20, 16, 14])
text.setFontSizes([_, 16, _])  // only change middle
```

**Supported by:** Text

---

### `setColors([...])`
Sets colors for multiple lines.

**Syntax:**
```merlin
text.setColors(["red", "blue", "green"])
```

**Supported by:** Text

---

### `setFontWeights([...])`
Sets font weights for multiple lines.

**Syntax:**
```merlin
text.setFontWeights(["bold", "normal", "bold"])
```

**Supported by:** Text

---

### `setFontFamilies([...])`
Sets font families for multiple lines.

**Syntax:**
```merlin
text.setFontFamilies(["Arial", "Georgia", "Courier"])
```

**Supported by:** Text

---

### `setAligns([...])`
Sets alignments for multiple lines.

**Syntax:**
```merlin
text.setAligns(["left", "center", "right"])
```

**Supported by:** Text

---

## Special Values

- **`null`** - Represents no value/color/arrow
- **`_` (underscore)** - In multiple element methods, keeps the existing value unchanged
- **Edge syntax** - `nodeA-nodeB` represents an edge between two nodes

## Method Compatibility

| Data Structure | setValue | setColor | setArrow | setText | add/insert | remove | Special Methods |
|---------------|----------|----------|----------|---------|------------|--------|----------------|
| Array | ✓ (index) | ✓ (index) | ✓ (index) | ✓ | ✓ | ✓ | - |
| Matrix | ✓ (2D) | ✓ (2D) | ✓ (2D) | ✓ | - | - | addRow, addColumn, addBorder |
| Graph | ✓ (index/id) | ✓ (index/id) | ✓ (index/id) | ✓ | ✓ | ✓ | setHidden (index/id), addEdge, setEdges |
| Tree | ✓ (index/id) | ✓ (index/id) | ✓ (index/id) | ✓ | ✓ | ✓ | addChild, setChild, removeSubtree |
| Stack | ✓ (index) | ✓ (index) | ✓ (index) | ✓ | ✓ | ✓ | - |
| LinkedList | ✓ (index/id) | ✓ (index/id) | ✓ (index/id) | ✓ | ✓ | ✓ | addNode, insertNode |
| Text | ✓ | ✓ | - | - | - | - | Font methods, alignment, sizing |
