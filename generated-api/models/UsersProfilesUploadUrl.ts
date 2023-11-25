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
 * @interface UsersProfilesUploadUrl
 */
export interface UsersProfilesUploadUrl {
    /**
     * 署名付きURL
     * @type {string}
     * @memberof UsersProfilesUploadUrl
     */
    url: string;
}

/**
 * Check if a given object implements the UsersProfilesUploadUrl interface.
 */
export function instanceOfUsersProfilesUploadUrl(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "url" in value;

    return isInstance;
}

export function UsersProfilesUploadUrlFromJSON(json: any): UsersProfilesUploadUrl {
    return UsersProfilesUploadUrlFromJSONTyped(json, false);
}

export function UsersProfilesUploadUrlFromJSONTyped(json: any, ignoreDiscriminator: boolean): UsersProfilesUploadUrl {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'url': json['url'],
    };
}

export function UsersProfilesUploadUrlToJSON(value?: UsersProfilesUploadUrl | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'url': value.url,
    };
}

