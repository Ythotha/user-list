<template>
  <ul class="cards">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="card cards__item"
    >
      <header class="card__header">
        <img :src="item.picture.thumbnail" alt="" class="card__avatar" role="presentation">
        <div class="card__aside">
          <span class="card__name">
            {{ item.name.first }}
            {{ item.name.last }},
            {{ item.nat }}
          </span>
          <span class="card__location">
            {{ item.location.country }},
            {{ item.location.city }}
          </span>
        </div>
      </header>
      <div class="card__content">
        <a :href="`tel:${item.phone}`" class="card__link">
          <span class="card__text">
            {{ item.phone }}
          </span>
        </a>
        <a :href="`mailto:${item.email}`" class="card__link">
          <span class="card__text">
            {{ item.email }}
          </span>
        </a>
        <span class="card__age">
          {{ formatDate(item.dob.date) }},
          {{ item.dob.age }}
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
import dateMixin from '@/mixins/dateFormatterMixin'

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  mixins: [dateMixin],
}
</script>

<style lang="postcss">
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(33rem, 100%), 1fr));
    gap: 1.6rem;

    list-style-type: none;
  }
</style>
