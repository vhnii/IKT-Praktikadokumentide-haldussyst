<template>
  <section class="teacher">
      <div class="flex-row">
        <h1 class="headline">Koordinaator</h1>
        <select v-model="selected" @change="this.getDocuments">
          <option>VS</option>
          <option>KD</option>
          <option>IS</option>
          <option>ISP</option>
          <option>SYSt</option>
          <option>ITA</option>
        </select>
      </div>
      <h2 class="sub-headline" v-if="this.selected == 'VS'">Noorem tarkvaraarendaja</h2>
      <h2 class="sub-headline" v-if="this.selected == 'KD'">Kasutajakogemuse disaini nooremspetsialist</h2>
      <h2 class="sub-headline" v-if="this.selected == 'IS'">IT-süsteemide spetsialist</h2>
      <h2 class="sub-headline" v-if="this.selected == 'ISP'">IT-süsteemide spetsialist</h2>
      <h2 class="sub-headline" v-if="this.selected == 'SYSt'">Süsteemiadministraator</h2>
      <h2 class="sub-headline" v-if="this.selected == 'ITA'">Tarkvaraarendaja</h2>
      <Tabs :tabs="tabs" :initialTab="initialTab">
        <template v-slot:tab-head-juhendid>
          <p>Juhendid</p>
        </template>
        <template v-slot:tab-panel-juhendid>
          <Documents :group="selected" docType="juhend" :data="Documents" />
          <Upload docType="juhend" :group="selected" />
        </template>
        <template v-slot:tab-head-dokumendid>
          <p>Dokumendid</p>
        </template>
        <template v-slot:tab-panel-dokumendid>
          <Documents docType="dokument" :data="Documents" />
          <Upload docType="dokument" />
        </template>
        <template v-slot:tab-head-abimaterjalid>
          <p>Abimaterjalid</p>
        </template>
        <template v-slot:tab-panel-abimaterjalid>
          <Documents docType="abimaterjal" :data="Documents" />
          <Upload docType="abimaterjal" />
        </template>
        <template v-slot:tab-head-opilased>
          <p>Õpilased</p>
        </template>
        <template v-slot:tab-panel-opilased>
          <Accordion :taotlused="taotlused" :title="selected" />
        </template>
      </Tabs>
  </section>
</template>

<script>
import axios from 'axios';
import Tabs from '@/components/Tab/Tabs';
import Accordion from '@/components/Accordion/Accordion';
import Upload from '@/components/Upload/Upload';
import Documents from '@/components/Documents/Documents'
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'teacher',
  components: {
    Tabs,
    Accordion,
    Upload,
    Documents
  },
  data() {
    return {
      selected: 'VS',
      initialTab: 'juhendid',
      tabs: ['juhendid', 'dokumendid', 'abimaterjalid', 'opilased'],
      taotlused: []
    }
  },
  computed: {
    ...mapGetters({
      Documents: 'documents'
    })
  },
  methods: {
    ...mapActions({
      getDocuments: 'getDocuments'
    }),
    userInfo() {
      axios.get('https://praktika.ikt.khk.ee:5000/api/users/me', {withCredentials: true})
      .then(res => this.$store.commit('SET_USER', res.data));
    },
    async getData() {
      await this.getDocuments();
      await this.userInfo();
      let Applications = await axios.get('https://praktika.ikt.khk.ee:5000/api/taotlus', {withCredentials: true});
      
      this.taotlused = Applications.data;
    },
  },
  async created() {
    await this.getData();
  }
}
</script>



<style lang="scss" scoped>

  .teacher {

    padding: 5rem 0;

    .flex-row {
      display: flex;
      flex-direction: column;
      align-items: center;

      select {
        width: 90%;
        background-color: #0099d8;
        color: white;
        border: 0;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #0087bc;
        line-height: 1.6;
        font-size: 16px;
        font-weight: 400;
        height: 1.5rem;
        height: 2rem;
        margin-bottom: 2rem;
      }
    }

    .headline {
      font-family: 'Source Sans Pro', sans-serif;
      font-weight: 700;
      color: #404040;
      font-size: 1rem;
      font-size: 2rem;
      margin-bottom: 2rem;
      text-align: center;
    }

    .sub-headline {
      color: #404040;
      font-weight: 400;
      text-align: center;
      margin-bottom: 2rem;
    }
  }

  @media (min-width: 425px) {

    .teacher {
      padding: 5rem .75rem;
      .flex-row {
        flex-direction: row;
        margin-bottom: 20px;

        select {
          width: auto;
          margin-bottom: 0px;
        }
      }

      .headline {
        margin-bottom: 0px;
        margin-right: 50px;
      }

      .sub-headline {
        text-align: left;
      }
    }
  }

  @media (min-width: 768px) {
    .teacher {
      padding: 5rem 2rem;

      .flex-row {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        select {
          width: auto;
          margin-bottom: 0px;
          height: 1.5rem;
        }
      }

      .headline {
        margin-bottom: 0px;
        margin-right: 50px;
      }

      .sub-headline {
        text-align: left;
      }

    }
  }

  @media (min-width: 992px) {
  .teacher {
      padding: 5rem;

      .headline {
        font-size: 1.5rem;
        text-align: left;
      }
  }
}

@media (min-width: 1200px) {
  .teacher {
      padding: 5rem 15rem;

      .flex-row {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        select {
          width: auto;
          margin-bottom: 0;
          line-height: 1.6;
          height: 1.5rem;
        }

      }

    .headline {
      font-size: 2.25rem;
      margin-right: 50px;
      margin-bottom: 0;
    }

    .sub-headline {
      font-family: 'Open Sans', sans-serif;
      text-align: left;
      margin-bottom: 15px;
    }
  }
}
</style>