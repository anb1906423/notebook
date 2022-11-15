<template>
	<div v-if="contact" class="page">
		<ContactForm
			:contact="contact"
			@submit:contact="updateContact"
			@delete:contact="deleteContact"
		/>
	</div>
</template>

<script>
import { swtoast, swalert } from "@/mixins/swal.mixin";
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
	components: {
		ContactForm,
	},
	props: {
		id: { type: String, required: true },
	},
	data() {
		return {
			contact: null,
		};
	},
	methods: {
		async getContact(id) {
			try {
				this.contact = await ContactService.get(id);
			} catch (error) {
				console.log(error);
				this.$router.push({
					name: "notfound",
					params: { pathMatch: this.$route.path.split("/").slice(1) },
					query: this.$route.query,
					hash: this.$route.hash,
				});
			}
		},

		async updateContact(data) {
			try {
				await ContactService.update(this.contact._id, data);
				swtoast.success({
					text: "Ghi chú được cập nhật thành công.",
				});
				this.$router.push({path: '/'});
			} catch (error) {
				console.log(error);
				swtoast.error({
					text: "Đã có lỗi xảy ra.",
				});
			}
		},

		async deleteContact() {
			swalert
				.fire({
					title: "Xóa Ghi Chú",
					icon: "warning",
					text: "Bạn muốn xóa Ghi chú này?",
					showCloseButton: true,
					showCancelButton: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						try {
							await ContactService.delete(this.contact._id);
							swtoast.success({
								text: "Ghi Chú được xóa thành công.",
							});
							this.$router.push({ name: "contactbook" });
						} catch (error) {
							console.log(error);
							swtoast.error({
								text: "Đã có lỗi xảy ra.",
							});
						}
					}
				});
		},
	},
	created() {
		this.getContact(this.id);
	},
};
</script>
