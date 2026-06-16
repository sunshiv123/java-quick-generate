# Java Quick Generate

A VS Code extension that automatically generates constructors, getters, and setters for Java classes — eliminating repetitive boilerplate code.

## The Problem

Writing getters, setters, and constructors by hand for every Java class field is repetitive and error-prone. Most IDEs like IntelliJ have this built in, but VS Code (a popular lightweight choice for Java development) doesn't, out of the box. This extension fills that gap.

## Features

- Scans the active Java file for field declarations (`private`, `public`, or `protected`)
- Automatically detects the class name
- Generates a constructor that initializes all fields
- Generates a getter and setter for each field, with correct capitalization
- Inserts the generated code directly into the class, right before the closing brace
- Works with any field type, including generics and arrays

## How It Works

The extension uses the VS Code Extension API to read the currently open document, then applies regex pattern matching to identify the class name and field declarations. It builds the constructor and accessor methods as a string, then uses the editor's edit API to insert the generated code at the correct location in the file.

## Installation (from source)

1. Clone this repository
2. Run `npm install`
3. Open the folder in VS Code
4. Press `F5` to launch an Extension Development Host window
5. Open any Java file with field declarations
6. Run the command `Java: Generate Getters, Setters & Constructor` from the Command Palette (`Ctrl+Shift+P`)

## Example

**Before:**
\`\`\`java
public class Student {
    private String name;
    private int age;
}
\`\`\`

**After running the command:**
\`\`\`java
public class Student {
    private String name;
    private int age;

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
\`\`\`

## Tech Stack

- TypeScript
- VS Code Extension API
- Node.js

## Future Improvements

- Generate `toString()`, `equals()`, and `hashCode()` methods
- Let the user select which fields to include via a quick-pick menu
- Publish to the VS Code Marketplace

## Author

Built by [Sunil](https://github.com/sunshiv123) as a learning project while studying Java and full-stack development.