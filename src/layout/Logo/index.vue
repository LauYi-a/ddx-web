<template>
  <div class="logo-container">
    <!-- <img src="@/assets/logo.png" alt=""> -->
    <h1 v-if="!isCollapse">{{ systemTitle }}</h1>
    <h2 v-else>{{systemTitle}}</h2>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { systemTitle } from '@/config'
export default defineComponent({
  setup() {
    const store = useStore()
    const isCollapse = computed(() => store.state.app.isCollapse)
    return {
      isCollapse,
      systemTitle
    }
  }
})
</script>

<style lang="scss" scoped>
  .logo-container {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: left;
    width: 100%;
    background-color: var(--system-logo-background);
    h1 {
      padding-left: 5px;
      font-size: 20px;
      white-space: nowrap;
      color: var(--system-logo-color);
    }
    h2 {
      padding-left: 5px;
      font-size: 18px;
      white-space: nowrap;
      color: var(--system-logo-color);
    }
  }
</style>