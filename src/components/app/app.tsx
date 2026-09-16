import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import {
	ArticleParamsForm,
	ArticleState,
} from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [articleStyles, setArticleStyles] =
		useState<ArticleState>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyles.fontFamilyOption.value,
					'--font-size': articleStyles.fontSizeOption.value,
					'--font-color': articleStyles.fontColor.value,
					'--container-width': articleStyles.contentWidth.value,
					'--bg-color': articleStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setArticleStyles={setArticleStyles} />
			<Article />
		</main>
	);
};
