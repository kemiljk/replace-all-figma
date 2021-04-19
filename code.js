var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 300, height: 260 });
figma.ui.onmessage = (msg) => {
    let textCharacters;
    const { selection } = figma.currentPage;
    const replaceText = () => __awaiter(this, void 0, void 0, function* () {
        figma.root.children.flatMap((pageNode) => pageNode.selection.forEach((node) => __awaiter(this, void 0, void 0, function* () {
            if (selection.length >= 1 && node.type === "TEXT") {
                yield figma.loadFontAsync(node.fontName);
                node.deleteCharacters(0, node.characters.length);
                msg.text === ""
                    ? node.insertCharacters(0, "Placeholder")
                    : node.insertCharacters(0, msg.text);
            }
        })));
    });
    function findTextByCharacters() {
        const { selection } = figma.currentPage;
        if (selection[0].type === "TEXT") {
            textCharacters = selection[0].characters;
            console.log(textCharacters + " " + "In selection function");
        }
    }
    if (msg.type === "replace-text") {
        replaceText();
    }
    if (msg.type === "find-and-replace-text") {
        const findText = figma.currentPage.findAll((node) => node.type === "TEXT" && node.characters === msg.findText);
        figma.currentPage.selection = findText;
        if (selection.length === 1) {
            findTextByCharacters();
        }
        const getTextSelection = findText;
        figma.currentPage.selection = getTextSelection;
        figma.root.children.flatMap((pageNode) => pageNode.selection.forEach((node) => __awaiter(this, void 0, void 0, function* () {
            if (node.type === "TEXT") {
                yield figma.loadFontAsync(node.fontName);
                textCharacters = node.characters;
                node.deleteCharacters(0, node.characters.length);
                msg.text === ""
                    ? node.insertCharacters(0, "Placeholder")
                    : node.insertCharacters(0, msg.text);
            }
        })));
        figma.notify(`${getTextSelection.length} "${textCharacters}'s" updated`);
    }
};
