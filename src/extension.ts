import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('java-quick-generate.generate', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('Open a Java file first.');
			return;
		}

		const document = editor.document;
		const text = document.getText();

		const classMatch = text.match(/class\s+(\w+)/);
		if (!classMatch) {
			vscode.window.showErrorMessage('No class found in this file.');
			return;
		}
		const className = classMatch[1];

		const fieldRegex = /(?:private|public|protected)\s+(?:static\s+)?(?:final\s+)?([\w<>\[\]]+)\s+(\w+)\s*;/g;
		const fields: { type: string; name: string }[] = [];
		let match;
		while ((match = fieldRegex.exec(text)) !== null) {
			fields.push({ type: match[1], name: match[2] });
		}

		if (fields.length === 0) {
			vscode.window.showWarningMessage('No fields found to generate getters/setters for.');
			return;
		}

		let generated = '\n';

		const params = fields.map(f => `${f.type} ${f.name}`).join(', ');
		generated += `\tpublic ${className}(${params}) {\n`;
		fields.forEach(f => {
			generated += `\t\tthis.${f.name} = ${f.name};\n`;
		});
		generated += `\t}\n\n`;

		fields.forEach(f => {
			const cap = f.name.charAt(0).toUpperCase() + f.name.slice(1);
			generated += `\tpublic ${f.type} get${cap}() {\n`;
			generated += `\t\treturn ${f.name};\n`;
			generated += `\t}\n\n`;

			generated += `\tpublic void set${cap}(${f.type} ${f.name}) {\n`;
			generated += `\t\tthis.${f.name} = ${f.name};\n`;
			generated += `\t}\n\n`;
		});

		const lastBraceIndex = text.lastIndexOf('}');
		const insertPosition = document.positionAt(lastBraceIndex);

		editor.edit(editBuilder => {
			editBuilder.insert(insertPosition, generated);
		}).then(success => {
			if (success) {
				vscode.window.showInformationMessage('Getters, setters, and constructor generated!');
			}
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}