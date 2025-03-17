import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useSignupFormStore } from "@/store/onboarding/signup-form";
import useStepStore from "@/store/stepStore";

const EmploymentDetails = () => {
  const { handleNext,handlePrev } = useStepStore();

  const {
    username,
    email,
    bio,
    tags,
    display_image,
    work_history, setFormData,
    public_address,
  } = useSignupFormStore();

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const valid = work_history.every(entry => 
      entry.company_name.trim().length > 0 &&
      entry.start_date.trim().length > 0 &&
      (entry.current || entry.end_date.trim().length > 0) &&
      entry.designation.trim().length > 0 &&
      entry.description.trim().length > 0
    );
    setIsFormValid(valid);
  }, [work_history]);

  useState(() => {
    if (work_history.length === 0) {
      setFormData({
        work_history: [
        ]
      });
    }
  }, []);

  const addWorkHistory = () => {
    setFormData({
      work_history: [
        ...work_history,
        {
          company_name: "",
          start_date: "",
          end_date: "",
          current: false,
          designation: "",
          description: ""
        }
      ]
    });
  };

  // Remove a work history entry
  const removeWorkHistory = (index) => {
    const updatedWorkHistory = [...work_history];
    updatedWorkHistory.splice(index, 1);
    setFormData({ work_history: updatedWorkHistory });
  };

  // Handle work history field changes
  const handleWorkHistoryChange = (index, field, value) => {
    const updatedWorkHistory = [...work_history];
    updatedWorkHistory[index][field] = value;
    setFormData({ work_history: updatedWorkHistory });
  };

  // Handle checkbox for "currently working here"
  const handleCurrentChange = (index, checked) => {
    const updatedWorkHistory = [...work_history];
    updatedWorkHistory[index].current = checked;
    if (checked) {
      updatedWorkHistory[index].end_date = checked ? null : "";
    }
    setFormData({ work_history: updatedWorkHistory });
  };
  const handleSkip = () => {
    setFormData({ work_history: [] });
    handleNext();
  };


  return (
    <div className="h-full w-full relative justify-center items-center gap-8 flex overflow-hidden px-4">
      <div className="flex flex-col pt-10 px-5 gap-8 text-white w-full">
        <h2 className="text-3xl font-semibold">Employment Details</h2>

        {work_history.map((entry, index) => (
          <div key={index} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-4 w-full">
              <label className="text-white text-xl font-medium">
                Enter Company's Name:
              </label>
              <input
                type="text"
                placeholder="Company's Name"
                value={entry.company_name}
                onChange={(e) =>
                  handleWorkHistoryChange(index, "company_name", e.target.value)
                }
                className="bg-[#1B0D37] border border-[#9268E4] rounded-md p-4 w-full text-neutral-60 placeholder:text-neutral-60 shadow-sm"
              />
            </div>

            <div className="flex gap-8 w-full">
              <div className="flex flex-col gap-4 w-1/2">
                <label className="text-white text-xl  font-medium">
                  Enter Starting Date:
                </label>
                <input
                  type="date"
                  value={entry.start_date}
                  min="2000-01-01" 
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    handleWorkHistoryChange(index, "start_date", e.target.value)
                  }
                  className="bg-[#1B0D37] border  border-[#9268E4] rounded-md p-4 w-full text-white shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-4 w-1/2">
                <label className="text-white text-xl font-medium">
                  Enter Ending Date:
                </label>
                <input
                  type="date"
                  value={entry.end_date}
                  min={entry.start_date} 
                  max={new Date().toISOString().split("T")[0]} 
                  disabled={entry.current}
                  onChange={(e) =>
                    handleWorkHistoryChange(index, "end_date", e.target.value)
                  }
                  className="bg-[#1B0D37] border border-[#9268E4] rounded-md p-4 w-full text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <label className="flex items-center gap-2 text-white text-sm">
                  <input
                    type="checkbox"
                    checked={entry.current}
                    onChange={(e) => handleCurrentChange(index, e.target.checked)}
                    className="border-2 border-primary-300 rounded-sm"
                  />
                  I currently work here.
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <label className="text-white text-xl font-medium">
                Enter your Role:
              </label>
              <input
                type="text"
                placeholder="Your Role"
                value={entry.designation}
                onChange={(e) =>
                  handleWorkHistoryChange(index, "designation", e.target.value)
                }
                className="bg-[#1B0D37] border border-[#9268E4] rounded-md p-4 w-full text-neutral-60 placeholder:text-neutral-60 shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-4 w-full">
              <label className="text-white text-xl font-medium">
                Job Description:
              </label>
              <textarea
                placeholder="Job Description"
                value={entry.description}
                onChange={(e) =>
                  handleWorkHistoryChange(index, "description", e.target.value)
                }
                className="bg-[#1B0D37] border border-[#9268E4] rounded-md p-4 w-full text-neutral-60 placeholder:text-neutral-60 shadow-sm min-h-[100px]"
              />
            </div>

            {index > 0 && (
              <div className="flex justify-end">
                <Button 
                  variant="destructive" 
                  className="flex items-center gap-2 bg-transparent border border-red-500 hover:bg-red-500/10"
                  onClick={() => removeWorkHistory(index)}
                >
                  <Trash2 className="h-5 w-5" />
                  Remove
                </Button>
              </div>
            )}
            
            {index < work_history.length - 1 && (
              <hr className="border-[#9268E4]/30 my-2" />
            )}
          </div>
        ))}

        <div className="flex items-center gap-3 cursor-pointer" onClick={addWorkHistory}>
          <Button variant="radix" size="icon" className="bg-[#9268E4] hover:bg-[#7D3DFF]">
            <Plus />
          </Button>
          <span className="text-white text-xl">Add another work Experience.</span>
        </div>

        <div className="flex gap-4 w-full">
          <button
            onClick={ handlePrev}
            className="flex-1 rounded-2xl p-3 text-white hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483] bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] font-semibold shadow-inner"
          >
            Previous
          </button>
          <button
         
            onClick={handleSkip}
            disabled={!isFormValid}
            className="flex-1 rounded-2xl p-3 text-white bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] hover:from-[#C0A1FF] hover:to-[#391483] font-semibold shadow-inner"
            >
            Skip
          </button>
          <button
            onClick={handleNext}
            disabled={!isFormValid}
            className={`flex-1 rounded-2xl p-3 text-white font-semibold shadow-inner ${isFormValid ? "bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] hover:from-[#C0A1FF] hover:to-[#391483]" : "bg-gray-500 cursor-not-allowed"}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmploymentDetails;
