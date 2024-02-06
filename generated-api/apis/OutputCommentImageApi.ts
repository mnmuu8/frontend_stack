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
  OutputCommentImagesAttachRequestBody,
  OutputsCommentsImagesUploadUrl,
  OutputsImagesImage,
} from '../models';
import {
    OutputCommentImagesAttachRequestBodyFromJSON,
    OutputCommentImagesAttachRequestBodyToJSON,
    OutputsCommentsImagesUploadUrlFromJSON,
    OutputsCommentsImagesUploadUrlToJSON,
    OutputsImagesImageFromJSON,
    OutputsImagesImageToJSON,
} from '../models';

export interface ApiV1OutputsCommentsImagesAttachRequest {
    outputId: number;
    outputCommentImagesAttachRequestBody: OutputCommentImagesAttachRequestBody;
}

export interface ApiV1OutputsCommentsImagesUploadUrlRequest {
    outputId: number;
    filename: string;
    byteSize: number;
    contentType: string;
}

/**
 * 
 */
export class OutputCommentImageApi extends runtime.BaseAPI {

    /**
     * アウトプットコメント画像登録
     */
    async apiV1OutputsCommentsImagesAttachRaw(requestParameters: ApiV1OutputsCommentsImagesAttachRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OutputsImagesImage>> {
        if (requestParameters.outputId === null || requestParameters.outputId === undefined) {
            throw new runtime.RequiredError('outputId','Required parameter requestParameters.outputId was null or undefined when calling apiV1OutputsCommentsImagesAttach.');
        }

        if (requestParameters.outputCommentImagesAttachRequestBody === null || requestParameters.outputCommentImagesAttachRequestBody === undefined) {
            throw new runtime.RequiredError('outputCommentImagesAttachRequestBody','Required parameter requestParameters.outputCommentImagesAttachRequestBody was null or undefined when calling apiV1OutputsCommentsImagesAttach.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/outputs/{output_id}/comments/images/attach`.replace(`{${"output_id"}}`, encodeURIComponent(String(requestParameters.outputId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: OutputCommentImagesAttachRequestBodyToJSON(requestParameters.outputCommentImagesAttachRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OutputsImagesImageFromJSON(jsonValue));
    }

    /**
     * アウトプットコメント画像登録
     */
    async apiV1OutputsCommentsImagesAttach(requestParameters: ApiV1OutputsCommentsImagesAttachRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OutputsImagesImage> {
        const response = await this.apiV1OutputsCommentsImagesAttachRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * アウトプットコメント画像アップロードURL取得
     */
    async apiV1OutputsCommentsImagesUploadUrlRaw(requestParameters: ApiV1OutputsCommentsImagesUploadUrlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OutputsCommentsImagesUploadUrl>> {
        if (requestParameters.outputId === null || requestParameters.outputId === undefined) {
            throw new runtime.RequiredError('outputId','Required parameter requestParameters.outputId was null or undefined when calling apiV1OutputsCommentsImagesUploadUrl.');
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
            path: `/api/v1/outputs/{output_id}/comments/images/upload_url`.replace(`{${"output_id"}}`, encodeURIComponent(String(requestParameters.outputId))),
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