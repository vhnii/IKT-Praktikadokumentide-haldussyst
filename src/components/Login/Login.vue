<template>
    <section>
        <h1 class="heading">IKT-osakonna praktika</h1>
        <LoginForm />
    </section>
</template>

<script>
import LoginForm from '@/components/Login/Loginform.vue'
export default {
    components: {
        LoginForm
    },
    data() {
        return {
            form: {
                email: '',
                password: '',
            }
        }
    },
}
</script>

<style lang="scss" scoped>

section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .heading {
        color: #404040;
        font-family: 'Source Sans Pro', sans-serif;
        margin-bottom: 4rem;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .form-item {
            margin-bottom: 20px;

            input {
                line-height: 20px;
                border: 1px solid #0099d8;
                border-radius: 50px;
                padding: 5px;
                color: #0099d8;
                outline: none;
                width: 250px;
                background: #efefef;

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
    }
}

@media (min-width: 768px) {
    .heading {
        font-size: 2rem;
    }
}

@media (min-width: 1024px) {
    .heading {
        font-size: 2.8rem;
    }
}
</style>