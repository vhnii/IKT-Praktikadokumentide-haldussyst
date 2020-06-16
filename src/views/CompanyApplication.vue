<template>
  <section>
      <h1 class="headline text-center">Praktikataotlus</h1>

      <div class="internship-form">
        <form @submit.prevent @keydown.enter.prevent>
          <div id="company-form">
            <div>
              <h3 class="student-name">Õpilase nimi: {{this.opilase_nimi}}</h3>
              <h3>Praktikakoha andmed:</h3>
              <div class="form-item">
                <label>Praktikakoha nimi ja reg. kood</label>
                <input type="text" v-model="praktikakoha_nimi"/>
              </div>
              <div class="form-item">
                <label>Praktikakoha telefon</label>
                <input type="text" v-model="praktikakoha_tel"/>
              </div>
              <div class="form-item">
                <label>Praktikakoha e-posti aadress</label>
                <input type="email" v-model="praktikakoha_epost"/>
              </div>
              <div class="form-item">
                <label>Juriidiline aadress ja postiindeks</label>
                <input type="text" v-model="juriidiline_aadress"/>
              </div>
              <div class="form-item">
                <label>Lepingu sõlmija nimi ja amet</label>
                <input type="text" v-model="lepingu_solmija" />
              </div>
              <div class="form-item">
                <label>Praktika toimumise aadress</label>
                <input type="text" v-model="praktikakoha_aadress" />
              </div>
              <div class="form-item">
                <label>Lepingu allkirjastamise alus<p>(volikirja, põhikirja, kodukorra, põhimääruse alusel vms)</p></label>
                <input type="text" v-model="allkirjastamis_alus"/>
              </div>
              <div class="form-item">
                <label>Praktikajuhendaja nimi ja amet</label>
                <input type="text" v-model="praktikajuhendaja_nimi_amet" />
              </div>
              <div class="form-item">
                <label>Praktikajuhendaja kontakttelefon</label>
                <input type="text" v-model="praktikajuhendaja_tel" />
              </div>
              <div class="form-item">
                <label>Praktikajuhendaja e-posti aadress</label>
                <input type="text" v-model="praktikajuhendaja_epost" />
              </div>
            </div>
            <div class="tasks">
                  <h3>Ülesanded:</h3>
                  <div class="task-item" v-for="task in tasks" :key="task">
                    <input type="checkbox" :id="task" :value="task" v-model="doAbleTasks">
                    <label :for="task">{{task}}</label>
                  </div>
            </div>
          </div>
          <div class="gdpr">
            <input type="checkbox" name="gdpr" id="gdpr" v-model="gdpr">
          <label for="gdpr">Olen tutvunud ja nõustunud <a href="/privaatsustingimused" target="_blank">privaatsustingimustega</a>.</label>
          </div>
        <input class="send_button" type="submit" value="Saada" @click="sendApplication">
        <div :class="`message ${this.notification.error ? 'is-danger' : 'is-success'}`" v-if="this.notification.message">
          <button class="delete" @click="closeMessage"></button>
          <div class="message-body">{{this.notification.message}}</div>
        </div>
        </form>
      </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: "company",
  data() {
    return {
      praktikakoha_nimi: '',
      praktikakoha_epost: '',
      praktikakoha_tel: '',
      juriidiline_aadress: '',
      lepingu_solmija: '',
      praktikakoha_aadress: '',
      allkirjastamis_alus: '',
      praktikajuhendaja_nimi_amet: '',
      praktikajuhendaja_tel: '',
      praktikajuhendaja_epost: '',
      opilase_nimi: '',
      tasks: [],
      doAbleTasks: [],
      gdpr: false,
      notification: {
        message: null,
        error: false
      }
    }
  },
  methods: {
    sendApplication() {

      const options = { headers: {'Content-Type': 'application/json',}, withCredentials: true}

      if(this.gdpr == true) {

      axios.post(`https://praktika.ikt.khk.ee:5000/api/taotlus/${this.$route.params.id}/company`, {
        
        praktikakoha_nimi: this.praktikakoha_nimi,
        praktikakoha_tel: this.praktikakoha_tel,
        praktikakoha_epost: this.praktikakoha_epost,
        juriidiline_address: this.juriidiline_aadress,
        lepingu_solmija: this.lepingu_solmija,
        praktikakoha_address: this.praktikakoha_aadress,
        allkirjastamis_alus: this.allkirjastamis_alus,
        praktikajuhedaja_nimi_amet: this.praktikajuhendaja_nimi_amet,
        praktikajuhendaja_tel: this.praktikajuhendaja_tel,
        praktikajuhendaja_epost: this.praktikajuhendaja_epost,
        ulesanded: this.doAbleTasks


      }, options)
      .then(() => {
        this.notification.message = 'Täname, taotlus on saadetud'
        this.notification.error = false;
        
        setTimeout(() => {
          this.notification.message = null;
        }, 5000)
      })
      .catch((error) => {
        if (error.response) {
            this.notification.message = error.response.data.error
            this.notification.error = true;
        }
      })

      this.praktikakoha_nimi = '';
      this.praktikakoha_epost = '';
      this.praktikakoha_tel = '';
      this.juriidiline_aadress = '';
      this.lepingu_solmija = '';
      this.praktikakoha_aadress = '';
      this.allkirjastamis_alus = '';
      this.praktikajuhendaja_nimi_amet = '';
      this.praktikajuhendaja_tel = '';
      this.praktikajuhendaja_epost = '';
      this.doAbleTasks = [];
      this.tasks = [];
      this.getData();
      this.gdpr = false;
      } else {
        this.notification.message = 'Kinnitage, et nõustute privaatsustingimustega'
        this.notification.error = true;
      }

    },
    closeMessage() {
      this.notification.message = '';
      this.notification.error = false;
    },
    getData() {
      axios.get(`https://praktika.ikt.khk.ee:5000/api/taotlus/${this.$route.params.id}/ulesanded`)
      .then((res) => {
        this.tasks = res.data.ulesanded
        this.opilase_nimi = res.data.opilase_nimi
      })
      .catch((error) => {
        if (error) {
          this.$router.push({name: '404'});
        }
      })
    }
  },
  mounted() {
    this.getData();
  }
};
</script>



<style lang="scss" scoped>

section {
  padding: 5rem 0;

  .headline {
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 700;
    font-size: 2.25rem;
    margin-bottom: 40px;
    text-align: center;
    color: #404040;
  }

  .student-name {
    font-size: 1rem;
    margin-bottom: .5rem;
  }

  .internship-form {
    display: flex;
    flex-direction: column;

    form {
      display: flex;
      flex-direction: column;

      #company-form {
        h3 {
          font-family: "Source Sans Pro", sans-serif;
          font-size: 1.5rem;
          color: #404040;
        }

        padding: 0 .5rem;

        .form-item {
          display: flex;
          flex-direction: column;
          margin: 20px 10px;
          margin-bottom: 20px;

          label {
            margin-bottom: 10px;

            p {
              margin-top: 5px;
              font-size: 0.675rem;
            }
          }

          input {
            width: 100%;
            border: 1px solid #0099d8;
            border-radius: 3px;
            color: #0099d8;
            font-size: 1rem;
            padding: 5px;
            background: #efefef;

            &:focus-within, &:focus {
            border: 1px solid #0099d8;
            }
          }
        }

        .tasks {
          padding: 0 .5rem;
          > .task-item {
            display: flex;
            margin: 20px 0;

            input {
              margin-top: 5px;
              margin-right: 10px;
              min-width: 16px;
              min-height: 16px;
            }

            label {
              line-height: 1.5;
            }
          }
        }

      }

      .gdpr {
        display: flex;
        padding: 20px;
        margin-bottom: 20px;

        input {
          min-width: 16px;
          min-height: 16px;
          height: 16px;
          width: 16px;
          max-height: 16px;
          max-width: 16px;
          margin-right: 10px;
        }

        label {
          font-family: "Open Sans", sans-serif;

          a {
            color: #0099d8;

            &:hover {
              color: #0054a6;
            }
          }
        }
      }

      .message {
        position: relative;
        text-align: center;
        padding: 20px;
        margin-top: 1rem;
        color: #ffffff;
        border-radius: 4px;
        padding: 1rem 1.25rem;
        background: #48c774;

        .delete {
          display: none;
          position: absolute;
          cursor: pointer;
          right: .25rem;
          top: .25rem;
          border: none;
          border-radius: 290486px;
          background: rgba(10, 10, 10, 0.2);
          height: 20px;
          width: 20px;
          outline: 0;
          vertical-align: top;
          max-height: 20px;
          max-width: 20px;
          min-height: 20px;
          min-width: 20px;

          &::after, &::before {
              background: #ffffff;
              content: '';
              display: block;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translateX(-50%) translateY(-50%) rotate(45deg);
              transform-origin: center center;
          }

          &::before {
              height: 2px;
              width: 50%;
          }

          &::after {
              height: 50%;
              width: 2px;
          }

        }

        &.is-success {
          background: #48c774;
        }

        &.is-danger {
          background: #f14668;

          .delete {
            display: block;
          }
        }
      }

      .send_button {
        margin: 0 5%;
        width: 90%;
        color: #ffffff;
        padding: 10px 15px;
        border-radius: 50px;
        font-family: 'Open Sans', sans-serif;
        font-size: 1rem;
        background-color: #0099d8;
        border: 1px solid #0099d8;
        cursor: pointer; 
        outline: none;
      }
    }
  }
}

@media (min-width: 375px) {
  section {
    .internship-form {
      form {
        #company-form {
          .form-item {
            label {
              p {
                font-size: 0.75rem;
              }
            }
          }
        }
      }
    }
  }
}

@media (min-width: 460px) {
  .gdpr {
    justify-content: flex-end;
    align-items: center;
  }
}


@media (min-width: 768px) {
  section {
    .student-name {
      font-size: 1.2rem;
    }

    .internship-form {
      form {
        #company-form {
          .form-item {
            input {
              width: 50%;
            }
            label {
              p {
                font-size: 0.875rem;
              }
            }
          }

          .tasks {
            > .task-item {
              input {
                // margin-top: 4px;
                align-items: center;
              }
            }
          }
        }

        .gdpr  {
          justify-content: flex-end;
        }

        .message {
                width: auto;
                align-self: flex-end;
                padding: 1rem 2rem 1rem 1.5rem;
                text-align: left;
          }

        .send_button {
          width: 100px;
          margin-right: 20px;
          align-self: flex-end;
        }
      }
    }
  }
}

@media (min-width: 992px) {
  section {
    .student-name {
      margin: 0;
    }

    .internship-form {
      padding: 0 4rem;

      form {
        width: 100%;

        #company-form {
          display: flex;
          width: 100%;
          padding: 0;

          > div {
            width: 50%;
          }

          .form-item {
            margin: 20px 0;

            input {
              width: 300px;
            }

            label {
              p {
                font-size: 0.75rem;
              }
            }
          }

          .tasks {
            padding: 0;

            h3 {
              margin-bottom: 3rem;
            }
            .task-item {
              width: 100%;
              align-items: center;

              input {
                margin-top: 0;
                cursor: pointer;
                min-width: 16px;
                min-height: 16px;
              }

              label {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}

@media (min-width: 1500px) {
  section {
    padding: 5rem 0;
    .student-name {
      margin-left: 0;
    }

    .internship-form {
      padding: 5rem 10rem;

      form {
        width: 100%;

        #company-form {
          display: flex;
          width: 100%;
          padding: 0;

          > div {
            width: 50%;
          }

          .form-item {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin: 20px 0;
            width: 100%;

            input {
              width: 250px;
              height: 30px;
            }

            label {
              p {
                font-size: .75rem;
              }
            }
          }

          .tasks {
            margin-left: 2rem;
            padding: 0;

            h3 {
              margin-bottom: 42px;
            }
            .task-item {
              width: 100%;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 1650px) {
  section {
    .internship-form {
      form {
        #company-form {
          .form-item {
            label {
              p {
                font-size: .875rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>