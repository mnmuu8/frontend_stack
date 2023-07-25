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
 * @interface StacksStackSkill
 */
export interface StacksStackSkill {
    /**
     * スキルID
     * @type {number}
     * @memberof StacksStackSkill
     */
    id: number;
    /**
     * スキル名
     * @type {string}
     * @memberof StacksStackSkill
     */
    name: string;
    /**
     * 
     * @type {Date}
     * @memberof StacksStackSkill
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof StacksStackSkill
     */
    updatedAt: Date;
}

/**
 * Check if a given object implements the StacksStackSkill interface.
 */
export function instanceOfStacksStackSkill(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;

    return isInstance;
}

export function StacksStackSkillFromJSON(json: any): StacksStackSkill {
    return StacksStackSkillFromJSONTyped(json, false);
}

export function StacksStackSkillFromJSONTyped(json: any, ignoreDiscriminator: boolean): StacksStackSkill {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'createdAt': (new Date(json['created_at'])),
        'updatedAt': (new Date(json['updated_at'])),
    };
}

export function StacksStackSkillToJSON(value?: StacksStackSkill | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'created_at': (value.createdAt.toISOString()),
        'updated_at': (value.updatedAt.toISOString()),
    };
}

