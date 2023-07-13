"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const path = require("path");
function activate(context) {
    // Event when a text file is opened
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(async (doc) => {
        // if not a text file, return
        if (doc.languageId !== 'plaintext') {
            return;
        }
        // get the corresponding image file path
        const baseName = path.basename(doc.fileName, '.txt');
        const dirName = path.dirname(doc.fileName);
        const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
        let imagePath = '';
        for (const ext of imageExtensions) {
            const tempPath = path.join(dirName, `${baseName}.${ext}`);
            try {
                const stat = await vscode.workspace.fs.stat(vscode.Uri.file(tempPath));
                if (stat.type === vscode.FileType.File) {
                    imagePath = tempPath;
                    break;
                }
            }
            catch (error) {
                // ignore error
            }
        }
        // if no corresponding image file found, return
        if (!imagePath) {
            return;
        }
        // open the corresponding image file in a new column (assuming that the image file exists)
        vscode.commands.executeCommand('vscode.open', vscode.Uri.file(imagePath), vscode.ViewColumn.Two);
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map