<template>
  <v-layout row wrap pa-2>
    <v-flex lg7>
      <TimerItemDescription
          :initialDescription="timeEntry.description"
          v-on:descriptionChanged="onDescriptionChanged"
      />
    </v-flex>
    <v-flex lg2 px-2>
      <TimerProjectSelect
          :initialProject="timeEntry.projectId"
          @projectChanged="onProjectChanged"
        />
    </v-flex>
    <v-flex lg3 pt-2>
      <v-layout row wrap>
        <v-flex lg-2>
          <BillableButton :initialBillableState="timeEntry.billable" v-on:billableChanged="onBillableStateChanged"/>
        </v-flex>
        <v-flex lg6 pt-3>
          <DateTimeRangePicker
            v-on:rangeChanged="onTimeRangeChanged"
            :startedAt="timeEntry.startedAt"
            :endedAt="timeEntry.stoppedAt"
          >
            <span class="timer-list__task-period" slot="activator">
              {{ timeEntryPeriod }}
            </span>
          </DateTimeRangePicker>
        </v-flex>
        <v-flex lg2 pt-3>
          <span class="timer-list__task-sum"> {{ timeEntry.duration().format("hh:mm:ss", { trim: false }) }} </span>
        </v-flex>
        <v-flex lg1>
          <v-btn flat icon color="teal"><v-icon>play_arrow</v-icon></v-btn>
        </v-flex>
        <v-flex lg1>
          <v-btn flat icon color="grey"><v-icon>delete</v-icon></v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import moment from "moment";
  import * as moment_format from "moment-duration-format";
  import { mapActions } from "vuex"
  import TimerItemDescription from "./TimerItemDescription";
  import TimerProjectSelect from "../../shared/TimerProjectSelect";
  import BillableButton from "../../shared/BillableButton";
  import DateTimeRangePicker from "../../shared/DateTimeRangePicker";

  export default {
    props: ["timeEntry"],
    name: 'TimerItem',
    components: {
      TimerItemDescription,
      TimerProjectSelect,
      BillableButton,
      DateTimeRangePicker
    },
    data() {
      return {
        menuIsActive: false,
      }
    },
    methods: {
      ...mapActions({
        changeDuration: 'timers/changeDuration',
        deleteTimeEntry: 'timers/deleteTimeEntry',
        changeDescription: 'timers/changeDescription',
        changeProject: 'timers/changeProject',
        changeBillable: 'timers/changeBillable'
      }),
      destroy(timeEntryId) { this.deleteTimeEntry(timeEntryId) },
      toggleClass() {
        this.menuIsActive = !this.menuIsActive;
      },
      onDescriptionChanged(newDescription) {
        if (this.timeEntry.description == newDescription) { return };
        this.changeDescription({id: this.timeEntry.id, description: newDescription});
      },
      onTimeRangeChanged({endedAt, startedAt}) {
        this.changeDuration({ id: this.timeEntry.id, startedAt: startedAt, stoppedAt: endedAt});
      },
      onBillableStateChanged(newBillableState) {
        if (this.timeEntry.billable == newBillableState) { return };
        this.changeBillable({id: this.timeEntry.id, billable: newBillableState});
      },
      onProjectChanged(newProject) {
        this.changeProject({id: this.timeEntry.id, projectId: newProject});
      }
    },
    computed: {
      timeEntryPeriod: function() {
        return [
          this.timeEntry.startedAtTime(),
          this.timeEntry.stoppedAtTime()
        ].join(' - ')
      }
    }
  }
</script>