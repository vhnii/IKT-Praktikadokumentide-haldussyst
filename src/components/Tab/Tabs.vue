<template>
    <div class="tab-wrapper">
        <ul class="tab-header">
            <li class="header-item" v-for="tab in tabs"
          :key="tab"
          v-bind:class="{
            'header-item__active': activeTab === tab
          }"
          v-on:click="switchTab(tab);">
                <slot :name="tabHeadName(tab)">{{tab}}</slot>
            </li>
        </ul>
        <div class="tab-content-wrapper">
            <div class="tab-content">
                <slot :name="tabPanelName"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tabs: Array,
        initialTab: String
    },
    data() {
        return {
            activeTab: this.initialTab
        };
    },
    computed: {
        tabPanelName() {
            return `tab-panel-${this.activeTab}`;
        }
    },
    methods: {
        tabHeadName(tabName) {
            return `tab-head-${tabName}`;
        },

        switchTab(tabName) {
            this.activeTab = tabName;
        }
    }
}
</script>



<style lang="scss" scoped>

.tab-wrapper {
    color: #ffffff;
    font-family: 'Open Sans', sans-serif;

    .tab-header {
        display: flex;
        flex-direction: column;
        background: #0099d8;
        list-style: none;

        .header-item {
            width: 100%;
            text-align: center;
            cursor: pointer;
            padding: 20px 0;
            border-bottom: 1px solid #0087bc;
            text-transform: capitalize;
        }

        .header-item__active {
            color:#ffe600;
        }
    }

    .tab-content-wrapper {
        padding: 20px 5px;
        background: #0099d8;

        .tab-content {
            display: flex;
            flex-direction: column;

            div {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: .5rem 0;

                &.flex-column {
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-start;
                }

                p {
                    font-size: 1rem;
                    line-height: 25.6px;
                }

                a {
                    color: #ffe600;
                    font-weight: 700;
                    border-radius: 50px;
                    border: 1px solid #ffe600;
                    padding: .5rem 1rem;
                    font-size: 0.875rem;
                    min-width: 110px;
                    text-align: center;
                }

                .buttons {
                    display: flex;

                    a + a, a + button {
                        margin-left: 10px;
                    }

                    button {
                        color: #ffe600;
                        background: transparent;
                        outline: none;
                        cursor: pointer;
                        font-weight: 700;
                        border-radius: 50px;
                        border: 1px solid #ffe600;
                        padding: .5rem 1rem;
                        font-size: 0.875rem;
                        min-width: 110px;
                        text-align: center;
                    }
                }

                .item {
                    padding: 0;
                }
            }

            div:last-of-type {
                padding-bottom: 0;
            }
        }
    }
}

@media (min-width: 768px) {
    .tab-wrapper {
        .tab-header {
            flex-direction: row;
        }

        .tab-content-wrapper {
            padding: 20px 10px;
        }
    }
}

@media (min-width: 992px) {
    .tab-wrapper {
        .tab-header {
            display: inline-flex;

            .header-item {
                padding: 20px;
            }
        }

        .tab-content-wrapper {
            padding: 20px;
        }
    }
}
</style>