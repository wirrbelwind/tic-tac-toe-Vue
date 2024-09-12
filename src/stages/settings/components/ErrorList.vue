<script lang="ts" setup>
import { useStore } from '@/hooks/useStore';
import { storeToRefs } from 'pinia';

const { errorList } = storeToRefs(useStore())

</script>

<template>
  <div v-if="errorList.length">
    <div v-for="error in errorList" role="alert" class="alert alert-error">
      <ErrorIcon width="2rem" height="2rem"/>
      <span>{{ error }}</span>
    </div>
  </div>
</template>
