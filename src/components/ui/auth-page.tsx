'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from './button';

import {
	Apple as AppleIcon,
	AtSign as AtSignIcon,
	ChevronLeft as ChevronLeftIcon,
	Grid2x2Plus as Grid2x2PlusIcon,
} from 'lucide-react';
import { Input } from './input';
import { cn } from '@/lib/utils';

export function AuthPage() {
	const router = useRouter();

	const handleAuth = (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		localStorage.setItem("isLoggedIn", "true");
		
		const isRegister = typeof window !== 'undefined' && window.location.pathname.includes('register');
		if (isRegister) {
			router.push('/onboarding');
		} else {
			router.push('/dashboard');
		}
	};

	return (
		<main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2 bg-[#070708] text-slate-100">
			{/* Left Decorative Column */}
			<div className="bg-[#070708] relative hidden h-full flex-col border-r border-slate-900 p-10 lg:flex overflow-hidden">
				{/* Subtle center glow for depth */}
				<div className="pointer-events-none absolute inset-0 z-0">
					{/* Soft center backlight */}
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.035)_0%,transparent_70%)]" />
					{/* Edge vignette for depth */}
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
				</div>
				<div className="z-10 flex items-center gap-1 cursor-pointer" onClick={() => router.push('/')}>
					<img src="/coretify.png" alt="Coretify Logo" className="h-8 w-auto object-contain" />
					<p className="text-[19px] font-semibold tracking-tight text-white">Coretify</p>
				</div>
				<div className="z-10 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg text-zinc-200 font-sans font-medium leading-relaxed italic">
							&ldquo;Platform ini membantu saya memantau komunikasi klien secara real-time, mendeteksi risiko churn lebih awal, dan menyelaraskan keputusan tim secara instan.&rdquo;
						</p>
						<footer className="font-mono text-xs font-semibold text-zinc-500 tracking-wider uppercase mt-2">
							— Julian Albertus
						</footer>
					</blockquote>
				</div>
				<div className="absolute inset-0 z-0">
					<FloatingPaths position={1} />
					<FloatingPaths position={-1} />
				</div>
			</div>

			{/* Right Auth Form Column */}
			<div className="relative flex min-h-screen flex-col justify-center p-4">
				<div
					aria-hidden
					className="absolute inset-0 isolate contain-strict -z-10 opacity-60"
				>
					<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(255,255,255,0.02)_0,hsla(0,0%,55%,0.005)_50%,transparent_80%)] absolute top-0 right-0 h-[320px] w-[140px] -translate-y-87.5 rounded-full" />
					<div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.015)_0,transparent_80%)] absolute top-0 right-0 h-[320px] w-[60px] [translate:5%_-50%] rounded-full" />
					<div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.015)_0,transparent_80%)] absolute top-0 right-0 h-[320px] w-[60px] -translate-y-87.5 rounded-full" />
				</div>
				<Button variant="ghost" className="absolute top-7 left-5 hover:bg-white/[0.05] hover:text-white transition-colors" asChild>
					<Link href="/">
						<ChevronLeftIcon className='size-4 me-2' />
						Home
					</Link>
				</Button>
				<div className="mx-auto space-y-4 w-full sm:w-[360px]">
					<div className="flex items-center gap-1 lg:hidden">
						<img src="/coretify.png" alt="Coretify Logo" className="h-8 w-auto object-contain" />
						<p className="text-xl font-semibold text-white">Coretify</p>
					</div>
					<div className="flex flex-col space-y-1">
						<h1 className="font-heading text-2xl font-bold tracking-wide text-white">
							Sign In or Join Now!
						</h1>
						<p className="text-zinc-400 text-sm">
							login or create your Coretify account.
						</p>
					</div>
					<div className="space-y-2">
						<Button type="button" size="lg" className="w-full bg-white hover:bg-slate-100 text-black border border-transparent shadow-lg font-medium cursor-pointer" onClick={() => handleAuth()}>
							<GoogleIcon className='size-4 me-2' />
							Continue with Google
						</Button>
						<Button type="button" size="lg" className="w-full bg-[#18181b] hover:bg-[#27272a] text-white border border-[#2e2e33] font-medium cursor-pointer" onClick={() => handleAuth()}>
							<AppleIcon className='size-4 me-2' />
							Continue with Apple
						</Button>
						<Button type="button" size="lg" className="w-full bg-[#18181b] hover:bg-[#27272a] text-white border border-[#2e2e33] font-medium cursor-pointer" onClick={() => handleAuth()}>
							<GithubIcon className='size-4 me-2' />
							Continue with GitHub
						</Button>
					</div>

					<AuthSeparator />

					<form className="space-y-3" onSubmit={handleAuth}>
						<p className="text-zinc-450 text-start text-xs">
							Enter your email address to sign in or create an account
						</p>
						<div className="relative h-max">
							<Input
								placeholder="your.email@example.com"
								className="peer ps-9 bg-zinc-950 border-zinc-800 text-slate-100 placeholder:text-zinc-600 focus-visible:ring-slate-800 focus-visible:border-zinc-700"
								type="email"
								required
							/>
							<div className="text-zinc-500 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
								<AtSignIcon className="size-4" aria-hidden="true" />
							</div>
						</div>

						<Button type="submit" className="w-full bg-white hover:bg-slate-100 text-black font-semibold cursor-pointer">
							<span>Continue With Email</span>
						</Button>
					</form>
					<p className="text-zinc-500 mt-8 text-xs leading-relaxed">
						By clicking continue, you agree to our{' '}
						<Link
							href="/privacy"
							className="hover:text-white underline underline-offset-4 transition-colors"
						>
							Terms of Service
						</Link>{' '}
						and{' '}
						<Link
							href="/privacy"
							className="hover:text-white underline underline-offset-4 transition-colors"
						>
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</div>
		</main>
	);
}

function FloatingPaths({ position }: { position: number }) {
	const paths = Array.from({ length: 36 }, (_, i) => ({
		id: i,
		d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
			380 - i * 5 * position
		} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
			152 - i * 5 * position
		} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
			684 - i * 5 * position
		} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
		color: `rgba(15,23,42,${0.1 + i * 0.03})`,
		width: 0.5 + i * 0.03,
	}));

	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden opacity-95">
			<svg
					className="h-full w-full text-zinc-400"
				viewBox="0 0 696 316"
				fill="none"
			>
				<title>Background Paths</title>
				{paths.map((path) => (
					<motion.path
						key={path.id}
						d={path.d}
						stroke="currentColor"
						strokeWidth={path.width}
						strokeOpacity={0.2 + path.id * 0.022}
						initial={{ pathLength: 0.3, opacity: 0.6 }}
						animate={{
							pathLength: 1,
							opacity: [0.5, 1, 0.5],
							pathOffset: [0, 1, 0],
						}}
						transition={{
							duration: 20 + Math.random() * 10,
							repeat: Number.POSITIVE_INFINITY,
							ease: 'linear',
						}}
					/>
				))}
			</svg>
		</div>
	);
}

const GoogleIcon = (props: React.ComponentProps<'svg'>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		{...props}
	>
		<g>
			<path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
		</g>
	</svg>
);

const GithubIcon = (props: React.ComponentProps<'svg'>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		{...props}
	>
		<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
	</svg>
);

const AuthSeparator = () => {
	return (
		<div className="flex w-full items-center justify-center my-1 select-none">
			<div className="bg-zinc-800 h-px w-full" />
			<span className="text-zinc-600 px-3 text-[10px] font-bold font-mono">OR</span>
			<div className="bg-zinc-800 h-px w-full" />
		</div>
	);
};
