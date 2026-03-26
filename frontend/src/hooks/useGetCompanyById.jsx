import { setSingleCompany } from "@/redux/companyslice";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get/${companyId}`,
          { withCredentials: true }
        );

        if (res?.data?.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.error("Fetch company error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) fetchCompany();
  }, [companyId, dispatch]);

  return { loading };
};

export default useGetCompanyById;
