<template>
    <div class="upload-wrapper">
        <form enctype="multipart/form-data" @submit.prevent="uploadFile">
            <div>
                <div class="field file-upload">
                    <label for="file">{{fileName}}</label>
                    <input type="file" id="file" name="file" ref="file" title="" @change="selectFile">
                </div>
                <div class="field" v-if="file">
                    <input class="file-name" type="text" id="name" ref="filename" name="file-name" placeholder="Dokumendi nimi">
                </div>
            </div>

            <div class="field submit-upload">
                <button class="submit">Lisa</button>
            </div>

        </form>
            <div v-if="message" :class="`message ${error ? 'is-danger' : 'is-success'}`">
                <button class="delete" @click="closeMessage"></button>
                <div class="message-body">{{message}}</div>
            </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Upload',
    props: {
        docType: {
            type: String,
            required: true
        },
        group: {
            type: String,
            default: 'all'
        }
    },
    computed: {
        ...mapGetters({
            fileName: 'filename',
            file: 'file',
            message: 'upload_message',
            error: 'upload_error'
        }),
    },
    methods: {
        ...mapActions({
            upload: 'uploadDocument',
            select_file: 'selectDocument'
        }),
        closeMessage() {
            this.$store.commit('SET_UPLOAD_STATUS', {error: false, message: null})
        },
        selectFile() {
            const payload = {file: this.$refs.file.files[0], filename: this.$refs.file.files[0].name}
            this.select_file(payload)
        },
        uploadFile() {
            if (!this.file) {
                this.$store.commit('SET_UPLOAD_STATUS', {error: true, message: 'Fail puudub'})
            } else {

                const formData = new FormData();
                formData.append('doc', this.file)
                formData.append('docName', this.$refs.filename.value)
                formData.append('docType', this.docType)
                formData.append('group', this.group.toLowerCase())

                this.upload(formData);
                this.$refs.file.value = null;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.upload-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 40px;

    &::before {
        position: absolute;
        content: '';
        height: 2px;
        width: 100%;
        background: rgba(0, 0, 0, 0.075);
        margin-top: -1.75rem;
    }

    form {
        width: 100%;

        .field {
            margin-bottom: 20px;

            &:last-of-type{
                margin-bottom: 0;
            }
        }

        .file-name {
            color: #ffffff;
            font-size: 1rem;
            border: 1px solid #ffe600;
            border-radius: 5px;
            padding: 0.5rem .75rem;
            background: #0099d8;
            width: 100%;

            &::placeholder {
                color: #ffffff;
            }

            &:focus, &:focus-within {
                outline: none;
            }
        }

        .file-upload {
            position: relative;
            border: 1px solid #ffe600;
            border-radius: 5px;
            padding: 0.5rem .75rem;

            input {
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
                color: transparent;
                width: 100%;
                height: 100%;
            }
        }

        .submit-upload {
            margin-top: 20px;

            .submit {
                color: #ffe600;
                background: transparent;
                font-weight: 700;
                border-radius: 50px;
                border: 1px solid #ffe600;
                padding: .5rem 1.5rem;
                font-size: 0.875rem;
                min-width: 110px;
                text-align: center;
                width: 100%;
                cursor: pointer;
            }
        }

    }

    .message {
        width: 100%;
        text-align: center;
        position: relative;
        margin-top: 1rem;
        align-self: flex-start;
        color: #ffffff;
        border-radius: 4px;
        padding: 1rem 1.25rem;
        transition: all 300ms ease-in-out;

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


@media (min-width: 768px) {
    .upload-wrapper {
        margin-top: 20px;

        &::before {
            content: normal;
        }

        form {
            display: flex;
            width: 100%;
            justify-content: space-between;

            .field {
                margin-bottom: 0;
            }

            > div {
                display: flex;

                .file-upload {
                    margin-right: 10px;
                }
            }

            .submit-upload {
                margin-top: 0;
            }
        }

        .message {
            width: auto;
            padding: .5rem 1.5rem .5rem 1.5rem;
            text-align: left;
        }
    }

}

@media (min-width: 992px) {

    .upload-wrapper {
        form {
            .file-upload {
                min-width: 250px;
                cursor: pointer;

                label, input {
                    cursor: pointer;
                }
            }
        }
    }
}
</style>