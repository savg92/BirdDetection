import { useRef } from 'react';

import { Card } from './ui/card';

interface FileUploaderProps {
	onSelect: (file: File) => void;
}

export function FileUploader({ onSelect }: FileUploaderProps): JSX.Element {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFiles = (files: FileList | null): void => {
		if (!files || files.length === 0) {
			return;
		}

		onSelect(files[0]);
	};

	return (
		<Card className='border-dashed border-brand/40 bg-slate-900/70'>
			<div
				className='flex min-h-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-slate-800 p-6 text-center'
				onDragOver={(event) => event.preventDefault()}
				onDrop={(event) => {
					event.preventDefault();
					handleFiles(event.dataTransfer.files);
				}}
				onClick={() => inputRef.current?.click()}
			>
				<p className='text-lg font-semibold'>Drop your bird image here</p>
				<p className='text-sm text-slate-400'>
					1. Take a picture, 2. Crop image to feature the bird, 3. Upload.
				</p>
				<p className='text-xs text-slate-500'>PNG, JPG, or JPEG</p>
			</div>
			<input
				ref={inputRef}
				type='file'
				accept='image/*'
				className='hidden'
				onChange={(event) => handleFiles(event.target.files)}
			/>
		</Card>
	);
}
