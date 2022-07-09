import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="text-center mt-4">
      <h1 className="text-5xl font-bold">Oops!</h1>
      <h2 className="text-3xl">We couldn't find what you're looking for</h2>
      <h3 className="text-xl">
        Try searching again or going to the{' '}
        <Link to="/" className="text-blue-400 underline">
          home page
        </Link>
      </h3>
    </div>
  );
}

export default NotFoundPage;
