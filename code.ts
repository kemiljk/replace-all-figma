figma.showUI(__html__, { width: 300, height: 240 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "find-and-replace-text") {
    if (figma.editorType === "figma") {
      const selectedNodes = figma.currentPage.selection;
      const selectedTextNodes = selectedNodes.filter(
        (node) => node.type === "TEXT" && node.characters === msg.findText
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
        for (n of textNodesOnPage) {
          if (n.type === "TEXT") {
            await figma.loadFontAsync(n.fontName as FontName);
            n.characters = n.characters.replaceAll(
              msg.findText,
              msg.replaceText
            );
          }
        }
      };
      replaceText(textNodesOnPage && figma.notify("Done ✔"));
    } else if (figma.editorType === "figjam") {
      const nodes = figma.currentPage.findAll();
      nodes.forEach(async (node) => {
        if (node.type === "SHAPE_WITH_TEXT" || node.type === "STICKY") {
          await figma.loadFontAsync(node.text.fontName as FontName);
          node.text.characters = node.text.characters.replaceAll(
            msg.findText,
            msg.replaceText
          );
        }
        if (node.type === "TEXT") {
          await figma.loadFontAsync(node.fontName as FontName);
          node.characters = node.characters.replaceAll(
            msg.findText,
            msg.replaceText
          );
        }
      });
    }
  }
  if (msg.checkboxOn === true) {
    setTimeout(figma.closePlugin, 500);
  }
};
