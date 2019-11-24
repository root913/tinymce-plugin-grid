
export default class InsertColumn {

    public static readonly columns = [
        {text: 'Select column', value: ''},
        {text: '1', value: '1'},
        {text: '2', value: '2'},
        {text: '3', value: '3'},
        {text: '4', value: '4'},
        {text: '5', value: '5'},
        {text: '6', value: '6'},
        {text: '7', value: '7'},
        {text: '8', value: '8'},
        {text: '9', value: '9'},
        {text: '10', value: '10'},
        {text: '11', value: '11'},
        {text: '12', value: '12'}
    ];

    public static readonly breakpoints = [
        {text: 'Small', value: 'small', preffix: 'sm'},
        {text: 'Medium', value: 'medium', preffix: 'md'},
        {text: 'Large', value: 'large', preffix: 'lg'},
    ];

    public static render(onSubmit: { (data: any): void; (data: any): void; }, args: { class?: string, selected?: {} }) {
        const selected = 'selected' in args ? args.selected : {};
        return {
            title: 'Insert column',
            data: {},
            body: [
                ... this.breakpoints.map((br) => this.breadpoint(br, selected))
            ],
            onSubmit
        };
    }

    public static getSelected(className: string) {
        const result = {};
        this.breakpoints.forEach((breadpoint) => {
            const regex = new RegExp(`col-${breadpoint.preffix}-(?<column>[\\d]+)`, 'gi');
            const match = regex.exec(className);
            let column = '';
            if (match && 'column' in match.groups) {
                column = match.groups.column;
            }
            result[breadpoint.value] = column;
        });
        return result;
    }

    private static breadpoint(breadpoint: { text: string; value: string; preffix: string}, selected) {
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
                    values: this.columns,
                },
            ]
        };
    }
}