import * as _         from "lodash";
import {
  SET_TIME_ENTRIES,
  UPDATE,
  DELETE,
  ADD
} from "./types";

export const TIME_ENTIRIES_ENDPOINT = "users/me/time_entries";
import ApiService from "@/core/services/ApiService";

const timeEntryApiService = new ApiService('/users/me/time_entries');

export default {
  async fetchTimeEntries({commit}) {
    const data = await timeEntryApiService.get();
    commit(SET_TIME_ENTRIES, data);
  },

  async createTimeEntry({rootGetters, commit }, timeEntry) {
    let newTimeEntry = Object.assign(timeEntry, {
      workspaceId: rootGetters["auth/currentWorkspaceId"]
    });
    let data = await timeEntryApiService.post(newTimeEntry);
    commit(ADD, data);
  },

  async updateTimeEntry({commit}, timeEntry) {
    const data = await timeEntryApiService.put(timeEntry.id, timeEntry);
    commit(UPDATE, data);
  },
  async deleteTimeEntry(context, timeEntryId) {
    await timeEntryApiService.delete(timeEntryId);
    context.commit(DELETE, timeEntryId);
  },
  async partialUpdate({state, dispatch}, object) {
    const timeEntry = _.find(state.timeEntries, { id: object.id });
    const changedTimeEntry = Object.assign({}, timeEntry, object);

    await dispatch("updateTimeEntry", changedTimeEntry);
  },
  async stopTimeEntry({dispatch}, {id, description}) {
    let patialTimeEntry = {
      id: id,
      description: description,
      stoppedAt: new Date().toISOString()
    }
    await dispatch("partialUpdate", patialTimeEntry);
  },
  async changeDescription({dispatch}, { id, description }) {
    let patialTimeEntry = {
      id: id,
      description: description
    }
    await dispatch("partialUpdate", patialTimeEntry);
  },
  async changeDuration({dispatch}, { id, startedAt, stoppedAt }) {
    let patialTimeEntry = {
      id: id,
      startedAt: startedAt,
      stoppedAt: stoppedAt
    }
    await dispatch("partialUpdate", patialTimeEntry);
  },
  async changeBillable({dispatch}, { id, billable }) {
    let patialTimeEntry = {
      id: id,
      billable: billable,
    }
    await dispatch("partialUpdate", patialTimeEntry);
  },
  async changeProject({dispatch}, { id, projectId }) {
    let patialTimeEntry = {
      id: id,
      projectId: projectId,
    }
    await dispatch("partialUpdate", patialTimeEntry);
  }

}
