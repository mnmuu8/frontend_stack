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
  TeamCreateRequestBody,
  TeamInviteRequestBody,
  TeamUpdateRequestBody,
  TeamsStackRankingList,
  TeamsTeam,
  TeamsTeamListInner,
} from '../models';
import {
    TeamCreateRequestBodyFromJSON,
    TeamCreateRequestBodyToJSON,
    TeamInviteRequestBodyFromJSON,
    TeamInviteRequestBodyToJSON,
    TeamUpdateRequestBodyFromJSON,
    TeamUpdateRequestBodyToJSON,
    TeamsStackRankingListFromJSON,
    TeamsStackRankingListToJSON,
    TeamsTeamFromJSON,
    TeamsTeamToJSON,
    TeamsTeamListInnerFromJSON,
    TeamsTeamListInnerToJSON,
} from '../models';

export interface ApiV1TeamsCreateRequest {
    teamCreateRequestBody: TeamCreateRequestBody;
}

export interface ApiV1TeamsDestroyRequest {
    teamId: number;
}

export interface ApiV1TeamsIndexRequest {
    name?: string;
}

export interface ApiV1TeamsInviteRequest {
    teamId: number;
    teamInviteRequestBody: TeamInviteRequestBody;
}

export interface ApiV1TeamsShowRequest {
    teamId: number;
}

export interface ApiV1TeamsStackRankingRequest {
    teamId: number;
}

export interface ApiV1TeamsUpdateRequest {
    teamId: number;
    teamUpdateRequestBody: TeamUpdateRequestBody;
}

/**
 * 
 */
export class TeamApi extends runtime.BaseAPI {

    /**
     * チーム作成
     */
    async apiV1TeamsCreateRaw(requestParameters: ApiV1TeamsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TeamsTeam>> {
        if (requestParameters.teamCreateRequestBody === null || requestParameters.teamCreateRequestBody === undefined) {
            throw new runtime.RequiredError('teamCreateRequestBody','Required parameter requestParameters.teamCreateRequestBody was null or undefined when calling apiV1TeamsCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/teams`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TeamCreateRequestBodyToJSON(requestParameters.teamCreateRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TeamsTeamFromJSON(jsonValue));
    }

    /**
     * チーム作成
     */
    async apiV1TeamsCreate(requestParameters: ApiV1TeamsCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TeamsTeam> {
        const response = await this.apiV1TeamsCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * チーム削除API
     */
    async apiV1TeamsDestroyRaw(requestParameters: ApiV1TeamsDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.teamId === null || requestParameters.teamId === undefined) {
            throw new runtime.RequiredError('teamId','Required parameter requestParameters.teamId was null or undefined when calling apiV1TeamsDestroy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/teams/{team_id}`.replace(`{${"team_id"}}`, encodeURIComponent(String(requestParameters.teamId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * チーム削除API
     */
    async apiV1TeamsDestroy(requestParameters: ApiV1TeamsDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiV1TeamsDestroyRaw(requestParameters, initOverrides);
    }

    /**
     * チーム一覧
     */
    async apiV1TeamsIndexRaw(requestParameters: ApiV1TeamsIndexRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<TeamsTeamListInner>>> {
        const queryParameters: any = {};

        if (requestParameters.name !== undefined) {
            queryParameters['name'] = requestParameters.name;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/teams`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TeamsTeamListInnerFromJSON));
    }

    /**
     * チーム一覧
     */
    async apiV1TeamsIndex(requestParameters: ApiV1TeamsIndexRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<TeamsTeamListInner>> {
        const response = await this.apiV1TeamsIndexRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * チームメンバー招待
     */
    async apiV1TeamsInviteRaw(requestParameters: ApiV1TeamsInviteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.teamId === null || requestParameters.teamId === undefined) {
            throw new runtime.RequiredError('teamId','Required parameter requestParameters.teamId was null or undefined when calling apiV1TeamsInvite.');
        }

        if (requestParameters.teamInviteRequestBody === null || requestParameters.teamInviteRequestBody === undefined) {
            throw new runtime.RequiredError('teamInviteRequestBody','Required parameter requestParameters.teamInviteRequestBody was null or undefined when calling apiV1TeamsInvite.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/teams/{team_id}/invite`.replace(`{${"team_id"}}`, encodeURIComponent(String(requestParameters.teamId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: TeamInviteRequestBodyToJSON(requestParameters.teamInviteRequestBody),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * チームメンバー招待
     */
    async apiV1TeamsInvite(requestParameters: ApiV1TeamsInviteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiV1TeamsInviteRaw(requestParameters, initOverrides);
    }

    /**
     * チーム詳細
     */
    async apiV1TeamsShowRaw(requestParameters: ApiV1TeamsShowRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TeamsTeam>> {
        if (requestParameters.teamId === null || requestParameters.teamId === undefined) {
            throw new runtime.RequiredError('teamId','Required parameter requestParameters.teamId was null or undefined when calling apiV1TeamsShow.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/teams/{team_id}`.replace(`{${"team_id"}}`, encodeURIComponent(String(requestParameters.teamId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TeamsTeamFromJSON(jsonValue));
    }

    /**
     * チーム詳細
     */
    async apiV1TeamsShow(requestParameters: ApiV1TeamsShowRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TeamsTeam> {
        const response = await this.apiV1TeamsShowRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * チーム内積み上げ時間ランキング
     */
    async apiV1TeamsStackRankingRaw(requestParameters: ApiV1TeamsStackRankingRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TeamsStackRankingList>> {
        if (requestParameters.teamId === null || requestParameters.teamId === undefined) {
            throw new runtime.RequiredError('teamId','Required parameter requestParameters.teamId was null or undefined when calling apiV1TeamsStackRanking.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/teams/{team_id}/stack_ranking`.replace(`{${"team_id"}}`, encodeURIComponent(String(requestParameters.teamId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TeamsStackRankingListFromJSON(jsonValue));
    }

    /**
     * チーム内積み上げ時間ランキング
     */
    async apiV1TeamsStackRanking(requestParameters: ApiV1TeamsStackRankingRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TeamsStackRankingList> {
        const response = await this.apiV1TeamsStackRankingRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * チーム更新
     */
    async apiV1TeamsUpdateRaw(requestParameters: ApiV1TeamsUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TeamsTeam>> {
        if (requestParameters.teamId === null || requestParameters.teamId === undefined) {
            throw new runtime.RequiredError('teamId','Required parameter requestParameters.teamId was null or undefined when calling apiV1TeamsUpdate.');
        }

        if (requestParameters.teamUpdateRequestBody === null || requestParameters.teamUpdateRequestBody === undefined) {
            throw new runtime.RequiredError('teamUpdateRequestBody','Required parameter requestParameters.teamUpdateRequestBody was null or undefined when calling apiV1TeamsUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/teams/{team_id}`.replace(`{${"team_id"}}`, encodeURIComponent(String(requestParameters.teamId))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: TeamUpdateRequestBodyToJSON(requestParameters.teamUpdateRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TeamsTeamFromJSON(jsonValue));
    }

    /**
     * チーム更新
     */
    async apiV1TeamsUpdate(requestParameters: ApiV1TeamsUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TeamsTeam> {
        const response = await this.apiV1TeamsUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
