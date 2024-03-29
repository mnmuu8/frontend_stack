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


import * as runtime from '../runtime';
import type {
  UsersProfilesUploadUrl,
} from '../models';
import {
    UsersProfilesUploadUrlFromJSON,
    UsersProfilesUploadUrlToJSON,
} from '../models';

export interface ApiV1UsersProfilesUploadUrlRequest {
    userId: number;
    filename: string;
    byteSize: number;
    contentType: string;
}

/**
 * 
 */
export class UserProfileApi extends runtime.BaseAPI {

    /**
     * ユーザーデータ詳細
     */
    async apiV1UsersProfilesUploadUrlRaw(requestParameters: ApiV1UsersProfilesUploadUrlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UsersProfilesUploadUrl>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling apiV1UsersProfilesUploadUrl.');
        }

        if (requestParameters.filename === null || requestParameters.filename === undefined) {
            throw new runtime.RequiredError('filename','Required parameter requestParameters.filename was null or undefined when calling apiV1UsersProfilesUploadUrl.');
        }

        if (requestParameters.byteSize === null || requestParameters.byteSize === undefined) {
            throw new runtime.RequiredError('byteSize','Required parameter requestParameters.byteSize was null or undefined when calling apiV1UsersProfilesUploadUrl.');
        }

        if (requestParameters.contentType === null || requestParameters.contentType === undefined) {
            throw new runtime.RequiredError('contentType','Required parameter requestParameters.contentType was null or undefined when calling apiV1UsersProfilesUploadUrl.');
        }

        const queryParameters: any = {};

        if (requestParameters.filename !== undefined) {
            queryParameters['filename'] = requestParameters.filename;
        }

        if (requestParameters.byteSize !== undefined) {
            queryParameters['byte_size'] = requestParameters.byteSize;
        }

        if (requestParameters.contentType !== undefined) {
            queryParameters['content_type'] = requestParameters.contentType;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/users/{user_id}/profiles/upload_url`.replace(`{${"user_id"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UsersProfilesUploadUrlFromJSON(jsonValue));
    }

    /**
     * ユーザーデータ詳細
     */
    async apiV1UsersProfilesUploadUrl(requestParameters: ApiV1UsersProfilesUploadUrlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UsersProfilesUploadUrl> {
        const response = await this.apiV1UsersProfilesUploadUrlRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
