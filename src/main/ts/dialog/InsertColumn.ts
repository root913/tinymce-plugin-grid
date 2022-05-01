import { Ui } from 'tinymce';
import IPreset, { Breakpoint, Column } from '../presets/IPreset';

interface Args {
    class?: string, 
    selected?: {}
}

type OnSubmit = (data: any) => void;

export default class InsertColumn {

    public static readonly BTN_SUBMIT = 'btnSubmit';
    public static readonly BTN_CANCEL = 'btnCancel';

    constructor (private preset: IPreset) {}

    /**
     * @param {OnSubmit} onSubmit 
     * @param {Args} args
     * @return {Ui.Dialog.DialogSpec<any>}
     */
    public render(onSubmit: OnSubmit, args: Args = {}): Ui.Dialog.DialogSpec<any> {
        const selected = 'selected' in args ? args.selected : {};
        return {
            title: 'Insert column',
            body: this.panel(),
            initialData: this.initialData(selected),
            buttons: this.buttons(),
            onSubmit: (api: Ui.Dialog.DialogInstanceApi<any>) => this.onSubmit(api, onSubmit),
            onChange: this.onChange
        };
    }

    /**
     * @param {string} className 
     */
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

    /**
     * @return {Ui.Dialog.PanelSpec}
     */
    private panel(): Ui.Dialog.PanelSpec {
        return {
            type: 'panel',
            items: this.preset.breakpoints.map((br) => this.breadpoint(br))
        };
    }

    /**
     * @param {any|null} selected
     */
    private initialData(selected?: {}) {
        if (selected && Object.keys(selected).length) {
            return selected;
        }

        const def = {};
        this.preset.breakpoints.forEach(br => {
            def[br.value] = this.preset.default();
        });

        return def;
    }

    /**
     * @return {Ui.Dialog.DialogFooterButtonSpec[]}
     */
    private buttons(): Ui.Dialog.DialogFooterButtonSpec[] {
        return [
            {
                type: 'submit',
                name: InsertColumn.BTN_SUBMIT,
                text: 'Submit',
                primary: true,
            },
            {
                type: 'cancel',
                name: InsertColumn.BTN_CANCEL,
                text: 'Cancel'
            },
        ]
    }

    /**
     * @param {Breakpoint} breadpoint
     * @return {Ui.Dialog.ListBoxSpec}
     */
    private breadpoint(breadpoint: Breakpoint): Ui.Dialog.ListBoxSpec {
        let columnItems = this.preset.columns.map((column) => this.columnOption(column));
        columnItems.unshift({text: 'Select column', value: ''});

        return {
            type: 'listbox',
            name: breadpoint.value,
            label: breadpoint.text,
            items: columnItems
        };
    }

    /**
     * @param {Column} column
     * @return {Ui.Dialog.ListBoxItemSpec}
     */
    private columnOption(column: Column): Ui.Dialog.ListBoxItemSpec {
        return {
            text: column.text,
            value: column.value,
        }
    }

    /**
     * @param {Ui.Dialog.DialogInstanceApi<any>} api
     * @param onSubmit 
     */
    private onSubmit(api: Ui.Dialog.DialogInstanceApi<any>, onSubmit: { (data: any): void; (data: any): void; }): void {
        onSubmit(api.getData());
        api.close();
    }

    /**
     * 
     * @param {Ui.Dialog.DialogInstanceApi<any>} api
     * @param {Ui.Dialog.DialogChangeDetails<any>} details 
     * @returns 
     */
    private onChange(api: Ui.Dialog.DialogInstanceApi<any>, details: Ui.Dialog.DialogChangeDetails<any>): void {
        const data = api.getData();
        let selected = 0;
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const option = data[key];
                if (option !== '') {
                    selected++;
                }
            }
        }
        if (selected > 0) {
            api.enable(InsertColumn.BTN_SUBMIT);
        } else {
            api.disable(InsertColumn.BTN_SUBMIT);
        }
    }
}