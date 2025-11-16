import Value from "../components/Value";
import Timer from "../components/Timer";
import Adder from "../components/Adder";
import Temperatures from "../components/Temperatures";

export default function ComponentsPage() {
  return (
    <div className="flex flex-col items-center gap-6 text-center bg-linear-to-b from-blue-50 to-sky-100 p-6 rounded-xl shadow-inner">
      <h1 className="text-2xl font-bold bg-black text-white px-6 py-2 rounded-lg shadow-md">
        REACT COMPONENTS
      </h1>

      <div className="flex gap-8 flex-wrap justify-center">
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-blue-800 text-lg">COUNTER</h3>
          <Value label="Count" type="integer" color="red" />
          <h3 className="font-semibold text-blue-800 text-lg mt-4">TIMER</h3>
          <Timer />
        </div>

        <Adder />
      </div>

      <Temperatures />

      <p className="bg-black text-white px-6 py-2 rounded-lg mt-4">
        นายมนัสวิน ทองดี รหัส 67091885
      </p>
    </div>
  );
}

