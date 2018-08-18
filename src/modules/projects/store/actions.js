import {
  SET_PROJECTS,
  DELETE,
  ADD,
  UPDATE
} from "./types";

import ApiService from "@/core/services/ApiService";

const projectsApiService = new ApiService("/users/me/projects");

export default {
  async fetchProjects(context) {
    const projects = await projectsApiService.get();
    context.commit(SET_PROJECTS, projects);
  },

  async destroy(context, projectId) {
    const data = await projectsApiService.delete(
      projectId,
      { workspaceId: context.rootGetters["auth/currentWorkspaceId"] }
    )
    context.commit(DELETE, data.id);
  },

  async create(context, projectParams) {
    projectParams.workspaceId = context.rootGetters["auth/currentWorkspaceId"];
    const data = await projectsApiService.post(projectParams)
    context.commit(ADD, data);
  },

  async update(context, { id, newName }) {
    const data = projectsApiService.put(id, { name: newName })
    context.commit(UPDATE, data);
  }
}
