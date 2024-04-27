import ProgressBar from "react-bootstrap/ProgressBar";

function Rating({ props }) {
  return <ProgressBar now={props * 20} variant="primary" />;
}

export default Rating;
