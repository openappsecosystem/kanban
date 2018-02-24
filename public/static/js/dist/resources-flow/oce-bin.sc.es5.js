/*! Built with http://stenciljs.com */
ResourcesFlow.loadComponents(function (exports, h, Context) {
    "use strict";
    Object.defineProperty(exports, '__esModule', { value: true });
    var Bin = /** @class */ (function () {
        function Bin() {
        }
        Bin.prototype.render = function () {
            return (h("div", { class: 'list_wrapper' }, h("div", { class: 'list' }, h("div", { class: 'list_header' }, h("h1", { class: 'header_title' }, this.title), this.note
                ? h("p", { class: 'header_desc' }, this.note)
                : '', h("div", { class: 'header_infos' }, this.due
                ? h("div", { class: 'header_due' }, h("span", { class: 'due_item' }, "Due ", this.due))
                : '')), h("div", { class: 'list_cards' }, h("h2", null, "Commitments (", this.cards.length, ")"), this.cards
                ? this.cards.map(function (card) { return h("oce-card", { members: card.members, due: card.due, note: card.note || card.title, action: function () { console.log('hello'); } }); }) : ''), this.outputs.length !== 0
                ? h("oce-output", { outputs: this.outputs })
                : '')));
        };
        Object.defineProperty(Bin, "is", {
            get: function () { return "oce-bin"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bin, "encapsulation", {
            get: function () { return "shadow"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bin, "properties", {
            get: function () { return { "cards": { "type": "Any" }, "due": { "type": String, "attr": "due" }, "note": { "type": String, "attr": "note" }, "outputs": { "type": "Any" }, "title": { "type": String, "attr": "title" } }; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bin, "style", {
            get: function () { return ".list_wrapper[data-oce-bin] {\n  width: 300px;\n  margin-right: 10px;\n  height: 100%;\n  box-sizing: border-box;\n  display: inline-block;\n  vertical-align: top;\n  white-space: nowrap;\n}\n\n\n.list[data-oce-bin] {\n  background: #E2E4E6;\n  border-radius: 3px;\n  box-sizing: border-box;\n  display: flex;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  max-height: 100%;\n  position: relative;\n  white-space: normal;\n  box-shadow: 0 1px 1px rgba(23,43,77,0.2), 0 0 0.5px 0 rgba(23,43,77,0.25);\n  transition: all 0.3s cubic-bezier(0.15, 1, 0.33, 1);\n  -webkit-transition: all 0.3s cubic-bezier(0.15, 1, 0.33, 1);\n}\n\nh2[data-oce-bin] {\n  font-weight: 500;\n  font-size: 14px;\n  letter-spacing: .5;\n}\n\n\n.list_header[data-oce-bin] {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 auto;\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto;\n  padding: 8px 10px;\n  position: relative;\n  min-height: 18px;\n}\n\n\n.header_title[data-oce-bin] {\n  font-size: 16px;\n  text-align: left;\n  font-weight: 500;\n  \n  margin: 0;\n  margin-top: 5px;\n  text-transform: capitalize;\n  letter-spacing: .5px;\n}\n\n.header_desc[data-oce-bin] {\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 20px;\n  margin-top: 5px;\n}\n\n.header_due[data-oce-bin] {\n  float: left;\n  height: 24px;\n  line-height: 24px;\n  margin-left: 0px;\n  background: #c7c7c7;\n  border-radius: 3px;\n  padding: 0 10px;\n}\n  .header_due[data-oce-bin]   .due_item[data-oce-bin] {\n      line-height: 24px;\n      font-size: 13px;\n      text-decoration: underline;\n      font-weight: 500;\n      color: #444444;\n    }\n\n.header_members[data-oce-bin] {\n  float: left;\n  width: 24px;\n  height: 24px;\n  border-radius: 3px;\n  margin-right: 5px;\n\n}\n.members_item[data-oce-bin] {\n  width: 24px;\n  height: 24px;\n  border-radius: 3px;\n  background: #c7c7c7;\n  display: block;\n}\n\n.members_item[data-oce-bin]   .item_photo[data-oce-bin] {\n  width: 24px;\n  height: 24px;\n  border-radius: 3px;\n}\n.header_setName[data-oce-bin] {\nbackground: 0 0;\nborder: none;\nborder-radius: 3px;\nbox-shadow: none;\nfont-weight: 700;\nmargin: -3px -5px;\nheight: 18px;\nmin-height: 18px;\npadding: 3px 5px;\nresize: none;\nmax-height: 16pc;\noverflow: hidden;\nword-wrap: break-word;\nheight: 24px;\n}\n.header_setName.isEditing[data-oce-bin] {\nbackground: rgba(255,255,255,.8)\n}\n\n.list_cards[data-oce-bin] {\n-webkit-flex: 1 1 auto;\n-ms-flex: 1 1 auto;\nflex: 1 1 auto;\noverflow-y: auto;\nmargin: 0 4px;\npadding: 0 4px;\nz-index: 1;\nmin-height: 0;\n-webkit-box-flex: 1;\noverflow-x: hidden;\n}"; },
            enumerable: true,
            configurable: true
        });
        return Bin;
    }());
    var Card = /** @class */ (function () {
        function Card() {
        }
        Card.prototype.render = function () {
            return (h("div", { onClick: this.action, class: "card" }, h("span", { class: "card_title" }, this.note), h("div", { class: "card_infos" }, h("h4", { class: "infos_due" }, "Due to ", this.due), h("div", { class: "infos_members" }, this.members.map(function (member) { return (h("span", { class: "members_item" }, h("img", { class: "item_photo", src: member.image }))); })))));
        };
        Object.defineProperty(Card, "is", {
            get: function () { return "oce-card"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Card, "encapsulation", {
            get: function () { return "shadow"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Card, "properties", {
            get: function () { return { "action": { "type": "Any", "attr": "action" }, "due": { "type": String, "attr": "due" }, "members": { "type": "Any" }, "note": { "type": String, "attr": "note" } }; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Card, "style", {
            get: function () { return ".card[data-oce-card] {\n  background: white;\n  border-bottom: 1px solid #ccc;\n  border-radius: 3px;\n  overflow: hidden;\n  position: relative;\n  z-index: 10;\n  display: block;\n  // display: -webkit-flex;\n  // display: -ms-flexbox;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  cursor: pointer;\n  margin-bottom: 6px;\n  max-width: 300px;\n  min-height: 20px;\n  position: relative;\n  z-index: 0;\n  padding: 10px;\n}\n\n.card[data-oce-card]:hover {\nbackground: #EDEFF0;\nborder-bottom-color: #d6dacc;\n}\n\n.card.dragged[data-oce-card] {\nopacity: .5;\ncursor: move;\n}\n\n.card_title[data-oce-card] {\n  font-size: 14px;\n  line-height: 20px;\n  clear: both;\n  font-weight: 400;\n  margin: 0 0 4px;\n  overflow: hidden;\n  word-wrap: break-word;\n  color: #4d4d4d;\n}\n\n.card_infos[data-oce-card]{\nmargin-top: 10px;\n}\n\n.card_infos[data-oce-card]   .infos_due[data-oce-card]{\ncolor: #ADADAD;\nfont-weight: 500;\nfont-size: 12px;\nletter-spacing: 1px;\nmargin: 0;\nfloat: left;\nheight: 20px;\nline-height: 20px;\n}\n\n.card_infos[data-oce-card]   .infos_members[data-oce-card] {\nfloat: right;\n}\n\n.card_infos[data-oce-card]   .infos_members[data-oce-card]   .members_item[data-oce-card] {\nwidth: 20px;\nheight: 20px;\nborder-radius: 100%;\ndisplay: inline-block;\nbackground: #adadad;\nmargin-left: 5px;\n}\n\n.card_infos[data-oce-card]   .infos_members[data-oce-card]   .members_item[data-oce-card]   img[data-oce-card] {\nwidth: 20px;\nheight: 20px;\nborder-radius: 100%;\n}"; },
            enumerable: true,
            configurable: true
        });
        return Card;
    }());
    var Kanban = /** @class */ (function () {
        function Kanban() {
        }
        Kanban.prototype.render = function () {
            return (h("div", { class: "board_container" }, h("div", { class: "board" }, this.bins.map(function (bin) { return (h("oce-bin", { cards: bin.cards, outputs: bin.outputs, due: bin.due, title: bin.title, note: bin.note })); }))));
        };
        Object.defineProperty(Kanban, "is", {
            get: function () { return "oce-kanban"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Kanban, "encapsulation", {
            get: function () { return "shadow"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Kanban, "properties", {
            get: function () { return { "bins": { "type": "Any" }, "due": { "type": String, "attr": "due" } }; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Kanban, "style", {
            get: function () { return ".board_container[data-oce-kanban] {\n  position: relative;\n}\n\n.board[data-oce-kanban] {\n  user-select: none;\n  white-space: nowrap;\n  overflow-x: auto;\n  overflow-y: hidden;\n  position: absolute;\n  right: 0;\n  left: 0px;\n  top: 0;\n  margin-bottom: 20px;\n}"; },
            enumerable: true,
            configurable: true
        });
        return Kanban;
    }());
    var Output = /** @class */ (function () {
        function Output() {
        }
        Output.prototype.render = function () {
            return (h("div", { class: 'list_outputs' }, h("h2", null, "Outputs (", this.outputs.length, ")"), this.outputs.map(function (output) { return (h("div", { class: 'outputs_card' }, h("span", null, output.resourceClassifiedAs.name))); })));
        };
        Object.defineProperty(Output, "is", {
            get: function () { return "oce-output"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Output, "encapsulation", {
            get: function () { return "shadow"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Output, "properties", {
            get: function () { return { "outputs": { "type": "Any" } }; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Output, "style", {
            get: function () { return ".list_outputs[data-oce-output] {\n  -webkit-flex: 1 1 auto;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  overflow-y: auto;\n  margin: 0 4px;\n  padding: 0 4px;\n  z-index: 1;\n  min-height: 0;\n  -webkit-box-flex: 1;\n  overflow-x: hidden;\n}\n\n.list_outputs[data-oce-output]   h2[data-oce-output] {\n    font-weight: 500;\n    font-size: 14px;\n    letter-spacing: .5;\n}\n\n.outputs_card[data-oce-output] {\n  background: #333C44;\n  border-radius: 3px;\n  overflow: hidden;\n  padding: 6px 6px 2px 8px;\n  position: relative;\n  z-index: 10;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  cursor: pointer;\n  margin-bottom: 6px;\n  max-width: 300px;\n  min-height: 20px;\n  position: relative;\n  z-index: 0;\n  padding: 10px;\n}\n\n.outputs_card[data-oce-output]   span[data-oce-output] {\n  color: white;\n  font-size: 14px;\n  font-weight: 500;\n}"; },
            enumerable: true,
            configurable: true
        });
        return Output;
    }());
    exports.OceBin = Bin;
    exports.OceCard = Card;
    exports.OceKanban = Kanban;
    exports.OceOutput = Output;
}, "oce-bin");
