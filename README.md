# HeredocForMarkdown

View local Markdown files in your browser that are written by the pseudo-heredoc of the comment of the function of Javascript.

## Usage

Load hd4md.js in the script tag of the HTML file.
Specify the Markdown parser (marked is used in the example) and the id of the div to be displayed in the HeredocForMarkdown parameter.
Specify the md file to be displayed by load. The extension is optional.
The variable name to which the HeredocForMarkdown object is assigned is arbitrary.

```
<script src="hd4md.js"></script>
<script>
const MD = new HeredocForMarkdown(marked.parse, "view");
MD.load("sample1");
</script>

<div id="view"></div>
```

## How to write md file

See template.md.
You need to put magic lines in the first and last lines.
These are the lines you need to treat as a pseudo-heredoc.
It is recommended to put a blank line between the magic line and the body text so that the body text can be displayed correctly even in the Markdown viewer.
The variable specified in the first line (MD in the example) is the variable assigned with the HeredocForMarkdown object.
The md file link is specified with a relative path from the link source file.

```
MD.set(()=>{/* // magic line

Write your heredoc here. Write '*\/' to escape the end of a comment.

*/}); // magic line
```

## Interfaces

### HeredocForMarkdown
```
HeredocForMarkdown(parser, targetid, display)
```
Call it with the new operator to create a HeredocForMarkdown object.
- For `parser`, specify a function that converts Markdown text to HTML. The example uses markd.parse.
- For `targetid`, specify the id of the element to display the converted HTML.
- Specify `display` if you want to change the process of displaying the converted HTML.
  If omitted, the HTML converted to the `targetid` element will be displayed and the link processing to the md file will be changed.

### load
```
MD.load(file)
```
Reads the specified md file.
- For `file`, specify the md file to read. The extension .md is optional.

### set
```
MD.set(fn)
```
Call it with a magic line in your md file.
- `fn` specifies pseudo-heredocs with function comments.

## Demo

See sample.html.
First, md/sample1.md is displayed, and md/sample2.md is displayed when you click the sample2 link.
Click sample11 to display md/folder1/sample11.md.
Click sample1 to display md/sample1.md.

