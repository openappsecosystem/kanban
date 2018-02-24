export class Bin {
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
    static get style() { return "/**style-placeholder:oce-bin:**/"; }
}
