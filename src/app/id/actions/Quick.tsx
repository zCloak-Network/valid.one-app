import { FEEDBACK_FORM_URL } from "@/constants";

export default function () {
  return (
    <div className="bg-white border border-blue-950 rounded-2xl h-48 mt-6 w-full overflow-hidden">
      <div className="flex bg-gray-800 h-11 w-full px-4 items-center">
        <span className="font-semibold text-white text-sm">Quick Actions</span>
      </div>
      <div className="flex flex-col p-4 gap-4 item-center">
        {/* <button className="w-full btn">View Connections</button> */}
        <a href={FEEDBACK_FORM_URL} target="_blank" className="w-full btn">
          Submit Feedback
        </a>
      </div>
    </div>
  );
}
