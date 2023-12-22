<template>
  <div class="page login-page">
    <form @submit="onSubmit" class="login-page__form">
      <label class="login-page__field">
        Admin
        <input v-model="userType" type="radio" value="admin"/>
      </label>
      <label class="login-page__field">
        User
        <input v-model="userType" type="radio" value="user"/>
      </label>
      <button :disabled="!userType">
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      userType: undefined,
    }
  },

  methods: {
    ...mapActions({
      signIn: 'user/signIn',
    }),

    onSubmit(event) {
      event.preventDefault()
      this.signIn(this.userType)
    },
  },
}
</script>

<style lang="postcss">
  .login-page {
    display: grid;
    place-items: center;

    &__form {
      display: grid;
      gap: 1.6rem;
    }
  }
</style>
