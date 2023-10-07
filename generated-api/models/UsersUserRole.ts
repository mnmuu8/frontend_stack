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


/**
 * ユーザー役割
 * @export
 */
export const UsersUserRole = {
    Admin: 'admin',
    General: 'general'
} as const;
export type UsersUserRole = typeof UsersUserRole[keyof typeof UsersUserRole];


export function UsersUserRoleFromJSON(json: any): UsersUserRole {
    return UsersUserRoleFromJSONTyped(json, false);
}

export function UsersUserRoleFromJSONTyped(json: any, ignoreDiscriminator: boolean): UsersUserRole {
    return json as UsersUserRole;
}

export function UsersUserRoleToJSON(value?: UsersUserRole | null): any {
    return value as any;
}

