<template>
  <div>
    <li>
      <div :class="{bold: isFolder}" @click="toggle" @dblclick="changeType">
        {{ model.name }}
        <span v-if="isFolder">[{{ open ? '-' : '+' }}]</span>
      </div>
      <ul v-show="open" v-if="isFolder">
        <item class="item" v-for="(model, index) in model.children" :key="index" :model="model"></item>
        <li class="add" @click="addChild">+</li>
      </ul>
    </li>
  </div>
</template>
<script>
export default {
  components: {},
  // props: {
  //   info: []
  // },

  data() {
    return {
      data: {
        name: 'My Tree',
        children: [
          { name: 'hello' },
          { name: 'wat' },
          {
            name: 'child folder',
            children: [
              {
                name: 'child folder',
                children: [{ name: 'hello' }, { name: 'wat' }]
              },
              { name: 'hello' },
              { name: 'wat' },
              {
                name: 'child folder',
                children: [{ name: 'hello' }, { name: 'wat' }]
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style lang="less">
body {
  font-family: Menlo, Consolas, monospace;
  color: #444;
}
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
