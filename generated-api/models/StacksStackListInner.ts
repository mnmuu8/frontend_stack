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
 * @interface StacksStackListInner
 */
export interface StacksStackListInner {
    /**
     * 積み上げID
     * @type {number}
     * @memberof StacksStackListInner
     */
    id: number;
    /**
     * 積み上げタイトル
     * @type {string}
     * @memberof StacksStackListInner
     */
    title: string;
    /**
     * 積み上げ時間
     * @type {number}
     * @memberof StacksStackListInner
     */
    minutes: number;
    /**
     * 積み上げ内容
     * @type {string}
     * @memberof StacksStackListInner
     */
    description: string | null;
    /**
     * 
     * @type {StacksStackSkill}
     * @memberof StacksStackListInner
     */
    skill: StacksStackSkill;
    /**
     * 
     * @type {StacksStackUser}
     * @memberof StacksStackListInner
     */
    user: StacksStackUser;
    /**
     * 
     * @type {Date}
     * @memberof StacksStackListInner
     */
    stackedAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof StacksStackListInner
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof StacksStackListInner
     */
    updatedAt: Date;
}

/**
 * Check if a given object implements the StacksStackListInner interface.
 */
export function instanceOfStacksStackListInner(value: object): boolean {
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

export function StacksStackListInnerFromJSON(json: any): StacksStackListInner {
    return StacksStackListInnerFromJSONTyped(json, false);
}

export function StacksStackListInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): StacksStackListInner {
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

export function StacksStackListInnerToJSON(value?: StacksStackListInner | null): any {
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

