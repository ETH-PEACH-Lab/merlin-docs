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

**Supported by:** Array, Stack, LinkedList, Graph, Tree

---

### `setValue(row, col, value)`
Sets the value at a specific matrix position.

**Syntax:**
```merlin
matrix.setValue(1, 2, "newValue")
```

**Supported by:** Matrix

---

### `setColor(index, color)`
Sets the color at a specific index.

**Syntax:**
```merlin
obj.setColor(0, "red")
obj.setColor(0, null)  // remove color
```

**Supported by:** Array, Stack, LinkedList, Graph, Tree

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

**Supported by:** Array, Stack, LinkedList, Graph, Tree

---

### `setArrow(row, col, arrow)`
Sets the arrow/label at a specific matrix position.

**Syntax:**
```merlin
matrix.setArrow(1, 2, "target")
```

**Supported by:** Matrix

---

### `setHidden(index, hidden)`
Sets the visibility of an element.

**Syntax:**
```merlin
graph.setHidden(0, true)   // hide
graph.setHidden(0, false)  // show
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

**Supported by:** Array, Stack, LinkedList, Graph, Tree

---

### `setValues([[...], [...]])`
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

### `setColors([[...], [...]])`
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

### `setArrows([[...], [...]])`
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

**Supported by:** Array, Stack, LinkedList

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

### `insertNode(index, name)`
Inserts a node at a specific index.

**Syntax:**
```merlin
list.insertNode(1, newNode)
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

### `insertEdge(index, edge)`
Inserts an edge at a specific index.

**Syntax:**
```merlin
graph.insertEdge(1, nodeA-nodeB)
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

### `addRow(values?)`
Adds a new row to the matrix.

**Syntax:**
```merlin
matrix.addRow()           // empty row
matrix.addRow([1, 2, 3])  // row with values
```

**Supported by:** Matrix

---

### `addColumn(position?, values?)`
Adds a new column to the matrix.

**Syntax:**
```merlin
matrix.addColumn()        // add at end
matrix.addColumn(1)       // add at position 1
matrix.addColumn(1, [1, 2, 3])  // with values
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
matrix.removeColumn(2)
```

**Supported by:** Matrix

---

### `addBorder(value, color?)`
Adds a border around the matrix.

**Syntax:**
```merlin
matrix.addBorder(0)           // border with value 0
matrix.addBorder(0, "gray")   // border with color
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

| Data Structure | setValue | setColor | setArrow | add/insert | remove | Special Methods |
|---------------|----------|----------|----------|------------|--------|----------------|
| Array | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| Matrix | ✓ (2D) | ✓ (2D) | ✓ (2D) | - | - | addRow, addColumn, addBorder |
| Graph | ✓ | ✓ | ✓ | ✓ | ✓ | setHidden, addEdge, setEdges |
| Tree | ✓ | ✓ | ✓ | ✓ | ✓ | addChild, setChild, removeSubtree |
| Stack | ✓ | ✓ | ✓ | ✓ | ✓ | - |
| LinkedList | ✓ | ✓ | ✓ | ✓ | ✓ | addNode, insertNode |
| Text | ✓ | ✓ | - | - | - | Font methods, alignment, sizing |
