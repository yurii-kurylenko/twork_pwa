<template>
  <v-list two-line subheader>
    <v-subheader>{{ timeEntriesDate }}</v-subheader>
    <template v-for="(timeEntry, index) in timeEntries" class="time-entry">
      <TimeEntryItem :timeEntry="timeEntry" :key="timeEntry.id"></TimeEntryItem>
      <v-divider
        v-if="index + 1 < timeEntries.length"
        :key="index"
      ></v-divider>
    </template>
  </v-list>
</template>

<script>
  import TimeEntryItem from "./TimeEntryItem";
  export default {
    components: {
      TimeEntryItem
    },
    props: [
      'timeEntriesDate',
      'timeEntries'
    ]
  }
</script>
