import { Link, useParams } from "react-router-dom";

export default function TransmissionDetails() {
  const params = useParams();

  return (
    <div className="">
      <Link
        to={"/org/transmissions"}
        className="font-normal text-sm text text-slate"
      >
        {"<- Recent transmission volume and statistics"}
      </Link>

      <h1 className="text-2xl font-bold mt-1">Transmissions: {params.id} </h1>
    </div>
  );
}
