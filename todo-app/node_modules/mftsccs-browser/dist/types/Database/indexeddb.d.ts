import { SettingData } from "../DataStructures/SettingData";
/**
 * This class will help us store the indexdb  reference in memory and not go back to index db.
 */
export declare class IndexDb {
    static db: IDBDatabase;
}
/**
 *
 * @param databaseName not required actually. This is not used you can pass anything.
 * @returns a promise that either resolves or rejects opening the database.
 */
export declare function openDatabase(databaseName: string): Promise<IDBDatabase>;
/**
 *
 * @param databaseName name of the database that you want to store data to.
 * @param object any object that can be stored but keep in mind it must follow the convention that we created
 * while creating the datbase.
 * @returns a promise that if a store is successful then the obejct is returned else rejects with the event.
 */
export declare function storeToDatabase(databaseName: string, object: any): Promise<any>;
/**
  *
  * @param databaseName name of the database
  * @param object this is the object that you want to update
  * @returns returns the object if it is updated successfully.
  */
export declare function UpdateToDatabase(databaseName: string, object: any): Promise<unknown>;
/**
 *
 * @returns This returns the last object from the database.
 */
export declare function GetLastSettingsFromDatabase(): Promise<unknown>;
/**
 *
 * @param object SettingData
 * @returns this will update the indexdb with the ai flag so that another time we do not have to pull
 *  ai data from the api.
 */
export declare function AiUpdateFlag(object: SettingData): Promise<unknown>;
/**
 *  this function will return all the objects that are in the database
 * @param databaseName name of the database
 * @returns all the objects that are in the database
 */
export declare function getObjectsFromIndexDb(databaseName: string): Promise<unknown>;
/**
 *
 * @param databaseName name of the database
 * @param id the id that we need to remove from the database (this is the index)
 * @returns an id if the deletion is successful and error with even in case it cannot.
 */
export declare function removeFromDatabase(databaseName: string, id: number): Promise<unknown>;
