const express = require('express');
const cors = require('cors');
const paths = require('./../dist/DIMENSION MEME PACK 2021/paths.json');
const stringSimilarity = require('string-similarity');

const app = express();
const port = 3000;
app.use(cors());
app.options('*', cors());

app.get('/meme', (req, res) => {
	const search = req.query.search;
	res.send(
		search !== ''
			? Object.entries(paths)
					.filter(([key, path]) =>
						path.keywords.some((keyword) =>
							keyword.toLowerCase().includes(search.toLowerCase())
						)
					)
					.sort(
						(a, b) =>
							Math.max(
								...a[1].keywords.map((keyword) =>
									stringSimilarity.compareTwoStrings(
										search.toLowerCase(),
										keyword
									)
								)
							) -
							Math.max(
								...b[1].keywords.map((keyword) =>
									stringSimilarity.compareTwoStrings(
										search.toLowerCase(),
										keyword
									)
								)
							)
					)
			: {}
	);
});

app.listen(port, () => {
	console.log(`Example app listening at port ${port}`);
});
