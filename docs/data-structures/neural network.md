---
sidebar_position: 9
---

# Neural Network

Neural networks describe multilayer perceptrons using layers, neurons, and visual styling options. They are useful for showing input layers, hidden layers, output layers, bias nodes, labels, weights, and connections.

| Property       | Type                   | Description                                                                                                                                                                                                                    | Example                                                  |
| -------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| layers         | `(string \| null)[]`   | Defines the layer names in a one-dimensional array. Each entry can be a `string` or `null`. Use `null` when a layer should have no visible label.                                                                              | layers: ["Input", "Hidden", null]                        |
| neurons        | `(string \| null)[][]` | Defines the neurons as a two-dimensional array. Each row represents one layer, and each entry represents one neuron label. Use a `string` to show text inside the neuron or `null` to create a neuron without a visible label. | neurons: [["x1", "x2"], ["h1", null], ["y"]]             |
| layerColors    | `(color \| null)[]`    | Defines the colors of the layers. Each entry corresponds to one layer and can be either a `color` or `null`. Use `null` to leave the layer uncolored.                                                                          | layerColors: ["#E4DCBD", null, "#E6C6C0"]                |
| neuronColors   | `(color \| null)[][]`  | Defines colors for individual neurons. Each row belongs to one layer, and each entry belongs to one neuron. Use `null` to leave the neuron uncolored.                                                                          | neuronColors: [["blue", null], ["green", null], ["red"]] |
| showBias       | `boolean`              | Controls whether bias nodes are shown. Use `true` to show bias nodes and `false` to hide them.                                                                                                                                 | showBias: true                                           |
| showLabels     | `boolean`              | Controls whether layer labels are shown.                                                                                                                                                                                       | showLabels: true                                         |
| labelPosition  | `top \| bottom`        | Defines where the layer labels appear. Use `top` for labels above the layers or `bottom` for labels below the layers.                                                                                                          | labelPosition: bottom                                    |
| showWeights    | `boolean`              | Controls whether connection weights are shown.                                                                                                                                                                                 | showWeights: true                                        |
| showArrowheads | `boolean`              | Controls whether the connections have arrowheads.                                                                                                                                                                              | showArrowheads: true                                     |
| edgeWidth      | `number`               | Defines the thickness of the connections. Higher values make the connections thicker.                                                                                                                                          | edgeWidth: 0                                             |
| edgeColor      | `color`                | Defines the color of all the connections.                                                                                                                                                                                      | edgeColor: "red"                                         |
| layerSpacing   | `number`               | Defines the horizontal distance between layers. Increase this value if the layers are too close together.                                                                                                                      | layerSpacing: 125                                        |
| neuronSpacing  | `number`               | Defines the vertical distance between neurons. Increase this value if neurons inside a layer are too close together.                                                                                                           | neuronSpacing: 125`                                      |
| layerStrokes   | `color[]`              | Defines the stroke colors of the layers. Each entry corresponds to one layer and can be either a `color` or `null`. Use `null` to leave the layer stroke uncolored.                                                            | layerStrokes: ["yellow", "blue", "black"]                |

## Complete Example

This example combines layers, neurons, layer colors, individual neuron colors, bias nodes, labels, weights, arrowheads, spacing, and layer strokes.

<SideBySide
language="merlin"
bordered={true}
diagramWidth={700}
diagramHeight={500}
overrideSize={true}

>

{`neuralnetwork nn = {
    layers: ["input layer", "hidden layer 1", "hidden layer 2", "output layer"]
    neurons: [[null, null, null], [null, null, null, null], [null, null, null, null], [null]]
    layerColors: ["#E4DCBD", "#C8E3F5", "#CEE7B2", "#E6C6C0"]
    neuronColors: [["blue"]]
    showBias: true
    showLabels: true
    labelPosition: bottom
    showWeights: true
    showArrowheads: true
    edgeWidth: 0.3
    edgeColor: "red"
    layerSpacing: 125
    neuronSpacing: 125
    layerStrokes: ["#666666", "#666666", "#666666", "#666666"]
}
page
show nn`}
</SideBySide>

## Methods

Neural networks support these methods for manipulation.

### Text Positioning Methods

- `setText(text, position)` - Set or remove text at specific positions (`"above"`, `"below"`, `"left"`, `"right"`)

### Single Element Methods

- `setLayer(layerIndex, label)` - Set the label of a specific layer. `layerIndex` must be a `number`. `label` can be a `string` or `null`.
- `setLayerColor(layerIndex, color)` - Set the color of a specific layer. `layerIndex` must be a `number`. `color` can be a `string` or `null`.
- `setNeuron(layerIndex, neuronIndex, label)` - Set the label inside a specific neuron. `layerIndex` and `neuronIndex` must be numbers. `label` can be a `string` or `null`.
- `setNeuronColor(layerIndex, neuronIndex, color)` - Set the color of a specific neuron. `layerIndex` and `neuronIndex` must be numbers. `color` can be a `string` or `null`.

### Multiple Element Methods

- `setLayers([...])` - Set multiple layer labels. Each entry can be a `string`, `null`, or `_` to keep the existing label.
- `setLayerColors([...])` - Set multiple layer colors. Each entry can be a `string`, `null`, or `_` to keep the existing color.
- `setNeurons([[...], ...])` - Set multiple neuron labels. Each entry can be a `string`, `null`, or `_` to keep the existing label.
- `setNeuronColors([[...], ...])` - Set multiple neuron colors. Each entry can be a `string`, `null`, or `_` to keep the existing color.

### Structural Methods

- `addLayer(layerName, [neurons])` - Add a new layer with neurons. `layerName` can be a `string` or `null`. Each neuron can be a `string` or `null`.
- `addNeurons(layerIndex, [neurons])` - Add neurons to the end of a specific layer. `layerIndex` must be a `number`. Each neuron can be a `string` or `null`.
- `removeLayerAt(layerIndex)` - Remove the layer at a specific index. `layerIndex` must be a `number`.
- `removeNeuronsFromLayer(layerIndex, [neurons])` - Remove specific neurons from a layer. `layerIndex` must be a `number`. Each neuron can be a `string` or `null`.

## Use Cases

Neural networks are useful for:

- MLP diagrams — show input, hidden, and output layers
- Educational diagrams — explain neurons, layers, weights, and bias nodes
- Model structure — visualize the size and depth of a network
- Forward-pass explanations — show how information flows through layers
