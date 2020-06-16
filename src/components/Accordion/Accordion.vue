<template>
  <div class="flex-column">
      <BaseAccordion>
        <template v-slot:title>{{ filterTitles }}</template>
        <template v-slot:content>
          <p v-if="filteredApplications.length < 1">Kahjuks ei ole mingit infot veel kuvada.</p>

          <div class="item" v-for="application in filteredApplications" :key="application._id">
            <p>Nimi: {{application.taotlus.opilase_nimi}}</p>             
            <a :href="URL(application)" target="_blank">Praktikataotlus</a> 
            <p>Kuupäev: {{localDateFormat(application.created)}}</p>
          </div>
        </template>
      </BaseAccordion>
  </div>
</template>
<script>
import BaseAccordion from "./BaseAccordion";
import moment from 'moment'

export default {
  props: {
    taotlused: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  components: {
    BaseAccordion
  },
  data() {
    return {
    };
  },
  methods: {
    URL(i) {
      return `https://praktika.ikt.khk.ee:5000/taotlused/${i.taotlus._id}/${i.taotlus.opilase_nimi} ${moment(i.created).format('DD.MM.YYYY')}.pdf`
    },
    localDateFormat(date) {
      return moment.utc(date).format('DD.MM.YYYY');
    },
    yearDiff(date) {
      return moment.utc().diff(moment.utc(date), 'years')
    }
  },
  computed: {
    filteredApplications() {
      return this.taotlused.filter(i => i.taotlus.oppegrupp === this.title.toLowerCase() && this.yearDiff(i.created) < 1)
    },
    filterTitles() {
      let title = '';
      if (this.title == 'VS') {
        title = 'Noorem tarkvaraarendaja (VS)'
      } else if (this.title == 'KD') {
        title = 'Kasutajakogemuse disaini nooremspetsialist (KD)'
      } else if (this.title == 'IS') {
        title = 'IT-süsteemide spetsialist (IS)'
      } else if (this.title == 'ISP') {
        title = 'IT-süsteemide spetsialist (ISP)'
      } else if (this.title == 'SYSt') {
        title = 'Süsteemiadministraator (SYSt)'
      } else if (this.title == 'ITA') {
        title = 'Tarkvaraarendaja (ITA)'
      }

      return title;
    }
  }
};
</script>
