import UploadForm from "@/_components/upload/UploadForm.client";

export default function UploadPage() {
  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-6 py-6 space-y-6">
      <h1 className="section-accent text-xl sm:text-2xl font-semibold text-body">Upload Beat</h1>
      <UploadForm />
      <ul className="steps w-full">
        <li className="step step-primary">Basic</li>
        <li className="step">Pricing</li>
        <li className="step">Discovery</li>
      </ul>
    </div>
  );
}
