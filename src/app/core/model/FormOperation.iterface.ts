import { FormGroup } from "@angular/forms";

export interface FormOperation {
  /**
   * @description `createForm`  method is used to initialize the form
   * and it returns void or promise<void> to allow developer use it with Async/Await
   *
   * @returns `void |  Promise<void>`
   */
  createForm<T>();
  /**
   * @description `saveForm`  method is used to post form data to backend
   * and it returns void or promise<void> to allow developer use it with Async/Await
   *
   * @returns `void |  Promise<void>`
   */
  saveForm<T>(formInstance?: FormGroup);
  /**
   * @description `resetForm`  method is used to reset form values
   * and it returns void or promise<void> to allow developer use it with Async/Await
   *@param `formInstance` @type FormGroup
   * @returns `void |  Promise<void>`
   */
  resetForm<T>(formInstance?: FormGroup);
  /**
   * @description `updateData`  method is used to update form values to backend
   * and it returns void or promise<void> to allow developer use it with Async/Await
   *
   * @returns `void |  Promise<void>`
   */
  updateData<T>(updateObject: T, id?: T);
  /**
   * @description `deleteData`  method is used to delete object from backend
   * and it returns void or promise<void> to allow developer use it with Async/Await
   * @param `deleteObject` @type T
   * @param `id` @type T
   * @returns `void |  Promise<void>`
   */
  deleteData<T>(deleteObject: T, id?: T);
  /**
   * @description `getFormValues`  method is used to return all form values
   * and it returns void or promise<void> to allow developer use it with Async/Await
   * @param `deleteObject` @type T
   * @param `id` @type T
   * @returns `form values` @type T
   */
  getFormValues<T>(formInstance?: FormGroup);
}
