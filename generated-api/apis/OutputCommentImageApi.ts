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
  OutputsCommentsImagesUploadUrl,
} from '../models';
import {
    OutputsCommentsImagesUploadUrlFromJSON,
    OutputsCommentsImagesUploadUrlToJSON,
} from '../models';

export interface ApiV1OutputsCommentsImagesUploadUrlRequest {
    outputId: number;
    outputCommentId: number;
    filename: string;
    byteSize: number;
    contentType: string;
}

/**
 * 
 */
export class OutputCommentImageApi extends runtime.BaseAPI {

    /**
     * アウトプットコメント画像アップロードURL取得
     */
    async apiV1OutputsCommentsImagesUploadUrlRaw(requestParameters: ApiV1OutputsCommentsImagesUploadUrlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OutputsCommentsImagesUploadUrl>> {
        if (requestParameters.outputId === null || requestParameters.outputId === undefined) {
            throw new runtime.RequiredError('outputId','Required parameter requestParameters.outputId was null or undefined when calling apiV1OutputsCommentsImagesUploadUrl.');
        }

        if (requestParameters.outputCommentId === null || requestParameters.outputCommentId === undefined) {
            throw new runtime.RequiredError('outputCommentId','Required parameter requestParameters.outputCommentId was null or undefined when calling apiV1OutputsCommentsImagesUploadUrl.');
        }

        if (requestParameters.filename === null || requestParameters.filename === undefined) {
            throw new runtime.RequiredError('filename','Required parameter requestParameters.filename was null or undefined when calling apiV1OutputsCommentsImagesUploadUrl.');
        }

        if (requestParameters.byteSize === null || requestParameters.byteSize === undefined) {
            throw new runtime.RequiredError('byteSize','Required parameter requestParameters.byteSize was null or undefined when calling apiV1OutputsCommentsImagesUploadUrl.');
        }

        if (requestParameters.contentType === null || requestParameters.contentType === undefined) {
            throw new runtime.RequiredError('contentType','Required parameter requestParameters.contentType was null or undefined when calling apiV1OutputsCommentsImagesUploadUrl.');
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
            path: `/api/v1/outputs/{output_id}/comments/{output_comment_id}/images/upload_url`.replace(`{${"output_id"}}`, encodeURIComponent(String(requestParameters.outputId))).replace(`{${"output_comment_id"}}`, encodeURIComponent(String(requestParameters.outputCommentId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OutputsCommentsImagesUploadUrlFromJSON(jsonValue));
    }

    /**
     * アウトプットコメント画像アップロードURL取得
     */
    async apiV1OutputsCommentsImagesUploadUrl(requestParameters: ApiV1OutputsCommentsImagesUploadUrlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OutputsCommentsImagesUploadUrl> {
        const response = await this.apiV1OutputsCommentsImagesUploadUrlRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
