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

/**
 * 
 * @export
 * @interface UserCreateRequestBody
 */
export interface UserCreateRequestBody {
    /**
     * ユーザー名
     * @type {string}
     * @memberof UserCreateRequestBody
     */
    name: string;
    /**
     * ユーザーのメールアドレス
     * @type {string}
     * @memberof UserCreateRequestBody
     */
    email: string;
    /**
     * ユーザーのプロフィール文
     * @type {string}
     * @memberof UserCreateRequestBody
     */
    profileContent: string | null;
    /**
     * 
     * @type {UsersUserRole}
     * @memberof UserCreateRequestBody
     */
    role: UsersUserRole;
    /**
     * ユーザーのパスワード
     * @type {string}
     * @memberof UserCreateRequestBody
     */
    password: string;
    /**
     * ユーザーのパスワード
     * @type {string}
     * @memberof UserCreateRequestBody
     */
    passwordConfirmation: string;
    /**
     * チームID
     * @type {number}
     * @memberof UserCreateRequestBody
     */
    teamId: number | null;
}

/**
 * Check if a given object implements the UserCreateRequestBody interface.
 */
export function instanceOfUserCreateRequestBody(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "profileContent" in value;
    isInstance = isInstance && "role" in value;
    isInstance = isInstance && "password" in value;
    isInstance = isInstance && "passwordConfirmation" in value;
    isInstance = isInstance && "teamId" in value;

    return isInstance;
}

export function UserCreateRequestBodyFromJSON(json: any): UserCreateRequestBody {
    return UserCreateRequestBodyFromJSONTyped(json, false);
}

export function UserCreateRequestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserCreateRequestBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'email': json['email'],
        'profileContent': json['profile_content'],
        'role': UsersUserRoleFromJSON(json['role']),
        'password': json['password'],
        'passwordConfirmation': json['password_confirmation'],
        'teamId': json['team_id'],
    };
}

export function UserCreateRequestBodyToJSON(value?: UserCreateRequestBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'email': value.email,
        'profile_content': value.profileContent,
        'role': UsersUserRoleToJSON(value.role),
        'password': value.password,
        'password_confirmation': value.passwordConfirmation,
        'team_id': value.teamId,
    };
}

