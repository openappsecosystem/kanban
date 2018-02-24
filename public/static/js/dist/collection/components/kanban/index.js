export class Kanban {
    render() {
        return (h("div", { class: "board_container" },
            h("div", { class: "board" }, this.bins.map(bin => (h("oce-bin", { cards: bin.cards, outputs: bin.outputs, due: bin.due, title: bin.title, note: bin.note }))))));
    }
    static get is() { return "oce-kanban"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "bins": { "type": "Any" }, "due": { "type": String, "attr": "due" } }; }
    static get style() { return "/**style-placeholder:oce-kanban:**/"; }
}
