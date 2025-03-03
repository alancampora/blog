/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			main: 'var(--main)',
  			accent: 'var(--accent)',
  			danger: 'var(--danger)',
  			overlay: 'var(--overlay)',
  			bg: 'var(--bg)',
  			bw: 'var(--bw)',
  			bs: 'var(--bs)',
  			blank: 'var(--blank)',
  			text: 'var(--text)',
  			mtext: 'var(--mtext)',
  			border: 'var(--border)',
  			ring: 'var(--ring)',
  			ringOffset: 'var(--ring-offset)',
  			secondaryBlack: '#212121',
  			runtimeNeutralBg: 'var(--runtime-neutral-bg)',
  			runtimeOnNeutralBg: 'var(--runtime-on-neutral-bg)',
  			runtimePrimaryBg: 'var(--runtime-primary-bg)',
  			runtimeOnPrimaryBg: 'var(--runtime-on-primary-bg)',
  			runtimePrimary: 'var(--runtime-primary)',
  			runtimePrimaryLight: 'var(--runtime-primary-light)',
  			runtimeSecondary: 'var(--runtime-secondary)',
  			runtimeSecondaryLight: 'var(--runtime-secondary-light)',
  			runtimeAccent: 'var(--runtime-accent)',
  			runtimeAccentLight: 'var(--runtime-accent-light)',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			base: '5px'
  		},
  		boxShadow: {
  			shadow: 'var(--shadow)'
  		},
  		translate: {
  			boxShadowX: '4px',
  			boxShadowY: '4px',
  			reverseBoxShadowX: '-4px',
  			reverseBoxShadowY: '-4px'
  		},
  		fontWeight: {
  			base: '500',
  			heading: '700'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
