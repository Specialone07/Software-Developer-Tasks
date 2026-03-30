import { InnerActions } from "../../app";
/**
 * This function creates the concept in the local system (Local memory and IndexDb) but not in the backend database
 * To create this concept in the backend database you need to sync the local data to the backend by LocalSyncData class.
 *
 * This function creates a id and ghost id which are equal to each other.
 * These id and ghostId are negative which means that they are virtual concepts. After these concepts have been synced with the backend
 * they are converted to real id. After returning from the backend the id changes to positive(+) and real id while the ghostId remains the same
 *
 * The system then saves this relation between -ve id and real id in the backend server and also in the local memory.
 *
 * @param referent This is the string that is the actual value of the concept.
 * @param typecharacter The string that defines the type of the concept.
 * @param userId This is the userId of the creator.
 * @param categoryId This is the category Id of the concept.
 * @param typeId This is the type Id of the concept that relates to the typecharacter passed above.
 * @param accessId This is the accessId of the concept(most probably is the accessId of the user)
 * @param isComposition This is set in the case that the composition needs to be created.
 * @param referentId if this concept refers to any other concept then this needs to be passed.
 * @returns
 */
export default function CreateTheConceptLocal(referent: string, typecharacter: string, userId: number, categoryId: number, typeId: number, accessId: number, isComposition?: boolean, referentId?: number, actions?: InnerActions): Promise<any>;
