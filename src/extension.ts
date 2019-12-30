// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log("c file opened!!");	

	vscode.languages.registerHoverProvider('c', {
		provideHover(document, position, token) {
			const range = document.getWordRangeAtPosition(position);
			const word : string = document.getText(range);
			
			return new vscode.Hover(word);
				
		}
	});
}



// this method is called when your extension is deactivated
export function deactivate() {}
