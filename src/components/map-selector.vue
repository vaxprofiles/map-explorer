<template>
  <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 card-box bg-white p-10
    w-100
    h-80
    max-[485px]:w-[80vw]
    "
  >
    <!-- Skeleton while loading OR while configs are not there yet -->
    <template v-if="loading || !configs || !configs.length">
      <div class="h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div class="h-px bg-gray-300 mb-4"></div>
      <div class="space-y-2">
        <div class="h-10 bg-gray-200 rounded-full animate-pulse"></div>
        <div class="h-10 bg-gray-200 rounded-full animate-pulse"></div>
        <div class="h-10 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    </template>
    <!-- Only runs when configs is defined and non-empty -->
    <template v-else>
      <div class="text-2xl mb-2 font-bold">
        Change map
      </div>
      <hr class="border-t border-gray-300 mb-4" />
      <ul class="space-y-2">
        <li
          v-for="(cfg, index) in configs"
          :key="cfg.mapDescription?.title ?? index"
        >
          <button
            type="button"
            :class="[
              'block w-full text-left text-sm px-4 py-2 rounded-full border',
              isActive(cfg)
                ? 'bg-gray-100 border-black-500 font-semibold'
                : 'border-gray-300 hover:bg-gray-100',
              'focus:outline-none focus:ring-2 focus:ring-gray-400'
            ]"
            @click="handleClick(cfg)"
          >
            {{ cfg.mapDescription?.title ?? `Map ${index + 1}` }}
          </button>
        </li>
      </ul>
    </template>
  </div>
</template>
<script setup lang="ts">
import type { AppConfig } from './types'
interface Props {
  configs?: AppConfig[]
  config?: AppConfig
  loading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const isActive = (cfg: AppConfig) => {
  if (!props.config) return false
  return cfg.mapDescription?.title === props.config.mapDescription?.title
}
const emit = defineEmits<{
  (e: 'select-map', title: string): void
}>()
function handleClick(cfg: AppConfig) {
  const title = cfg.mapDescription?.title
  if (title) {
    emit('select-map', title)
  }
  console.log(title)
}
</script>
