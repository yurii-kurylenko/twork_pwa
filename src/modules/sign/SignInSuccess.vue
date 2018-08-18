<template>
  <p>Succeess</p>
</template>

<script>
  export default {
    mounted() {
      const token = this.$route.query.token;
      this.$store.dispatch("auth/login", token);
      this.$router.push({name: "timer"});
    }
  }
</script>