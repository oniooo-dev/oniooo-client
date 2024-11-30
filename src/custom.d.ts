declare namespace JSX {
	interface IntrinsicElements {
		'l-jelly-triangle': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
			size?: string;
			speed?: string;
			color?: string;
		};
	}
}

declare module 'prismjs/components/prism-javascript' {
	import Prism from 'prismjs';
	export default Prism;
} 