import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/data";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Description = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const singleJob = useSelector((store) => store.jobs?.singleJob);
  const user = useSelector((store) => store.auth?.user);

  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const positionMap = {
    1: "Intern",
    2: "Junior Developer",
    3: "Developer",
    4: "Senior Developer",
    5: "FullStack Developer",
  };

  // Fetch job details
  useEffect(() => {
    const fetchSingleJob = async () => {
      if (!user) {
        setError("Please login to view job details");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${id}`, {
          withCredentials: true,
        });

        if (res.data?.job) {
          dispatch(setSingleJob(res.data.job));

          // Check if user already applied
          const applied = res.data.job.applications?.some(
            (item) => item.applicant?._id === user._id || item.applicant === user._id
          );
          setIsApplied(applied);
        } else {
          setError("Job not found");
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch job details");
        toast.error(err.response?.data?.message || "Failed to fetch job details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSingleJob();
  }, [id, dispatch, user]);

  // Apply job
  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply/${id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setIsApplied(true);

        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [
              ...(singleJob?.applications || []),
              { applicant: { _id: user._id } },
            ],
          })
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Apply failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading job details...</p>
      </div>
    );
  }

  if (error || !singleJob) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error || "Job not available"}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow border">

        {/* HEADER */}
        <div className="flex justify-between items-start flex-wrap gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{singleJob?.title}</h1>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">
                {positionMap[singleJob?.position] || "N/A"}
              </Badge>
              <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-lg">
                {singleJob?.salary ? Number(singleJob.salary) / 10000 : "N/A"} LPA
              </Badge>
              <Badge className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg">
                {singleJob?.location || "N/A"}
              </Badge>
              <Badge className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg">
                {singleJob?.jobType || "N/A"}
              </Badge>
            </div>
          </div>

          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`px-6 py-3 rounded-xl ${
              isApplied
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] text-white hover:bg-[#5e0794]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        {/* DESCRIPTION */}
        <h2 className="mt-10 text-xl font-semibold border-b pb-2">Job Description</h2>
        <p className="mt-4 text-gray-700">{singleJob?.description}</p>

        {/* DETAILS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-gray-700">
          <div><b>Role:</b> {positionMap[singleJob?.position]}</div>
          <div><b>Location:</b> {singleJob?.location}</div>
          <div><b>Salary:</b> {singleJob?.salary ? Number(singleJob.salary) / 10000 : "N/A"} LPA</div>
          <div><b>Experience:</b> {singleJob?.experienceLevel || 0} years</div>
          <div><b>Applicants:</b> {singleJob?.applications?.length || 0}</div>
          <div><b>Job Type:</b> {singleJob?.jobType}</div>
          <div><b>Post Date:</b> {singleJob?.createdAt?.split("T")[0]}</div>
          <div className="flex items-center gap-2 mt-4">
            <img
              src={singleJob?.company?.logo}
              alt={singleJob?.company?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <b>{singleJob?.company?.name}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
