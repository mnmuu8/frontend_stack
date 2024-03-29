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
 * @interface UserProfileImagesAttachRequestBody
 */
export interface UserProfileImagesAttachRequestBody {
    /**
     * ユーザープロフィール画像のS3ファイルパス
     * @type {string}
     * @memberof UserProfileImagesAttachRequestBody
     */
    s3FilePath: string;
}

/**
 * Check if a given object implements the UserProfileImagesAttachRequestBody interface.
 */
export function instanceOfUserProfileImagesAttachRequestBody(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "s3FilePath" in value;

    return isInstance;
}

export function UserProfileImagesAttachRequestBodyFromJSON(json: any): UserProfileImagesAttachRequestBody {
    return UserProfileImagesAttachRequestBodyFromJSONTyped(json, false);
}

export function UserProfileImagesAttachRequestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserProfileImagesAttachRequestBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        's3FilePath': json['s3_file_path'],
    };
}

export function UserProfileImagesAttachRequestBodyToJSON(value?: UserProfileImagesAttachRequestBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        's3_file_path': value.s3FilePath,
    };
}

