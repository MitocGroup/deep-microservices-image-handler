/**
 * Created by Stefan Hariton on 9/21/15.
 */

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {

  /**
   * @param {Array} args
   */
  constructor(...args) {
    super(...args);
  }

  handle(request) {
    this.createResponse('Not implemented yet', JSON.stringify(request)).send();
  }
}
