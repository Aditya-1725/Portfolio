import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";
import CertificateForm from "../components/CertificateForm";
import ExperienceForm from "../components/ExperienceForm";
import ExperienceList from "../components/ExperienceList";
import CertificateList from "../components/CertificateList";
import SkillForm from "../components/SkillForm";
import SkillList from "../components/SkillList";

import { useState, useEffect } from "react";
import API from "../services/api";

function Admin() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: "",
    image: null,
    screenshots: [],
    github: "",
    category: "",
    featured: false,
  });

  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [skillData, setSkillData] = useState({
    name: "",
  });

  const [activeTab, setActiveTab] = useState("projects");
  const [certificateData, setCertificateData] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    image: null,
  });
  const [editingCertificateId, setEditingCertificateId] = useState(null);

  const fetchSkills = async () => {
    try {
      const res = await API.get("/skills");

      setSkills(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSkillChange = (e) => {
    setSkillData({
      ...skillData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSkillSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/skills", skillData);

      fetchSkills();

      setSkillData({
        name: "",
      });

      alert("Skill Added Successfully 🚀");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSkillDelete = async (id) => {
    try {
      await API.delete(`/skills/${id}`);

      fetchSkills();
    } catch (error) {
      console.log(error);
    }
  };

  const [experiences, setExperiences] = useState([]);

  const [experienceData, setExperienceData] = useState({
    company: "",
    role: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
    currentlyWorking: true,
    featured: false,
  });

  const [editingExperienceId, setEditingExperienceId] = useState(null);
  const fetchExperiences = async () => {
    try {
      const res = await API.get("/experiences");

      setExperiences(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleExperienceChange = (e) => {
    const { name, value, type, checked } = e.target;

    setExperienceData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,

      ...(name === "currentlyWorking" &&
        checked && {
          endDate: "",
        }),
    }));
  };
  const handleExperienceSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingExperienceId) {
        await API.put(`/experiences/${editingExperienceId}`, experienceData);
      } else {
        await API.post("/experiences", experienceData);
      }

      fetchExperiences();
      alert(
        editingExperienceId
          ? "Experience Updated Successfully 🚀"
          : "Experience Added Successfully 🚀",
      );
      setEditingExperienceId(null);

      setExperienceData({
        company: "",
        role: "",
        location: "",
        description: "",
        startDate: "",
        endDate: "",
        currentlyWorking: true,
        featured: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleExperienceEdit = (exp) => {
    setEditingExperienceId(exp._id);

    setExperienceData({
      company: exp.company,
      role: exp.role,
      location: exp.location,
      description: exp.description,
      startDate: exp.startDate?.split("T")[0] || "",
      endDate: exp.endDate?.split("T")[0] || "",
      currentlyWorking: exp.currentlyWorking,
      featured: exp.featured,
    });
  };
  const handleExperienceDelete = async (id) => {
    try {
      await API.delete(`/experiences/${id}`);

      fetchExperiences();
    } catch (error) {
      console.log(error);
    }
  };
  const handleCertificateSubmit = async (e) => {
    e.preventDefault();

    if (isUploading) return;

    setIsUploading(true);

    try {
      const data = new FormData();

      data.append("title", certificateData.title);

      data.append("issuer", certificateData.issuer);

      data.append("issueDate", certificateData.issueDate);

      if (certificateData.image) {
        data.append("image", certificateData.image);
      }

      if (editingCertificateId) {
        await API.put(`/certificates/${editingCertificateId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await API.post("/certificates", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      await fetchCertificates();

      setEditingCertificateId(null);

      setCertificateData({
        title: "",
        issuer: "",
        issueDate: "",
        image: null,
      });

      alert(
        editingCertificateId
          ? "Certificate Updated Successfully 🚀"
          : "Certificate Added Successfully 🚀",
      );
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Failed to upload certificate.");
    } finally {
      setIsUploading(false);
    }
  };
const handleCertificateEdit = (certificate) => {
  setEditingCertificateId(certificate._id);

  setCertificateData({
    title: certificate.title || "",
    issuer: certificate.issuer || "",
    issueDate:
      certificate.issueDate?.split("T")[0] || "",

    // File input cannot be pre-filled
    image: null,
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
  const handleCertificateDelete = async (id) => {
    try {
      await API.delete(`/certificates/${id}`);

      fetchCertificates();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploading) return;

    setIsUploading(true);

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("tech", formData.tech);
      data.append("github", formData.github);
      data.append("demo", formData.demo || "");
      data.append("category", formData.category);
      data.append("featured", formData.featured);

      // Cover Image
      if (formData.image) {
        data.append("image", formData.image);
      }

      // Multiple Screenshots
      if (formData.screenshots && formData.screenshots.length > 0) {
        Array.from(formData.screenshots).forEach((file) => {
          data.append("screenshots", file);
        });
      }

      if (editingId) {
        await API.put(`/projects/${editingId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await API.post("/projects", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      await fetchProjects();

      setEditingId(null);

      setFormData({
        image: null,
        title: "",
        description: "",
        tech: "",
        github: "",
        demo: "",
        category: "",
        screenshots: [],
        featured: false,
      });

      alert(
        editingId
          ? "Project Updated Successfully 🚀"
          : "Project Added Successfully 🚀",
      );
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Failed to upload project.");
    } finally {
      setIsUploading(false);
    }
  };
// Logout Handle
  const handleLogout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  localStorage.removeItem("adminToken");

  window.location.href = "/admin/login";
};

  const fetchCertificates = async () => {
    try {
      const res = await API.get("/certificates");

      setCertificates(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "screenshots" ? files : files[0],
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await API.delete(`/projects/${id}`);

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };
  const handleCertificateChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setCertificateData((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      return;
    }

    setCertificateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEdit = (project) => {
    setEditingId(project._id);

    setFormData({
      title: project.title || "",
      description: project.description || "",
      tech: project.tech || "",
      github: project.github || "",
      demo: project.demo || "",
      category: project.category || "",
      featured: project.featured || false,

      // File inputs cannot be pre-filled
      image: null,
      screenshots: [],
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const init = async () => {
      await Promise.all([
        fetchProjects(),
        fetchCertificates(),
        fetchExperiences(),
        fetchSkills(),
      ]);
    };
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="page-wrapper pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

       {/* Header */}

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
  <div className="text-center md:text-left flex-1">
    <h1 className="text-5xl md:text-6xl font-bold mb-4">
      Admin
      <span className="text-green-400">
        {" "}Dashboard
      </span>
    </h1>

    <p className="text-gray-400 max-w-xl md:mx-0 mx-auto">
      Manage projects, certificates, experiences, and skills from one
      centralized dashboard.
    </p>
  </div>

  <button
    type="button"
    onClick={handleLogout}
    className="
      px-6
      py-3
      rounded-xl
      bg-[#101010]
      border
      border-red-500/20
      text-red-400
      font-semibold
      hover:border-red-400
      hover:bg-red-500/10
      hover:shadow-[0_0_20px_rgba(239,68,68,0.18)]
      transition-all
      duration-300
    "
  >
    Logout
  </button>
</div>

        {/* Navigation Tabs */}

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "projects"
                ? "bg-green-400 text-black shadow-[0_0_20px_rgba(0,255,136,0.2)]"
                : "bg-[#101010] border border-green-500/20 text-gray-300 hover:border-green-400"
            }`}
          >
            Projects
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("certificates")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "certificates"
                ? "bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                : "bg-[#101010] border border-cyan-500/20 text-gray-300 hover:border-cyan-400"
            }`}
          >
            Certificates
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("experience")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "experience"
                ? "bg-purple-400 text-black shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                : "bg-[#101010] border border-purple-500/20 text-gray-300 hover:border-purple-400"
            }`}
          >
            Experience
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("skills")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "skills"
                ? "bg-orange-400 text-black shadow-[0_0_20px_rgba(251,146,60,0.2)]"
                : "bg-[#101010] border border-orange-500/20 text-gray-300 hover:border-orange-400"
            }`}
          >
            Skills
          </button>
        </div>

        {/* Main Content Card */}

        <div
          className="
        bg-[#101010]
        border
        border-green-500/10
        rounded-3xl
        p-8
        md:p-10
        shadow-[0_0_35px_rgba(0,255,136,0.06)]
        "
        >
          {activeTab === "projects" && (
            <>
              <h2 className="text-2xl font-bold text-green-400 mb-8">
                {editingId ? "Edit Project" : "Add New Project"}
              </h2>

              <ProjectForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                editingId={editingId}
                isUploading={isUploading}
              />

              <div className="h-px bg-green-500/10 my-10"></div>

              <ProjectList
                projects={projects}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </>
          )}

          {activeTab === "certificates" && (
            <>
              <h2 className="text-2xl font-bold text-cyan-400 mb-8">
                {editingCertificateId
                  ? "Edit Certificate"
                  : "Add New Certificate"}
              </h2>

              <CertificateForm
                formData={certificateData}
                handleChange={handleCertificateChange}
                handleSubmit={handleCertificateSubmit}
                editingId={editingCertificateId}
                isUploading={isUploading}
              />

              <div className="h-px bg-cyan-500/10 my-10"></div>

              <CertificateList
                certificates={certificates}
                handleEdit={handleCertificateEdit}
                handleDelete={handleCertificateDelete}
              />
            </>
          )}

          {activeTab === "experience" && (
            <>
              <h2 className="text-2xl font-bold text-purple-400 mb-8">
                {editingExperienceId ? "Edit Experience" : "Add New Experience"}
              </h2>

              <ExperienceForm
                formData={experienceData}
                handleChange={handleExperienceChange}
                handleSubmit={handleExperienceSubmit}
                editingId={editingExperienceId}
              />

              <div className="h-px bg-purple-500/10 my-10"></div>

              <ExperienceList
                experiences={experiences}
                handleEdit={handleExperienceEdit}
                handleDelete={handleExperienceDelete}
              />
            </>
          )}

          {activeTab === "skills" && (
            <>
              <h2 className="text-2xl font-bold text-orange-400 mb-8">
                Add Skill
              </h2>

              <SkillForm
                skillData={skillData}
                handleSkillChange={handleSkillChange}
                handleSkillSubmit={handleSkillSubmit}
              />

              <div className="h-px bg-orange-500/10 my-10"></div>

              <SkillList
                skills={skills}
                handleSkillDelete={handleSkillDelete}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Admin;
