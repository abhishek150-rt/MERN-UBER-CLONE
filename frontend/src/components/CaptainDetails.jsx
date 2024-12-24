import {
  RiMoneyRupeeCircleLine,
  RiSpeedUpLine,
  RiTimeLine,
} from "@remixicon/react";

const CaptainDetails = ({ captain }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-4">
          <img
            className="h-10 rounded-full object-cover w-10"
            src="https://media.licdn.com/dms/image/v2/D4D12AQEsf_pWkQK7xQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1716378638139?e=2147483647&v=beta&t=evv6OCgi7pXnscAXIhoym7EMNuvBqBnxFtMuXPDpEeE"
            alt=""
          />
          <h4 className="text-lg font-medium">
            {captain?.fullName?.firstName} &nbsp;
            {captain?.fullName?.lastName}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">₹ 345.00</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex justify-center p-5 bg-gray-100 rounded-lg gap-5 items-start">
        <div className="flex justify-center items-center flex-col">
          <RiTimeLine className="text-3xl mb-2 font-extralight " />
          <h5 className="text-lg font-medium">10.5</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="flex justify-center items-center flex-col">
          <RiSpeedUpLine className="text-3xl mb-2 font-extralight " />
          <h5 className="text-lg font-medium">10.5</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="flex justify-center items-center flex-col">
          <RiMoneyRupeeCircleLine className="text-3xl mb-2 font-extralight " />
          <h5 className="text-lg font-medium">10.5</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </>
  );
};

export default CaptainDetails;
