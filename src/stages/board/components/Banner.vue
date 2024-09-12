<script lang="ts" setup>
import { useStore } from '@/hooks/useStore';
import { storeToRefs } from 'pinia';

const store = useStore()
const {
  settings,
  board,
  makeTurn,
  $subscribe,
  endGame,
} = store

const { winner, currentMark } = storeToRefs(store)

const bannerClasses = computed(() => ({
  "shadow-sm": !winner.value,
  "shadow-xl": winner.value
}))

</script>

<template>
  <div
    class="p-3 text-4xl border border-orange-800 rounded-lg flex items-center justify-center shadow-inner  shadow-orange-800"
    :class="bannerClasses">

    <div v-if="currentMark && !winner" class="flex gap-2 items-center justify-center">
      <Transition name="fade">
        <MarkIcon :mark="currentMark" width="50" height="50" />
      </Transition>

      <p>'s turn</p>
    </div>

    <Transition name="fade">
      <div v-if="winner">
        <p>{{ settings?.players[winner.playerSlot].name }} won</p>
      </div>
    </Transition>
  </div>
</template>
