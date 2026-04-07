import { Link, Outlet } from '@tanstack/react-router';

export function RootLayout(): JSX.Element {
	return (
		<main className='mx-auto flex min-h-screen max-w-5xl flex-col gap-6 p-4 md:p-8'>
			<header className='rounded-xl border border-slate-800 bg-slate-900 p-4'>
				<h1 className='text-2xl font-bold text-slate-100'>Avian-AI</h1>
				<p className='text-sm text-slate-400'>Bird recognition dashboard</p>
				<nav className='mt-3 flex gap-2'>
					<Link
						to='/'
						className='rounded-md border border-slate-700 px-3 py-1 text-sm text-slate-200 hover:bg-slate-800'
					>
						Dashboard
					</Link>
					<Link
						to='/history'
						className='rounded-md border border-slate-700 px-3 py-1 text-sm text-slate-200 hover:bg-slate-800'
					>
						History
					</Link>
				</nav>
			</header>
			<Outlet />
		</main>
	);
}
