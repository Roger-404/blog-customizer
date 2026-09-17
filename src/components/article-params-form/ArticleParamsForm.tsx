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
	ArticleStateType,
} from '../../constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

interface ArticleStateParams {
	setArticleStyles: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ setArticleStyles }: ArticleStateParams) => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [newArticleStyles, setNewArticleStyles] =
		useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (isFormOpen && !formRef.current?.contains(target)) {
				setIsFormOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isFormOpen, formRef]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleStyles(newArticleStyles);
	};

	const handleReset = () => {
		setNewArticleStyles(defaultArticleState);
		setArticleStyles(defaultArticleState);
	};

	const updateField = <T extends keyof ArticleStateType>(
		key: T,
		value: ArticleStateType[T]
	) => {
		setNewArticleStyles((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => {
					setIsFormOpen(!isFormOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}
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
