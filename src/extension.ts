// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { resolve_pattern } from "./resolve_string";
import { Formula } from './math_formula/formula';
import { extract_function_string } from './extract_string';
import { Var } from './math_formula/variable';
import { generate_formula_visitor } from './gen_formula_visitor';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	vscode.languages.registerHoverProvider('c', {
		provideHover(document: vscode.TextDocument, position: vscode.Position, token: any) {
			const sig_range = document.getWordRangeAtPosition(position);
			const signature = document.getText(sig_range);
			const pattern = extract_function_string(document, position);
			if(pattern == "") {
				return new vscode.Hover("");
			}	
			else {
				let formula : Formula = resolve_pattern(pattern);
				if (formula instanceof Var){
					return new vscode.Hover("");
				}
				else{
					return new vscode.Hover(new vscode.MarkdownString( "## " + formula.accept(new generate_formula_visitor())));
				}
			}
		}
	});
	vscode.languages.registerHoverProvider('cpp', {
		provideHover(document: vscode.TextDocument, position: vscode.Position, token: any) {
			const sig_range = document.getWordRangeAtPosition(position);
			const signature = document.getText(sig_range);
			const pattern = extract_function_string(document, position);
			if(pattern == "") {
				return new vscode.Hover("");
			}	
			else {
				let formula : Formula = resolve_pattern(pattern);
				if (formula instanceof Var){
					return new vscode.Hover("");
				}
				else{
					return new vscode.Hover(new vscode.MarkdownString( "## " + formula.accept(new generate_formula_visitor())));
				}
			}
		}
	});
}

	

// this method is called when your extension is deactivated
export function deactivate() {}
