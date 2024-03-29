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
  StacksCreateRequestBody,
  StacksIntrospectionCreateRequestBody,
  StacksIntrospectionUpdateRequestBody,
  StacksIntrospectionsIntrospection,
  StacksStack,
  StacksStackListInner,
  StacksUpdateRequestBody,
} from '../models';
import {
    StacksCreateRequestBodyFromJSON,
    StacksCreateRequestBodyToJSON,
    StacksIntrospectionCreateRequestBodyFromJSON,
    StacksIntrospectionCreateRequestBodyToJSON,
    StacksIntrospectionUpdateRequestBodyFromJSON,
    StacksIntrospectionUpdateRequestBodyToJSON,
    StacksIntrospectionsIntrospectionFromJSON,
    StacksIntrospectionsIntrospectionToJSON,
    StacksStackFromJSON,
    StacksStackToJSON,
    StacksStackListInnerFromJSON,
    StacksStackListInnerToJSON,
    StacksUpdateRequestBodyFromJSON,
    StacksUpdateRequestBodyToJSON,
} from '../models';

export interface ApiV1StacksCreateRequest {
    stacksCreateRequestBody: StacksCreateRequestBody;
}

export interface ApiV1StacksDestroyRequest {
    stackId: number;
}

export interface ApiV1StacksIndexRequest {
    userId?: number;
    teamId?: number;
}

export interface ApiV1StacksIntrospectionsCreateRequest {
    stackId: number;
    stacksIntrospectionCreateRequestBody: StacksIntrospectionCreateRequestBody;
}

export interface ApiV1StacksIntrospectionsShowRequest {
    stackId: number;
}

export interface ApiV1StacksIntrospectionsUpdateRequest {
    stackId: number;
    stacksIntrospectionUpdateRequestBody: StacksIntrospectionUpdateRequestBody;
}

export interface ApiV1StacksUpdateRequest {
    stackId: number;
    stacksUpdateRequestBody: StacksUpdateRequestBody;
}

/**
 * 
 */
export class StackApi extends runtime.BaseAPI {

    /**
     * 積み上げ作成
     */
    async apiV1StacksCreateRaw(requestParameters: ApiV1StacksCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StacksStack>> {
        if (requestParameters.stacksCreateRequestBody === null || requestParameters.stacksCreateRequestBody === undefined) {
            throw new runtime.RequiredError('stacksCreateRequestBody','Required parameter requestParameters.stacksCreateRequestBody was null or undefined when calling apiV1StacksCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/stacks`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: StacksCreateRequestBodyToJSON(requestParameters.stacksCreateRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StacksStackFromJSON(jsonValue));
    }

    /**
     * 積み上げ作成
     */
    async apiV1StacksCreate(requestParameters: ApiV1StacksCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StacksStack> {
        const response = await this.apiV1StacksCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 積み上げ削除API
     */
    async apiV1StacksDestroyRaw(requestParameters: ApiV1StacksDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.stackId === null || requestParameters.stackId === undefined) {
            throw new runtime.RequiredError('stackId','Required parameter requestParameters.stackId was null or undefined when calling apiV1StacksDestroy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/stacks/{stack_id}`.replace(`{${"stack_id"}}`, encodeURIComponent(String(requestParameters.stackId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * 積み上げ削除API
     */
    async apiV1StacksDestroy(requestParameters: ApiV1StacksDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiV1StacksDestroyRaw(requestParameters, initOverrides);
    }

    /**
     * 積み上げ一覧
     */
    async apiV1StacksIndexRaw(requestParameters: ApiV1StacksIndexRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<StacksStackListInner>>> {
        const queryParameters: any = {};

        if (requestParameters.userId !== undefined) {
            queryParameters['user_id'] = requestParameters.userId;
        }

        if (requestParameters.teamId !== undefined) {
            queryParameters['team_id'] = requestParameters.teamId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/stacks`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(StacksStackListInnerFromJSON));
    }

    /**
     * 積み上げ一覧
     */
    async apiV1StacksIndex(requestParameters: ApiV1StacksIndexRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<StacksStackListInner>> {
        const response = await this.apiV1StacksIndexRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 積み上げの反省登録API
     */
    async apiV1StacksIntrospectionsCreateRaw(requestParameters: ApiV1StacksIntrospectionsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StacksIntrospectionsIntrospection>> {
        if (requestParameters.stackId === null || requestParameters.stackId === undefined) {
            throw new runtime.RequiredError('stackId','Required parameter requestParameters.stackId was null or undefined when calling apiV1StacksIntrospectionsCreate.');
        }

        if (requestParameters.stacksIntrospectionCreateRequestBody === null || requestParameters.stacksIntrospectionCreateRequestBody === undefined) {
            throw new runtime.RequiredError('stacksIntrospectionCreateRequestBody','Required parameter requestParameters.stacksIntrospectionCreateRequestBody was null or undefined when calling apiV1StacksIntrospectionsCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/stacks/{stack_id}/introspections`.replace(`{${"stack_id"}}`, encodeURIComponent(String(requestParameters.stackId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: StacksIntrospectionCreateRequestBodyToJSON(requestParameters.stacksIntrospectionCreateRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StacksIntrospectionsIntrospectionFromJSON(jsonValue));
    }

    /**
     * 積み上げの反省登録API
     */
    async apiV1StacksIntrospectionsCreate(requestParameters: ApiV1StacksIntrospectionsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StacksIntrospectionsIntrospection> {
        const response = await this.apiV1StacksIntrospectionsCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 積み上げの反省詳細API
     */
    async apiV1StacksIntrospectionsShowRaw(requestParameters: ApiV1StacksIntrospectionsShowRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StacksIntrospectionsIntrospection>> {
        if (requestParameters.stackId === null || requestParameters.stackId === undefined) {
            throw new runtime.RequiredError('stackId','Required parameter requestParameters.stackId was null or undefined when calling apiV1StacksIntrospectionsShow.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/stacks/{stack_id}/introspection`.replace(`{${"stack_id"}}`, encodeURIComponent(String(requestParameters.stackId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StacksIntrospectionsIntrospectionFromJSON(jsonValue));
    }

    /**
     * 積み上げの反省詳細API
     */
    async apiV1StacksIntrospectionsShow(requestParameters: ApiV1StacksIntrospectionsShowRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StacksIntrospectionsIntrospection> {
        const response = await this.apiV1StacksIntrospectionsShowRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 積み上げの反省更新API
     */
    async apiV1StacksIntrospectionsUpdateRaw(requestParameters: ApiV1StacksIntrospectionsUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StacksIntrospectionsIntrospection>> {
        if (requestParameters.stackId === null || requestParameters.stackId === undefined) {
            throw new runtime.RequiredError('stackId','Required parameter requestParameters.stackId was null or undefined when calling apiV1StacksIntrospectionsUpdate.');
        }

        if (requestParameters.stacksIntrospectionUpdateRequestBody === null || requestParameters.stacksIntrospectionUpdateRequestBody === undefined) {
            throw new runtime.RequiredError('stacksIntrospectionUpdateRequestBody','Required parameter requestParameters.stacksIntrospectionUpdateRequestBody was null or undefined when calling apiV1StacksIntrospectionsUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/stacks/{stack_id}/introspection`.replace(`{${"stack_id"}}`, encodeURIComponent(String(requestParameters.stackId))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: StacksIntrospectionUpdateRequestBodyToJSON(requestParameters.stacksIntrospectionUpdateRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StacksIntrospectionsIntrospectionFromJSON(jsonValue));
    }

    /**
     * 積み上げの反省更新API
     */
    async apiV1StacksIntrospectionsUpdate(requestParameters: ApiV1StacksIntrospectionsUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StacksIntrospectionsIntrospection> {
        const response = await this.apiV1StacksIntrospectionsUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 積み上げ更新API
     */
    async apiV1StacksUpdateRaw(requestParameters: ApiV1StacksUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StacksStack>> {
        if (requestParameters.stackId === null || requestParameters.stackId === undefined) {
            throw new runtime.RequiredError('stackId','Required parameter requestParameters.stackId was null or undefined when calling apiV1StacksUpdate.');
        }

        if (requestParameters.stacksUpdateRequestBody === null || requestParameters.stacksUpdateRequestBody === undefined) {
            throw new runtime.RequiredError('stacksUpdateRequestBody','Required parameter requestParameters.stacksUpdateRequestBody was null or undefined when calling apiV1StacksUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/stacks/{stack_id}`.replace(`{${"stack_id"}}`, encodeURIComponent(String(requestParameters.stackId))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: StacksUpdateRequestBodyToJSON(requestParameters.stacksUpdateRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StacksStackFromJSON(jsonValue));
    }

    /**
     * 積み上げ更新API
     */
    async apiV1StacksUpdate(requestParameters: ApiV1StacksUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StacksStack> {
        const response = await this.apiV1StacksUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
