<template>
    <section>
        <div class="wrapper">
            <h1>404</h1>
            <h3>Lehte ei leitud</h3>
            <a href="/">Mine avalehele</a>
        </div>
    </section>
</template>

<script>
export default {
    name: 'notFound'
}
</script>

<style lang="scss" scoped>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #0099d8;

        .wrapper {
            text-align: center;
            color: #ffffff;
            padding: 5rem;

            h1 {
                font-size: 3rem;
                margin-bottom: 1rem;
            }

            h3 {
                margin-bottom: 2rem;
                text-transform: uppercase;
            }

            a {
                color: #ffe600;
                font-weight: 900;
                border-radius: 50px;
                border: 1px solid #ffe600;
                padding: .5rem 1.5rem;
                font-size: 0.875rem;
                min-width: 110px;
                text-align: center;
            }
        }
    }
</style>