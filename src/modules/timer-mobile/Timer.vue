<template>
    <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <div v-for="(timeEntries, date) in timeEntryGroups" :key="date">
          <TimeEntryGroup two-line subheader :timeEntriesDate="date" :timeEntries="timeEntries"> </TimeEntryGroup>
          <v-divider></v-divider>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import addToHomeScreen from "@/core/services/addToHomeScreen";
  import subscriptionsManager from  "@/core/services/subscriptionsManager";
  import TimeEntryGroup from "./TimeEntryGroup";

  export default {
    name: 'Timer',
    components: {
      TimeEntryGroup
    },
    data: () => {
      return {
        selected: [2]
      }
    },
    computed: {
      ...mapGetters({
        stoppedTimeEntries: 'timers/stoppedTimeEntries'
      }),
      timeEntryGroups() {
        return this.$_.groupBy(this.stoppedTimeEntries, (timeEntry) => {
          let entryStartOfDay = this.$moment(timeEntry.startedAt).clone().startOf("day").format("ddd, D MMM");
          let todayStartOfDay = this.$moment().startOf("day").format("ddd, D MMM");
          let yesterdayStartOfDay = this.$moment().subtract(1, "day").startOf("day").format("ddd, D MMM");
          if (entryStartOfDay == todayStartOfDay) { return "Today" }
          if (entryStartOfDay == yesterdayStartOfDay) { return "Yesterday" }
          return this.$moment(timeEntry.startedAt).format("ddd, D MMM");
        });
      }
    },
    methods: {
      ...mapActions({
        fetchTimeEntries: 'timers/fetchTimeEntries',
        fetchProjects: 'projects/fetchProjects'
      }),
      requestNotificationPermitions() {
        if (Notification && Notification.permission !== "granted") {
          Notification.requestPermission().then((result) => {
            if (result === 'granted' ) {
              subscriptionsManager.createSubscription()
            }
            return;
          });
        }
      },
    },
    created() {
      if (addToHomeScreen.isPromptAllowed()) { addToHomeScreen.showPrompt() }
      this.requestNotificationPermitions()
      this.fetchTimeEntries();
      this.fetchProjects();
    }
  }
</script>
