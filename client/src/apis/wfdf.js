import Axios from 'axios'

class WFDF {
  // todo: jsdoc for these exports
  // todo: make all these requests into promises that return the data
  // object so we don't have to get the data in the react component
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

  getItemDrops(uniqueItemName, isComponent) {
    return Axios.post(`/api/${this.apiVersion}/drops/item`, {itemUniqueName: uniqueItemName, isComponent: isComponent})
  }

  getDropLocation(locationName) {
    return Axios.post(`/api/${this.apiVersion}/drops/location`, {locationName: locationName})
  }
}

export default new WFDF()