<template>
  <section>
      <h1 class="headline text-center">Praktikataotlus</h1>

      <div class="internship-form">
        <form @submit.prevent @keydown.enter.prevent>
          <div id="student-form">
            <div>
              <h3>Praktikandi andmed:</h3>
              <div class="form-item">
                  <label>Õpilase nimi</label>
                  <input v-model="nimi" type="text" />
              </div>
              <div class="form-item">
                  <label>Eriala/Valdkond</label>
                  <input v-model="eriala" type="text" />
              </div>
              <div class="form-item">
                  <label>Praktikaperiood</label>
                  <input v-model="praktikaperiood" type="text" />
              </div>
              <div class="form-item">
                  <label>Praktika maht astronoomilistes tundides, EKAP-tes</label>
                  <input v-model="praktika_maht" type="text" />
              </div>
              <div class="form-item">
                  <label>Ettevõtte esindaja e-post:</label>
                  <input v-model="ettevote_email" type="email" />
              </div>
            </div>

            <div class="tasks">
              <h3>Ülesanded:</h3>
              <div class="form-item" v-for="(task, index) in tasks" v-bind:key="index">
                <input type="text" :ref="'task'" v-model="task.title"/>

                <span class="control" v-if="index + 1 === tasks.length" @click="addTask"><img src="../assets/plus.svg" alt></span>
                <span class="control" v-show="index > 0" @click="removeTask(index)"><img src="../assets/minus.svg" alt></span>
              </div>
            </div>
          </div>
          <div class="gdpr">
            <input type="checkbox" name="gdpr" id="gdpr" v-model="gdpr">
            <label for="gdpr">Olen tutvunud ja nõustun <a href="/privaatsustingimused" target="_blank">privaatsustingimustega</a>.</label>
          </div>
          <input class="send_button" type="submit" value="Saada" @click="SendApplication">
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
  name: "studentApplication",
  data() {
    return {
      nimi: '',
      eriala: '',
      praktikaperiood: '',
      praktika_maht: '',
      ettevote_email: '',
      tasks: [],
      blockRemoval: true,
      gdpr: false,
      notification: {
        message: null,
        error: false
      }
    }
  },
  watch: {
    tasks () {
      this.blockRemoval = this.tasks.length <= 1
    }
  },
  methods: {
    addTask () {
      let checkEmptyTasks = this.tasks.filter(task => task.title === null)
      if (checkEmptyTasks.length >= 1 && this.tasks.length > 0) return
      
      this.tasks.push({title: null})
      
      if (this.tasks.length > 1) {
        this.$nextTick(() => {
          let index = this.tasks.length - 1;
          let input = this.$refs.task[index];
          input.focus()
        })
      }

    },
    removeTask (index) {
      if (!this.blockRemoval) this.tasks.splice(index, 1)
    },
    SendApplication() {
      const options = { 
        headers: {'Content-Type': 'application/json',}, withCredentials: true}

      if(this.gdpr == true) {

        axios.post('https://praktika.ikt.khk.ee:5000/api/taotlus', {
          opilase_nimi: this.nimi,
          eriala: this.eriala,
          periood: this.praktikaperiood,
          maht: this.praktika_maht,
          ettevote_email: this.ettevote_email,
          ulesanded: this.tasks.map(t => t.title)
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

        this.nimi = '';
        this.eriala = '';
        this.praktikaperiood = '';
        this.praktika_maht = '';
        this.ettevote_email = '';
        this.tasks  = []
        this.addTask()
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
    userInfo() {
      axios.get('https://praktika.ikt.khk.ee:5000/api/users/me', {withCredentials: true})
      .then((res) => {
        this.$store.commit('SET_USER', res.data)
        this.nimi = res.data.name;

      if (res.data.group === 'vs') {
        this.eriala = 'Noorem tarkvaraarendaja'
        } else if (res.data.group === 'kd') {
          this.eriala = 'Kasutajakogemuse disaini nooremspetsialist'
        } else if (res.data.group === 'is') {
          this.eriala = 'IT-süsteemide spetsialist'
        } else if (res.data.group === 'isp') {
          this.eriala = 'IT-süsteemide spetsialist'
        } else if (res.data.group === 'syst') {
          this.eriala = 'Süsteemiadministraator'
        } else if (res.data.group === 'ita') {
          this.eriala = 'Tarkvaraarendaja'
        }
      }).catch((err) => {
        this.$store.commit('LOGOUT')
        this.$router.push('/')
        throw err
      })
    }
  },
  created() {
    this.userInfo();
  },
  mounted() {
    this.addTask()
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

  .internship-form {
    display: flex;
    flex-direction: column;

    form {
      display: flex;
      flex-direction: column;

      #student-form {
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
          }

          input {
            width: 100%;
            border: 1px solid #0099d8;
            border-radius: 3px;
            color: #0099d8;
            font-size: 1rem;
            padding: 5px;
            width: 100%;
            background: #efefef;

            &:focus-within, &:focus {
            border: 1px solid #0099d8;
            }
          }
        }

        .tasks {
          > .form-item {
            flex-direction: row;
            align-items: center;

            input {
              margin-right: 5px;
              max-width: calc(100% - 70px)
            }

            span + span {
              margin-left: 5px;
            }

            span {
              cursor: pointer;
              padding: 5px;
            }

            span > img {
              width: 20px;
              height: 20px;
              max-width: 20px;
              max-height: 20px;
              min-width: 20px;
              min-width: 20px;
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
          margin-right: 5px;
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

@media (min-width: 435px) {
  .gdpr {
    justify-content: flex-end;
    align-items: center;
  }
}

@media (min-width: 768px) {
  .internship-form {
    form {
      #student-form {
        .form-item {
          width: 310px;
        }

        .tasks {
          > .form-item {
              width: auto;
              max-width: calc(100% - 70px)
          }
        }
      }

      .gdpr {
        margin-top: 20px;
        justify-content: flex-end;
        align-items: center;
      }

      .message {
        width: auto;
        align-self: flex-end;
        padding: 1rem 2rem 1rem 1.5rem;
        text-align: left;
      }

      .send_button, input[type="submit"] {
        width: 100px;
        margin-right: 20px;
        align-self: flex-end;
      }
    }
  }
}

@media (min-width: 992px) {
  .internship-form {
    padding: 0 4rem;

    form {
      width: 100%;

      #student-form {
        display: flex;
        width: 100%;

        > div {
          width: 50%;
        }

        .form-item {
          width: 100%;
        }

        .tasks {
          margin-left: 2rem;
          width: 50%;

          > .form-item:first-of-type {
            margin-top: 46px;
          }

          > .form-item {
            max-width: 100%;
          }
        }
      }
    }
  }
}

@media (min-width: 1200px) {

  section {
    .internship-form {
      flex-direction: row;
      padding: 5rem;

      form {
        #student-form {
          display: flex;
          flex-direction: row;
          padding: 0;
          width: 100%;

          .form-item {
            display: flex;
            flex-direction: row;
            margin: 20px 0px;
            width: 100%;
            justify-content: space-between;
            align-items: center;

            label {
              margin: 0;
              margin-right: 50px;
              line-height: 1.5;
            }

            input {
              height: 30px;
              min-width: 250px;
              width: 250px;
            }
          }

          .tasks {
            margin-left: 2rem;

            .form-item {
              &:first-of-type {
                margin: 20px 0;
              }

              width: 100%;
              margin: 20px 0;
              justify-content: flex-start;

              input {
                width: 100%;
                max-width: calc(100% - 50px);
              }

              span {
                  padding:0;
              }
            }
          }
        }
      }
    }
  }
}

@media (min-width: 1400px) {
  section {
    .internship-form {
      padding: 5rem 10rem;
    }
  }
}
</style>