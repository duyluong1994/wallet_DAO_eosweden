import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';


export default defineConfig(({ mode }) => {
	return {
		define: {
			'process.env.NODE_ENV': mode === 'production' ? '"production"' : mode === 'stagging' ? '"stagging"' : mode === 'client' ? '"client"' : '"development"',
		},
		plugins: [sveltekit(), enhancedImages()]
	};
});