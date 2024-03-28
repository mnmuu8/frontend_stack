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
import type { UsersPlansPlanEndTime } from './UsersPlansPlanEndTime';
import {
    UsersPlansPlanEndTimeFromJSON,
    UsersPlansPlanEndTimeFromJSONTyped,
    UsersPlansPlanEndTimeToJSON,
} from './UsersPlansPlanEndTime';
import type { UsersPlansPlanStartTime } from './UsersPlansPlanStartTime';
import {
    UsersPlansPlanStartTimeFromJSON,
    UsersPlansPlanStartTimeFromJSONTyped,
    UsersPlansPlanStartTimeToJSON,
} from './UsersPlansPlanStartTime';

/**
 * 
 * @export
 * @interface UsersPlanListInner
 */
export interface UsersPlanListInner {
    /**
     * ユーザーの計画ID
     * @type {number}
     * @memberof UsersPlanListInner
     */
    id: number;
    /**
     * ユーザーの計画タイトル
     * @type {string}
     * @memberof UsersPlanListInner
     */
    title: string;
    /**
     * ユーザーの計画詳細
     * @type {string}
     * @memberof UsersPlanListInner
     */
    description: string;
    /**
     * 
     * @type {UsersPlansPlanStartTime}
     * @memberof UsersPlanListInner
     */
    startTime: UsersPlansPlanStartTime;
    /**
     * 
     * @type {UsersPlansPlanEndTime}
     * @memberof UsersPlanListInner
     */
    endTime: UsersPlansPlanEndTime;
    /**
     * 
     * @type {StacksStackSkill}
     * @memberof UsersPlanListInner
     */
    skill?: StacksStackSkill;
    /**
     * 
     * @type {StacksStackUser}
     * @memberof UsersPlanListInner
     */
    user: StacksStackUser;
    /**
     * 
     * @type {Date}
     * @memberof UsersPlanListInner
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof UsersPlanListInner
     */
    updatedAt: Date;
}

/**
 * Check if a given object implements the UsersPlanListInner interface.
 */
export function instanceOfUsersPlanListInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "title" in value;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "startTime" in value;
    isInstance = isInstance && "endTime" in value;
    isInstance = isInstance && "user" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;

    return isInstance;
}

export function UsersPlanListInnerFromJSON(json: any): UsersPlanListInner {
    return UsersPlanListInnerFromJSONTyped(json, false);
}

export function UsersPlanListInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): UsersPlanListInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'description': json['description'],
        'startTime': UsersPlansPlanStartTimeFromJSON(json['start_time']),
        'endTime': UsersPlansPlanEndTimeFromJSON(json['end_time']),
        'skill': !exists(json, 'skill') ? undefined : StacksStackSkillFromJSON(json['skill']),
        'user': StacksStackUserFromJSON(json['user']),
        'createdAt': (new Date(json['created_at'])),
        'updatedAt': (new Date(json['updated_at'])),
    };
}

export function UsersPlanListInnerToJSON(value?: UsersPlanListInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'title': value.title,
        'description': value.description,
        'start_time': UsersPlansPlanStartTimeToJSON(value.startTime),
        'end_time': UsersPlansPlanEndTimeToJSON(value.endTime),
        'skill': StacksStackSkillToJSON(value.skill),
        'user': StacksStackUserToJSON(value.user),
        'created_at': (value.createdAt.toISOString()),
        'updated_at': (value.updatedAt.toISOString()),
    };
}
