<template>
    <section>
        <h1 class="title">Privaatsustingimused</h1>

        <div class="container">
            <p>
                Privaatsustingimused kehtivad veebirakenduse domain.ee kasutamisel ning keskkonnas kogutud andmete töötlemisel. 
                Tartu Kutsehariduskeskus haldab veebikeskkonda ning on kogutud isikuandmete vastutav töötleja. 
                Privaatsustingimustes kirjeldatakse kuidas Tartu Kutsehariduskeskus töötleb (kogub, kasutab, säilitab, edastab, kustutab jne) andmeid.</p>
            
            <div class="term-item">
                <h3>Milliseid isikuandmeid töödeldakse?</h3>
                <ul>
                    <li>Kontaktandmeid (nimi, telefoninumber, e-posti aadress, aadress) esitamisel meie veebikeskkonnas</li>
                    <li>Veebilehe kasutamisel registreeritud kasutaja kontoinfost</li>
                </ul>
            </div>

            <div class="term-item">
                <h3>Kuidas asutus isikuandmeid kogub?</h3>
                <p>Tartu Kutsehariduskeskus kogub isikuandmeid, kui kasutaja (käesolevate privaatsustingimuste mõttes on kasutaja nii registeeritud kasutaja kui ka veebikeskkonna külastaja):</p>
                <ul>
                    <li>On keskkonda registreeritud</li>
                    <li>Täidab praktika taotluses vajaminevaid andmeid</li>
                </ul>
            </div>


            <div class="term-item">
                <h3>Mis eesmärgil isikuandmeid töödeldakse?</h3>
                <ul>
                    <li>Isikuandmeid kasutatakse praktika taotluste täitmiseks ja haldamiseks.</li>
                    <li>Isikuandmeid nagu e-post, telefoni numbrid, ettevõtete aadressid, ettevõtete ning töötajate nimed (ettevõtted ja töötajad, kes võtavad Tartu Kutsehariduskeskusest enda juurde õpilasi praktikale) tööteldakse selleks, et vajadusel lahendada praktikaga seotuid küsimusi.</li>
                </ul>
            </div>

            <div class="term-item">
                <h3>Vastuvõtjad, kellele isikuandmed edastatakse</h3>
                <ul>
                    <li>Isikuandmed edastatakse kooli praktika koordinaatorile, IKT-osakonna õpilaste praktikaga seotud toimingute tegemiseks.</li>
                </ul>
            </div>

            <div class="term-item">
                <h3>Säilitamine</h3>
                <ul>
                    <li>Praktika taotluses olevaid õpilaste isikuandmeid hoitakse andmebaasis 2 aastat ning ettevõtete andmeid 1 aasta.</li>
                    <li>PDF formaadis praktika taotlusi hoitakse arhiivis 5 aastat.</li>
                </ul>
            </div>


            <p>Tartu Kutsehariduskeskus jätab endale õiguse teha privaatsustingimustes muudatusi. Tingimusi muudetakse eelkõige andmekaitsega seotud õigusaktide järgimiseks.</p>
            <p>Käesolevad privaatsustingimused on avaldatud 01.05.2020 seisuga.</p>
        </div>

    </section>
</template>

<script>
export default {
    name: 'Privacypolicy'
}
</script>

<style lang="scss" scoped>



section {
    padding: 5rem 0;

    .title {
        font-family: "Source Sans Pro", sans-serif;
        font-weight: 700;
        color: #404040;
        margin-bottom: 40px;
        text-align: center;
        text-align: center;
    }

    .container {
        margin: 0 5%;

        p {
            line-height: 1.75rem;
            margin-bottom: 1.25rem;
        }

        .term-item {
            margin-bottom: 1.2rem;

            h3 {
                color: #404040;
                font-family: "Source Sans Pro", sans-serif;
                font-size: 1.5rem;
                margin-bottom: 1rem;
                font-weight: 400;
            }
            ul {
                margin-left: 1rem;
                li {
                    position: relative;
                    list-style: none;
                    line-height: 1.75rem;
                    margin-bottom: .6rem;

                    &::before {
                        display: block;
                        content: '';
                        position: absolute;
                        transform: translateY(50%);
                        left: -1rem;
                        top: 2.5px;
                        width: 10px;
                        height: 10px;
                        border-radius: 100%;
                        background: #0099d8;
                    }
                }
            }
            ul li {
                list-style: none;
            }

            &:last-of-type {
                margin-bottom: 2rem;
            }
        }

    }
}

@media (min-width: 425px) {
    section {
        .title {
            font-size: 2.25rem;
        }

        .container {
            margin: 0 10%;
        }
    }
}
</style>