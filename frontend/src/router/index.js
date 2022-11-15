import { createWebHistory, createRouter } from "vue-router";
import UserLogin from "@/views/UserLogin.vue";
import { useAuthStore } from "@/stores/auth.store";

const redirectIfLoggedIn = (_to, _from) => {
	if (useAuthStore().isUserLoggedIn) {
		return {
			name: "profile",
		};
	}
};

const routes = [
	{
		path: "/login",
		name: "login",
		component: UserLogin,
		meta: {
			publicPage: true,
		},
		beforeEnter: redirectIfLoggedIn,
	},
	{
		path: "/register",
		name: "register",
		component: () => import("@/views/UserRegister.vue"),
		meta: {
			publicPage: true,
		},
		beforeEnter: redirectIfLoggedIn,
	},
	{
		path: "/profile",
		name: "profile",
		component: () => import("@/views/UserProfile.vue"),
	},
	{
		path: "/",
		name: "contactbook",
		component: () => import("@/views/ContactBook.vue"),
	},
	{
		path: "/contacts/:id",
		name: "contact.edit",
		component: () => import("@/views/ContactEdit.vue"),
		props: true,
	},
	{
		path: "/add",
		name: "contact.add",
		component: () => import("@/views/ContactAdd.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "notfound",
		component: () => import("@/views/NotFound.vue"),
	},
	{
		path: "/flag",
		name: "flag",
		component: () => import("@/views/ContactFlagged.vue"),
	},
	{
		path: "/finish",
		name: "finish",
		component: () => import("@/views/ContactFinish.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, _from) => {
	const authRequired = !to.meta.publicPage;
	const auth = useAuthStore();

	if (authRequired && !auth.isUserLoggedIn) {
		const query = to.fullPath === "/" ? {} : { redirect: to.fullPath };
		return {
			name: "login",
			query,
		};
	}
});

export default router;
