<template>
    <div>
        <form>
            <div class="form-item">
                <input type="text" v-model="form.email" placeholder="Kasutajanimi" id="username" autofocus>
            </div>
            <div class="form-item">
                <input type="password" v-model="form.password" placeholder="Parool" id="password">
            </div>
            
            <div class="form-item">
                <input type="submit" value="Logi sisse" @click.prevent="login">
            </div>
            <div :class="`message ${this.notification.error ? 'is-danger' : 'is-success'}`" v-if="this.notification.message">
                <button class="delete" @click="closeMessage"></button>
                <div class="message-body">{{this.notification.message}}</div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            notification: {
                message: null,
                error: false
            }
        }
    },
    methods: {
        ...mapActions({
            signIn: 'signIn'
        }),
        login() {

            this.signIn(this.form)
            .catch((error) => {
                if (error.response) {
                    this.notification.message = error.response.data.msg
                    this.notification.error = true;
                    this.form.password = '';
                }
            })
        },
        closeMessage() {
            this.notification.message = '';
            this.notification.error = false;
        },
    }
}
</script>


<style lang="scss" scoped>
form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .form-item {
        margin-bottom: 20px;

        input {
            line-height: 20px;
        }

        input[type="text"], input[type="password"] {
            border: 1px solid #0099d8;
            border-radius: 50px;
            padding: 5px;
            color: #0099d8;
            outline: none;
            width: 250px;
            background: #efefef;
            font-size: 1rem;
            
            &::placeholder {
                color: #0099d8;
            }
        }

        input[type="submit"] {
            background:#0099d8;
            color: #ffffff;
            width: 250px;
            border: 1px solid #0099d8;
            border-radius: 50px;
            padding: 2px 8px;
            outline: none;
            font-size: 16px;
            line-height: 26px;
            transition: 150ms ease-in-out;
            cursor: pointer;


            &:hover {
                background:#00719e;
                border: 1px solid #00719e;
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
        padding: 1rem 1.5rem 1rem 1.25rem;
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
}
</style>