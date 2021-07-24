figma.showUI(__html__, { width: 300, height: 240 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "find-and-replace-text") {
    const selectedNodes = figma.currentPage.selection;
    const selectedTextNodes = selectedNodes.filter(
      (node) => node.type === "TEXT"
    );
    const textNodesOnPage = figma.currentPage.findAll(
      (node) => node.type === "TEXT"
    );

    if (selectedNodes.length >= 1 && selectedTextNodes.length === 0) {
      figma.notify("Woah there, none of this is text... ‼");
      return;
    }

    if (textNodesOnPage.length === 0) {
      figma.notify("There's no text here... ∅");
      return;
    }

    const replaceText = async (n) => {
      figma.currentPage.selection = textNodesOnPage;
      for (n of textNodesOnPage) {
        if (n.type === "TEXT") {
          await figma.loadFontAsync(n.fontName as FontName);
          n.characters = n.characters.replaceAll(msg.findText, msg.replaceText);
        }
      }
    };
    replaceText(textNodesOnPage);

    figma.notify("Done ✔");
  }
  if (msg.checkboxOn === true) {
    setTimeout(figma.closePlugin, 500);
  }
};
