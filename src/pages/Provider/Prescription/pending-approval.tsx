import ApprovalPending from "@/components/provider/pending-approval";

export default function PendingApproval() {
  return (
    <div className="mt-10">
      <h1 className="font-semibold text-2xl">Prescriptions</h1>
      <div>
        <div className="mt-4 p-10 bg-white rounded-2xl ">
          <ApprovalPending />
        </div>
      </div>
    </div>
  );
}
