/* tslint:disable */
/* eslint-disable */
/**
 * Skill Climbing
 * スキルの積み上げアプリ
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface StacksIntrospectionsIntrospectionKeepsInner
 */
export interface StacksIntrospectionsIntrospectionKeepsInner {
    /**
     * 反省のKeepID
     * @type {number}
     * @memberof StacksIntrospectionsIntrospectionKeepsInner
     */
    id: number;
    /**
     * 反省のKeep項目
     * @type {string}
     * @memberof StacksIntrospectionsIntrospectionKeepsInner
     */
    content: string;
    /**
     * 
     * @type {Date}
     * @memberof StacksIntrospectionsIntrospectionKeepsInner
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof StacksIntrospectionsIntrospectionKeepsInner
     */
    updatedAt: Date;
}

/**
 * Check if a given object implements the StacksIntrospectionsIntrospectionKeepsInner interface.
 */
export function instanceOfStacksIntrospectionsIntrospectionKeepsInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "content" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;

    return isInstance;
}

export function StacksIntrospectionsIntrospectionKeepsInnerFromJSON(json: any): StacksIntrospectionsIntrospectionKeepsInner {
    return StacksIntrospectionsIntrospectionKeepsInnerFromJSONTyped(json, false);
}

export function StacksIntrospectionsIntrospectionKeepsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): StacksIntrospectionsIntrospectionKeepsInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'content': json['content'],
        'createdAt': (new Date(json['created_at'])),
        'updatedAt': (new Date(json['updated_at'])),
    };
}

export function StacksIntrospectionsIntrospectionKeepsInnerToJSON(value?: StacksIntrospectionsIntrospectionKeepsInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'content': value.content,
        'created_at': (value.createdAt.toISOString()),
        'updated_at': (value.updatedAt.toISOString()),
    };
}
