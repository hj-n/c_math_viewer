
import * as vscode from 'vscode';

/**
 * Get character (string) at given offset of document
 */
function get_char(document : vscode.TextDocument, offset : number) : string {
    return document.getText(new vscode.Range(document.positionAt(offset), document.positionAt(offset + 1)));
}


function find_function_paren_end(document : vscode.TextDocument, start_offset : number) : number {
    let stack : number = 0;
    let i : number = start_offset;

    for( ; ; i++) {
        let current : string = get_char(document, i);
        if(current == "(") {
            stack++;
        }
        else if(current == ")") {
            stack--;
            if(stack == 0) break;
        }
    }
    return (i + 1);
}



export function extract_function_string(document : vscode.TextDocument, position : vscode.Position) : string {
    const range = document.getWordRangeAtPosition(position);

    let offset : number;
    if(range?.end !== undefined)
        offset = document.offsetAt(range?.end);
    else
        return "";

    let is_function : boolean = false;

    let i : number = offset;
    for( ; ; i++) {
        let current : string = get_char(document, i);
        if(current != " " && current != "\n") {
            if(current == "(") {
                is_function = true;
                break;
            }
            else {
                break;
            }
        }
    }

    if(is_function) {
        let end_offset : number = find_function_paren_end(document, i);
        let result_range : vscode.Range = new vscode.Range(range.start, document.positionAt(end_offset));
        return document.getText(result_range);
    }
    else {
        return "";
    }

}