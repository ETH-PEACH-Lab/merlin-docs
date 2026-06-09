---
sidebar_position: 8
---

# Architecture

The basic idea is:

1. Define one or more reusable blocks.
2. Add nodes, edges, and groups inside each block.
3. Use the diagram section to place blocks, organize and connect them globally.

<SideBySide
language="merlin"
bordered={true}
diagramWidth={600}
diagramHeight={350}
overrideSize={true}

> {`architecture myArchitecture = {

    block Encoder: [
        layout: vertical,
        gap: 40,

        nodes: [
            input = type: rect label.text: "Input",
            conv = type: stacked shape: 8x128x128 label.text: "Conv"
        ],

        edges: [
            e0 = input.right -> conv.left
        ],

        groups: [
            row0 = members: [input, conv] layout: horizontal
        ]
    ]

    diagram: [
        uses: [e = Encoder],
        connects: [
            e.input.right -> e.conv.left
        ]
    ]

}
page
show myArchitecture`}

</SideBySide>

## Architecture Top-Level Properties

These properties can be used directly inside an architecture.

| Property                  | Type             | Description                                          |
| ------------------------- | ---------------- | ---------------------------------------------------- |
| title                     | `string \| word` | Title of the architecture                            |
| block &lt;Name&gt;: [...] | `block`          | Defines a reusable architecture block                |
| diagram: [...]            | `diagram`        | Defines how blocks are placed and connected globally |
| above                     | `string \| word` | Text attached above the whole architecture           |
| below                     | `string \| word` | Text attached below the whole architecture           |
| left                      | `string \| word` | Text attached to the left side of the architecture   |
| right                     | `string \| word` | Text attached to the right side of the architecture  |

## Blocks

A block is a reusable part of an architecture. It can contain nodes, edges, and groups. Blocks are declared inside an architecture.

```merlin
block BlockName: [
    layout: vertical,
    gap: 40,

    nodes: [
        node0 = type: rect
        node1 = type: rect
    ],

    edges: [
        e0 = node0.right -> node1.left
    ],

    groups: [
        row0 = members: [node0, node1]
    ]
]
```

### Block Properties

| Property                                   | Type                             | Description                                                                                                                                                                              |
| ------------------------------------------ | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| layout                                     | `horizontal \| vertical \| grid` | Controls how nodes and groups are arranged                                                                                                                                               |
| gap                                        | `number`                         | Space between items in the block                                                                                                                                                         |
| size                                       | `(number, number)`               | Explicit block size as `(width, height)`                                                                                                                                                 |
| color                                      | `string \| null`                 | Block background color                                                                                                                                                                   |
| shape                                      | `rounded`                        | Rounded block shape                                                                                                                                                                      |
| fontFamily                                 | `string \| null`                 | Sets the default font family for text inside the block, including nodes, edges, and groups. If a font family is defined directly on a node, edge, or group, it overrides the block font. |
| fontSize                                   | `number`                         | Sets the default font size for text inside the block, including nodes, edges, and groups. If a font size is defined directly on a node, edge, or group, it overrides the block font.     |
| fontWeight                                 | `number`                         | Sets the default font weight for text inside the block, including nodes, edges, and groups. If a font weight is defined directly on a node, edge, or group, it overrides the block font. |
| fontStyle                                  | `normal \| italic \| oblique`    | Sets the default font style for text font the block, including nodes, edges, and groups. If a font style is defined directly on a node, edge, or group, it overrides the block value.    |
| fontColor                                  | `string \| null`                 | Sets the default font color for text inside the block, including nodes, edges, and groups. If a font color is defined directly on a node, edge, or group, it overrides the block font.   |
| stroke.color                               | `string \| null`                 | Block border color                                                                                                                                                                       |
| stroke.style                               | `solid \| dashed \| dotted`      | Block border style                                                                                                                                                                       |
| stroke.width                               | `number`                         | Block border width                                                                                                                                                                       |
| annotation.&lt;side&gt;                    | `string \| null`                 | Adds annotation text to one side of the block. The side can be `top`, `bottom`, `left`, or `right`.                                                                                      |
| annotation.&lt;side&gt;.shift.&lt;side&gt; | `number`                         | Moves an annotation in a direction. Both side values can be `top`, `bottom`, `left`, or `right`.                                                                                         |
| annotation.gap                             | `number`                         | Gap between block and annotation                                                                                                                                                         |
| annotation.fontFamily                      | `string \| null`                 | Annotation font family                                                                                                                                                                   |
| annotation.fontSize                        | `number`                         | Annotation font size                                                                                                                                                                     |
| annotation.fontWeight                      | `number`                         | Annotation font weight                                                                                                                                                                   |
| annotation.fontStyle                       | `normal \| italic \| oblique`    | Annotation font style                                                                                                                                                                    |
| annotation.fontColor                       | `string \| null`                 | Annotation font color                                                                                                                                                                    |
| nodes                                      | `node list`                      | Declares nodes in the block                                                                                                                                                              |
| edges                                      | `edge list`                      | Declares edges inside the block                                                                                                                                                          |
| groups                                     | `group list`                     | Declares visual or logical groups                                                                                                                                                        |

## Nodes

Nodes are visual items inside a block. They are declared inside a nodes: [...] section.

A node has the following form:

```merlin
nodeId = property: value property: value
```

Example:

```merlin
nodes: [
    input = type: rect label.text: "Input"
    conv = type: stacked shape: 8x64x64 color: "blue"
]
```

Each node must define a type. The allowed properties depend on the node type.

### Node Types

| Type           | Description                            |
| -------------- | -------------------------------------- |
| text           | Text-only node                         |
| rect           | Rectangle node                         |
| circle         | Circle node                            |
| stacked        | 3D stacked tensor/block representation |
| flatten        | Flattened tensor representation        |
| fullyConnected | Fully connected layer representation   |
| arrow          | Arrow node                             |
| trapezoid      | Trapezoid node                         |
| cuboid         | 3D rectangle                           |

### Common Label Properties

Most node types support label, sub-label, and operation-label properties.

| Property            | Type                                    | Description                                                                       |
| ------------------- | --------------------------------------- | --------------------------------------------------------------------------------- |
| label.text          | `string \| null`                        | Main label text                                                                   |
| label.orientation   | `(vertical, right) \| (vertical, left)` | Vertical label orientation. Supported by text, rect, arrow, trapezoid, and circle |
| label.fontColor     | `string \| null`                        | Label font color                                                                  |
| label.fontFamily    | `string \| null`                        | Label font family                                                                 |
| label.fontSize      | `number`                                | Label font size                                                                   |
| label.fontWeight    | `number`                                | Label font weight                                                                 |
| label.fontStyle     | `normal \| italic \| oblique`           | Label font style                                                                  |
| subLabel.text       | `string \| null`                        | Secondary label shown below the main label, usually in smaller text               |
| subLabel.fontColor  | `string \| null`                        | Font color of the sub-label                                                       |
| subLabel.fontFamily | `string \| null`                        | Font family of the sub-label                                                      |
| subLabel.fontSize   | `number`                                | Font size of the sub-label                                                        |
| subLabel.fontWeight | `number`                                | Font weight of the sub-label                                                      |
| subLabel.fontStyle  | `normal \| italic \| oblique`           | Font style of the sub-label                                                       |
| opLabel.text        | `string \| null`                        | Operation label shown between two connected nodes, above the connection area      |
| opLabel.subtext     | `string \| null`                        | Smaller supporting text shown below the operation label                           |
| opLabel.fontColor   | `string \| null`                        | Font color of the operation label                                                 |
| opLabel.fontFamily  | `string \| null`                        | Font family of the operation label                                                |
| opLabel.fontSize    | `number`                                | Font size of the operation label                                                  |
| opLabel.fontWeight  | `number`                                | Font weight of the operation label                                                |
| opLabel.fontStyle   | `normal \| italic \| oblique`           | Font style of the operation label                                                 |

### Node Shape Properties

| Property      | Type                                                         | Supported By                                                             | Description                                                                                                                                                                                                            |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| size          | `(number, number)`                                           | rect, arrow, trapezoid, circle, stacked, flatten, fullyConnected, cuboid | Explicit visual size as `(width, height)`                                                                                                                                                                              |
| shape         | `NUMBERxNUMBER, NUMBERxNUMBERxNUMBER, [numbers], or rounded` | rect, stacked, flatten, fullyConnected, cuboid                           | Defines the node shape or dimensions. For `stacked` and `cuboid`, use `DepthxHeightxWidth`. For `flatten`, use `RowsxColumns`. For `fullyConnected`, use a number list such as `[4, 3, 2]`. For `rect`, use `rounded`. |
| kernelSize    | `NUMBERxNUMBER`                                              | stacked                                                                  | Defines the convolution kernel size for `stacked` nodes, written as `filterHeightxfilterWidth`.                                                                                                                        |
| filterSpacing | `number`                                                     | stacked                                                                  | Spacing between stacked filters                                                                                                                                                                                        |
| color         | `string, null, or string/null list`                          | rect, arrow, trapezoid, circle, stacked, flatten, fullyConnected, cuboid | Defines the fill color of the node. Only `fullyConnected` uses a list of colors.                                                                                                                                       |
| outputLabels  | `string/null list`                                           | fullyConnected                                                           | Labels shown on fully connected outputs                                                                                                                                                                                |
| direction     | `top \| bottom \| left \| right`                             | trapezoid                                                                | Direction of the trapezoid                                                                                                                                                                                             |

### Node Stroke Properties

| Property          | Type                        | Supported By                                    | Description        |
| ----------------- | --------------------------- | ----------------------------------------------- | ------------------ |
| stroke.color      | `string \| null`            | rect, arrow, trapezoid, circle, stacked, cuboid | Node border color  |
| stroke.style      | `solid \| dashed \| dotted` | rect, arrow, trapezoid, circle, stacked, cuboid | Node border style  |
| stroke.width      | `number`                    | rect, arrow, trapezoid, circle, stacked, cuboid | Node border width  |
| outerStroke.color | `string \| null`            | stacked                                         | Outer border color |
| outerStroke.style | `solid \| dashed \| dotted` | stacked                                         | Outer border style |
| outerStroke.width | `number`                    | stacked                                         | Outer border width |

### Node Annotation Properties

| Property                                   | Type                          | Description                                                                                        |
| ------------------------------------------ | ----------------------------- | -------------------------------------------------------------------------------------------------- |
| annotation.&lt;side&gt;                    | `string \| null`              | Adds annotation text to one side of the node. The side can be `top`, `bottom`, `left`, or `right`. |
| annotation.&lt;side&gt;.shift.&lt;side&gt; | `number`                      | Moves an annotation in a direction. Both side values can be `top`, `bottom`, `left`, or `right`.   |
| annotation.gap                             | `number`                      | Gap between node and annotation                                                                    |
| annotation.fontFamily                      | `string \| null`              | Annotation font family                                                                             |
| annotation.fontSize                        | `number`                      | Annotation font size                                                                               |
| annotation.fontWeight                      | `number`                      | Annotation font weight                                                                             |
| annotation.fontStyle                       | `normal \| italic \| oblique` | Annotation font style                                                                              |
| annotation.fontColor                       | `string \| null`              | Annotation font color                                                                              |

### Properties by Node Type

The following table shows which DSL properties are supported by each node type.

| Node type      | Allowed DSL properties                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text           | type, label.text, label.orientation, label.fontColor, label.fontFamily, label.fontSize, label.fontWeight, label.fontStyle, subLabel.text, subLabel.fontColor, subLabel.fontFamily, subLabel.fontSize, subLabel.fontWeight, subLabel.fontStyle, annotation.top, annotation.bottom, annotation.left, annotation.right, annotation.gap, annotation.fontFamily, annotation.fontSize, annotation.fontWeight, annotation.fontStyle, annotation.fontColor, opLabel.text, opLabel.fontColor, opLabel.fontFamily, opLabel.fontSize, opLabel.fontWeight, opLabel.fontStyle, opLabel.subtext                                                                                                                                |
| rect           | type, label.text, label.orientation, label.fontColor, label.fontFamily, label.fontSize, label.fontWeight, label.fontStyle, subLabel.text, subLabel.fontColor, subLabel.fontFamily, subLabel.fontSize, subLabel.fontWeight, subLabel.fontStyle, size, shape, color, stroke.color, stroke.style, stroke.width, annotation.top, annotation.bottom, annotation.left, annotation.right, annotation.gap, annotation.fontFamily, annotation.fontSize, annotation.fontWeight, annotation.fontStyle, annotation.fontColor, opLabel.text, opLabel.fontColor, opLabel.fontFamily, opLabel.fontSize, opLabel.fontWeight, opLabel.fontStyle, opLabel.subtext                                                                  |
| circle         | type, label.text, label.orientation, label.fontColor, label.fontFamily, label.fontSize, label.fontWeight, label.fontStyle, subLabel.text, subLabel.fontColor, subLabel.fontFamily, subLabel.fontSize, subLabel.fontWeight, subLabel.fontStyle, size, color, stroke.color, stroke.style, stroke.width, annotation.top, annotation.bottom, annotation.left, annotation.right, annotation.gap, annotation.fontFamily, annotation.fontSize, annotation.fontWeight, annotation.fontStyle, annotation.fontColor, opLabel.text, opLabel.fontColor, opLabel.fontFamily, opLabel.fontSize, opLabel.fontWeight, opLabel.fontStyle, opLabel.subtext                                                                         |
| arrow          | type, label.text, label.orientation, label.fontColor, label.fontFamily, label.fontSize, label.fontWeight, label.fontStyle, subLabel.text, subLabel.fontColor, subLabel.fontFamily, subLabel.fontSize, subLabel.fontWeight, subLabel.fontStyle, size, color, stroke.color, stroke.style, stroke.width, annotation.top, annotation.bottom, annotation.left, annotation.right, annotation.gap, annotation.fontFamily, annotation.fontSize, annotation.fontWeight, annotation.fontStyle, annotation.fontColor, opLabel.text, opLabel.fontColor, opLabel.fontFamily, opLabel.fontSize, opLabel.fontWeight, opLabel.fontStyle, opLabel.subtext                                                                         |
| trapezoid      | type, label.text, label.orientation, label.fontColor, label.fontFamily, label.fontSize, label.fontWeight, label.fontStyle, subLabel.text, subLabel.fontColor, subLabel.fontFamily, subLabel.fontSize, subLabel.fontWeight, subLabel.fontStyle, size, color, stroke.color, stroke.style, stroke.width, direction, annotation.top, annotation.bottom, annotation.left, annotation.right, annotation.gap, annotation.fontFamily, annotation.fontSize, annotation.fontWeight, annotation.fontStyle, annotation.fontColor, opLabel.text, opLabel.fontColor, opLabel.fontFamily, opLabel.fontSize, opLabel.fontWeight, opLabel.fontStyle, opLabel.subtext                                                              |
| stacked        | type, shape, kernelSize, filterSpacing, label.text, label.fontColor, label.fontFamily, label.fontSize, label.fontWeight, label.fontStyle, subLabel.text, subLabel.fontColor, subLabel.fontFamily, subLabel.fontSize, subLabel.fontWeight, subLabel.fontStyle, opLabel.text, opLabel.fontColor, opLabel.fontFamily, opLabel.fontSize, opLabel.fontWeight, opLabel.fontStyle, opLabel.subtext, color, stroke.color, stroke.style, stroke.width, outerStroke.color, outerStroke.style, outerStroke.width, annotation.top, annotation.bottom, annotation.left, annotation.right, annotation.gap, annotation.fontFamily, annotation.fontSize, annotation.fontWeight, annotation.fontStyle, annotation.fontColor, size |
| flatten        | type, shape, label.text, label.fontColor, label.fontFamily, label.fontSize, label.fontWeight, label.fontStyle, subLabel.text, subLabel.fontColor, subLabel.fontFamily, subLabel.fontSize, subLabel.fontWeight, subLabel.fontStyle, opLabel.text, opLabel.fontColor, opLabel.fontFamily, opLabel.fontSize, opLabel.fontWeight, opLabel.fontStyle, opLabel.subtext, color, annotation.top, annotation.bottom, annotation.left, annotation.right, annotation.gap, annotation.fontFamily, annotation.fontSize, annotation.fontWeight, annotation.fontStyle, annotation.fontColor, size                                                                                                                               |
| fullyConnected | type, shape, label.text, label.fontColor, label.fontFamily, label.fontSize, label.fontWeight, label.fontStyle, subLabel.text, subLabel.fontColor, subLabel.fontFamily, subLabel.fontSize, subLabel.fontWeight, subLabel.fontStyle, opLabel.text, opLabel.fontColor, opLabel.fontFamily, opLabel.fontSize, opLabel.fontWeight, opLabel.fontStyle, opLabel.subtext, color, outputLabels, annotation.top, annotation.bottom, annotation.left, annotation.right, annotation.gap, annotation.fontFamily, annotation.fontSize, annotation.fontWeight, annotation.fontStyle, annotation.fontColor, size                                                                                                                 |
| cuboid         | type, shape, label.text, label.fontColor, label.fontFamily, label.fontSize, label.fontWeight, label.fontStyle, subLabel.text, subLabel.fontColor, subLabel.fontFamily, subLabel.fontSize, subLabel.fontWeight, subLabel.fontStyle, opLabel.text, opLabel.fontColor, opLabel.fontFamily, opLabel.fontSize, opLabel.fontWeight, opLabel.fontStyle, opLabel.subtext, color, stroke.color, stroke.style, stroke.width, annotation.top, annotation.bottom, annotation.left, annotation.right, annotation.gap, annotation.fontFamily, annotation.fontSize, annotation.fontWeight, annotation.fontStyle, annotation.fontColor, size                                                                                     |

## Node Examples

### Basic Nodes

This example shows three simple node types: a rectangle, a circle, and another rectangle.

<SideBySide
language="merlin"
bordered={true}
diagramWidth={500}
diagramHeight={250}
overrideSize={true}

> {`architecture nodeExample = {

    block Layer: [
        layout: horizontal,
        gap: 30,
        nodes: [
            input = type: rect label.text: "Input",
            hidden = type: circle label.text: "Hidden" size: (50, 50),
            output = type: rect label.text: "Output"
        ]
    ]

}
page
show nodeExample`}

</SideBySide>

### Stacked Node

Use stacked nodes to represent tensors or feature maps.

<SideBySide
language="merlin"
bordered={true}
diagramWidth={500}
diagramHeight={250}
overrideSize={true}

> {`architecture stackedExample = {

    block ConvBlock: [
        layout: horizontal,
        gap: 40,
        nodes: [
            input = type: stacked shape: 4x32x32 label.text: "Input",
            conv = type: stacked shape: 12x128x128 label.text: "Conv"
        ],
        edges: [
            e0 = input.right -> conv.left
        ]
    ]

}
page
show stackedExample`}

</SideBySide>

### Fully Connected Node

Use fullyConnected nodes to show dense neural network layers.

<SideBySide
language="merlin"
bordered={true}
diagramWidth={500}
diagramHeight={250}
overrideSize={true}

> {`architecture fullyConnectedExample = {

    block Classifier: [
        layout: horizontal,
        gap: 40,
        nodes: [
            out = type: rect label.text: "Output",
            fc = type: fullyConnected shape: [4, 3, 2] label.text: "FC" outputLabels: ["f1", "f2"]
        ],
        edges: [
            e0 = out.right -> fc.left
        ]
    ]

}

page
show fullyConnectedExample`}
</SideBySide>

## Edges

Edges connect nodes, groups, or edge anchors inside a block.

An edge follows this pattern:

```merlin
edgeId = source.anchor -> target.anchor property: value
```

Example:

```merlin
edges: [
    e0 = a.right -> b.left
    e1 = e0.mid -> c.top
]
```

### Edge Anchors

| Anchor | Description                                                       |
| ------ | ----------------------------------------------------------------- |
| top    | Uses the top side of a node or group as the connection point      |
| bottom | Uses the bottom side of a node or group as the connection point   |
| left   | Uses the left side of a node or group as the connection point     |
| right  | Uses the right side of a node or group as the connection point    |
| start  | Uses the start point of an existing edge as the connection point  |
| mid    | Uses the middle point of an existing edge as the connection point |
| end    | Uses the end point of an existing edge as the connection point    |

### Indexed Ports

Anchors can also use an optional index, written as `[0]`, `[1]`, `[2]`, and so on. Supported indices range from `[0]` to `[10]`

<SideBySide
language="merlin"
bordered={true}
diagramWidth={500}
diagramHeight={250}
overrideSize={true}

> {`architecture IndexedPortsExample = {

    block Classifier: [
        layout: horizontal,
        gap: 40,
        nodes: [
            input = type: rect,
            hidden = type: rect
        ],
        edges: [
            e0 = input.right[0] -> hidden.left[0],
            e1 = input.right[1] -> hidden.left[1],
            e2 = input.right[2] -> hidden.left[2],
            e3 = input.right[3] -> hidden.left[3],
            e4 = input.right[4] -> hidden.left[4],
            e5 = input.right[5] -> hidden.left[5],
            e6 = input.right[6] -> hidden.left[6],
            e7 = input.right[7] -> hidden.left[7],
            e8 = input.right[8] -> hidden.left[8],
            e9 = input.right[9] -> hidden.left[9],
            e10 = input.right[10] -> hidden.left[10]
        ]
    ]

}
page
show IndexedPortsExample`}
</SideBySide>

### Edge Properties

| Property                 | Type                                                 | Description                                                                                                                                                                                                                  |
| ------------------------ | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shape                    | `straight \| bow \| arc`                             | Edge shape                                                                                                                                                                                                                   |
| style                    | `solid \| dashed \| dotted`                          | Edge line style                                                                                                                                                                                                              |
| transition               | `default \| featureMap \| flatten \| fullyConnected` | Visual transition style                                                                                                                                                                                                      |
| color                    | `string \| null`                                     | Edge color                                                                                                                                                                                                                   |
| arrowheads               | `0 \| 1 \| 2 \| 3`                                   | Controls the arrowheads on the edge                                                                                                                                                                                          |
| gap                      | `number`                                             | Inserts spacing at the start and end of the edge, so the line or arrowhead does not touch the connected elements directly. Edge can float with sufficient gap                                                                |
| edgeAnchorOffset         | `number[]`                                           | Shifts edge anchor points when connecting from or to another edge through `edge.start`, `edge.mid`, or `edge.end`. The first value applies to the first edge anchor, and the second value applies to the second edge anchor. |
| curveHeight              | `number`                                             | Height of a edge. shape: straight does not have an curveHeight                                                                                                                                                               |
| width                    | `number`                                             | Width of edge width                                                                                                                                                                                                          |
| bidirectional            | `boolean`                                            | Draws the edge in both directions                                                                                                                                                                                            |
| headOnly                 | `boolean`                                            | Shows only the arrow head                                                                                                                                                                                                    |
| alignToIndexedPort       | `boolean`                                            | Aligns the connected elements by their selected indexed ports, such as `right[1]` and `left[5]`                                                                                                                              |
| label.text               | `string \| null`                                     | Edge label text                                                                                                                                                                                                              |
| label.fontColor          | `string \| null`                                     | Label font color                                                                                                                                                                                                             |
| label.fontFamily         | `string \| null`                                     | Label font family                                                                                                                                                                                                            |
| label.fontSize           | `number`                                             | Label font size                                                                                                                                                                                                              |
| label.fontWeight         | `number`                                             | Label font weight                                                                                                                                                                                                            |
| label.fontStyle          | `normal \| italic \| oblique`                        | Label font style                                                                                                                                                                                                             |
| label.shift.&lt;side&gt; | `number`                                             | Moves the edge label text in a direction. The side can be `top`, `bottom`, `left`, or `right`.                                                                                                                               |

## Groups

Groups collect nodes and other groups into a visual or logical unit. Groups can include nodes and previously defined groups.

```merlin
groups: [
    row0 = members: [input, conv] layout: horizontal
    row1 = members: [c, d] layout: horizontal
    allRows = members: [row0, row1] layout: vertical
]
```

### Group Properties

| Property                                   | Type                               | Description                                                                                                         |
| ------------------------------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| members                                    | `word list`                        | Nodes or previous defined groups                                                                                    |
| layout                                     | `horizontal \| vertical \| grid`   | Layout of group members                                                                                             |
| gap                                        | `number`                           | Space between members                                                                                               |
| color                                      | `string \| null`                   | Group background color                                                                                              |
| colorBoxAdjustments                        | `(number, number, number, number)` | Expands or shrinks the group background color on each side. The values are ordered as `(top, right, bottom, left)`. |
| align                                      | `boolean`                          | Enables or disables alignment                                                                                       |
| shape                                      | `rounded`                          | Rounded group shape                                                                                                 |
| stroke.color                               | `string \| null`                   | Group border color                                                                                                  |
| stroke.style                               | `solid \| dashed \| dotted`        | Group border style                                                                                                  |
| stroke.width                               | `number`                           | Group border width                                                                                                  |
| anchor.source                              | `word`                             | Source anchor node inside the group                                                                                 |
| anchor.target                              | `word`                             | Target anchor node inside the group                                                                                 |
| shift.left                                 | `number`                           | Moves the group left                                                                                                |
| shift.right                                | `number`                           | Moves the group right                                                                                               |
| shift.top                                  | `number`                           | Moves the group upward                                                                                              |
| shift.bottom                               | `number`                           | Moves the group downward                                                                                            |
| marker.type                                | `bracket \| brace \| arrow`        | Visual marker type                                                                                                  |
| marker.color                               | `string \| null`                   | Marker color                                                                                                        |
| marker.position                            | `top \| bottom \| left \| right`   | Marker position                                                                                                     |
| marker.text                                | `string \| null`                   | Marker label text                                                                                                   |
| marker.fontColor                           | `string \| null`                   | Marker label color                                                                                                  |
| marker.fontFamily                          | `string \| null`                   | Marker label font family                                                                                            |
| marker.fontSize                            | `number`                           | Marker label font size                                                                                              |
| marker.fontWeight                          | `number`                           | Marker label font weight                                                                                            |
| marker.fontStyle                           | `normal \| italic \| oblique`      | Marker label font style                                                                                             |
| marker.shift.left                          | `number`                           | Moves the marker left. If the marker text is on the left side, the left text is moved further left.                 |
| marker.shift.right                         | `number`                           | Moves the marker right. If the marker text is on the right side, the right text is moved further right.             |
| marker.shift.top                           | `number`                           | Moves the marker upward. If the marker text is on top, the top text is moved further upward.                        |
| marker.shift.bottom                        | `number`                           | Moves the marker downward. If the marker text is below the marker, the bottom text is moved further downward.       |
| annotation.&lt;side&gt;                    | `string \| null`                   | Adds annotation text to one side of the group. The side can be `top`, `bottom`, `left`, or `right`.                 |
| annotation.&lt;side&gt;.shift.&lt;side&gt; | `number`                           | Moves an annotation in a direction. Both side values can be `top`, `bottom`, `left`, or `right`.                    |
| annotation.gap                             | `number`                           | Gap between group and annotation                                                                                    |
| annotation.fontFamily                      | `string \| null`                   | Annotation font family                                                                                              |
| annotation.fontSize                        | `number`                           | Annotation font size                                                                                                |
| annotation.fontWeight                      | `number`                           | Annotation font weight                                                                                              |
| annotation.fontStyle                       | `normal \| italic \| oblique`      | Annotation font style                                                                                               |
| annotation.fontColor                       | `string \| null`                   | Annotation font color                                                                                               |

## Group with Marker Example

Markers can be used to visually label a group.

<SideBySide
language="merlin"
bordered={true}
diagramWidth={600}
diagramHeight={300}
overrideSize={true}

> {`architecture markerExample = {

    block AttentionBlock: [
        layout: horizontal,
        gap: 25,
        nodes: [
            a = type: rect label.text: "Q",
            b = type: rect label.text: "K",
            c = type: rect label.text: "V"
        ],
        groups: [
            row0 = members: [a, b, c] marker.type: brace marker.position: top marker.text: "Attention" marker.color: "black" marker.shift.bottom: -30
        ]
    ]

}

page
show markerExample`}
</SideBySide>

## Diagram

The diagram section defines how blocks inside architecture are placed and connected at the overall architecture level.

Use it to:

- instantiate blocks with aliases
- arrange blocks horizontally, vertically, or in a grid
- connect nodes or groups across different blocks

```merlin
diagram: [
    layout: horizontal
    gap: 60
    uses: [e = Encoder, d = Decoder]
    connects: [
        e.output.right -> d.input.left shape: bow style: dashed color: "gray" arrowheads: 1
    ]
]

```

### Diagram Properties

| Property                                   | Type                             | Description                                                                                                                                        |
| ------------------------------------------ | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| layout                                     | `horizontal \| vertical \| grid` | Layout of used blocks                                                                                                                              |
| gap                                        | `number`                         | Space between used blocks                                                                                                                          |
| rotateRight                                | `0 \| 1 \| 2 \| 3 \| 4`          | Rotates the whole diagram, including all used blocks, to the right by number of times. 1 time rotation to the right, 2 time rotation to the right. |
| uses                                       | `use list`                       | Instantiates blocks with aliases                                                                                                                   |
| connects                                   | `connect list`                   | Connects nodes and groups across blocks aliases                                                                                                    |
| annotation.&lt;side&gt;                    | `string \| null`                 | Adds annotation text to one side of the diagram. The side can be `top`, `bottom`, `left`, or `right`.                                              |
| annotation.&lt;side&gt;.shift.&lt;side&gt; | `number`                         | Moves an annotation in a direction. Both side values can be `top`, `bottom`, `left`, or `right`.                                                   |
| annotation.gap                             | `number`                         | Gap between diagram and annotation                                                                                                                 |
| annotation.fontFamily                      | `string \| null`                 | Annotation font family                                                                                                                             |
| annotation.fontSize                        | `number`                         | Annotation font size                                                                                                                               |
| annotation.fontWeight                      | `number`                         | Annotation font weight                                                                                                                             |
| annotation.fontStyle                       | `normal \| italic \| oblique`    | Annotation font style                                                                                                                              |
| annotation.fontColor                       | `string \| null`                 | Annotation font color                                                                                                                              |

### Diagram Uses

The uses section defines which blocks appear in the final diagram.

```merlin
uses: [e = Encoder, d = Decoder]
```

Here, e and d are aliases. These aliases can then be used in connects.

The same block can be used multiple times by assigning it to different aliases:

```merlin
uses: [e = Encoder, e2 = Encoder]
```

| Property | Type               | Description                                               |
| -------- | ------------------ | --------------------------------------------------------- |
| anchor   | `node or group id` | Aligns a used block by a specific node or group inside it |

### Diagram Connects

The connects section creates connections between aliased blocks.

A diagram connection uses the form:

```merlin
alias.member.anchor -> alias.member.anchor
```

| Part   | Meaning                                                   |
| ------ | --------------------------------------------------------- |
| alias  | The alias from uses, such as e or d                       |
| member | A node or group inside the aliased block                  |
| anchor | The connection point, such as left, right, top, or bottom |

### Diagram Connect Anchors

| Anchor | Description                                                     |
| ------ | --------------------------------------------------------------- |
| top    | Uses the top side of a node or group as the connection point    |
| bottom | Uses the bottom side of a node or group as the connection point |
| left   | Uses the left side of a node or group as the connection point   |
| right  | Uses the right side of a node or group as the connection point  |

### Diagram Connect Properties

| Property                 | Type                                                 | Description                                                                                                                                                                                                                 |
| ------------------------ | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shape                    | `straight \| bow \| arc`                             | Connection shape                                                                                                                                                                                                            |
| style                    | `solid \| dashed \| dotted`                          | Connection line style                                                                                                                                                                                                       |
| transition               | `default \| featureMap \| flatten \| fullyConnected` | Visual transition style                                                                                                                                                                                                     |
| color                    | `string \| null`                                     | Connection color                                                                                                                                                                                                            |
| arrowheads               | `0 \| 1 \| 2 \| 3`                                   | Controls the arrowheads on the connection                                                                                                                                                                                   |
| gap                      | `number`                                             | Inserts spacing at the start and end of the connection, so the line or arrowhead does not touch the connected elements directly. The connection can appear floating with sufficient gap                                     |
| edgeAnchorOffset         | `number[]`                                           | Shifts edge anchor points when connecting from or to another edge through `edge.start`, `edge.mid`, or `edge.end`. The first value applies to the first edge anchor, and the second value applies to the second edge anchor |
| curveHeight              | `number`                                             | Height of a curved connection. `shape: straight` does not use `curveHeight`                                                                                                                                                 |
| width                    | `number`                                             | Stroke width of the connection                                                                                                                                                                                              |
| bidirectional            | `boolean`                                            | Draws the connection in both directions                                                                                                                                                                                     |
| headOnly                 | `boolean`                                            | Shows only the arrow head                                                                                                                                                                                                   |
| alignToIndexedPort       | `boolean`                                            | Aligns the connection to indexed ports                                                                                                                                                                                      |
| label.text               | `string \| null`                                     | Connection label text                                                                                                                                                                                                       |
| label.fontColor          | `string \| null`                                     | Label font color                                                                                                                                                                                                            |
| label.fontFamily         | `string \| null`                                     | Label font family                                                                                                                                                                                                           |
| label.fontSize           | `number`                                             | Label font size                                                                                                                                                                                                             |
| label.fontWeight         | `number`                                             | Label font weight                                                                                                                                                                                                           |
| label.fontStyle          | `normal \| italic \| oblique`                        | Label font style                                                                                                                                                                                                            |
| label.shift.&lt;side&gt; | `number`                                             | Moves the connection label text in a direction. The side can be `top`, `bottom`, `left`, or `right`                                                                                                                         |

## Complete Example

<SideBySide
language="merlin"
bordered={true}
diagramWidth={700}
diagramHeight={350}
overrideSize={true}

> {`architecture a = {

    block Encoder: [
    	layout: vertical,
    	fontFamily: "Helvetica",
    	fontWeight: 100,
    	gap: 40,
    	nodes: [
    	    add_norm0 = type: rect label.text: "Add & Norm" size: (90, 25) shape: rounded color: "#F3F4C6" stroke.color: "black" stroke width: 2.2,
    	    feed_forward = type: rect label.text: "Feed\\nForward" size: (90, 35) shape: rounded color: "#CAE7F5" stroke.color: "black" stroke.width: 2.2,
    	    add_norm1 = type: rect label.text: "Add & Norm" size: (90, 25) shape: rounded color: "#F3F4C6" stroke.color: "black" stroke.width: 2.2,
    	    multi_head_attention = type: rect label.text: "Multi-Head\\nAttention" size: (90, 35) shape: rounded color: "#FAE3C0" stroke    color: "black" stroke.width: 2.2,
    	    plus = type: circle label.text: "+" label.fontSize: 20 size: (15, 15),
    	    positional_encoding = type: circle label.text: "∿" label.fontSize: 56 annotation.left: "Positional\\nEncoding" annotation.fontFamily: "Helvetica" annotation.fontSize: 14 annotation.fontWeight: 100 size: (30, 30),
    	    input_embedding = type: rect label.text: "Input\\nEmbedding" size: (90, 35) shape: rounded color: "#F8E1E2" stroke.color: "black" stroke.width: 2.2,
    	    inputs = type: text label.text: "Inputs" label.fontSize: 14
    	],
    	edges: [
    	    e1 = multi_head_attention.top -> add_norm1.bottom shape: straight arrowheads: 0,
    	    e2 = add_norm1.top -> feed_forward.bottom shape: straight,
    	    e3 = e2.mid -> add_norm0.left shape: bow,
    	    e4 = feed_forward.top -> add_norm0.bottom shape: straight arrowheads: 0,
    	    e5 = input_embedding.top -> plus.bottom shape: straight,
    	    e6 = plus.top -> multi_head_attention.bottom shape: straight arrowheads: 3,
    	    e7 = inputs.top -> input_embedding.bottom shape: straight,
    	    e8 = e6.mid -> add_norm1.left shape: bow,
    	    e9 = positional_encoding.right -> plus.left shape: straight arrowheads: 0
    	],
    	groups: [
    	    row1 = members: [add_norm0, feed_forward] layout: vertical gap: 5,
    	    row2 = members: [add_norm1, multi_head_attention] layout: vertical gap: 5,
    	    row3 = members: [row1, row2] layout: vertical gap: 40 color: "#F3F3F4" colorBoxAdjustments: (-10,-20,5,-15) stroke.color: "black" stroke.width: 2.2 shape: rounded annotation.left: "N\\mul" annotation.gap: 10 annotation.fontFamily: "Helvetica" annotation.fontSize: 14 annotation.fontWeight: 100,
    	    row4 = members: [positional_encoding, plus] gap: 12,
    	    row6 = members: [row3, row4] layout: vertical anchor.source: plus anchor.target: multi_head_attention,
    	    row5 = members: [row6, input_embedding] layout: vertical gap: 10
    	]
    ],
    block Decoder: [
    	layout: vertical,
    	fontFamily: "Helvetica",
    	fontWeight: 100,
    	gap: 40,
    	nodes: [
    	    output = type: text label.text: "Output\\nProbabilities" label.fontSize: 14,
    	    softmax = type: rect label.text: "Softmax" size: (90, 25) shape: rounded color: "#D1E6D1" stroke.color: "black" stroke.width: 2.2,
    	    linear = type: rect label.text: "Linear" size: (90, 25) shape: rounded color: "#DCDFEE" stroke.color: "black" stroke.width: 2.2,
    	    add_norm0 = type: rect label.text: "Add & Norm" size: (90, 25) shape: rounded color: "#F3F4C6" stroke.color: "black" stroke.width: 2.2,
    	    feed_forward = type: rect label.text: "Feed\\nForward" size: (90, 35) shape: rounded color: "#CAE7F5" stroke.color: "black" stroke.width: 2.2,
    	    add_norm1 = type: rect label.text: "Add & Norm" size: (90, 25) shape: rounded color: "#F3F4C6" stroke.color: "black" stroke.width: 2.2,
    	    multi_head_attention = type: rect label.text: "Multi-Head\\nAttention" size: (90, 35) shape: rounded color: "#FAE3C0" stroke.color: "black" stroke.width: 2.2,
    	    add_norm2 = type: rect label.text: "Add & Norm" size: (90, 25) shape: rounded color: "#F3F4C6" stroke.color: "black" stroke.width: 2.2,
    	    masked_multi_head_attention = type: rect label.text: "Masked\\nMulti-Head\\nAttention" size: (90, 55) shape: rounded color: "#FAE3C0" stroke.color: "black" stroke.width: 2.2,
    	    plus = type: circle label.text: "+" label.fontSize: 20 size: (15, 15),
    	    positional_encoding = type: circle label.text: "∿" label.fontSize: 56 annotation.right: "Positional\\nEncoding" annotation.fontFamily: "Helvetica" annotation.fontSize: 14 annotation.fontWeight: 100 size: (33, 33),
    	    output_embedding = type: rect label.text: "Output\\nEmbedding" size: (90, 35) shape: rounded color: "#F8E1E2" stroke.color: "black" stroke.width: 2.2,
    	    outputs = type: text label.text: "Outputs\\n(shifted right)" label.fontSize: 14 label.fontWeight: 100
    	],
    	edges: [
    	    e1 = feed_forward.top -> add_norm0.bottom shape: straight arrowheads: 0,
    	    e2 = multi_head_attention.top -> add_norm1.bottom shape: straight arrowheads: 0,
    	    e3 = masked_multi_head_attention.top -> add_norm2.bottom shape: straight arrowheads: 0,
    	    e4 = add_norm1.top -> feed_forward.bottom shape: straight,
    	    e5 = e4.mid -> add_norm0.right shape: bow,
    	    e6 = add_norm2.top[5] -> multi_head_attention.bottom[9] shape: bow,
    	    e7 = e6.start -> add_norm1.right shape: bow edgeAnchorOffset: [7,0],
    	    e8 = add_norm0.top -> linear.bottom shape: straight,
    	    e9 = linear.top -> softmax.bottom shape: straight,
    	    e10 = softmax.top -> output.bottom shape: straight,
    	    e11 = plus.right -> positional_encoding.left shape: straight arrowheads: 0,
    	    e12 = plus.top -> masked_multi_head_attention.bottom shape: straight arrowheads: 3,
    	    e13 = outputs.top -> output_embedding.bottom shape: straight,
    	    e14 = output_embedding.top -> plus.bottom shape: straight,
    	    e15 = e12.mid -> add_norm2.right shape: bow
    	],
    	groups: [
    	    row0 = members: [output, softmax, linear] layout: vertical gap: 25,
    	    row1 = members: [add_norm0, feed_forward] layout: vertical gap: 5,
    	    row2 = members: [add_norm1, multi_head_attention] layout: vertical gap: 5,
    	    row3 = members: [add_norm2, masked_multi_head_attention] layout: vertical gap: 5,
    	    row4 = members: [row1, row2, row3] layout: vertical gap: 30 color: "#F3F3F4" colorBoxAdjustments: (-22,-20,5,-20) stroke.color: "black" stroke.width: 2.2 shape: rounded annotation.right: "N\\mul" annotation.gap: 5 annotation.fontFamily: "Helvetica" annotation.fontSize: 14 annotation.fontWeight: 100,
    	    row6 = members: [row0, row4] layout: vertical gap: 25,
    	    row5 = members: [plus, positional_encoding] gap: 12,
    	    row8 = members: [row6, row5] layout: vertical anchor.source: plus anchor.target: masked_multi_head_attention,
    	    row7 = members: [row8, output_embedding] layout: vertical gap: 10
    	]
    ],
    diagram: [
        gap: -35,
        uses: [e = Encoder anchor: plus, d = Decoder anchor: plus],
        connects: [
    	    e.add_norm0.top -> d.multi_head_attention.bottom[3] shape: bow arrowheads: 2
    	],
        annotation.bottom: "Figure 1: The Transformer - model architecture.",
        annotation.fontFamily: "serif",
        annotation.gap: 0,
        annotation.fontSize: 19
    ]

}
page
show a`}
</SideBySide>

## Use Cases

Architectures are useful for:

- Deep learning architectures — show CNNs, Transformers, encoder-decoder models, and U-Nets
- Block-based models — reuse modules such as encoders, decoders, attention blocks, or classifiers
- Pipeline diagrams — represent data flow between processing stages
- Educational diagrams — explain model structure and information flow
