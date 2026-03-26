import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const navigate = useNavigate();

  // ✅ Redux selectors with safe defaults
  const companies = useSelector((store) => store.company?.companies || []);
  const searchCompanyByText = useSelector(
    (store) => store.company?.searchCompanyByText || ""
  );
  const allAdminJobs = useSelector((store) => store.jobs?.allAdminJobs || []);
  const searchJobByText = useSelector(
    (store) => store.jobs?.searchJobByText || ""
  );

  // ✅ State for filtered jobs
  const [filterJobs, setFilterJobs] = useState([]);

  // ✅ Filter jobs when allAdminJobs or searchJobByText change
  useEffect(() => {
    if (!allAdminJobs || allAdminJobs.length === 0) {
      setFilterJobs([]); // no jobs yet
      return;
    }

    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;

      return (
        job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  // ✅ Debugging logs (can remove later)
  console.log("allAdminJobs:", allAdminJobs);
  console.log("filterJobs:", filterJobs);

  // ✅ Loading fallback if companies not loaded
  if (!companies.length) {
    return <div>Loading companies...</div>;
  }

  return (
    <div>
      <Table>
        <TableCaption>Your recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <span>No Job Added</span>
          ) : (
            filterJobs.map((job) => (
              <TableRow key={job._id || job.id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer mb-1"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <hr />
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer mt-1"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
