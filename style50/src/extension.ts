import * as vscode from 'vscode';
import { execFileSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
const glob = require('glob');

export function activate(context: vscode.ExtensionContext) {
  // 📌 Format current file
  let formatFile = vscode.commands.registerCommand('style50.formatFile', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No file is open.');
      return;
    }

    const filePath = editor.document.uri.fsPath;
    const ext = path.extname(filePath);
    if (ext !== '.py' && ext !== '.c') {
      vscode.window.showWarningMessage('Only .py and .c files are supported.');
      return;
    }

    const scriptPath = path.join(context.extensionPath, 'style50.py');

    try {
      execFileSync('python3', [scriptPath, filePath]);
      vscode.window.showInformationMessage(`✅ Style50 formatted: ${path.basename(filePath)}`);
    } catch (error: any) {
      vscode.window.showErrorMessage(`❌ Style50 failed: ${error.message}`);
    }
  });

  context.subscriptions.push(formatFile);

  // 📌 Format on save
  vscode.languages.registerDocumentFormattingEditProvider(['python', 'c'], {
    provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
      const config = vscode.workspace.getConfiguration('style50');
      if (!config.get('enableFormatOnSave')) {
        return [];
      }

      const filePath = document.uri.fsPath;
      const scriptPath = path.join(context.extensionPath, 'style50.py');

      try {
        execFileSync('python3', [scriptPath, filePath]);
      } catch (error: any) {
        vscode.window.showErrorMessage(`Style50 format failed: ${error.message}`);
        return [];
      }

      const newText = fs.readFileSync(filePath, 'utf8');
      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(document.getText().length)
      );

      return [vscode.TextEdit.replace(fullRange, newText)];
    }
  });

  // 📌 Format entire workspace
  let formatWorkspace = vscode.commands.registerCommand('style50.formatWorkspace', async () => {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders) {
      vscode.window.showErrorMessage('No workspace folder open.');
      return;
    }

    const folderPath = folders[0].uri.fsPath;
    const scriptPath = path.join(context.extensionPath, 'style50.py');

    const allFiles: string[] = glob.sync(`${folderPath}/**/*.{py,c}`);

    if (allFiles.length === 0) {
      vscode.window.showInformationMessage('No .py or .c files found in workspace.');
      return;
    }

    vscode.window.showInformationMessage(`Formatting ${allFiles.length} files...`);

    allFiles.forEach((file) => {
      try {
        execFileSync('python3', [scriptPath, file]);
      } catch (error: any) {
        vscode.window.showWarningMessage(`⚠️ Failed to format ${file}: ${error.message}`);
      }
    });

    vscode.window.showInformationMessage('✅ Style50 formatting complete.');
  });

  context.subscriptions.push(formatWorkspace);
}

export function deactivate() {}
