<template>
  <div class="test">
    <component
      :is="data.component"
      :key="data.id"
      :name="data.name"
      :label="data.label"
    >
      <component
        v-for="item in data.children"
        :is="item.component"
        v-bind="item.props"
        v-model:value="item.data"
        v-html="item.data"
      ></component>
    </component>
  </div>
</template>
<script setup>
import { v4 as uuidv4 } from "uuid";

const data = {
  id: uuidv4(),
  name: "",
  component: "a-form-item",
  label: "",
  children: [
    {
      id: uuidv4(),
      component: "a-button",
      data: "修改",
      props: { type: "primary", "v-on:click": "onUpdate" },
    },
    {
      id: uuidv4(),
      component: "a-button",
      data: "取消",
      props: { type: "primary", "v-on:click": "onUpdate" },
    },
  ],
};
</script>
<style lang="less" scoped>
.test {
  color: white;
}
</style>
