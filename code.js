var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
figma.showUI(__html__, { width: 300, height: 460 });
figma.on("selectionchange", function () {
    if (figma.currentPage.selection.length === 1) {
        var inputCharacters = figma.currentPage.selection[0]
            .characters;
        figma.ui.postMessage({ inputCharacters: inputCharacters });
    }
});
figma.ui.onmessage = function (msg) {
    if (figma.currentPage.selection.length === 1 &&
        msg.type === "find-and-replace-text") {
        if (figma.editorType === "figma") {
            var nodes = figma.currentPage.findAll();
            nodes.forEach(function (node) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(node.type === "TEXT")) return [3 /*break*/, 2];
                            return [4 /*yield*/, figma.loadFontAsync(node.fontName)];
                        case 1:
                            _a.sent();
                            node.characters = node.characters.replaceAll(msg.findText, msg.replaceText);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
            figma.notify("Done ✅");
        }
    }
    if (figma.currentPage.selection.length >= 1 && msg.type === "replace-text") {
        if (figma.editorType === "figma") {
            figma.currentPage.selection.forEach(function (node) { return __awaiter(_this, void 0, void 0, function () {
                var _i, _a, child;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(node.type === "TEXT")) return [3 /*break*/, 2];
                            return [4 /*yield*/, figma.loadFontAsync(node.fontName)];
                        case 1:
                            _b.sent();
                            node.characters = node.characters.replaceAll(msg.findText, msg.replaceText);
                            _b.label = 2;
                        case 2:
                            if (!(node.type === "COMPONENT" ||
                                node.type === "INSTANCE" ||
                                node.type === "FRAME" ||
                                node.type === "GROUP")) return [3 /*break*/, 6];
                            _i = 0, _a = node.children;
                            _b.label = 3;
                        case 3:
                            if (!(_i < _a.length)) return [3 /*break*/, 6];
                            child = _a[_i];
                            if (!(child.type === "TEXT")) return [3 /*break*/, 5];
                            return [4 /*yield*/, figma.loadFontAsync(child.fontName)];
                        case 4:
                            _b.sent();
                            child.characters = child.characters.replaceAll(msg.findText, msg.replaceText);
                            _b.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
            figma.notify("Done ✅");
        }
        if (figma.editorType === "figjam") {
            figma.currentPage.selection.forEach(function (node) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(node.type === "SHAPE_WITH_TEXT" || node.type === "STICKY")) return [3 /*break*/, 2];
                            return [4 /*yield*/, figma.loadFontAsync(node.text.fontName)];
                        case 1:
                            _a.sent();
                            node.text.characters = node.text.characters.replaceAll(msg.findText, msg.replaceText);
                            _a.label = 2;
                        case 2:
                            if (!(node.type === "TEXT")) return [3 /*break*/, 4];
                            return [4 /*yield*/, figma.loadFontAsync(node.fontName)];
                        case 3:
                            _a.sent();
                            node.characters = node.characters.replaceAll(msg.findText, msg.replaceText);
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            figma.notify("Done ✅");
        }
    }
    if (figma.currentPage.selection.length === 0 &&
        msg.type === "find-and-replace-text") {
        if (figma.editorType === "figma") {
            var nodes = figma.currentPage.findAll();
            nodes.forEach(function (node) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(node.type === "TEXT")) return [3 /*break*/, 2];
                            return [4 /*yield*/, figma.loadFontAsync(node.fontName)];
                        case 1:
                            _a.sent();
                            node.characters = node.characters.replaceAll(msg.findText, msg.replaceText);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
            figma.notify("Done ✅");
        }
        if (figma.editorType === "figjam") {
            var nodes = figma.currentPage.findAll();
            nodes.forEach(function (node) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(node.type === "SHAPE_WITH_TEXT" || node.type === "STICKY")) return [3 /*break*/, 2];
                            return [4 /*yield*/, figma.loadFontAsync(node.text.fontName)];
                        case 1:
                            _a.sent();
                            node.text.characters = node.text.characters.replaceAll(msg.findText, msg.replaceText);
                            _a.label = 2;
                        case 2:
                            if (!(node.type === "TEXT")) return [3 /*break*/, 4];
                            return [4 /*yield*/, figma.loadFontAsync(node.fontName)];
                        case 3:
                            _a.sent();
                            node.characters = node.characters.replaceAll(msg.findText, msg.replaceText);
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            figma.notify("Done ✅");
        }
    }
    if (msg.type === "insert-before" && figma.currentPage.selection.length >= 1) {
        var selection = figma.currentPage.selection;
        selection.forEach(function (node) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, figma.loadFontAsync(node.fontName)];
                    case 1:
                        _a.sent();
                        node.insertCharacters(0, msg.insertText);
                        return [2 /*return*/];
                }
            });
        }); });
    }
    if (msg.type === "insert-after" && figma.currentPage.selection.length >= 1) {
        var selection = figma.currentPage.selection;
        selection.forEach(function (node) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, figma.loadFontAsync(node.fontName)];
                    case 1:
                        _a.sent();
                        node.insertCharacters(node.characters.length, msg.insertText);
                        return [2 /*return*/];
                }
            });
        }); });
    }
    if (msg.checkboxOn === true) {
        setTimeout(figma.closePlugin, 500);
    }
};
