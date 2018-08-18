<template>
  <v-layout row wrap>
    <v-flex lg12>
      <v-card class="timer">
        <v-layout row wrap>
          <v-flex lg7 md12 xs12 pa-2>
            <v-text-field
              :value="activeTimeEntry.description"
              placeholder="Your task description goes here"
              ref="descriptionInput"
              @keyup.enter.prevent="submitDescription()"
            >
            </v-text-field>
          </v-flex>
          <v-flex lg2 md6 xs12 pa-2>
            <TimerProjectSelect :initialProject="getProject()" @projectChanged="onProjectChanged" />
          </v-flex>
          <v-flex lg-3 pa-2>
            <v-layout>
              <v-flex lg2 pt-2>
                <BillableButton
                  :initialBillableState="getBillableState()"
                  v-on:billableChanged="onBillableStateChanged"
                />
              </v-flex>
              <v-flex lg4 pt-4>
                <DateTimeRangePicker v-on:rangeChanged="onTimeRangeChanged" :startedAt="activeTimeEntry.startedAt" rangeValidationStrategy="allowEmptyEnd">
                  <TrackingBarTimer slot="activator"/>
                </DateTimeRangePicker>
              </v-flex>
              <v-flex lg3>
                <div>
                  <v-btn v-if="!isTimerStarted()" fab dark color="teal" v-on:click="start()">
                    <v-icon dark>play_arrow</v-icon>
                  </v-btn>
                  <v-btn v-if="isTimerStarted()" fab dark color="pink" v-on:click="toggleTimeEntry()">
                    <v-icon dark>stop</v-icon>
                  </v-btn>
                </div>
              </v-flex>
              <v-flex lg1 pt-2 pl-3>
                <v-btn flat icon color="grey"><v-icon>delete</v-icon></v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
    </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import TimerProjectSelect from "../shared/TimerProjectSelect";
  import TrackingBarTimer from "./TrackingBarTimer";
  import BillableButton from './../shared/BillableButton';
  import DateTimeRangePicker from './../shared/DateTimeRangePicker';
  import { mapGetters, mapActions, mapState } from "vuex";
  import Trash from "@/assets/trash.svg";

  export default {
    name: 'TrackingBar',
    components: {
      TrackingBarTimer,
      TimerProjectSelect,
      BillableButton,
      DateTimeRangePicker
    },
    data() {
      return {
        localBillable: null,
        localProjectId: null
      }
    },
    computed: {
      ...mapGetters({
        'activeTimeEntry': 'timers/activeTimeEntry'
      })
    },
    methods: {
      ...mapActions({
        changeDescription: "timers/changeDescription",
        changeProject: "timers/changeProject",
        stopTimeEntry: "timers/stopTimeEntry",
        changeBillable: "timers/changeBillable",
        deleteTimeEntry: "timers/deleteTimeEntry",
        createTimeEntry: "timers/createTimeEntry",
        updateTimeEntry: "timers/updateTimeEntry"
      }),
      toggleTimeEntry() {
        if (this.isTimerStarted()) {
          this.stopTimeEntry({id: this.activeTimeEntry.id, description: this.getCurrentDescripton()})
        } else {
          this.start();
        };
      },
      submitDescription () {
        if (this.isTimerStarted()) {
          this.changeDescription({id: this.activeTimeEntry.id, description: this.getCurrentDescripton()})
        } else {
          this.start()
        }
      },
      onBillableStateChanged(isBillable) {
        this.localBillable = isBillable;
        if (this.isTimerStarted()) {
          this.changeBillable({ id: this.activeTimeEntry.id, billable: this.localBillable });
        }
      },
      onProjectChanged(newProject) {
        this.localProjectId = newProject;
        if (this.isTimerStarted()) {
          this.changeProject({id: this.activeTimeEntry.id, projectId: this.localProjectId});
        }
      },
      getBillableState() {
        return this.localBillable || this.activeTimeEntry.billable
      },
      getProject() {
        return this.localProjectId || this.activeTimeEntry.projectId
      },
      onTimeRangeChanged({startedAt, endedAt}) {
        if (!this.isTimerStarted()) {
          this.createTimeEntry({
            description: this.getCurrentDescripton(),
            billable: this.getBillableState(),
            startedAt: startedAt,
            stoppedAt: endedAt
          })
        } else {
          this.updateTimeEntry({id:  this.activeTimeEntry.id, startedAt: startedAt})
        }
      },
      start() {
        this.createTimeEntry({
          description: this.getCurrentDescripton(),
          billable: this.getBillableState(),
          startedAt: new Date().toISOString(),
          projectId: this.getProject()
        })
      },
      getCurrentDescripton() {
        return this.$refs.descriptionInput.value;
      },
      destroyActiveTimer() {
        this.deleteTimeEntry(this.activeTimeEntry.id)
      },
      isTimerStarted() {
        return !!this.activeTimeEntry.startedAt;
      }
    }
  }
</script>

