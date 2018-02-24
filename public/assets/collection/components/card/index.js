export class Card {
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
    static get style() { return "/**style-placeholder:oce-card:**/"; }
}
