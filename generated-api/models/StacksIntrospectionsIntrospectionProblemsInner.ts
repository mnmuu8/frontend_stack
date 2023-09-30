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
 * @interface StacksIntrospectionsIntrospectionProblemsInner
 */
export interface StacksIntrospectionsIntrospectionProblemsInner {
    /**
     * 反省のProblemID
     * @type {number}
     * @memberof StacksIntrospectionsIntrospectionProblemsInner
     */
    id: number;
    /**
     * 反省のProblem項目
     * @type {string}
     * @memberof StacksIntrospectionsIntrospectionProblemsInner
     */
    content: string;
    /**
     * 
     * @type {Date}
     * @memberof StacksIntrospectionsIntrospectionProblemsInner
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof StacksIntrospectionsIntrospectionProblemsInner
     */
    updatedAt: Date;
}

/**
 * Check if a given object implements the StacksIntrospectionsIntrospectionProblemsInner interface.
 */
export function instanceOfStacksIntrospectionsIntrospectionProblemsInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "content" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;

    return isInstance;
}

export function StacksIntrospectionsIntrospectionProblemsInnerFromJSON(json: any): StacksIntrospectionsIntrospectionProblemsInner {
    return StacksIntrospectionsIntrospectionProblemsInnerFromJSONTyped(json, false);
}

export function StacksIntrospectionsIntrospectionProblemsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): StacksIntrospectionsIntrospectionProblemsInner {
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

export function StacksIntrospectionsIntrospectionProblemsInnerToJSON(value?: StacksIntrospectionsIntrospectionProblemsInner | null): any {
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

