import { Editor } from 'tinymce';
import Settings from '../core/Settings';
import IPreset, { Breakpoint, Column } from './IPreset';

export default class Foundation5 implements IPreset {

    public readonly columns: Column[] = [
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

    public readonly breakpoints: Breakpoint[] = [
        {text: 'Small', value: 'small', preffix: 'small'},
        {text: 'Medium', value: 'medium', preffix: 'medium'},
        {text: 'Large', value: 'large', preffix: 'large'},
    ];

    constructor(protected settings: Settings, protected editor: Editor) {}

    /**
     * Gets style url
     */
    public style = (): string => 'foundation5.css';

    /**
     * Returns regxp for column class
     */
    public columnClassRegex = (columnPreffix: string): RegExp => new RegExp(`${columnPreffix}-([\\d]+)`, 'gi');

    /**
     * Builds column class based on prefix and breakpoint
     *
     * @param {string} breakpoint
     * @param {string} column
     * @return {string}
     */
    public columnClass = (breakpoint: string, column: string): string => `${breakpoint}-${column}`;

        /**
     * Check if class is column
     *
     * @param {string} className
     * @return {boolean}
     */
    public isColumn = (className: string): boolean => !!this.breakpoints.find((breakpoint) => !!this.columns.find((column) => this.columnClass(breakpoint.preffix, column.value) === className));

    /**
     * Render container
     */
    public renderContainer(): Element {
        const node = `
        <div class="grid-container container">
            <div class="grid-row row">
                <div class="grid-col columns large-12"><p>Lorem ipsum</p></div>
            </div>
        </div>`;
        const div = document.createElement('div');
        div.innerHTML = node.trim();
        return div;
    }

    /**
     * Render row
     */
    public renderRow(): Element {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="grid-row row">
            <div class="grid-col columns large-12"><p>Lorem ipsum</p></div>
        </div>`.trim();
        return div.firstChild as Element;
    }

    /**
     * Render column
     */
    public renderColumn(data): Element {
        const sm = data.small.length > 0 ? `small-${data.small}` : '';
        const md = data.medium.length > 0 ? `medium-${data.medium}` : '';
        const lg = data.large.length > 0 ? `large-${data.large}` : '';
        const className = `${sm} ${md} ${lg}`;
        const node = `<div class="grid-col columns ${className.trim()}"><p>Lorem ipsum</p></div>`;

        const div = document.createElement('div');
        div.innerHTML = node.trim();
        return div.firstChild as Element;
    }

}