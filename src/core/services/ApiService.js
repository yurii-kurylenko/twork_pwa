import configs from "../../configs";
import fetch from "isomorphic-fetch";

export default class ApiService {
    constructor(resourceName) {
      this.resourceName = resourceName;
      this.basePath = configs.apiUrl + resourceName;
    }

    async get() {
      try {
        const resp = await fetch(this.basePath, { headers: this.requestHeaders() });
        return await resp.json();
      } catch (error) {
        console.log(error);
      }
    }

    async post(params = {}) {
      try {
        const resp = await fetch(
          this.basePath, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: this.requestHeaders()
          }
        );
        return await resp.json();
      } catch (error) {
        console.log(error);
      }
    }

    async put(id, params = {}) {
      try {
        const resp = await fetch(
          this.basePath + '/' + id, {
            method: 'PUT',
            body: JSON.stringify(params),
            headers: this.requestHeaders()
          }
        );
        return await resp.json();
      } catch (error) {
        console.log(error);
      }
    }

    async delete(id, params = {}) {
      try {
        const resp = await fetch(
          this.basePath + '/' + id,
          {
            method: 'DELETE',
            body: JSON.stringify(params),
            headers: this.requestHeaders()
          }
        );
        return await resp.json();
      } catch (error) {
        console.log(error);
      }
    }

    requestHeaders() {
      return {
        'Authorization': `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    }

}