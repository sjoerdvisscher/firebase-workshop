<template>
  <h1>Hello {{name}}</h1>
</template>

<style>
h1 {
  color: blue;
}
</style>

<script>
var firebaseMixin = require('vue-fire').mixin;

module.exports = {
  mixins: [firebaseMixin],
  firebase: function (root) {
    return {
      values: [
        'name'
      ]
    }
  }
}
</script>
