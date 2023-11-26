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
import type { UsersUserRole } from './UsersUserRole';
import {
    UsersUserRoleFromJSON,
    UsersUserRoleFromJSONTyped,
    UsersUserRoleToJSON,
} from './UsersUserRole';
import type { UsersUserSkillRanksInner } from './UsersUserSkillRanksInner';
import {
    UsersUserSkillRanksInnerFromJSON,
    UsersUserSkillRanksInnerFromJSONTyped,
    UsersUserSkillRanksInnerToJSON,
} from './UsersUserSkillRanksInner';
import type { UsersUserTeam } from './UsersUserTeam';
import {
    UsersUserTeamFromJSON,
    UsersUserTeamFromJSONTyped,
    UsersUserTeamToJSON,
} from './UsersUserTeam';

/**
 * 
 * @export
 * @interface UsersUser
 */
export interface UsersUser {
    /**
     * ユーザーID
     * @type {number}
     * @memberof UsersUser
     */
    id: number;
    /**
     * ユーザー名
     * @type {string}
     * @memberof UsersUser
     */
    name: string;
    /**
     * ユーザーのメールアドレス
     * @type {string}
     * @memberof UsersUser
     */
    email: string;
    /**
     * ユーザーのプロフィール文
     * @type {string}
     * @memberof UsersUser
     */
    profileContent: string | null;
    /**
     * 
     * @type {UsersUserRole}
     * @memberof UsersUser
     */
    role: UsersUserRole;
    /**
     * ユーザープロフィール画像のS3ファイルパス
     * @type {string}
     * @memberof UsersUser
     */
    profileImagePath?: string;
    /**
     * 
     * @type {UsersUserTeam}
     * @memberof UsersUser
     */
    team: UsersUserTeam;
    /**
     * 
     * @type {Array<UsersUserSkillRanksInner>}
     * @memberof UsersUser
     */
    skillRanks: Array<UsersUserSkillRanksInner>;
    /**
     * 
     * @type {Date}
     * @memberof UsersUser
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof UsersUser
     */
    updatedAt: Date;
}

/**
 * Check if a given object implements the UsersUser interface.
 */
export function instanceOfUsersUser(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "profileContent" in value;
    isInstance = isInstance && "role" in value;
    isInstance = isInstance && "team" in value;
    isInstance = isInstance && "skillRanks" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;

    return isInstance;
}

export function UsersUserFromJSON(json: any): UsersUser {
    return UsersUserFromJSONTyped(json, false);
}

export function UsersUserFromJSONTyped(json: any, ignoreDiscriminator: boolean): UsersUser {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'email': json['email'],
        'profileContent': json['profile_content'],
        'role': UsersUserRoleFromJSON(json['role']),
        'profileImagePath': !exists(json, 'profile_image_path') ? undefined : json['profile_image_path'],
        'team': UsersUserTeamFromJSON(json['team']),
        'skillRanks': ((json['skill_ranks'] as Array<any>).map(UsersUserSkillRanksInnerFromJSON)),
        'createdAt': (new Date(json['created_at'])),
        'updatedAt': (new Date(json['updated_at'])),
    };
}

export function UsersUserToJSON(value?: UsersUser | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'email': value.email,
        'profile_content': value.profileContent,
        'role': UsersUserRoleToJSON(value.role),
        'profile_image_path': value.profileImagePath,
        'team': UsersUserTeamToJSON(value.team),
        'skill_ranks': ((value.skillRanks as Array<any>).map(UsersUserSkillRanksInnerToJSON)),
        'created_at': (value.createdAt.toISOString()),
        'updated_at': (value.updatedAt.toISOString()),
    };
}

