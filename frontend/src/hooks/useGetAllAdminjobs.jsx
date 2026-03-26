import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/getadminjobs`, // ✅ ONLY THIS IS CORRECT
          { withCredentials: true }
        );

        

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        } else {
          setError("Failed to fetch jobs");
        }
      } catch (err) {
        console.error("Fetch Error 👉", err);
        setError(err.response?.data?.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);

  return { loading, error };
};

export default useGetAllAdminJobs;
