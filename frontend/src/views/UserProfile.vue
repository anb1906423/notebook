<template>
	<div v-if="currentUser" class="user-infor">
		
		<div class="profile-img">
			<img src="http://changsarn4u.com/loginnew/IMAGE/avatar.png"
			 alt="cannot load the image" 
			 class="profile-img-card"/>
		</div>
		<div class="infomation">
				Thông tin người dùng:
			<strong>Username: {{ currentUser.username }}</strong>
			<strong>Userid: {{ currentUser._id }}</strong>
			<strong>Email: {{ currentUser.email }}</strong>
		
		</div>
		<button class="logout-button btn btn-sm btn-primary rounded-pill">
			<a class="nav-link" @click.prevent="handleLogout">Đăng xuất</a>
		</button>
	</div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "@/stores/auth.store";

export default {
	computed: {
		...mapState(useAuthStore, {
			currentUser: "user",
		}),
	},
	methods: {
		...mapActions(useAuthStore, ["logout", "loadAuthState"]),

		handleLogout() {
			if(confirm("Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng?") == true) {
				this.logout();
				this.$router.push({ name: "login" });
			}
		},
	},
	created() {
		if (!this.currentUser) {
			this.$router.push({ name: "login" });
		}
	},
};
</script>

<style scoped>
.user-infor {
	display: inline-block;
	width: 100%;
	background-color: rgb(229, 227, 227);
	border-radius:10px;
	position: relative;
	box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
}

strong {
	line-height:30px;
	display: block;
	padding-top: 8px;
}
.logout-button {
	color:azure;
	margin: 12px;
	position:absolute;
	right:0px;
	bottom:0px;
	border-radius:30px;

}
.logout-button:hover {
	background-color: #0d4989;
	color: #fff;

}
.profile-img-card{
	float: left;
	display: block;
	width:120px;
	margin: 40px 20px ;
}
.infomation{
	margin: 20px 20px ;

	display: block;
	float:left;
}
.nav-link{
	color:#fff;
}
</style>