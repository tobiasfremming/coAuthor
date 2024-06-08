'use strict';

import * as vscode from 'vscode';
import * as Git from '.@types/git';



export class CoAuthor {
    private _statusBarItem: vscode.StatusBarItem;
    private _gitAPI: Git.API;
    private _config = vscode.workspace.getConfiguration('glcm');

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