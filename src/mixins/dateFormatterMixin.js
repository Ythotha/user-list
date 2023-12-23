import { DateTime } from 'luxon'

export default {
  methods: {
    formatDate(date) {
      return DateTime.fromISO(date).setLocale('en-US').toFormat('ccc, MM/dd/y, hh:mm a')
    }
  }
}
