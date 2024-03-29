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
  SkillsSkillListInner,
} from '../models';
import {
    SkillsSkillListInnerFromJSON,
    SkillsSkillListInnerToJSON,
} from '../models';

/**
 * 
 */
export class SkillApi extends runtime.BaseAPI {

    /**
     * スキルマスタデータ取得
     */
    async apiV1SkillsIndexRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<SkillsSkillListInner>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/skills`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(SkillsSkillListInnerFromJSON));
    }

    /**
     * スキルマスタデータ取得
     */
    async apiV1SkillsIndex(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<SkillsSkillListInner>> {
        const response = await this.apiV1SkillsIndexRaw(initOverrides);
        return await response.value();
    }

}
