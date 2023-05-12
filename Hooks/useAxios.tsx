import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url, options = {}) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true; // Flag to track if the component is still mounted

		const fetchData = async () => {
			try {
				const response = await axios(url, options);
				if (isMounted) {
					setData(response.data);
					setLoading(false);
				}
			} catch (error) {
				if (isMounted) {
					setError(error);
					setLoading(false);
				}
			}
		};

		fetchData();

		return () => {
			isMounted = false; // Clean up the flag when the component unmounts
		};
	}, [url, options]);

	return { data, error, loading };
};

export default useAxios;
