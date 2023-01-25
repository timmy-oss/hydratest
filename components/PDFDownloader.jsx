import { PDFDownloadLink } from "@react-pdf/renderer";
import ResultPdf from "./ResultPdf";

export default function PDFDownloader({ result }) {
  const fn =
    `${result.exam_name}(${result.course_name}) result.pdf` ||
    "exam_result.pdf";

  return (
    <div
      title="Download as PDF"
      className="backdrop-blur-sm bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer rounded-lg p-1 absolute bottom-1 right-1"
    >
      <PDFDownloadLink document={<ResultPdf {...result} />} fileName={fn}>
        {({ url, loading, error }) =>
          loading ? (
            <i
              aria-disabled
              className="bi-circle-fill inline-block animate-ping text-sm text-white "
            ></i>
          ) : error ? (
            <i
              aria-disabled
              className="bi-exclamation-triangle text-sm text-white "
            ></i>
          ) : (
            <i className="bi-file-earmark-arrow-down text-sm text-white "></i>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}
