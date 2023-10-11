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
  OutputCreateRequestBody,
  OutputsOutput,
} from '../models';
import {
    OutputCreateRequestBodyFromJSON,
    OutputCreateRequestBodyToJSON,
    OutputsOutputFromJSON,
    OutputsOutputToJSON,
} from '../models';

export interface ApiV1OutputsCreateRequest {
    outputCreateRequestBody: OutputCreateRequestBody;
}

/**
 * 
 */
export class OutputApi extends runtime.BaseAPI {

    /**
     * アウトプット作成
     */
    async apiV1OutputsCreateRaw(requestParameters: ApiV1OutputsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OutputsOutput>> {
        if (requestParameters.outputCreateRequestBody === null || requestParameters.outputCreateRequestBody === undefined) {
            throw new runtime.RequiredError('outputCreateRequestBody','Required parameter requestParameters.outputCreateRequestBody was null or undefined when calling apiV1OutputsCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/outputs/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: OutputCreateRequestBodyToJSON(requestParameters.outputCreateRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OutputsOutputFromJSON(jsonValue));
    }

    /**
     * アウトプット作成
     */
    async apiV1OutputsCreate(requestParameters: ApiV1OutputsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OutputsOutput> {
        const response = await this.apiV1OutputsCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}