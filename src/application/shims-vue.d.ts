declare module "*.vue" {
	import Vue from "vue";
	export default Vue;
}

// https://v3-migration.vuejs.org/migration-build.html#upgrade-workflow
declare module "vue" {
	import type { CompatVue } from "@vue/runtime-dom";
	const Vue: CompatVue;
	export default Vue;
	export * from "@vue/runtime-dom";
	const { configureCompat } = Vue;
	export { configureCompat };
}

// Until vue-select typins are ready
