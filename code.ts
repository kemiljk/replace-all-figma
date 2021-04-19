figma.showUI(__html__, { width: 300, height: 260 });

figma.ui.onmessage = (msg) => {
  let textCharacters: String;
  const { selection } = figma.currentPage;

  const replaceText = async () => {
    figma.root.children.flatMap((pageNode) =>
      pageNode.selection.forEach(async (node) => {
        if (selection.length >= 1 && node.type === "TEXT") {
          await figma.loadFontAsync(node.fontName as FontName);
          node.deleteCharacters(0, node.characters.length);
          msg.text === ""
            ? node.insertCharacters(0, "Placeholder")
            : node.insertCharacters(0, msg.text);
        }
      })
    );
  };

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
    const findText = figma.currentPage.findAll(
      (node) => node.type === "TEXT" && node.characters === msg.findText
    );
    figma.currentPage.selection = findText;

    if (selection.length === 1) {
      findTextByCharacters();
    }

    const getTextSelection = findText;
    figma.currentPage.selection = getTextSelection;

    figma.root.children.flatMap((pageNode) =>
      pageNode.selection.forEach(async (node) => {
        if (node.type === "TEXT") {
          await figma.loadFontAsync(node.fontName as FontName);
          textCharacters = node.characters;
          node.deleteCharacters(0, node.characters.length);
          msg.text === ""
            ? node.insertCharacters(0, "Placeholder")
            : node.insertCharacters(0, msg.text);
        }
      })
    );
    figma.notify(`${getTextSelection.length} "${textCharacters}'s" updated`);
  }
};
