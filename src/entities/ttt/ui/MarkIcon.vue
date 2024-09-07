<script setup lang="ts">
import { Mark } from '../types';
import CrossIcon from '@/shared/assets/cross.svg'
import ZeroIcon from '@/shared/assets/zero.svg'
import { SVGAttributes } from 'vue';

interface Props {
  mark: Mark
}
const { mark } = defineProps<Props & SVGAttributes>()

const icons: Record<Mark, string> = {
  'cross': CrossIcon,
  'zero': ZeroIcon
}

</script>

<template>
  <component :is="icons[mark]" />
</template>
