'use strict';

import * as vscode from 'vscode';
import * as Git from '.@types/git';



export class CoAuthor {
    _statusBarItem: vscode.StatusBarItem;
    _gitAPI: Git.API;
    _config = vscode.workspace.getConfiguration('glcm');

    public optional = (value: any) => {
        if (value) {
            return value;
        }
        return undefined;
    };

    constructor (context: vscode.ExtensionContext){
        this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this._gitAPI = this.optional(vscode.extensions.getExtension('vscode.git')).exports.getAPI(1);      
        vscode.workspace.onDidChangeConfiguration(() => {
            this._config = vscode.workspace.getConfiguration('glcm');
        });
    }

    private setCommitMessageToTextBox(rep: Git.Repository, message: string) {
        const isAlreadyTextInInputBox = rep.inputBox.value && rep.inputBox.value.length > 0;
        if (!isAlreadyTextInInputBox || this._config.rewriteAlreadyTypedGitMessage) {
            rep.inputBox.value = message;
        } else {
            // Append the new commit message to the existing text
            rep.inputBox.value += `\n${message}`;
        }
    }



    

    public updateStatusBarItem(): void {
        if (!this._statusBarItem) {
            this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        }

        this._statusBarItem.text = `$(person) $(person)`;
        this._statusBarItem.show();
    }

    public dispose() {
        this._statusBarItem.dispose();
    }
}