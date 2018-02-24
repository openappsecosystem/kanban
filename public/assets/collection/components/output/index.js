export class Output {
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
    static get style() { return "/**style-placeholder:oce-output:**/"; }
}
