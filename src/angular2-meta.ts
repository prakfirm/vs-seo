/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Inject, Injectable} from "@angular/core";
// es6-modules are used here
import {DomAdapter, getDOM} from "@angular/platform-browser/src/dom/dom_adapter";
import {DOCUMENT} from "@angular/platform-browser";

/**
 * Represent meta element.
 *
 * ### Example
 *
 * ```ts
 * { name: 'application-name', content: 'Name of my application' },
 * { name: 'description', content: 'A description of the page', id: 'desc' }
 * // ...
 * // Twitter
 * { name: 'twitter:title', content: 'Content Title' }
 * // ...
 * // Google+
 * { itemprop: 'name', content: 'Content Title' },
 * { itemprop: 'description', content: 'Content Title' }
 * // ...
 * // Facebook / Open Graph
 * { property: 'fb:app_id', content: '123456789' },
 * { property: 'og:title', content: 'Content Title' }
 * ```
 *
 * @experimental
 */
export interface MetaDefinition {
    charset?: string;
    content?: string;
    httpEquiv?: string;
    id?: string;
    itemprop?: string;
    name?: string;
    property?: string;
    scheme?: string;
    url?: string;
    [prop: string]: string;
}

/**
 * A service that can be used to get and add meta tags.
 *
 * @experimental
 */
@Injectable()
export class Meta {
    private _dom: DomAdapter = getDOM();

    constructor(@Inject(DOCUMENT) private _document: any) {
    }

    /**
     * Sets the title of the page
     */
    setTitle(title: string) {
        this._document.title = title
    }

    /**
     * this.meta.updateMeta('description', 'test'); will  set <meta name="description" content="test">
     */
    updateMeta(name, content) {
        const head = this._document.head;
        let childNodesAsList = this._dom.childNodesAsList(head);
        let metaEl = childNodesAsList.find(el => el['attribs'] ? el['attribs'].name == name : false);
        if (metaEl) metaEl['attribs'].content = content;
    }




    /**
     * Adds a new meta tag to the dom.
     *
     *  ### Example
     *
     * ```ts
     * const name: MetaDefinition = {name: 'application-name', content: 'Name of my application'};
     * const desc: MetaDefinition = {name: 'description', content: 'A description of the page'};
     * const tags: HTMLMetaElement[] = this.meta.addTags([name, desc]);
     * ```
     *
     * @param tags
     * @returns {HTMLMetaElement[]}
     */
    addTags(...tags: Array<MetaDefinition | MetaDefinition[]>): HTMLMetaElement[] {
        const presentTags = this._flattenArray(tags);
        if (presentTags.length === 0) return [];
        return presentTags.map((tag: MetaDefinition) => this._addInternal(tag));
    }

    /**
     * Gets the meta tag by the given selector. Returns element or null
     * if there's no such meta element.
     *
     *  ### Example
     *
     * ```ts
     * const meta: HTMLMetaElement = this.meta.getTag('name=description');
     * const twitterMeta: HTMLMetaElement = this.meta.getTag('name="twitter:title"');
     * const fbMeta: HTMLMetaElement = this.meta.getTag('property="fb:app_id"');
     * ```
     *
     * @param selector
     * @returns {HTMLMetaElement}
     */
    getTag(selector: string): HTMLMetaElement {
        if (!selector) return null;
        return this._dom.query(`meta[${selector}]`);
    }

    /**
     * Updates the meta tag with the given selector.
     *
     * *  ### Example
     *
     * ```ts
     * const meta: HTMLMetaElement = this.meta.updateTag('name=description', {name: 'description',
   * content: 'New description'});
     * console.log(meta.content); // 'New description'
     * ```
     *
     * @param selector
     * @param tag updated tag definition
     * @returns {HTMLMetaElement}
     */
    updateTag(selector: string, tag: MetaDefinition): HTMLMetaElement {
        const meta: HTMLMetaElement = this.getTag(selector);
        if (!meta) {
            // create element if it doesn't exist
            return this._addInternal(tag);
        }
        return this._prepareMetaElement(tag, meta);
    }

    /**
     * Removes meta tag with the given selector from the dom.
     *
     *  ### Example
     *
     * ```ts
     * this.meta.removeTagBySelector('name=description');
     * ```
     *
     * @param selector
     */
    removeTagBySelector(selector: string): void {
        const meta: HTMLMetaElement = this.getTag(selector);
        this.removeTagElement(meta);
    }

    /**
     * Removes given meta element from the dom.
     *
     *  ### Example
     *  ```ts
     * const elem: HTMLMetaElement = this.meta.getTag('name=description');
     * this.meta.removeTagElement(elem);
     * ```
     *
     * @param meta meta element
     */
    removeTagElement(meta: HTMLMetaElement): void {
        if (meta) {
            this._removeMetaElement(meta);
        }
    }

    /**
     * this.meta.updateMeta('description', 'test'); will  set <meta name="description" content="test">
     */
    addJSONLD(data: any) {
        const oScript: any = this._createScriptElement('script');
        oScript.text = 'abced';
        const tag = {type: 'application/json-ld', id: 'json-ld'};

        this._prepareMetaElement(tag, oScript);
        this._appendScriptElement(oScript, data);
        return oScript;
    }

    addCanonicalLink(href: string) {
        const link: any = this._createElement('link');
        const tag = {rel: 'canonical', href};
        this._prepareMetaElement(tag, link);
        this._appendMetaElement(link);
        return link;
    }

    private _addInternal(tag: MetaDefinition): HTMLMetaElement {
        const meta: HTMLMetaElement = this._createMetaElement();
        this._prepareMetaElement(tag, meta);
        this._appendMetaElement(meta);
        return meta;
    }

    private _createMetaElement(): HTMLMetaElement {
        return this._dom.createElement('meta') as HTMLMetaElement;
    }

    private _createElement(tag: string): HTMLElement {
        return this._dom.createElement(tag) as HTMLElement;
    }

    private _createScriptElement(tag: string): HTMLScriptElement {
        return this._dom.createElement(tag) as HTMLScriptElement;
    }

    private _prepareMetaElement(tag: any, el: HTMLElement): any {
        Object.keys(tag).forEach((prop: string) => this._dom.setAttribute(el, prop, tag[prop]));
        return el;
    }

    private _prepareScriptElement(tag: any, el: HTMLElement): any {
        Object.keys(tag).forEach((prop: string) => this._dom.setAttribute(el, prop, tag[prop]));
        return el;
    }


    private _appendMetaElement(el: HTMLElement): void {
        const head = this._document.head;
        this._dom.appendChild(head, el);
    }

    private _appendScriptElement(el: HTMLScriptElement, data): void {
        const head = this._document.head;
        const code = JSON.stringify(data);
        const textNode = this._dom.createTextNode(code);
        this._dom.appendChild(el, textNode);
        this._dom.appendChild(head, el);
    }

    private _removeMetaElement(meta: HTMLMetaElement): void {
        const head = this._dom.parentElement(meta);
        this._dom.removeChild(head, meta);
    }

    private _flattenArray(input: any[], out: any[] = []): any[] {
        if (input) {
            for (let i = 0; i < input.length; i++) {
                const item: any = input[i];
                if (Array.isArray(item)) {
                    this._flattenArray(item, out);
                } else if (item) {
                    out.push(item);
                }
            }
        }
        return out;
    }
}
