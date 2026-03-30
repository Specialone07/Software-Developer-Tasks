import { Concept } from "../../DataStructures/Concept";
import { InnerActions } from "../../Constants/general.const";
/**
 * There are two types of concepts. One type of concept is a type concept. These concepts have no actual value and do not mean
 * anything unless they are associated with other values. These are placeholders like first_name, last_name, age etc that are required in the system.
 * These types need to be created seperately.
 *
 *
 * @param typeString type of the concept that needs to be created.
 * @param sessionId SessionId of the user
 * @param sessionUserId Not required pass 999
 * @param userId UserId of the user creating this concept
 * @param actions InnerActions|undefined actions to collect
 * @returns
 */
export declare function MakeTheTypeConceptLocal(typeString: string, sessionId: number, sessionUserId: number, userId: number, actions?: InnerActions): Promise<Concept>;
