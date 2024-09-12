<script setup lang="ts">
import { Mark } from '@/types';
import { SVGAttributes } from 'vue';

import CrossIcon from '@/assets/cross.svg'
import ZeroIcon from '@/assets/zero.svg'

interface Props extends /* @vue-ignore */ SVGAttributes {
  mark: Mark
}
const { mark } = defineProps<Props>()

const icons: Record<Mark, string> = {
  'cross': CrossIcon,
  'zero': ZeroIcon
}

</script>

<template>
  <component :is="icons[mark]" />
</template>
