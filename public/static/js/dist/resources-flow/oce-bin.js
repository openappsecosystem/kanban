/*! Built with http://stenciljs.com */
const { h, Context } = window.ResourcesFlow;

class Bin {
    render() {
        return (h("div", { class: 'list_wrapper' },
            h("div", { class: 'list' },
                h("div", { class: 'list_header' },
                    h("h1", { class: 'header_title' }, this.title),
                    this.note
                        ? h("p", { class: 'header_desc' }, this.note)
                        : '',
                    h("div", { class: 'header_infos' }, this.due
                        ? h("div", { class: 'header_due' },
                            h("span", { class: 'due_item' },
                                "Due ",
                                this.due))
                        : '')),
                h("div", { class: 'list_cards' },
                    h("h2", null,
                        "Commitments (",
                        this.cards.length,
                        ")"),
                    this.cards
                        ? this.cards.map(card => h("oce-card", { members: card.members, due: card.due, note: card.note || card.title, action: () => { console.log('hello'); } })) : ''),
                this.outputs.length !== 0
                    ? h("oce-output", { outputs: this.outputs })
                    : '')));
    }
    static get is() { return "oce-bin"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "cards": { "type": "Any" }, "due": { "type": String, "attr": "due" }, "note": { "type": String, "attr": "note" }, "outputs": { "type": "Any" }, "title": { "type": String, "attr": "title" } }; }
    static get style() { return ".list_wrapper {\n  width: 300px;\n  margin-right: 10px;\n  height: 100%;\n  box-sizing: border-box;\n  display: inline-block;\n  vertical-align: top;\n  white-space: nowrap;\n}\n\n\n.list {\n  background: #E2E4E6;\n  border-radius: 3px;\n  box-sizing: border-box;\n  display: flex;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  max-height: 100%;\n  position: relative;\n  white-space: normal;\n  box-shadow: 0 1px 1px rgba(23,43,77,0.2), 0 0 0.5px 0 rgba(23,43,77,0.25);\n  transition: all 0.3s cubic-bezier(0.15, 1, 0.33, 1);\n  -webkit-transition: all 0.3s cubic-bezier(0.15, 1, 0.33, 1);\n}\n\nh2 {\n  font-weight: 500;\n  font-size: 14px;\n  letter-spacing: .5;\n}\n\n\n.list_header {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 auto;\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto;\n  padding: 8px 10px;\n  position: relative;\n  min-height: 18px;\n}\n\n\n.header_title {\n  font-size: 16px;\n  text-align: left;\n  font-weight: 500;\n  /* padding-left: 10px;\n  padding-top: 10px; */\n  margin: 0;\n  margin-top: 5px;\n  text-transform: capitalize;\n  letter-spacing: .5px;\n}\n\n.header_desc {\n  font-size: 14px;\n  font-weight: 300;\n  line-height: 20px;\n  margin-top: 5px;\n}\n\n.header_due {\n  float: left;\n  height: 24px;\n  line-height: 24px;\n  margin-left: 0px;\n  background: #c7c7c7;\n  border-radius: 3px;\n  padding: 0 10px;\n}\n  .header_due .due_item {\n      line-height: 24px;\n      font-size: 13px;\n      text-decoration: underline;\n      font-weight: 500;\n      color: #444444;\n    }\n\n.header_members {\n  float: left;\n  width: 24px;\n  height: 24px;\n  border-radius: 3px;\n  margin-right: 5px;\n\n}\n.members_item {\n  width: 24px;\n  height: 24px;\n  border-radius: 3px;\n  background: #c7c7c7;\n  display: block;\n}\n\n.members_item .item_photo {\n  width: 24px;\n  height: 24px;\n  border-radius: 3px;\n}\n.header_setName {\nbackground: 0 0;\nborder: none;\nborder-radius: 3px;\nbox-shadow: none;\nfont-weight: 700;\nmargin: -3px -5px;\nheight: 18px;\nmin-height: 18px;\npadding: 3px 5px;\nresize: none;\nmax-height: 16pc;\noverflow: hidden;\nword-wrap: break-word;\nheight: 24px;\n}\n.header_setName.isEditing {\nbackground: rgba(255,255,255,.8)\n}\n\n.list_cards {\n-webkit-flex: 1 1 auto;\n-ms-flex: 1 1 auto;\nflex: 1 1 auto;\noverflow-y: auto;\nmargin: 0 4px;\npadding: 0 4px;\nz-index: 1;\nmin-height: 0;\n-webkit-box-flex: 1;\noverflow-x: hidden;\n}"; }
}

class Card {
    render() {
        return (h("div", { onClick: this.action, class: "card" },
            h("span", { class: "card_title" }, this.note),
            h("div", { class: "card_infos" },
                h("h4", { class: "infos_due" },
                    "Due to ",
                    this.due),
                h("div", { class: "infos_members" }, this.members.map(member => (h("span", { class: "members_item" },
                    h("img", { class: "item_photo", src: member.image }))))))));
    }
    static get is() { return "oce-card"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "action": { "type": "Any", "attr": "action" }, "due": { "type": String, "attr": "due" }, "members": { "type": "Any" }, "note": { "type": String, "attr": "note" } }; }
    static get style() { return ".card {\n  background: white;\n  border-bottom: 1px solid #ccc;\n  border-radius: 3px;\n  overflow: hidden;\n  position: relative;\n  z-index: 10;\n  display: block;\n  // display: -webkit-flex;\n  // display: -ms-flexbox;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  cursor: pointer;\n  margin-bottom: 6px;\n  max-width: 300px;\n  min-height: 20px;\n  position: relative;\n  z-index: 0;\n  padding: 10px;\n}\n\n.card:hover {\nbackground: #EDEFF0;\nborder-bottom-color: #d6dacc;\n}\n\n.card.dragged {\nopacity: .5;\ncursor: move;\n}\n\n.card_title {\n  font-size: 14px;\n  line-height: 20px;\n  clear: both;\n  font-weight: 400;\n  margin: 0 0 4px;\n  overflow: hidden;\n  word-wrap: break-word;\n  color: #4d4d4d;\n}\n\n.card_infos{\nmargin-top: 10px;\n}\n\n.card_infos .infos_due{\ncolor: #ADADAD;\nfont-weight: 500;\nfont-size: 12px;\nletter-spacing: 1px;\nmargin: 0;\nfloat: left;\nheight: 20px;\nline-height: 20px;\n}\n\n.card_infos .infos_members {\nfloat: right;\n}\n\n.card_infos .infos_members .members_item {\nwidth: 20px;\nheight: 20px;\nborder-radius: 100%;\ndisplay: inline-block;\nbackground: #adadad;\nmargin-left: 5px;\n}\n\n.card_infos .infos_members .members_item  img {\nwidth: 20px;\nheight: 20px;\nborder-radius: 100%;\n}"; }
}

class Kanban {
    render() {
        return (h("div", { class: "board_container" },
            h("div", { class: "board" }, this.bins.map(bin => (h("oce-bin", { cards: bin.cards, outputs: bin.outputs, due: bin.due, title: bin.title, note: bin.note }))))));
    }
    static get is() { return "oce-kanban"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "bins": { "type": "Any" }, "due": { "type": String, "attr": "due" } }; }
    static get style() { return ".board_container {\n  position: relative;\n}\n\n.board {\n  user-select: none;\n  white-space: nowrap;\n  overflow-x: auto;\n  overflow-y: hidden;\n  position: absolute;\n  right: 0;\n  left: 0px;\n  top: 0;\n  margin-bottom: 20px;\n}"; }
}

class Output {
    render() {
        return (h("div", { class: 'list_outputs' },
            h("h2", null,
                "Outputs (",
                this.outputs.length,
                ")"),
            this.outputs.map(output => (h("div", { class: 'outputs_card' },
                h("span", null, output.resourceClassifiedAs.name))))));
    }
    static get is() { return "oce-output"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "outputs": { "type": "Any" } }; }
    static get style() { return ".list_outputs {\n  -webkit-flex: 1 1 auto;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  overflow-y: auto;\n  margin: 0 4px;\n  padding: 0 4px;\n  z-index: 1;\n  min-height: 0;\n  -webkit-box-flex: 1;\n  overflow-x: hidden;\n}\n\n.list_outputs h2 {\n    font-weight: 500;\n    font-size: 14px;\n    letter-spacing: .5;\n}\n\n.outputs_card {\n  background: #333C44;\n  border-radius: 3px;\n  overflow: hidden;\n  padding: 6px 6px 2px 8px;\n  position: relative;\n  z-index: 10;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  cursor: pointer;\n  margin-bottom: 6px;\n  max-width: 300px;\n  min-height: 20px;\n  position: relative;\n  z-index: 0;\n  padding: 10px;\n}\n\n.outputs_card span {\n  color: white;\n  font-size: 14px;\n  font-weight: 500;\n}"; }
}

export { Bin as OceBin, Card as OceCard, Kanban as OceKanban, Output as OceOutput };
