<template>
	<div class="page">
		<div>
			<h4 class="title-add-note">Thêm ghi chú</h4>
			<ContactForm :contact="{}" :resetAfterSubmit="false" @submit:contact="saveContact" />
		</div>
	</div>
</template>

<script>
import { swtoast } from "@/mixins/swal.mixin";
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
	components: {
		ContactForm,
	},
	methods: {
		async saveContact(data) {
			try {
				await ContactService.create(data);
				swtoast.success({
					text: "Ghi Chú được thêm thành công.",
				});
				this.$router.push({ path: '/' });
			} catch (error) {
				console.log(error);
				swtoast.error({
					text: "Đã có lỗi xảy ra.",
				});
			}
		},
	},
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
