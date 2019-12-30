// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { resolve_pattern } from "./resolve_string";
import { Formula } from './math_formula/formula';
import { resolvePtr } from 'dns';
import { Pattern } from './math_formula/pattern';



function temp_testing() {
	console.log("===================");
	resolve_pattern("sss(aaa, sss)");
	resolve_pattern("s + v");
	resolve_pattern("ssss(Sss, ssd) + aaA");
	resolve_pattern("(abc + abc)");
	resolve_pattern("sasas");
	resolve_pattern("____");
	resolve_pattern("asd(ss(xxx + ssd), sss + dd(ss, dd_d))");
	resolve_pattern("ss(xxx + ssd) / dd(ss, dd_d)");
	resolve_pattern("(ss(xxx + ssd) / dd(ss, dd_d))");
	resolve_pattern("(sss(sdds)) + cc(sds, asd)")
	console.log("===================");

	let temp : string = "ssss + ssdd";
	console.log(temp);
	console.log(temp.slice(0, 5).trim());
	console.log(temp.slice(0, 5).trim().length);
	console.log(temp.slice(6).trim());


	console.log("==================");
	return;
}


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log("c file opened!!");	

	// Temporary testing. Will be deleted when releasing
	temp_testing();

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
