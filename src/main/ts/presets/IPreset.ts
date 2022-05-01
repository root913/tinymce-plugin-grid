import Settings from '../core/Settings';
import {Editor} from 'tinymce';

interface Column {
    text: string;
    value: string;
}

interface Breakpoint {
    text: string;
    value: string;
    preffix: string;
}

interface IPreset {
    columns: Column[];
    breakpoints: Breakpoint[];
    /**
     * Gets style url
     *
     * @return  {string}
     */
    style(): string;
    /**
     * Gets default column
     * @return {string}
     */
    default(): string;
    /**
     * Returns regxp for column class
     *
     * @param {string} columnPreffix
     * @return {RegExp}
     */
    columnClassRegex(columnPreffix: string): RegExp;
    /**
     * Builds column class based on prefix and breakpoint
     *
     * @param {string} prefix
     * @param {string} breakpoint
     * @return {string}
     */
    columnClass(prefix: string, breakpoint: string): string;
    /**
     * Check if class is column
     *
     * @param {string} className
     * @return {boolean}
     */
    isColumn(className: string): boolean;
    /**
     * Render container
     *
     * @return {Element}
     */
    renderContainer(): Element;
    /**
     * Render row
     *
     * @return {Element}
     */
    renderRow(): Element;
    /**
     * Render column
     *
     * @return {Element}
     */
    renderColumn(data): Element;
}

type IPresetConstructor = new(settings: Settings, editor: Editor) => IPreset;

declare var IPreset: IPresetConstructor;

export default IPreset;
export {Column, Breakpoint};