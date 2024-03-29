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
 * @interface StacksIntrospectionsIntrospectionTriesInner
 */
export interface StacksIntrospectionsIntrospectionTriesInner {
    /**
     * 反省のTryID
     * @type {number}
     * @memberof StacksIntrospectionsIntrospectionTriesInner
     */
    id: number;
    /**
     * 反省のTry項目
     * @type {string}
     * @memberof StacksIntrospectionsIntrospectionTriesInner
     */
    content: string;
    /**
     * 
     * @type {Date}
     * @memberof StacksIntrospectionsIntrospectionTriesInner
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof StacksIntrospectionsIntrospectionTriesInner
     */
    updatedAt: Date;
}

/**
 * Check if a given object implements the StacksIntrospectionsIntrospectionTriesInner interface.
 */
export function instanceOfStacksIntrospectionsIntrospectionTriesInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "content" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;

    return isInstance;
}

export function StacksIntrospectionsIntrospectionTriesInnerFromJSON(json: any): StacksIntrospectionsIntrospectionTriesInner {
    return StacksIntrospectionsIntrospectionTriesInnerFromJSONTyped(json, false);
}

export function StacksIntrospectionsIntrospectionTriesInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): StacksIntrospectionsIntrospectionTriesInner {
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

export function StacksIntrospectionsIntrospectionTriesInnerToJSON(value?: StacksIntrospectionsIntrospectionTriesInner | null): any {
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

