<template>
  <div>
    <label v-if="label" class="block text-gray-700 text-sm font-bold mb-2">
      {{ label }}
    </label>

    <label class="inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        class="h-4 w-4 border border-gray-300 rounded bg-white"
        :checked="isChecked"
        @change="onChange"
      />
      <span class="text-sm text-gray-700">
        <slot />
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    defaultValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isChecked: this.defaultValue
    }
  },
  methods: {
    onChange (e) {
      this.hasUserInteracted = true
      this.isChecked = e.target.checked
      this.$emit('checkbox-changed', this.isChecked)
    }
  },
  watch: {
    defaultValue (val) {
      this.isChecked = val
    }
  }
}
</script>
