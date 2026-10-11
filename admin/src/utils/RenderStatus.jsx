import Spinner from '../ui/Spinner';
import ErrorMessage from '../ui/ErrorMessage';

const renderStatus = (loading, error, isEmpty, label) => {
	if (loading) return <Spinner label={label} />;
	if (error) return <ErrorMessage message={error} />;
	if (isEmpty) return <p className="text-center py-10 text-gray-500">No {label} found</p>;
	return null;
};

export default renderStatus;