import { InnerActions } from "../../app";
/**
 * This function converts a json data to concept connection and also preserves its relation.
 * @param json The json data that needs to be converted to the concept connection system
 * @param ofTheConceptId If in case that this composition is part of other composition then this must be the connecting concept.
 * @param ofTheConceptUserId If in case that this composition is part of other composition then this must be the user Id of the  connecting concept.
 * @param mainKey If in case that this composition is part of other composition then this must be the main composition
 * @param userId The user Id of the user creating the composition.
 * @param accessId The accessId of the user creating the composition.
 * @param sessionInformationId Session of the user.
 * @param automaticSync for future use.
 * @returns the main concept of this composition.
 */
export declare function CreateTheCompositionLocal(json: any, ofTheConceptId?: number | null, ofTheConceptUserId?: number | null, mainKey?: number | null, userId?: number | null, accessId?: number | null, sessionInformationId?: number | null, automaticSync?: boolean, actions?: InnerActions): Promise<any>;
