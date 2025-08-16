---
sidebar_position: 1
---


# Getting Started with Merlin

Welcome to **Merlin**! Merlin is a language for visualizing data structures and algorithms interactively. This guide will help you get started quickly.

## What is Merlin?

Merlin lets you define arrays, matrices, graphs, trees and more, and visualize their transformations step by step. It's perfect for teaching, learning, and exploring algorithms.

## Try it Online

You can use the [Merlin Editor](https://eth-peach-lab.github.io/merlin/) to write and run Merlin code instantly. Just copy any example below and click the <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{display: 'inline', verticalAlign: 'text-middle', marginRight: '4px'}}><path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707"/></svg>**Merlin Editor** button above a code block!

## Your First Merlin Program

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={250}
  overrideSize={true}
>
{`
array numbers = {
    value: [1, 2, 3, 4, 5]
    color: [null, "blue", null, null, null]
}

page
show numbers
`}
</SideBySide>

Click the <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{display: 'inline', verticalAlign: 'text-middle', marginRight: '4px'}}><path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707"/></svg>**Merlin Editor** button above to try this code in the *interactive playground*!

## How It Works

- **Create pages** using `page` to show steps or slides or use the page controls.
- **Create objects and display them** using `show <obj>` your objects once and they'll show on all future pages (use `hide <obj>` to hide it again) or use the components menu.
- **Style your objects** with methods (e.g., `<obj>.setColor`, `<obj>.addNode`) or by clicking on a unit to edit it and double-clicking
on a component to edit multiple units at the same time.

For a full language reference, see [Language Reference](./language-reference.md).
