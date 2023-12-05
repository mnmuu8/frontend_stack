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
import type { StacksStackSkill } from './StacksStackSkill';
import {
    StacksStackSkillFromJSON,
    StacksStackSkillFromJSONTyped,
    StacksStackSkillToJSON,
} from './StacksStackSkill';
import type { StacksStackUser } from './StacksStackUser';
import {
    StacksStackUserFromJSON,
    StacksStackUserFromJSONTyped,
    StacksStackUserToJSON,
} from './StacksStackUser';

/**
 * 
 * @export
 * @interface StacksStack
 */
export interface StacksStack {
    /**
     * 積み上げID
     * @type {number}
     * @memberof StacksStack
     */
    id: number;
    /**
     * 積み上げタイトル
     * @type {string}
     * @memberof StacksStack
     */
    title: string;
    /**
     * 積み上げ時間
     * @type {number}
     * @memberof StacksStack
     */
    minutes: number;
    /**
     * 積み上げ内容
     * @type {string}
     * @memberof StacksStack
     */
    description: string | null;
    /**
     * 
     * @type {StacksStackSkill}
     * @memberof StacksStack
     */
    skill: StacksStackSkill;
    /**
     * 
     * @type {StacksStackUser}
     * @memberof StacksStack
     */
    user: StacksStackUser;
    /**
     * 
     * @type {Date}
     * @memberof StacksStack
     */
    stackedAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof StacksStack
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof StacksStack
     */
    updatedAt: Date;
}

/**
 * Check if a given object implements the StacksStack interface.
 */
export function instanceOfStacksStack(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "title" in value;
    isInstance = isInstance && "minutes" in value;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "skill" in value;
    isInstance = isInstance && "user" in value;
    isInstance = isInstance && "stackedAt" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;

    return isInstance;
}

export function StacksStackFromJSON(json: any): StacksStack {
    return StacksStackFromJSONTyped(json, false);
}

export function StacksStackFromJSONTyped(json: any, ignoreDiscriminator: boolean): StacksStack {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'minutes': json['minutes'],
        'description': json['description'],
        'skill': StacksStackSkillFromJSON(json['skill']),
        'user': StacksStackUserFromJSON(json['user']),
        'stackedAt': (new Date(json['stacked_at'])),
        'createdAt': (new Date(json['created_at'])),
        'updatedAt': (new Date(json['updated_at'])),
    };
}

export function StacksStackToJSON(value?: StacksStack | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'title': value.title,
        'minutes': value.minutes,
        'description': value.description,
        'skill': StacksStackSkillToJSON(value.skill),
        'user': StacksStackUserToJSON(value.user),
        'stacked_at': (value.stackedAt.toISOString()),
        'created_at': (value.createdAt.toISOString()),
        'updated_at': (value.updatedAt.toISOString()),
    };
}

