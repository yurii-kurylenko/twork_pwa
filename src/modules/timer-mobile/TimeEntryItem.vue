<template>
  <div>
    <v-list-tile
      :key="timeEntry.description"
      avatar
      ripple
    >
      <v-list-tile-content ref="timeEntryContent">
        <v-list-tile-title>{{ timeEntry.description }}</v-list-tile-title>
        <v-list-tile-sub-title class="text--primary">{{ timeEntry.projectName }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-list-tile-action-text class="font-weight-bold">{{ timeEntry.getDurationText() }} </v-list-tile-action-text>
        <v-icon color="green darken-2">
          play_arrow
        </v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </div>
</template>

<script>
import Hummer from "hammerjs";
export default {
  props: ['timeEntry'],
  data() {
    return {
      swipeManager: null,
    }
  },
  mounted() {
    this.initTimeEntrySwipe();
  },
  methods: {
    initTimeEntrySwipe() {
      const swipeArea = this.$refs.timeEntryContent;
      this.swipeManager = new Hammer.Manager(this.$el);
      let swipe = new Hammer.Swipe();
      this.swipeManager.add(swipe);
      let deltaX = 0;
      const initialTranslate3d = 'translate3d(0px, 0, 0)';
      const deleteTranslate3d = 'translate3d(150px, 0, 0)';
      this.swipeManager.on('swipe', (e) => {
        deltaX = deltaX + e.deltaX;
        let direction = e.offsetDirection;
        if (direction === 4 || direction === 2) {
          if (deltaX > 150) {
            swipeArea.style.transform = deleteTranslate3d;
            console.log('init delete', deltaX);
          } else {
            setTimeout(() => {
              swipeArea.style.transform = initialTranslate3d;
            }, 100);
          }
        }
      });
    }
  }
}

</script>