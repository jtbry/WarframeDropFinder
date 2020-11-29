import Axios from 'axios'

class WFDF {
  constructor() {
    this.apiVersion = 'v1'
  }

  getRecentPatchlogs() {
    return Axios.get(`/api/${this.apiVersion}/wfdf/patchlogs`)
  }

  getRecentUpdates() {
    return Axios.get(`/api/${this.apiVersion}/wfdf/updates`)
  }

  searchForItem(itemName, filters) {
    const reqBody = {
      itemName: itemName,
      filters: filters || {}
    }

    return Axios.post(`/api/${this.apiVersion}/search/items`, reqBody)
  }

  getItem(uniqueItemName) {
    return Axios.post(`/api/${this.apiVersion}/items`, {itemUniqueName: uniqueItemName})
  }

  getComponent(uniqueComponentName) {
    return Axios.post(`/api/${this.apiVersion}/items/component`, {componentUniqueName: uniqueComponentName})
  }
}

export default new WFDF()