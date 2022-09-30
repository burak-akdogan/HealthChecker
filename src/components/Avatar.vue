<template>
  <div
    v-if="ipfsHash"
    class="avatar circle d-inline-block"
    :style="
      `width: ${size}px; height: ${size}px;
      background-image: url('${ipfsHash}');`
    "
  />
 
</template>

<script>
export default {
  props: {
    ipfsHash: String,
    size: {
      type: Number,
      default: 48
    }
  }
};
</script>

<style scoped lang="scss">
@import '../vars.scss';

.avatar {
  background-color: $gray-dark;
  background-size: cover;
  background-position: center;

  .iconuser {
    color: $white-fade-50;
  }
}
</style>
