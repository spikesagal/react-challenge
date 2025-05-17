import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const NotFound = (): React.ReactNode => {
  return (
    <div data-testid='not-found'>
      <div>
        Looks like the page you were looking for is missing.
      </div>
      <div>
        <SentimentDissatisfiedIcon />
      </div>
    </div>
  );
};

export default NotFound;
