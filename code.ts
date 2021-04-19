figma.showUI(__html__, { width: 300, height: 130 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "replace-text") {
    const replaceText = async () => {
      const { selection } = figma.currentPage;
      figma.root.children.flatMap((pageNode) =>
        pageNode.selection.forEach(async (node) => {
          if (selection.length >= 1 && node.type === "TEXT") {
            await figma.loadFontAsync(node.fontName as FontName);
            node.deleteCharacters(0, node.characters.length);
            node.insertCharacters(0, msg.text);
          }
        })
      );
    };
    replaceText();
  }
};
