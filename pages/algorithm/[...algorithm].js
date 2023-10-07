import axios from 'axios';

const filePaths = {
	py: 'python',
	py3: 'python',
	ts: 'typeScript',
	js: 'typeScript',
	go: 'go',
	golang: 'go',
};

const Algo = ({ algorithm, language, fileContents }) => {
	return (
		<div>
			<h1>{algorithm}</h1>
			<h2>{language}</h2>
			<pre>{fileContents}</pre>
		</div>
	);
};

export default Algo;

export async function getServerSideProps(props) {
	try {

		const algorithm = props.params.algorithm[0];
		const language = props.query.lang || 'go';
		const langPath = filePaths[language];
		if (!algorithm || !langPath) throw new Error("Algorithm not found in the given language")

		const { data: filePathConfig } = await axios.get(
			`http://${props.req.headers.host}/${langPath}/filepaths.json`
		);

		const exactFile = filePathConfig[algorithm];
		if (!exactFile) throw new Error("FILE not found");

		const { data: fileContents } = await axios.get(
			`http://${props.req.headers.host}/${langPath}/${exactFile}`
		);

		return {
			props: {
				language,
				algorithm,
				fileContents,
			},
		};
	} catch (err) {
		console.log(err);
		return {
			notFound: true,
			props: { algorithm: null, language: null, fileContents: null },
		};
	}
}
