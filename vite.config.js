import { resolve } from 'path'
import { defineConfig } from 'vite'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
	base: '/ohavite/',
	root,
	build: {
		outDir,
		rollupOptions: {
			input: {
				sample1: resolve(root, 'sample1', 'home.html'),
				sample2: resolve(root, 'sample2', 'index.html'),
			},
		},
	},
})