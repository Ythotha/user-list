<template>
  <table class="table">
    <tr class="table__row">
      <th
        v-for="(header, index) in headers"
        :key="index"
        class="table__cell"
      >
        {{ header }}
      </th>
    </tr>
    <tr
      v-for="(item, index) in items"
      :key="index"
      class="table__row"
    >
      <td class="table__cell">
        <img :src="item.picture.thumbnail" alt="" role="presentation">
      </td>
      <td class="table__cell">
        {{ item.name.first }}
        {{ item.name.last }}
      </td>
      <td class="table__cell">
        {{ formatDate(item.dob.date) }},
        {{ item.dob.age }}
      </td>
      <td class="table__cell">
        <a :href="`mailto:${item.email}`">
          {{ item.email }}
        </a>
      </td>
      <td class="table__cell">
        <a :href="`tel:${item.phone}`">
          {{ item.phone }}
        </a>
      </td>
      <td class="table__cell">
        {{ item.location.country }},
        {{ item.location.city }}
      </td>
      <td class="table__cell">
        {{ item.nat }}
      </td>
      <td class="table__cell">
        {{ item.gender }}
      </td>
    </tr>
  </table>
</template>

<script>
import dateMixin from '@/mixins/dateFormatterMixin'

export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  mixins: [dateMixin],
}
</script>

<style lang="postcss">
  .table {
    --border: 1px solid var(--color-gray);

    border-spacing: 0;

    &__row:not(:last-child) &__cell {
      border-bottom: var(--border);
    }

    &__cell {
      padding: 10px;
    }

    &__cell:not(:last-child) {
      border-right: var(--border);
    }
  }
</style>