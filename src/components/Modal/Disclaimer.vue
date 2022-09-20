<template>
  <Modal :open="open" @close="$emit('close')">
    <form @submit.prevent="handleSubmit" class="px-4 py-6 text-center overflow-y-auto">
      <h2 class="mb-4">Disclaimer</h2>
      <p class="text-left mb-4">
        By using our website, you confirm that you accept these terms of use and that you agree to comply with them. If you do not agree to these terms of use, you must not use our website. 
        We do not guarantee that our website, or any content on it, will always be available or be uninterrupted or free of defects, errors, or bugs. Our site is made available free of charge.
      </p>
      <div class="v-align-middle mb-4">
        <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019" class="btn-outline-mktg mr-3">Exit</a>
        <button type="submit" class="btn-mktg">Agree</button>
      </div>
    </form>
  </Modal>
</template>

<script>
import { DISCLAIMER_LOCALSTORAGE_KEY } from '@/helpers/utils';

export default {
  props: ['open'],
  methods: {
    handleSubmit() {
      localStorage.setItem(DISCLAIMER_LOCALSTORAGE_KEY, '1');
      this.$emit('close');
    }
  }
};
</script>
