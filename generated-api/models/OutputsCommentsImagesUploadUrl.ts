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
 * @interface OutputsCommentsImagesUploadUrl
 */
export interface OutputsCommentsImagesUploadUrl {
    /**
     * 署名付きURL
     * @type {string}
     * @memberof OutputsCommentsImagesUploadUrl
     */
    url: string;
}

/**
 * Check if a given object implements the OutputsCommentsImagesUploadUrl interface.
 */
export function instanceOfOutputsCommentsImagesUploadUrl(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "url" in value;

    return isInstance;
}

export function OutputsCommentsImagesUploadUrlFromJSON(json: any): OutputsCommentsImagesUploadUrl {
    return OutputsCommentsImagesUploadUrlFromJSONTyped(json, false);
}

export function OutputsCommentsImagesUploadUrlFromJSONTyped(json: any, ignoreDiscriminator: boolean): OutputsCommentsImagesUploadUrl {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'url': json['url'],
    };
}

export function OutputsCommentsImagesUploadUrlToJSON(value?: OutputsCommentsImagesUploadUrl | null): any {
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

