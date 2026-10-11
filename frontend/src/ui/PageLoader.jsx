import { ThreeDot } from "react-loading-indicators";

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <ThreeDot
      variant="bounce"
      color="#295d54"
      size="medium"
      text=""
      textColor=""
    />
  </div>
);

export default PageLoader