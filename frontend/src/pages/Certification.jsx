import { useEffect, useState } from "react";
import API from "../services/api";
import CertificateCard from "../components/CertificateCard";

function Certification() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await API.get("/certificates");
        setCertificates(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <div className="page-wrapper pb-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Heading */}

        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
          My
          <span className="text-cyan-400"> Certificates</span>
        </h1>

        {/* Subtitle */}

        <p className="text-center text-gray-400 leading-8 mb-16 max-w-2xl mx-auto">
          Certifications, workshops, and learning achievements that reflect my
          continuous growth in technology, cyber security, and modern software
          development.
        </p>

        {/* Content */}

        {certificates.length === 0 ? (
          <div
            className="
            py-24
            rounded-2xl
            border
            border-cyan-500/10
            bg-[#101010]
            text-center
            "
          >
            <p className="text-gray-500 text-lg">
              No Certificates Added Yet 🚀
            </p>
          </div>
        ) : (
          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
            justify-items-center
            "
          >
            {[...certificates]
              .sort((a, b) => {
                const dateA = a.createdAt
                  ? new Date(a.createdAt).getTime()
                  : new Date(a._id.substring(0, 8) * 1000).getTime();

                const dateB = b.createdAt
                  ? new Date(b.createdAt).getTime()
                  : new Date(b._id.substring(0, 8) * 1000).getTime();

                return dateB - dateA;
              })
              .map((certificate) => (
                <CertificateCard
                  key={certificate._id}
                  title={certificate.title}
                  issuer={certificate.issuer}
                  issueDate={new Date(certificate.issueDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      year: "numeric",
                    },
                  )}
                  image={certificate.image}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Certification;
