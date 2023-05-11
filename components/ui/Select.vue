<template>
  <div class="cms-select">
    <select @change="handleChange">
      <slot>
        <option disabled selected value> -- select an option -- </option>
        <option value="tipul 1">CSS SELECT arrow (minimal)</option>
        <option value="tipul 2"> No external background image</option>
        <option value>No wrapper</option>
      </slot>
    </select>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ (e: "update:modelValue", val: string): void }>();
const handleChange = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>

<style scoped lang="scss">
select::-ms-expand {
  display: none;
}
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  display: block;
  width: 100%;

  float: right;

  /* line-height: 1.75; */
  color: #333;
  -ms-word-break: normal;
  word-break: normal;
}

.cms-select {
  position: relative;
  /*Don't really need this just for demo styling*/
  float: left;
  align-items: center;
}
.cms-select:after {
  @apply text-primary-blue;
  font-family: "Font Awesome 6 Pro";
  content: "\f078";
  font-weight: 900;
  right: 0;
  top: 0;
  /*left line */
  margin: 4px;
  margin-right: 12px;
  position: absolute;
  pointer-events: none;
}
</style>
