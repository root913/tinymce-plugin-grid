import { Editor } from 'tinymce';
import Settings from '../core/Settings';
import IPreset, { Breakpoint, Column } from './IPreset';

export default class Bootstrap3 implements IPreset {

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
        {text: 'Extra small', value: 'extra_small', preffix: 'xs'},
        {text: 'Small', value: 'small', preffix: 'sm'},
        {text: 'Medium', value: 'medium', preffix: 'md'},
        {text: 'Large', value: 'large', preffix: 'lg'},
    ];

    constructor(protected settings: Settings, protected editor: Editor) {}

    /**
     * Gets style url
     *
     * @return  {string}
     */
    public style = (): string => 'bootstrap3.css';

    /**
     * Returns regxp for column class
     *
     * @param {string} columnPreffix
     * @return {RegExp}
     */
    public columnClassRegex = (columnPreffix: string): RegExp => new RegExp(`col-${columnPreffix}-([\\d]+)`, 'gi');

    /**
     * Builds column class based on prefix and breakpoint
     *
     * @param {string} breakpoint
     * @param {string} column
     * @return {string}
     */
    public columnClass = (breakpoint: string, column: string): string => `col-${breakpoint}-${column}`;

    /**
     * Check if class is column
     *
     * @param {string} className
     * @return {boolean}
     */
    public isColumn = (className: string): boolean => !!this.breakpoints.find((breakpoint) => !!this.columns.find((column) => this.columnClass(breakpoint.preffix, column.value) === className));

    /**
     * Render container
     *
     * @return {Element}
     */
    public renderContainer(): Element {
        const node = `
        <div class="grid-container container">
            <div class="grid-row row">
                <div class="grid-col col-lg-12"><p>Lorem ipsum</p></div>
            </div>
        </div>`;
        const div = document.createElement('div');
        div.innerHTML = node.trim();
        return div;
    }

    /**
     * Render row
     *
     * @return {Element}
     */
    public renderRow(): Element {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="grid-row row">
            <div class="grid-col col-lg-12"><p>Lorem ipsum</p></div>
        </div>`.trim();
        return div.firstChild as Element;
    }

    /**
     * Render column
     *
     * @return {Element}
     */
    public renderColumn(data): Element {
        const xs = data.extra_small.length > 0 ? `col-sm-${data.extra_small}` : '';
        const sm = data.small.length > 0 ? `col-sm-${data.small}` : '';
        const md = data.medium.length > 0 ? `col-md-${data.medium}` : '';
        const lg = data.large.length > 0 ? `col-lg-${data.large}` : '';
        const className = `${xs} ${sm} ${md} ${lg}`;
        const node = `<div class="grid-col ${className.trim()}"><p>Lorem ipsum</p></div>`;

        const div = document.createElement('div');
        div.innerHTML = node.trim();
        return div.firstChild as Element;
    }

}