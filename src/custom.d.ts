import { CodeComponent } from "react-markdown/lib/ast-to-react";

interface CodeProps extends React.HTMLProps<HTMLElement> {
	node: any; // You can further define this based on your usage
	inline?: boolean; // Include this if you need it, or remove if not used
}

declare module "dompurify" {
	const DOMPurify: {
		sanitize: (input: string) => string;
	};
	export default DOMPurify;
}

declare namespace JSX {
	interface IntrinsicElements {
		'l-jelly-triangle': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
			size?: string;
			speed?: string;
			color?: string;
		};
	}
}