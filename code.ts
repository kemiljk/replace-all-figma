figma.showUI(__html__, { width: 300, height: 460 });

figma.on("selectionchange", () => {
  if (figma.currentPage.selection.length === 1) {
    let inputCharacters = (figma.currentPage.selection[0] as TextNode)
      .characters;
    figma.ui.postMessage({ inputCharacters: inputCharacters });
  }
});

figma.ui.onmessage = (msg) => {
  if (
    figma.currentPage.selection.length === 1 &&
    msg.type === "find-and-replace-text"
  ) {
    if (figma.editorType === "figma") {
      const nodes = figma.currentPage.findAll();
      nodes.forEach(async (node) => {
        if (node.type === "TEXT" && node.characters === msg.findText) {
          await figma.loadFontAsync(node.fontName as FontName);
          node.characters = node.characters.replaceAll(
            msg.findText,
            msg.replaceText
          );
        }
      });
      figma.notify("Done ✅");
    }
  }
  if (figma.currentPage.selection.length >= 1 && msg.type === "replace-text") {
    if (figma.editorType === "figma") {
      figma.currentPage.selection.forEach(async (node: any) => {
        if (node.type === "TEXT") {
          await figma.loadFontAsync(node.fontName as FontName);
          node.characters = node.characters.replaceAll(
            msg.findText,
            msg.replaceText
          );
        }
        if (
          node.type === "COMPONENT" ||
          node.type === "INSTANCE" ||
          node.type === "FRAME" ||
          node.type === "GROUP"
        ) {
          for (let child of node.children) {
            if (child.type === "TEXT") {
              await figma.loadFontAsync(child.fontName as FontName);
              child.characters = child.characters.replaceAll(
                msg.findText,
                msg.replaceText
              );
            }
          }
        }
      });
      figma.notify("Done ✅");
    }
    if (figma.editorType === "figjam") {
      figma.currentPage.selection.forEach(
        async (node: ShapeWithTextNode | StickyNode | TextNode) => {
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
        }
      );
      figma.notify("Done ✅");
    }
  }
  if (
    figma.currentPage.selection.length === 0 &&
    msg.type === "find-and-replace-text"
  ) {
    if (figma.editorType === "figma") {
      const nodes = figma.currentPage.findAll();
      nodes.forEach(async (node) => {
        if (node.type === "TEXT") {
          await figma.loadFontAsync(node.fontName as FontName);
          node.characters = node.characters.replaceAll(
            msg.findText,
            msg.replaceText
          );
        }
      });
      figma.notify("Done ✅");
    }
    if (figma.editorType === "figjam") {
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
      figma.notify("Done ✅");
    }
  }
  if (msg.type === "insert-before" && figma.currentPage.selection.length >= 1) {
    const { selection } = figma.currentPage;
    selection.forEach(async (node: TextNode) => {
      await figma.loadFontAsync(node.fontName as FontName);
      node.insertCharacters(0, msg.insertText);
    });
  }

  if (msg.type === "insert-after" && figma.currentPage.selection.length >= 1) {
    const { selection } = figma.currentPage;
    selection.forEach(async (node: TextNode) => {
      await figma.loadFontAsync(node.fontName as FontName);
      node.insertCharacters(node.characters.length, msg.insertText);
    });
  }

  if (msg.checkboxOn === true) {
    setTimeout(figma.closePlugin, 500);
  }
};
