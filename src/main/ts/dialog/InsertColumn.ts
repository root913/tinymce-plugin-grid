import IPreset, { Breakpoint } from '../presets/IPreset';

export default class InsertColumn {

    constructor (private preset: IPreset) {}

    public render(onSubmit: { (data: any): void; (data: any): void; }, args: { class?: string, selected?: {} }) {
        const selected = 'selected' in args ? args.selected : {};
        return {
            title: 'Insert column',
            data: {},
            body: [
                ... this.preset.breakpoints.map((br) => this.breadpoint(br, selected))
            ],
            onSubmit
        };
    }

    public getSelected(className: string) {
        const result = {};
        this.preset.breakpoints.forEach((breadpoint) => {
            const match = this.preset.columnClassRegex(breadpoint.preffix).exec(className);
            let column = '';
            if (match && match.length > 1) {
                column = match[1];
            }
            result[breadpoint.value] = column;
        });
        return result;
    }

    private breadpoint(breadpoint: Breakpoint, selected) {
        return {
            type: 'container',
            label: breadpoint.text,
            layout: 'flex',
            direction: 'row',
            align: 'center',
            spacing: 5,
            items: [
                {
                    type: 'listbox',
                    name: breadpoint.value,
                    value: breadpoint.value in selected ? selected[breadpoint.value] : '',
                    values: this.preset.columns,
                },
            ]
        };
    }
}