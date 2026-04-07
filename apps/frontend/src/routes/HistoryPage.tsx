import { useEffect, useState } from 'react';

import { fetchHistory, type HistoryItem, toImageUrl } from '../lib/api';
import { Alert } from '../components/ui/alert';
import { Card } from '../components/ui/card';

export function HistoryPage(): JSX.Element {
	const [items, setItems] = useState<HistoryItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const run = async (): Promise<void> => {
			try {
				setItems(await fetchHistory());
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to load history');
			} finally {
				setLoading(false);
			}
		};

		void run();
	}, []);

	if (loading) {
		return <Alert>Loading sighting history...</Alert>;
	}

	if (error) {
		return <Alert variant='warning'>{error}</Alert>;
	}

	return (
		<section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
			{items.length === 0 ? (
				<Card>
					<p className='text-sm text-slate-400'>
						No sightings yet. Upload an image from Dashboard.
					</p>
				</Card>
			) : (
				items.map((item) => (
					<Card key={item.id}>
						<img
							src={toImageUrl(item.filepath)}
							alt={item.top_species}
							className='h-40 w-full rounded-md object-cover'
						/>
						<h3 className='mt-3 text-sm font-semibold'>{item.top_species}</h3>
						<p className='text-xs text-slate-400'>
							Confidence: {(item.probability * 100).toFixed(2)}%
						</p>
						<p className='text-xs text-slate-500'>
							{new Date(item.timestamp).toLocaleString()}
						</p>
						{item.is_uncertain ? (
							<p className='mt-2 text-xs font-medium text-amber-300'>
								Uncertain prediction
							</p>
						) : null}
					</Card>
				))
			)}
		</section>
	);
}
