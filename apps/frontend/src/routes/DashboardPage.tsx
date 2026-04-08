import { useMemo, useState } from 'react';

import { FileUploader } from '../components/FileUploader';
import { PredictionTable } from '../components/PredictionTable';
import type { PredictResponse } from '../lib/api';
import { predictBird, toImageUrl } from '../lib/api';
import { Alert } from '../components/ui/alert';
import { Card } from '../components/ui/card';
import { formatSpeciesName } from '../lib/utils';

export function DashboardPage(): JSX.Element {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [result, setResult] = useState<PredictResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const previewUrl = useMemo(() => {
		if (!selectedFile) {
			return null;
		}

		return URL.createObjectURL(selectedFile);
	}, [selectedFile]);

	const handleFile = async (file: File): Promise<void> => {
		setSelectedFile(file);
		setResult(null);
		setError(null);
		setLoading(true);

		try {
			const response = await predictBird(file);
			setResult(response);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Prediction failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className='grid gap-4 md:grid-cols-2'>
			<div className='space-y-4'>
				<FileUploader onSelect={handleFile} />
				{loading ? <Alert>Running inference...</Alert> : null}
				{error ? <Alert variant='warning'>{error}</Alert> : null}
				{result?.is_uncertain ? (
					<Alert variant='warning'>
						Low confidence prediction. Try a clearer image focused on the bird.
					</Alert>
				) : null}
			</div>

			<div className='space-y-4'>
				<Card>
					<h2 className='mb-3 text-lg font-semibold'>Preview</h2>
					{previewUrl ? (
						<div className='flex max-h-[32rem] w-full items-center justify-center overflow-hidden rounded-lg bg-slate-950/50 p-2'>
							<img
								src={previewUrl}
								alt='Selected upload'
								className='h-auto max-h-[30rem] w-auto max-w-full rounded-md object-contain'
							/>
						</div>
					) : (
						<p className='text-sm text-slate-400'>
							Upload an image to preview it here.
						</p>
					)}
				</Card>

				{result ? (
					<Card>
						<h2 className='mb-2 text-lg font-semibold'>Top 5 Predictions</h2>
						<p className='mb-3 text-sm text-slate-400'>
							Top species:{' '}
							<span className='font-medium text-slate-100'>
								{formatSpeciesName(result.top_species)}
							</span>
						</p>
						<PredictionTable predictions={result.top_5} />
						<p className='mt-3 text-xs text-slate-500'>
							Saved image: {toImageUrl(result.filepath)}
						</p>
					</Card>
				) : null}
			</div>
		</section>
	);
}
