<template>
  <section class="student">
      <div v-if="User">
        <h1 class="headline" v-if="User.group == 'vs'">VS (noorem tarkvaraarendaja) õpilane</h1>
        <h1 class="headline" v-if="User.group == 'kd'">KD (kasutajakogemuse disaini nooremspetsialist) õpilane</h1>
        <h1 class="headline" v-if="User.group == 'is'">IS (IT-süsteemide spetsialist) õpilane</h1>
        <h1 class="headline" v-if="User.group == 'isp'">ISP (IT-süsteemide spetsialist) õpilane</h1>
        <h1 class="headline" v-if="User.group == 'syst'">SYSt (süsteemiadministraator) õpilane</h1>
        <h1 class="headline" v-if="User.group == 'ita'">ITA (tarkvaraarendaja) õpilane</h1>
      </div>
      <Tabs :tabs="tabs" :initialTab="initialTab">
        <template v-slot:tab-head-taotlusleht>
          <p>Taotlusleht</p>
        </template>
        <template v-slot:tab-panel-taotlusleht>
          <div>
            <p>Praktikataotlus</p>
            <router-link :to="'praktikataotlus'">Täida taotlus</router-link>
          </div>
        </template>
        <template v-slot:tab-head-juhendid>
          <p>Juhendid</p>
        </template>
        <template v-slot:tab-panel-juhendid>
          <Documents :group="User.group" docType="juhend" :data="Documents" />
        </template>
        <template v-slot:tab-head-dokumendid>
          <p>Dokumendid</p>
        </template>
        <template v-slot:tab-panel-dokumendid>
          <Documents docType="dokument" :data="Documents" />
        </template>
        <template v-slot:tab-head-abimaterjalid>
          <p>Abimaterjalid</p>
        </template>
        <template v-slot:tab-panel-abimaterjalid>
          <Documents docType="abimaterjal" :data="Documents" />
        </template>
      </Tabs>
  </section>
</template>

<script>
import Tabs from '@/components/Tab/Tabs';
import axios from 'axios'
import Documents from '@/components/Documents/Documents'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'student',
  components: {
    Tabs,
    Documents
  },
  data() {
    return {
      initialTab: 'taotlusleht',
      tabs: ['taotlusleht', 'juhendid', 'dokumendid', 'abimaterjalid'],
      polling: null
    }
  },
  computed: {
    ...mapGetters({
      Documents: 'documents',
      User: 'user'
    }),
  },
  methods: {
    ...mapActions({
      getDocuments: 'getDocuments',
    }),
    userInfo() {
        axios.get('https://praktika.ikt.khk.ee:5000/api/users/me', {withCredentials: true})
        .then(res => this.$store.commit('SET_USER', res.data));
    },
    pollData() {
      this.polling = setInterval(() => {
        this.getDocuments()
      }, 60000)
    }
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  created() {
    this.userInfo();
    this.getDocuments();
    this.pollData();
  }
}
</script>



<style lang="scss" scoped>

.student {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    padding: 5rem 0;

    .headline {
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      color: #404040;
      margin-bottom: 2rem;
      text-align: center;
    }
}

@media (min-width: 375px) {
  .student {
      .headline {
        font-size: 1.2rem;
      }
  }
}


@media (min-width: 768px) {
  .student {
      padding: 5rem 2rem;

      .headline {
        font-size: 1.5rem;
        text-align: left;
      }
  }
}

@media (min-width: 992px) {
  .student {
      padding: 5rem;

      .headline {
        font-size: 1.5rem;
        text-align: left;
      }
  }
}

@media (min-width: 1200px) {
  .student {
      padding: 5rem 15rem;

    .headline {
      font-size: 2.25rem;
      margin-bottom: 2.5rem;
    }
  }
}
</style>