<template>
  <h1>Hello {{name}}</h1>
</template>

<style>
h1 {
  color: blue;
}
</style>

<script>
module.exports = {
  data: function() {
    return {
      name: 'Kars'
    }
  }
}
</script>
