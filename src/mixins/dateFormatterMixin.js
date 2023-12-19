import { DateTime } from 'luxon'

export default {
  methods: {
    formatDate(date) {
      return DateTime.fromISO(date).setLocale('en-US').toFormat('f')
    }
  }
}