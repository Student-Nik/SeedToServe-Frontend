import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto p-10">
      <h1 className="text-4xl font-bold">
        Product ID : {id}
      </h1>
    </div>
  );
}