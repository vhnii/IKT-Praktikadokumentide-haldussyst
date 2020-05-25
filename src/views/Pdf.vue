<template>
  <section>
    <div class="wrapper">
      <img id="logo" src="../assets/khk_logo.png" />
      <div class="flex space-between">
        <h1 id="heading">Taotlus</h1>
        <p id="date">{{taotlus[0].taotlus.date}}</p>
      </div>
      <div class="container">
        <h3>Praktikandi andmed:</h3>
        <div class="flex">
          <p>Eriala/Valdkond:</p>
          <p>{{taotlus[0].taotlus.eriala}}</p>
        </div>
        <div class="flex">
          <p>Õpilase nimi:</p>
          <p>{{taotlus[0].taotlus.opilase_nimi}}</p>
        </div>
        <div class="flex">
          <p>Praktikaperiood:</p>
          <p>{{taotlus[0].taotlus.periood}}</p>
        </div>
        <div class="flex">
          <p>Praktika maht astronoomilistes tundides EKAP-tes:</p>
          <p>{{taotlus[0].taotlus.maht}}</p>
        </div>
      </div>
      <div class="container">
        <h3>Ülesanded:</h3>
        <div v-for="ulesanne in taotlus[0].ulesanded" :key="ulesanne">
          <p>{{ulesanne}}</p>
        </div>
      </div>
      <div class="container">
        <h3>Praktikakoha andmed:</h3>
        <div class="flex">
          <p>Praktikakoha nimi ja registrikood:</p>
          <p>{{taotlus[0].praktikakoha_nimi}}</p>
        </div>
        <div class="flex">
          <p>Praktikakoha telefon:</p>
          <p>{{taotlus[0].praktikakoha_tel}}</p>
        </div>
        <div class="flex">
          <p>Praktikakoha e-posti aadress:</p>
          <p>{{taotlus[0].praktikakoha_epost}}</p>
        </div>
        <div class="flex">
          <p>Juriidiline aadress:</p>
          <p>{{taotlus[0].praktikakoha_address}}</p>
        </div>
        <div class="flex">
          <p>Lepingu sõlmija nimi ja amet:</p>
          <p>{{taotlus[0].lepingu_solmija}}</p>
        </div>
        <div class="flex">
          <p>Praktika toimumise aadress:</p>
          <p>{{taotlus[0].praktikakoha_address}}</p>
        </div>
        <div class="flex">
          <p>Lepingu allakirjastamise alus:</p>
          <p>{{taotlus[0].allkirjastamis_alus}}</p>
        </div>
        <div class="flex">
          <p>Praktikajuhendaja nimi ja amet:</p>
          <p>{{taotlus[0].praktikajuhedaja_nimi_amet}}</p>
        </div>
        <div class="flex">
          <p>Praktikajuhendaja kontakttelefon:</p>
          <p>{{taotlus[0].praktikajuhendaja_tel}}</p>
        </div>
        <div class="flex">
          <p>Praktikajuhendaja e-posti aadress:</p>
          <p>{{taotlus[0].praktikajuhendaja_epost}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: "pdf",
  data() {
    return {
      taotlus: []
    }
  },
  methods: {
    getTaotlusInfo() {
      axios.get(`https://praktika.ikt.khk.ee:5000/api/pdf/${this.$route.params.id}`, {withCredentials: true})
      .then(res => this.taotlus = res.data)
    }
  },
  created() {
    this.getTaotlusInfo();
  }
};
</script>


<style lang="scss" scoped>
    * {
      margin: 0;
      padding: 0;
      box-sizing: inherit; 
    }

    html {
      font-size: 62.5%; 
      font-size: 1rem;
    }

    body {
        font-family: "Lato", sans-serif !important;
        font-weight: 400;
        /* line-height: 1.7; */
        margin: 1rem;
        background: rgb(204,204,204)!important; 
        width: 21cm;
        /* height: 29.7cm; */
        margin-bottom: 0.5cm;
    }

    .wrapper {
        // font-family: "Lato", sans-serif !important;
        // font-weight: 400;
        position: absolute;
        /* margin: 2.5cm 2.5cm 2cm 3cm; */
        // margin: 2.5cm 2.5cm 2cm 2.5cm;
        margin: 1.5cm 2.5cm 1cm 2.5cm;
        width: 16cm;
    }

    #logo {
        margin-bottom: 1rem;
    }

    #date {
        font-family: "Lato", sans-serif;
    }

    .container {
        padding: 1rem 0;
    }


    .container p {
        padding: 0.25rem 0;
        font-family: "Lato", sans-serif;
    }

    h1 {
      font-family: "Lato", sans-serif;
      font-weight: 400;
    }


    h3 {
      font-family: "Lato", sans-serif;
      font-weight: 400;
      margin-bottom: 1.5rem;
    }

    .flex {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .space-between {
        justify-content: space-between!important;
    }

    .flex p:nth-child(2):not(:first-child) {
        /* margin-left: 1rem; */
        margin-left: auto;
    }
</style>