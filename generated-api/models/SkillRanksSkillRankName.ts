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


/**
 * スキルランク名
 * @export
 */
export const SkillRanksSkillRankName = {
    Bronze: 'bronze',
    Silver: 'silver',
    Gold: 'gold',
    Platinum: 'platinum',
    Diamond: 'diamond',
    Master: 'master',
    Legend: 'legend'
} as const;
export type SkillRanksSkillRankName = typeof SkillRanksSkillRankName[keyof typeof SkillRanksSkillRankName];


export function SkillRanksSkillRankNameFromJSON(json: any): SkillRanksSkillRankName {
    return SkillRanksSkillRankNameFromJSONTyped(json, false);
}

export function SkillRanksSkillRankNameFromJSONTyped(json: any, ignoreDiscriminator: boolean): SkillRanksSkillRankName {
    return json as SkillRanksSkillRankName;
}

export function SkillRanksSkillRankNameToJSON(value?: SkillRanksSkillRankName | null): any {
    return value as any;
}

