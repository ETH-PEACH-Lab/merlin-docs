---
sidebar_position: 7
---

# Text

Text elements allow you to add formatted labels, descriptions, and annotations to your visualizations. They support rich styling options for typography and layout.

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={300}
  overrideSize={true}
>
{`
text title = {
    value: "Algorithm Visualization"
    fontSize: 24
    color: "#2563eb"
    fontWeight: "bold"
    align: "center"
    width: 300
    height: 50
}

text description = {
    value: ["This demonstrates text styling", "with multiple lines and colors"]
    fontSize: [14, 12]
    color: ["#374151", "#6b7280"]
    fontFamily: ["Arial", "Georgia"]
    align: ["left", "right"]
    width: 300
    height: 80
}

page
show title
show description
`}
</SideBySide>

## Properties

Text elements support the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `value` | `string \| string[]` | Text content (single line or array of lines) |
| `fontSize` | `number \| number[]` | Font size(s) for each line |
| `color` | `color \| (color \| null)[]` | Text color(s) for each line |
| `fontWeight` | `fontWeight \| (fontWeight \| null)[]` | Font weight (normal, bold, etc.) |
| `fontFamily` | `fontFamily \| (fontFamily \| null)[]` | Font family for each line |
| `align` | `align \| (align \| null)[]` | Text alignment (left, center, right) |
| `lineSpacing` | `number` | Spacing between lines |
| `width` | `number` | Text box width |
| `height` | `number` | Text box height |

## Methods

Text elements support these methods for manipulation:

:::info
Text objects do not support the `setText()` method since they are text themselves. Use `setValue()`, `setFontSize()`, and other text-specific methods instead.
:::

### Single Property Methods
- `setValue(value)` - Set text content for all lines  
- `setValue(line, value)` - Set text content for specific line
- `setFontSize(value)` - Set font size for all text
- `setFontSize(line, size)` - Set font size for specific line
- `setColor(line, color)` - Set color for specific line
- `setFontWeight(weight)` - Set font weight for all text
- `setFontWeight(line, weight)` - Set font weight for specific line
- `setFontFamily(family)` - Set font family for all text
- `setFontFamily(line, family)` - Set font family for specific line
- `setAlign(alignment)` - Set alignment for all text
- `setAlign(line, alignment)` - Set alignment for specific line
- `setLineSpacing(spacing)` - Set line spacing
- `setWidth(width)` - Set text box width
- `setHeight(height)` - Set text box height

### Multiple Element Methods
- `setValues([...])` - Set text content for multiple lines
- `setFontSizes([...])` - Set font sizes for multiple lines
- `setColors([...])` - Set colors for multiple lines
- `setFontWeights([...])` - Set font weights for multiple lines
- `setFontFamilies([...])` - Set font families for multiple lines
- `setAligns([...])` - Set alignments for multiple lines

## Examples

### Basic Text

<MermaidLiteViewer>
{`text simple = {
    value: "Hello, World!"
    fontSize: 16
    color: "blue"
}

page
show simple`}
</MermaidLiteViewer>

### Multi-line Text with Styles

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={250}
  overrideSize={true}
>
{`
text styled = {
    value: ["Title Text", "Subtitle", "Body content here"]
    fontSize: [20, 16, 12]
    color: ["#1f2937", "#4b5563", "#6b7280"]
    fontWeight: ["bold", "normal", "normal"]
    align: ["center", "center", "left"]
    width: 300
    height: 100
}

page
show styled
`}
</SideBySide>

### Dynamic Text Updates

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={300}
  overrideSize={true}
>
{`
text status = {
    value: "Status: Waiting"
    fontSize: 14
    color: "gray"
    fontFamily: "monospace"
}

page
show status

page
status.setColor(0, "orange")
status.setValue(0, "Status: Processing")

page
status.setColor(0, "green")
status.setValue(0, "Status: Complete")
status.setFontWeight("bold")
`}
</SideBySide>

### Multiple Lines with setValues

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={300}
  overrideSize={true}
>
{`
text progress = {
    value: ["Step 1: Initialize", "Step 2: Process", "Step 3: Complete"]
    fontSize: 14
    color: ["gray", "gray", "gray"]
}

page
show progress

page
progress.setValues(["Step 1: Initialize ✓", "Step 2: Process...", "Step 3: Complete"])
progress.setColors(["green", "orange", "gray"])

page
progress.setValues(["Step 1: Initialize ✓", "Step 2: Process ✓", "Step 3: Complete ✓"])
progress.setColors(["green", "green", "green"])
`}
</SideBySide>

### Text as Data Labels

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={450}
  diagramHeight={350}
  overrideSize={true}
>
{`
array myArr = {
    value: [10, 25, 30, 15]
    color: ["red", "green", "blue", "orange"]
    above: "chartTitle"
}

text chartTitle = {
    value: "Sample Data Visualization"
    fontSize: 18
    color: "#1f2937"
    fontWeight: "bold"
    align: "center"
    width: 350
    height: 30
}

text stats = {
    value: ["Max: 30", "Min: 10", "Avg: 20"]
    fontSize: 12
    color: "#4b5563"
    align: "left"
    width: 150
    height: 60
}

page
show myArr
show stats
`}
</SideBySide>

### Rich Text Formatting

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={300}
  overrideSize={true}
>
{`
text rich = {
    value: ["HEADER", "Important Notice", "Regular text here", "Footer info"]
    fontSize: [24, 16, 14, 10]
    color: ["#dc2626", "#f59e0b", "#374151", "#9ca3af"]
    fontWeight: ["bold", "bold", "normal", "normal"]
    fontFamily: ["Arial", "Georgia", "Times", "Courier"]
    align: ["center", "center", "left", "right"]
    lineSpacing: 20
    width: 350
    height: 120
}

page
show rich
`}
</SideBySide>

### Algorithm Step Description

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={450}
  diagramHeight={350}
  overrideSize={true}
>
{`
array sorting = {
    value: [64, 34, 25, 12]
    color: ["red", "red", null, null]
    below: "stepDesc"
}

text stepDesc = {
    value: "Step 1: Compare first two elements"
    fontSize: 14
    color: "#1f2937"
    fontFamily: "Arial"
    align: "center"
    width: 300
    height: 40
}

page
show sorting

page
sorting.setValues([34, 64, 25, 12])
sorting.setColors(["green", "green", null, null])
stepDesc.setValue(0, "Step 2: Swap if needed, continue")
stepDesc.setColor(0, "#059669")
`}
</SideBySide>

## Special Features

### Implicit Text Fields

When you assign a string directly to positioning properties like `above`, `below`, `left`, or `right`, Merlin automatically creates an implicit text field:

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={250}
  overrideSize={true}
>
{`
graph myGraph = {
    nodes: [n1, n2, n3]
    edges: [n1-n2, n2-n3, n3-n1]
    below: "Triangle Graph Representation"
}

page
show myGraph
`}
</SideBySide>

The string `"Triangle Graph Representation"` automatically becomes a text element with default styling.

### Linked Text Boxes

For more advanced styling and reusability, you can link explicit text elements to data structures by referencing them without quotes:

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={300}
  overrideSize={true}
>
{`
array numbers = {
    value: [1, 2, 3]
    color: ["blue", "green", "red"]
    below: belowNumbers
    above: "Prime Number Sequence"
}

text belowNumbers = {
    value: "These are the first three prime numbers."
    fontSize: 14
    color: "gray"
    fontWeight: "normal"
    fontFamily: "Georgia"
    align: "center"
    lineSpacing: 10
    width: 100
    height: 40
}

page
show numbers
`}
</SideBySide>

### Benefits of Linked Text

Linked text boxes provide several advantages:
- **Custom styling** - Full control over typography and layout
- **Reusability** - Same text element can be referenced by multiple structures
- **Dynamic updates** - Text can be modified independently
- **Complex formatting** - Multi-line text with per-line styling

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={450}
  diagramHeight={350}
  overrideSize={true}
>
{`
text sharedLabel = {
    value: ["Data Analysis", "Updated: 2024"]
    fontSize: [16, 12]
    color: ["#1f2937", "#6b7280"]
    fontWeight: ["bold", "normal"]
    align: ["center", "center"]
    width: 200
    height: 50
}

array dataset1 = {
    value: [10, 20, 30]
    color: ["red", "green", "blue"]
    above: sharedLabel
}

array dataset2 = {
    value: [15, 25, 35]
    color: ["orange", "purple", "yellow"]
    below: sharedLabel
}

page 2x1
show dataset1 (0, 0)
show dataset2 (1, 0)
`}
</SideBySide>

## Use Cases

Text elements are ideal for:
- **Titles and headers** - Chart titles, section headers
- **Step descriptions** - Algorithm step explanations
- **Labels and annotations** - Data labels, code comments
- **Status indicators** - Current state, progress messages
- **Legends** - Color coding explanations
- **Instructions** - User guidance, help text
- **Mathematical notation** - Formulas, equations (basic)
- **Multi-language content** - Different fonts per language

## Related

- [Methods Reference](../methods.md) - Complete list of text methods
- [Array](./array.md) - Text can label array elements
- [Matrix](./matrix.md) - Text can describe matrix operations
- [Graph](./graph.md) - Text can annotate graph structures
