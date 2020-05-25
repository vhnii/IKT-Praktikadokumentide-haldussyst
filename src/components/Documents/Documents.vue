<template>
    <div class="flex-column">
        <div v-for="document in filteredDocuments" :key="document._id">
            <div class="item">
                <p>{{documentName(document)}}</p>
                <div class="buttons">
                    <a :href="URL(document)" target="_blank">Vaata</a>
                    <div v-if="User">
                        <button class="delete-button" v-if="isAdmin" :data-id="document._id" @click="removeDocument(document)">Kustuta</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'documents',
    props: {
        data: Array,
        group: {
            type: String,
            default: 'all'
        },
        docType: String,
    },
    computed: {
        ...mapGetters({
            User: 'user',
            isAdmin: 'isAdmin'
        }),
        filteredDocuments() {
            return this.data.filter((document) => document.group === this.group.toLowerCase() && document.docType === this.docType);
        },
    },
    methods: {
        ...mapActions({
            removeDocument: 'removeDocument'
        }),
        URL(i) {
            return `${i.path}`
        },
        documentName(document) {
            if (!document.docName) {
                return document.doc;
            } else {
                return document.docName
            }
        },
    },
}
</script>

<style lang="scss" scoped>

.flex-column > div {
    width: 100%;
    padding: 0 0 30px 0;

    &:last-of-type {
        padding-bottom: 0;
    }

    .item {

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        p {
            font-size: 0.925rem;
            line-height: 1.5rem;
            word-break: break-word;
            margin-right: 10px;
        }

        .buttons {
            display: flex;
            flex-direction: column;

            a {
                margin-bottom: 10px;
            }

            a {
                color: #ffe600;
                font-weight: 700;
                border-radius: 50px;
                border: 1px solid #ffe600;
                padding: .5rem 1.5rem;
                padding: .5rem 1rem;
                font-size: 0.875rem;
                min-width: 110px;
                text-align: center;
            }

            button {
                    color: #ffe600;
                    background: transparent;
                    outline: none;
                    cursor: pointer;
                    font-weight: 700;
                    border-radius: 50px;
                    border: 1px solid #ffe600;
                    padding: .5rem 1.5rem;
                    padding: .5rem 1rem;
                    font-size: 0.875rem;
                    min-width: 110px;
                    text-align: center;
            }
        }
    }
}

@media (min-width: 425px) {

    .flex-column > div {
        .item {
            p {
                font-size: 1rem;
            }
        }
    }
}

@media (min-width: 992px) {
    .flex-column > div {
        .item {
            .buttons {
                flex-direction: row;

                a {
                    margin-bottom: 0;
                }

                a + a, a + button, a + div {
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>