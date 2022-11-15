<template>
    <div class="page row">
        <div class="menu">
            <div class=" row justify-content-around align-items-center d-inline tools">
                <button class="btn btn-sm btn-primary  rounded-pill" @click="refreshList()">
                    <i class="fas fa-redo"></i> Tải lại
                </button>

                <button class="btn btn-sm btn-success  rounded-pill" @click="goToAddContact">
                    <i class="fas fa-plus"></i> Thêm
                </button>
                
                <button class="btn btn-sm btn-danger rounded-pill" @click="removeAllContacts">
                    <i class="fas fa-trash"></i> Xóa hết
                </button>
                <button class="btn btn-sm btn-warning rounded-pill invisible " @click="refreshList"
                    style="padding:0px; height:100%;">
                    <div v-if="activeContact" class="btn-edit">
                        
                        <router-link :to="{
                            name: 'contact.edit',
                            params: { id: activeContact._id },
                        }">
                            <button class="btn btn-sm btn-info h-100 rounded-pill visible btn-setting">
                                <i class="fa-solid fa-book-open"></i> Xem
                            </button>
                        </router-link>
                    </div>
                </button>
                <button class="btn btn-sm btn-warning rounded-pill invisible " @click="refreshList"
                    style="padding:0px; height:100%;">
                    <div v-if="activeContact" class="btn-edit">
                        <button class="btn btn-sm btn-warning h-100 rounded-pill visible btn-setting"
                            @click="deleteContact(activeContact._id)">
                            <i class="fa-solid fa-calendar-minus"></i> Xóa
                        </button>
                    </div>
                </button>
            </div>
            <div class="col-md-10 menu-search">
                <InputSearch v-model="searchText" />
            </div>
        </div>

        <div class="mt-3">
            <h4>
                Ghi chú
                <i class="fa-regular fa-clipboard"></i>
            </h4>
            <FinishList v-if="filteredContactsCount > 0" :contacts="filteredContacts"
                v-model:activeIndex="activeIndex" />
            <p v-else>Chưa hoàn thành ghi chú nào.</p>


        </div>
        
    </div>
</template>

<script>
import { swalert } from "@/mixins/swal.mixin";
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import FinishList from "@/components/FinishList.vue";
import ContactService from "@/services/contact.service";

export default {
    components: {
        ContactCard,
        InputSearch,
        FinishList,
    },
    data() {
        return {
            contacts: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        contactStrings() {
            return this.contacts.map((contact) => {
                const  { name, email, phone, favorite, finish } = contact;
                return [name, email, phone, favorite, finish].join("");
            });
        },
        filteredContacts() {
            if (!this.searchText) return this.contacts;
            return this.contacts.filter((_contact, index) =>
                this.contactStrings[index].includes(this.searchText)
            );
        },
        activeContact() {
            if (this.activeIndex < 0) return null;
            return this.filteredContacts[this.activeIndex];
        },
        filteredContactsCount() {
            return this.filteredContacts.length;
        },
    },
    methods: {
        async retrieveContacts() {
            try {
                this.contacts = await ContactService.getAll();
                this.contacts.sort((current, next) =>
                    current.name.localeCompare(next.name)
                );
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveContacts();
            this.activeIndex = -1;
        },

        async removeAllContacts() {
            swalert
                .fire({
                    title: "Xóa tất cả Liên hệ",
                    icon: "warning",
                    text: "Bạn muốn xóa tất cả Liên hệ?",
                    showCloseButton: true,
                    showCancelButton: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await ContactService.deleteAll();
                            this.refreshList();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                });
        },

        async deleteContact(id) {
            swalert
                .fire({
                    title: "Xác nhận xóa ghi chú",
                    icon: "warning",
                    text: "Xác nhận xóa ghi chú?",
                    showCloseButton: true,
                    showCancelButton: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await ContactService.delete(id);
                            this.refreshList();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                });
        },

        goToAddContact() {
            this.$router.push({ name: "contact.add" });
        },
    },
    created() {
        this.refreshList();
    },
};
</script>

<style scoped>
.page {
    text-align: left;
}

.menu {
    /* position: relative; */
    display: flex;
    width: 100%;
    /* height:50px; */
    /* background-color:red; */
}

.menu-search {
    max-width: 600px;
}

.tools {
    height: 50px;
    width: 600px;
    top: 0;
    margin: 0;
}

.btn {
    margin: 0px 10px;
    min-width: 90px;
}

.navbar-edit {
    position: absolute;
}

.btn-edit {
    color: red;
    padding: 0px;
    /* position:relative; */
    width: 90px;
}

.btn-setting {
    /* position: absolute; */
    width: 90px;
    left: 0px;
    margin: auto 0;
}

.mt-3 h4 i {
    margin-left: 4px;
}
</style>