<template>
    <footer>
            <div class="footer-item">
                <p class="footer-item__heading">Aadress</p>
                <p>Tartu Kutsehariduskeskus</p>
                <p>Kopli 1, 50115 Tartu</p>
            </div>


            <div class="footer-item">
                <p class="footer-item__heading">Kontakt</p>
                <p><a href="tel:+3727361842">Tel: +372 736 1842</a></p>
                <p><a href="mailto:hellika.ivanov@khk.ee">E-post: hellika.ivanov@khk.ee</a></p>
                <p>Tööruum: Kopli 1 A-412</p>
            </div>

            <div class="footer-item">
                <p class="footer-item__heading">Lingid</p>
                <p><a href="https://khk.ee" target="_blank">Tartu Kutsehariduskeskus</a></p>
                <p><a href="/privaatsustingimused" target="_blank">Privaatsustingimused</a></p>
            </div>
    </footer>
</template>

<style lang="scss" scoped>

footer {
    display: flex;
    flex-direction: column;
    background: #2e2e2e;
    justify-content: center;
    padding: 1rem;

    .footer-item {
        display: flex;
        flex-direction: column;
        margin: 2rem 0;

        .footer-item__heading {
            font-family: 'Open Sans', sans-serif;
            font-weight: 700;
            font-size: 1rem;
            margin-bottom: 20px;
        }

        p {
            margin: 5px 0;
            color: #ffffff;
        }

         a {
            color: #ffffff;
            text-decoration: none;

            &:hover {
                color: #0099d8;

            }
         }
    }
}

@media (min-width: 768px) {
    footer {
        flex-direction: row;
        padding: 1rem 0;

        .footer-item {
            margin: 0 auto;
        }
    }
}
</style>