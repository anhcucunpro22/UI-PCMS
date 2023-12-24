import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

const SuccessNotification = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-600 text-white">
      <h1 className="text-4xl font-bold font-mono my-2">
        Bạn đã yêu cầu đơn hàng thành công
      </h1>
      <FontAwesomeIcon icon={faCheckCircle} size="3x" />
    </div>
  );
};

export default SuccessNotification;
