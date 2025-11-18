<template>
  <div>
    <label v-if="label" class="block text-gray-700 text-sm font-bold mb-2">
      {{ label }}
    </label>
    <input
      type="number"
      :value="inputValue"
      @input="onInput"
      :placeholder="placeholder"
      :step="step"
      :disabled="disabled"
      class="h-9 px-3 py-2 border border-gray-300 rounded bg-white text-sm text-gray-700 focus:outline-none focus:border-gray-400 w-full disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, computed } from 'vue'

function leastSignificantPlace(n: number): number {
  try {
    if (!Number.isFinite(n)) throw new Error('Input must be a finite number')
    if (n === 0) return 1
    const str = n.toString()
    const decimalIndex = str.indexOf('.')
    if (decimalIndex === -1) {
      const match = str.match(/0+$/)
      const zeros = match ? match[0].length : 0
      return 10 ** zeros
    } else {
      const trimmed = str.replace(/0+$/, '') // remove trailing zeros
      const decimals = trimmed.length - 1 - decimalIndex
      return 10 ** (-decimals)
    }
  } catch {
    return 1
  }
}

type Emits = {
  (e: 'input-changed', value: number | ''): void
}

const props = defineProps<{
  defaultValue?: number
  label?: string
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits<Emits>()

const inputValue = ref<number>(props.defaultValue ?? 0)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  let value: number | '' = target.value === '' ? '' : parseFloat(target.value)
  if (value !== '' && Number.isNaN(value)) return
  inputValue.value = value

  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('input-changed', inputValue.value)
  }, 500)
}

watch(
  () => props.defaultValue,
  (val) => {
    inputValue.value = val ?? 0
  }
)

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})

const step = computed(() => leastSignificantPlace(inputValue.value))
</script>
