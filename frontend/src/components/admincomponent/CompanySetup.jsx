import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleCompany } = useSelector((store) => store.company);
  const { loading: fetching } = useGetCompanyById(id);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(input).forEach((key) => {
      if (input[key]) formData.append(key, input[key]);
    });

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${id}`,
        formData,
        { withCredentials: true }
      );

      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center mt-20">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex gap-4 items-center mb-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/companies")}
            >
              <ArrowLeft /> Back
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input name="name" value={input.name} onChange={changeHandler} />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeHandler}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                name="website"
                value={input.website}
                onChange={changeHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={changeHandler}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input type="file" onChange={fileHandler} />
            </div>
          </div>

          <Button className="w-full mt-6" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Update"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
