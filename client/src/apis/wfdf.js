import Axios from 'axios'

class WFDF {
  constructor() {
    this.apiVersion = 'v1'
  }

  getRecentPatchlogs() {
    return Axios.get(`/api/${this.apiVersion}/patchlogs`)
  }

  getRecentUpdates() {
    return Axios.get(`/api/${this.apiVersion}/updates`)
  }

  searchForItem(itemName, filters) {
    const reqBody = {
      itemName: itemName,
      filters: filters || {}
    }

    return Axios.post(`/api/${this.apiVersion}/search/items`, reqBody)
  }

  getItem(uniqueItemName) {
    return Axios.post(`/api/${this.apiVersion}/item`, {itemUniqueName: uniqueItemName})
  }
}

export default new WFDF()