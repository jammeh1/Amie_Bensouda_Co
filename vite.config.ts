import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	// Replace 'your-repo-name' with your actual GitHub repository name
	base: mode === "production" ? "/Amie_Bensouda_Co/" : "/",
	server: {
		host: "::",
		port: 8080,
	},
	plugins: [react()].filter(Boolean),
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
}));
