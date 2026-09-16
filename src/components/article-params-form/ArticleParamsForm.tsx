import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	fontColors,
	contentWidthArr,
	defaultArticleState,
} from '../../constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export type ArticleState = typeof defaultArticleState;

interface ArticleStateParams {
	setArticleStyles: (state: ArticleState) => void;
}

export const ArticleParamsForm = ({ setArticleStyles }: ArticleStateParams) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [newArticleStyles, setNewArticleStyles] =
		useState<ArticleState>(defaultArticleState);
	const formRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (isOpen && !formRef.current?.contains(target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, formRef]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleStyles(newArticleStyles);
	};

	const handleReset = () => {
		setNewArticleStyles(defaultArticleState);
		setArticleStyles(defaultArticleState);
	};

	const updateField = <T extends keyof ArticleState>(
		key: T,
		value: ArticleState[T]
	) => {
		setNewArticleStyles((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={formRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={newArticleStyles.fontFamilyOption}
						onChange={(option) => updateField('fontFamilyOption', option)}
						title='шрифт'
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={newArticleStyles.fontSizeOption}
						onChange={(option) => updateField('fontSizeOption', option)}
						title='рАЗМЕР шрифта'
						name='size'
					/>
					<Select
						options={fontColors}
						selected={newArticleStyles.fontColor}
						onChange={(option) => updateField('fontColor', option)}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={newArticleStyles.backgroundColor}
						onChange={(option) => updateField('backgroundColor', option)}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={newArticleStyles.contentWidth}
						onChange={(option) => updateField('contentWidth', option)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
