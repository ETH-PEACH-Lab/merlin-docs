---
sidebar_position: 1
---


# Getting Started with Merlin

Welcome to **Merlin**! Merlin is a language for visualizing data structures and algorithms interactively. The Merlin Editor is a project developed by the ETH PEACH Lab, designed to provide users more convenient experience for making algorithms visualizations, by extending and integrating the Mermaid diagramming tool into a graphical user interface (GUI). This integration facilitates the creation and visualization of data structures directly within the application using customized domain specific languages (DSL).

This guide will help you get started quickly.

## What is Merlin?

Merlin is a declarative language specifically for algorithm animations. It comes with code editor and a GUI to help you create you visualizations more quickly. 

The design of Merlin is informed by an analysis of 400 examples from an online coding platform, examining their structure, common elements, and creation processes. So, it's perfect for teaching, learning, and exploring algorithms!

### Features
- **Customized Domain Specific Language**: *Merlin* and *Merlin-Lite* are developed as DSL to serve for our project. They are easy-to-learn for any users with some programming background. They are also very extensible for customized usage, for instance, add a new pattern of data structure.
- **Mermaid-extension Plugin Integration**: Easily generate visualizations of data structure like array, graph etc., using the Mermaid-likewise extention and workflow.
- **GUI Focus**: The project is designed around improving the user experience with graphical interfaces for visulization rendering.
- **Open-Source**: The code is open-source and can be modified and extended to suit different needs.


## How It Works

- **Create pages** using `page` to show steps or slides or use the page controls.
- **Create objects and display them** using `show <obj>` your objects once and they'll show on all future pages (use `hide <obj>` to hide it again) or use the components menu.
- **Style your objects** with methods (e.g., `<obj>.setColor`, `<obj>.addNode`) or by clicking on a unit to edit it and double-clicking
on a component to edit multiple units at the same time.

For a full language reference, see [Language Reference](./language-reference.md).

## Your First Merlin Program


As your first Merlin diagram, we create a visualization of the Fibonnacci sequence.

Click the `Add Page` button at the top. This action will add a blank page. Next, click the new button at the top left. In the dropdown menu, select `Array` and then enter `1` when prompted for values. Alternatively, you can copy the code shown on the left. 

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={200}
  overrideSize={true}
>
{`
array array1 = {
  value: ["1"]
  color: [null]
  arrow: [null]
}


page
show array1
`}
</SideBySide>

The gives us the first page of our visualization. Now, we want to show the next step. Create another page by clicking the `Add Page` button again. On this page we want to add the next element. We can do this by clicking on the array element in the diagram and in the pop-up menu, clicking on the `Add Unit`. When prompted for a value, enter another `1`. That completes our second page. The code and GUI should now show the following.

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={200}
  overrideSize={true}
>
{`
array array1 = {
  value: ["1"]
  color: [null]
  arrow: [null]
}


page
show array1

page
array1.insertValue(1, "1")
`}
</SideBySide>

Now, we have reached the step of the Fibonnacci sequence where the next number is the addition of the two previous numbers. We create another page and add another elements. Scroll up if you don't remember how to do that. The output will be the following.
<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={200}
  overrideSize={true}
>
{`
array array1 = {
  value: ["1"]
  color: [null]
  arrow: [null]
}


page
show array1

page
array1.insertValue(1, "1")

page
array1.insertValue(2, "2")
`}
</SideBySide>

We want to add some additional information to our visualization to make it more clear. Click on the last element of the array and click on the `Add Arrow` button. Then, enter the text `1 + 1 = 2`. The output will now be as follows.

<SideBySide 
  language="merlin"
  bordered={true}
  diagramWidth={400}
  diagramHeight={200}
  overrideSize={true}
>
{`
array array1 = {
  value: ["1"]
  color: [null]
  arrow: [null]
}


page
show array1

page
array1.insertValue(1, "1")

page
array1.insertValue(2, "2")
array1.setArrow(2, "1 + 1 = 2")
`}
</SideBySide>

Congratulations! You have created a complete visualization. 


## Try it Online

You can use the [Merlin Editor](https://eth-peach-lab.github.io/merlin/) to write and run Merlin code instantly. Just copy any example below and click the <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{display: 'inline', verticalAlign: 'text-middle', marginRight: '4px'}}><path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707"/></svg>**Merlin Editor** button above a code block!


To learn more about the GUI, see [GUI Reference](./gui.md). <br />
For a full language reference, see [Language Reference](./language-reference.md).


