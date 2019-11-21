
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

    public static render(onSubmit) {

        return {
            title: 'Insert grid',
            data: {},
            body: [
                this.breadpoint('small', 'Small'),
                this.breadpoint('medium', 'Medium'),
                this.breadpoint('large', 'Large'),
            ],
            onSubmit
        };
    }

    private static breadpoint(name, label) {
        return {
            type: 'container',
            label,
            layout: 'flex',
            direction: 'row',
            align: 'center',
            spacing: 5,
            items: [
                {
                    type: 'listbox',
                    name,
                    values: this.columns,
                },
            ]
        };
    }
}