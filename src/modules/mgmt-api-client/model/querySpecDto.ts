/**
 * EDC REST API
 * EDC REST APIs - merged by OpenApiMerger
 *
 * The version of the OpenAPI document: 0.0.1-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { CriterionDto } from './criterionDto';


export interface QuerySpecDto { 
    filter?: string;
    filterExpression?: Array<CriterionDto>;
    limit?: number;
    offset?: number;
    sortField?: string;
    sortOrder?: QuerySpecDto.SortOrderEnum;
}
export namespace QuerySpecDto {
    export type SortOrderEnum = 'ASC' | 'DESC';
    export const SortOrderEnum = {
        Asc: 'ASC' as SortOrderEnum,
        Desc: 'DESC' as SortOrderEnum
    };
}


